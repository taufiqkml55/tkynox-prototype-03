
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { doc, getDoc, updateDoc, arrayUnion, runTransaction, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, update as rtdbUpdate } from 'firebase/database';
import { updateProfile } from 'firebase/auth';
import { db, rtdb, auth } from './firebase';
import { User, FriendRequest, Friend, Transaction } from '../types';

export const updateProfileNameTx = async (userId: string, newName: string) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { name: newName });
    
    const rtdbRef = ref(rtdb, `players/${userId}`);
    await rtdbUpdate(rtdbRef, { name: newName });

    if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: newName });
    }
};

export const sendFriendRequestTx = async (currentUser: User, targetCode: string, targetId?: string) => {
    let targetDocSnapshot: any = null;

    if (targetId) {
        const docRef = doc(db, "users", targetId);
        const snap = await getDoc(docRef);
        if (snap.exists()) targetDocSnapshot = snap;
    } else {
        const code = targetCode.toUpperCase().trim();
        if (code === currentUser.uniqueId) throw new Error('SELF_ADD');

        const q = query(collection(db, "users"), where("uniqueId", "==", code));
        let querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            const qLegacy = query(collection(db, "users"), where("referralCode", "==", code));
            querySnapshot = await getDocs(qLegacy);
        }

        if (!querySnapshot.empty) targetDocSnapshot = querySnapshot.docs[0];
    }

    if (!targetDocSnapshot) throw new Error('NOT_FOUND');

    const targetIdFinal = targetDocSnapshot.id;
    if (targetIdFinal === currentUser.id) throw new Error('SELF_ADD');

    await runTransaction(db, async (transaction) => {
        const targetRef = doc(db, 'users', targetIdFinal);
        const senderRef = doc(db, 'users', currentUser.id);

        const targetDoc = await transaction.get(targetRef);
        const senderDoc = await transaction.get(senderRef);

        if (!targetDoc.exists() || !senderDoc.exists()) throw new Error("Document missing");

        const tData = targetDoc.data() as User;
        const sData = senderDoc.data() as User;

        const currentRequests = tData.friendRequests || [];
        const currentFriends = tData.friends || [];
        const sentRequests = sData.sentRequests || [];

        if (currentFriends.some(f => f.id === currentUser.id)) throw new Error("ALREADY_FRIENDS");
        if (currentRequests.some(r => r.fromId === currentUser.id)) throw new Error("ALREADY_PENDING");
        if (sentRequests.includes(targetIdFinal)) throw new Error("ALREADY_PENDING");

        const request: FriendRequest = {
            fromId: currentUser.id,
            fromName: currentUser.name,
            fromCode: currentUser.uniqueId || currentUser.referralCode || 'UNKNOWN',
            date: new Date().toISOString()
        };

        transaction.update(targetRef, { friendRequests: [...currentRequests, request] });
        transaction.update(senderRef, { sentRequests: [...sentRequests, targetIdFinal] });
    });
};

export const respondToFriendRequestTx = async (currentUser: User, requesterId: string, accept: boolean) => {
    await runTransaction(db, async (transaction) => {
        const myRef = doc(db, 'users', currentUser.id);
        const requesterRef = doc(db, 'users', requesterId);

        const myDoc = await transaction.get(myRef);
        const reqDoc = await transaction.get(requesterRef);

        if (!reqDoc.exists() || !myDoc.exists()) throw new Error("User data error");

        const myData = myDoc.data() as User;
        const reqData = reqDoc.data() as User;

        const newRequests = (myData.friendRequests || []).filter(r => r.fromId !== requesterId);
        const newSentRequests = (reqData.sentRequests || []).filter(id => id !== currentUser.id);

        if (accept) {
            const newFriendForMe: Friend = {
                id: requesterId,
                name: reqData.name,
                uniqueId: reqData.uniqueId || reqData.referralCode || 'UNKNOWN',
                referralCode: reqData.referralCode,
                level: reqData.level,
                status: 'online'
            };
            const newFriendForThem: Friend = {
                id: currentUser.id,
                name: myData.name,
                uniqueId: myData.uniqueId || myData.referralCode || 'UNKNOWN',
                referralCode: myData.referralCode,
                level: myData.level,
                status: 'online'
            };

            transaction.update(myRef, {
                friendRequests: newRequests,
                friends: [...(myData.friends || []), newFriendForMe]
            });
            transaction.update(requesterRef, {
                sentRequests: newSentRequests,
                friends: [...(reqData.friends || []), newFriendForThem]
            });
        } else {
            transaction.update(myRef, { friendRequests: newRequests });
            transaction.update(requesterRef, { sentRequests: newSentRequests });
        }
    });
};

export const transferCreditsTx = async (sender: User, recipientId: string, amount: number) => {
    const txId = `TX-${Date.now()}`;
    await runTransaction(db, async (transaction) => {
        const senderRef = doc(db, "users", sender.id);
        const receiverRef = doc(db, "users", recipientId);

        const senderDoc = await transaction.get(senderRef);
        const receiverDoc = await transaction.get(receiverRef);

        if (!receiverDoc.exists()) throw new Error("Recipient not found");

        const newSenderBalance = senderDoc.data().balance - amount;
        if (newSenderBalance < 0) throw new Error("Insufficient funds");

        const newReceiverBalance = receiverDoc.data().balance + amount;

        const txOut: Transaction = {
            id: `${txId}-OUT`,
            type: 'transfer_out',
            description: `TRANSFER TO ${receiverDoc.data().name.toUpperCase()}`,
            amount: -amount,
            date: new Date().toISOString()
        };

        const txIn: Transaction = {
            id: `${txId}-IN`,
            type: 'transfer_in',
            description: `TRANSFER FROM ${sender.name.toUpperCase()}`,
            amount: amount,
            date: new Date().toISOString()
        };

        transaction.update(senderRef, { 
            balance: newSenderBalance,
            transactions: [txOut, ...(senderDoc.data().transactions || [])]
        });

        transaction.update(receiverRef, { 
            balance: newReceiverBalance,
            transactions: [txIn, ...(receiverDoc.data().transactions || [])]
        });
    });
};

export const transferItemTx = async (sender: User, recipientId: string, productId: string) => {
    await runTransaction(db, async (transaction) => {
        const senderRef = doc(db, "users", sender.id);
        const receiverRef = doc(db, "users", recipientId);
        const receiverDoc = await transaction.get(receiverRef);
        const senderDoc = await transaction.get(senderRef);

        if (!receiverDoc.exists()) throw new Error("Recipient not found");

        const currentSold = senderDoc.data().soldItems || {};
        const newSold = (currentSold[productId] || 0) + 1;

        const receivedItem = {
            id: productId,
            fromName: sender.name,
            date: new Date().toISOString()
        };

        transaction.update(senderRef, { [`soldItems.${productId}`]: newSold });
        transaction.update(receiverRef, { receivedItems: arrayUnion(receivedItem) });
    });
};

export const executePvPTradeTx = async (buyer: User, sellerId: string, productId: string, price: number) => {
    const txId = `PVP-${Date.now()}`;
    await runTransaction(db, async (transaction) => {
        const buyerRef = doc(db, 'users', buyer.id);
        const sellerRef = doc(db, 'users', sellerId);

        const buyerDoc = await transaction.get(buyerRef);
        const sellerDoc = await transaction.get(sellerRef);

        if (!sellerDoc.exists()) throw new Error("SELLER_NOT_FOUND");
        if (buyerDoc.data().balance < price) throw new Error("INSUFFICIENT_FUNDS");

        const txBuy: Transaction = {
            id: `${txId}-BUY`,
            type: 'pvp_buy',
            description: `PVP MARKET BUY: ${productId} FROM ${sellerDoc.data().name}`,
            amount: -price,
            date: new Date().toISOString()
        };

        const receivedItem = {
            id: productId,
            fromName: `PVP: ${sellerDoc.data().name}`,
            date: new Date().toISOString()
        };

        const txSell: Transaction = {
            id: `${txId}-SELL`,
            type: 'pvp_sell',
            description: `PVP MARKET SELL: ${productId} TO ${buyerDoc.data().name}`,
            amount: price,
            date: new Date().toISOString()
        };

        const currentSellerSold = sellerDoc.data().soldItems || {};
        const newSellerSold = (currentSellerSold[productId] || 0) + 1;

        transaction.update(buyerRef, {
            balance: buyerDoc.data().balance - price,
            transactions: [txBuy, ...(buyerDoc.data().transactions || [])],
            receivedItems: arrayUnion(receivedItem)
        });

        transaction.update(sellerRef, {
            balance: sellerDoc.data().balance + price,
            transactions: [txSell, ...(sellerDoc.data().transactions || [])],
            [`soldItems.${productId}`]: newSellerSold
        });
    });
};
