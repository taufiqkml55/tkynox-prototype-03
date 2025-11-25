
import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, set, onDisconnect, serverTimestamp as rtdbTimestamp, update as rtdbUpdate } from 'firebase/database';
import { auth, db, rtdb } from '../services/firebase';
import { User, Mission, Order, Transaction, RewardEntry } from '../types';
import { audioSystem } from '../services/audioSystem';
import { useMining } from './useMining';
import * as txService from '../services/userTransactionService';

export const useUserSystem = (
    localizedMissions: Mission[],
    showNotification: (msg: string) => void,
    orders: Order[],
    cryptoMarket: Record<string, { price: number }>
) => {
    const [user, setUser] = useState<User | null>(null);
    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Auth Listener & Data Loading
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userRef = doc(db, 'users', currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        const data = userSnap.data() as Partial<User>;
                        
                        // SUPER ADMIN OVERRIDE
                        if (currentUser.uid === 'ukEKkHKxiIgCjA06KFZhXUn4Feh1') {
                            data.balance = Infinity;
                            data.level = 99;
                            data.xp = 999999;
                            data.name = "SYS_ADMIN"; 
                        }

                        const safeUser: User = {
                            id: currentUser.uid,
                            name: data.name || currentUser.displayName || 'OPERATIVE',
                            email: data.email || currentUser.email || '',
                            balance: typeof data.balance === 'number' ? data.balance : 0,
                            cryptoBalance: data.cryptoBalance || 0,
                            cryptoPortfolio: data.cryptoPortfolio || { 'TKNX': 0 },
                            level: data.level || 1,
                            xp: data.xp || 0,
                            completedMissions: data.completedMissions || [],
                            claimedMissions: data.claimedMissions || [],
                            uniqueId: data.uniqueId || `TX-${currentUser.uid.substring(0,6).toUpperCase()}`,
                            referralCode: data.referralCode || `TX-${currentUser.uid.substring(0,4).toUpperCase()}`,
                            soldItems: data.soldItems || {},
                            receivedItems: data.receivedItems || [],
                            rewardHistory: data.rewardHistory || [],
                            transactions: data.transactions || [],
                            miningStats: data.miningStats || { totalMined: 0, lastHashrate: 0 },
                            friends: data.friends || [],
                            friendRequests: data.friendRequests || [],
                            sentRequests: data.sentRequests || [],
                            lastLoginDate: data.lastLoginDate
                        };

                        // PATCH: Check if we need to update the database with new fields
                        const patches: Partial<User> = {};
                        if (!data.uniqueId) patches.uniqueId = safeUser.uniqueId;
                        if (!data.referralCode) patches.referralCode = safeUser.referralCode;
                        if (!data.friends) patches.friends = [];
                        if (!data.friendRequests) patches.friendRequests = [];
                        if (!data.sentRequests) patches.sentRequests = [];
                        if (!data.soldItems) patches.soldItems = {};
                        
                        if (Object.keys(patches).length > 0) {
                            await setDoc(userRef, patches, { merge: true });
                        }

                        setUser(safeUser);

                        // Sync Presence to Realtime Database
                        const presenceRef = ref(rtdb, `players/${currentUser.uid}`);
                        set(presenceRef, {
                            name: safeUser.name,
                            uniqueId: safeUser.uniqueId,
                            level: safeUser.level,
                            status: 'online',
                            lastSeen: Date.now()
                        });
                        onDisconnect(presenceRef).update({
                            status: 'offline',
                            lastSeen: rtdbTimestamp()
                        });

                    } else {
                        const isAdmin = currentUser.uid === 'ukEKkHKxiIgCjA06KFZhXUn4Feh1';
                        const newUser: User = {
                            id: currentUser.uid,
                            name: isAdmin ? 'SYS_ADMIN' : (currentUser.displayName || 'OPERATIVE'),
                            email: currentUser.email || '',
                            balance: isAdmin ? Infinity : 0,
                            cryptoBalance: 0, 
                            cryptoPortfolio: { 'TKNX': 0 },
                            level: isAdmin ? 99 : 1,
                            xp: isAdmin ? 999999 : 0,
                            completedMissions: [],
                            claimedMissions: [],
                            uniqueId: `TX-${currentUser.uid.substring(0,6).toUpperCase()}`,
                            referralCode: `TX-${currentUser.uid.substring(0,4).toUpperCase()}`,
                            soldItems: {},
                            receivedItems: [],
                            rewardHistory: [],
                            transactions: [],
                            miningStats: { totalMined: 0, lastHashrate: 0 },
                            friends: [],
                            friendRequests: [],
                            sentRequests: []
                        };
                        await setDoc(userRef, newUser);
                        setUser(newUser);

                        // Sync Presence for New User
                        const presenceRef = ref(rtdb, `players/${currentUser.uid}`);
                        set(presenceRef, {
                            name: newUser.name,
                            uniqueId: newUser.uniqueId,
                            level: newUser.level,
                            status: 'online',
                            lastSeen: Date.now()
                        });
                        onDisconnect(presenceRef).update({
                            status: 'offline',
                            lastSeen: rtdbTimestamp()
                        });
                    }
                } catch (error) {
                    console.error("Failed to load user data:", error);
                }
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Real-time Listener (Social & Transactions)
    useEffect(() => {
        if (!user?.id || user.id === 'ADMIN') return;

        const unsubscribe = onSnapshot(doc(db, 'users', user.id), (docSnap) => {
            if (docSnap.exists()) {
                const serverData = docSnap.data() as Partial<User>;
                
                setUser(prev => {
                    if (!prev) return null;
                    
                    const updates: Partial<User> = {};
                    let hasUpdates = false;

                    // 1. Social Checks
                    const serverRequests = JSON.stringify(serverData.friendRequests || []);
                    const localRequests = JSON.stringify(prev.friendRequests || []);
                    if (serverRequests !== localRequests) {
                        updates.friendRequests = serverData.friendRequests || [];
                        hasUpdates = true;
                    }

                    const serverFriends = JSON.stringify(serverData.friends || []);
                    const localFriends = JSON.stringify(prev.friends || []);
                    if (serverFriends !== localFriends) {
                        updates.friends = serverData.friends || [];
                        hasUpdates = true;
                    }

                    const serverSent = JSON.stringify(serverData.sentRequests || []);
                    const localSent = JSON.stringify(prev.sentRequests || []);
                    if (serverSent !== localSent) {
                        updates.sentRequests = serverData.sentRequests || [];
                        hasUpdates = true;
                    }

                    // 2. Transaction & Balance Checks
                    const serverTx = serverData.transactions || [];
                    const localTx = prev.transactions || [];
                    const serverLatestId = serverTx.length > 0 ? serverTx[0].id : '';
                    const isServerNewTxKnown = localTx.some(tx => tx.id === serverLatestId);

                    if ((!isServerNewTxKnown && serverTx.length > 0) || serverTx.length > localTx.length) {
                        if (prev.id === 'ukEKkHKxiIgCjA06KFZhXUn4Feh1') {
                            updates.balance = Infinity;
                        } else {
                            updates.balance = serverData.balance ?? prev.balance;
                        }
                        updates.transactions = serverTx;
                        hasUpdates = true;

                        if (serverTx[0] && (serverTx[0].type === 'transfer_in' || serverTx[0].type === 'pvp_sell')) {
                            audioSystem.playSuccess(); 
                        }
                    }

                    // 3. Received Items Checks
                    const serverItems = serverData.receivedItems || [];
                    const localItems = prev.receivedItems || [];
                    if (serverItems.length !== localItems.length) {
                        updates.receivedItems = serverItems;
                        hasUpdates = true;
                        if (serverItems.length > localItems.length) {
                            audioSystem.playNotification();
                        }
                    }

                    // 4. Sold Items Check
                    if (JSON.stringify(serverData.soldItems) !== JSON.stringify(prev.soldItems)) {
                        updates.soldItems = serverData.soldItems || {};
                        hasUpdates = true;
                    }

                    if (hasUpdates) {
                        return { ...prev, ...updates };
                    }
                    return prev;
                });
            }
        });

        return () => unsubscribe();
    }, [user?.id]);

    // Auto-Save Progress & Sync Public Inventory
    useEffect(() => {
        if (!user) return;
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(async () => {
            if (user.id === 'ADMIN') return;
            try {
                const userRef = doc(db, 'users', user.id);
                const { friends, friendRequests, sentRequests, transactions, receivedItems, ...safeUser } = user;
                
                if (safeUser.balance === Infinity) safeUser.balance = 999999999;

                await setDoc(userRef, safeUser, { merge: true });

                const ownedIds: string[] = [];
                const purchasedCounts: Record<string, number> = {};
                
                orders.forEach(o => o.items.forEach(i => {
                    purchasedCounts[i.id] = (purchasedCounts[i.id] || 0) + (i.quantity || 1);
                }));

                user.receivedItems?.forEach(i => {
                    purchasedCounts[i.id] = (purchasedCounts[i.id] || 0) + 1;
                });

                Object.keys(purchasedCounts).forEach(id => {
                    const sold = user.soldItems[id] || 0;
                    const count = purchasedCounts[id] - sold;
                    if (count > 0) ownedIds.push(id);
                });

                const rtdbRef = ref(rtdb, `players/${user.id}`);
                await rtdbUpdate(rtdbRef, { publicInventory: ownedIds });

            } catch (err) {
                console.error("Auto-save failed:", err);
            }
        }, 2000);

        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        };
    }, [user, orders]);

    // Initialize Mining Hook
    useMining(user, setUser, orders, cryptoMarket);

    const handleAdminLogin = () => {
        setUser({
            id: 'ADMIN',
            name: 'ADMINISTRATOR',
            email: 'admin@tkynox.io',
            balance: Infinity,
            cryptoBalance: 0,
            cryptoPortfolio: { 'TKNX': 0 },
            level: 99,
            xp: 999999,
            completedMissions: [],
            claimedMissions: [],
            uniqueId: 'TX-ADMIN',
            referralCode: 'ADMIN-KEY',
            soldItems: {},
            receivedItems: [],
            rewardHistory: [],
            transactions: [],
            miningStats: { totalMined: 99999, lastHashrate: 9999 },
            friends: [],
            friendRequests: [],
            sentRequests: []
        });
    };

    const handleLogout = async () => {
        if (user && user.id !== 'ADMIN') {
            const presenceRef = ref(rtdb, `players/${user.id}`);
            await rtdbUpdate(presenceRef, { status: 'offline' });
        }
        await signOut(auth);
        setUser(null);
        audioSystem.playClick();
    };

    // --- ACTIONS ---

    const updateProfileName = async (newName: string) => {
        if (!user) return;
        setUser(prev => prev ? ({ ...prev, name: newName }) : null);
        if (user.id === 'ADMIN') return;
        try {
            await txService.updateProfileNameTx(user.id, newName);
        } catch (error) {
            console.error("Error updating name:", error);
            showNotification("ERROR: UPDATE FAILED");
        }
    };

    const sendFriendRequest = async (targetCode: string, targetId?: string) => {
        if (!user || user.id === 'ADMIN') return;
        try {
            await txService.sendFriendRequestTx(user, targetCode, targetId);
            showNotification("SIGNAL TRANSMITTED");
            audioSystem.playSuccess();
        } catch (e: any) {
            console.error("Friend request failed", e);
            if (e.message === 'SELF_ADD') showNotification("ERROR: CANNOT ADD SELF");
            else if (e.message === 'ALREADY_FRIENDS') showNotification("ALREADY CONNECTED");
            else if (e.message === 'ALREADY_PENDING') showNotification("REQUEST ALREADY PENDING");
            else if (e.message === 'NOT_FOUND') showNotification("ERROR: TARGET NOT FOUND");
            else showNotification("TRANSMISSION ERROR");
            audioSystem.playError();
        }
    };

    const respondToFriendRequest = async (requesterId: string, accept: boolean) => {
        if (!user || user.id === 'ADMIN') return;
        try {
            await txService.respondToFriendRequestTx(user, requesterId, accept);
            if (accept) showNotification("CONNECTION ESTABLISHED");
            else showNotification("SIGNAL BLOCKED");
            audioSystem.playClick();
        } catch (e) {
            console.error("Response failed", e);
            showNotification("ERROR PROCESSING REQUEST");
        }
    };

    const transferCredits = async (recipientId: string, amount: number) => {
        if (!user || user.id === 'ADMIN' || amount <= 0) return;
        if (user.balance < amount) {
            showNotification("INSUFFICIENT FUNDS");
            audioSystem.playError();
            return;
        }
        try {
            await txService.transferCreditsTx(user, recipientId, amount);
            // Optimistic local update is tricky because we rely on snapshot listener, 
            // but we can subtract immediately to prevent double spend.
            setUser(prev => prev ? { ...prev, balance: prev.balance - amount } : null);
            updateUserBalance(-amount, `TRANSFER TO OPERATIVE`, 'transfer_out');
            showNotification(`SENT $${amount.toFixed(2)} SECURELY`);
            audioSystem.playSuccess();
        } catch (e) {
            console.error("Transfer failed", e);
            showNotification("TRANSFER FAILED: NETWORK ERROR");
            audioSystem.playError();
        }
    };

    const transferItem = async (recipientId: string, productId: string) => {
        if (!user || user.id === 'ADMIN') return;
        try {
            await txService.transferItemTx(user, recipientId, productId);
            setUser(prev => {
                if (!prev) return null;
                const currentSold = prev.soldItems[productId] || 0;
                return {
                    ...prev,
                    soldItems: { ...prev.soldItems, [productId]: currentSold + 1 }
                }
            });
            showNotification("ASSET TRANSFERRED SUCCESSFULLY");
            audioSystem.playSuccess();
        } catch (e) {
            console.error("Item transfer failed", e);
            showNotification("TRANSFER FAILED");
            audioSystem.playError();
        }
    };

    const executePvPTrade = async (sellerId: string, productId: string, price: number) => {
        if (!user || user.id === 'ADMIN') return;
        try {
            await txService.executePvPTradeTx(user, sellerId, productId, price);
            // Optimistic update handled by snapshot mostly, but we can set received items locally
            setUser(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    balance: prev.balance - price,
                    receivedItems: [...(prev.receivedItems || []), {
                        id: productId,
                        fromName: "PVP MARKET",
                        date: new Date().toISOString()
                    }]
                }
            });
        } catch (e: any) {
            console.error("PvP Trade Error", e);
            if (e.message === 'INSUFFICIENT_FUNDS') throw new Error("INSUFFICIENT_FUNDS");
            else throw e;
        }
    };

    // --- HELPERS ---

    const checkMission = (actionId: string) => {
        if (!user) return;
        const mission = localizedMissions.find(m => m.actionId === actionId);
        if (!mission) return;

        if (!user.completedMissions.includes(mission.id)) {
            if (mission.type === 'daily') {
               const today = new Date().toISOString().split('T')[0];
               if (user.lastLoginDate === today) return;
               setUser(prev => prev ? ({ ...prev, lastLoginDate: today }) : null);
            }

            setUser(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    completedMissions: [...prev.completedMissions, mission.id]
                };
            });
            showNotification(`MISSION COMPLETE: ${mission.title}`);
            audioSystem.playSuccess();
        }
    };

    const handleMinigameComplete = (actionId: string) => {
        const mission = localizedMissions.find(m => m.actionId === actionId);
        if (!mission) return;
  
        setUser(prev => {
            if (!prev) return null;
            const newXp = prev.xp + mission.xp;
            const newLevel = 1 + Math.floor(newXp / 1000);
            const leveledUp = newLevel > prev.level;
  
            if (leveledUp) {
                setTimeout(() => {
                    showNotification(`PROMOTION: LEVEL ${newLevel} ACHIEVED`);
                    audioSystem.playSuccess();
                }, 3500);
            }

            const newTransaction: Transaction = {
                id: `TX-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                type: 'reward',
                description: `REWARD: ${mission.title}`,
                amount: mission.reward,
                date: new Date().toISOString()
            };

            const newRewardEntry: RewardEntry = {
                id: `REW-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                source: mission.title,
                amount: mission.reward,
                xp: mission.xp,
                date: new Date().toISOString()
            };
  
            return {
                ...prev,
                balance: prev.balance + mission.reward,
                xp: newXp,
                level: newLevel,
                rewardHistory: [newRewardEntry, ...(prev.rewardHistory || [])],
                transactions: [newTransaction, ...(prev.transactions || [])]
            };
        });
        audioSystem.playSuccess();
        showNotification(`REWARD CREDITED: $${mission.reward.toFixed(2)}`);
    };

    const handleClaimReward = (missionId: string) => {
        const mission = localizedMissions.find(m => m.id === missionId);
        if (!mission) return;
  
        setUser(prev => {
            if (!prev) return null;
            if (prev.claimedMissions.includes(missionId) && mission.type !== 'infinite') return prev;

            let newCompleted = prev.completedMissions;
            if (mission.type === 'infinite') {
                newCompleted = prev.completedMissions.filter(id => id !== missionId);
            }
  
            const newXp = prev.xp + mission.xp;
            const newLevel = 1 + Math.floor(newXp / 1000);
            const leveledUp = newLevel > prev.level;
  
            if (leveledUp) {
                setTimeout(() => {
                    showNotification(`PROMOTION: LEVEL ${newLevel} ACHIEVED`);
                    audioSystem.playSuccess();
                }, 1000);
            }

            const newTransaction: Transaction = {
                id: `TX-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                type: 'reward',
                description: `REWARD: ${mission.title}`,
                amount: mission.reward,
                date: new Date().toISOString()
            };

            const newRewardEntry: RewardEntry = {
                id: `REW-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                source: mission.title,
                amount: mission.reward,
                xp: mission.xp,
                date: new Date().toISOString()
            };
  
            return {
                ...prev,
                balance: prev.balance + mission.reward,
                xp: newXp,
                level: newLevel,
                completedMissions: newCompleted,
                claimedMissions: mission.type === 'infinite' ? prev.claimedMissions : [...prev.claimedMissions, missionId],
                rewardHistory: [newRewardEntry, ...(prev.rewardHistory || [])],
                transactions: [newTransaction, ...(prev.transactions || [])]
            };
        });
        if (!user?.claimedMissions.includes(missionId) || mission.type === 'infinite') {
             audioSystem.playSuccess();
        }
    };

    const updateUserBalance = (amount: number, description: string, type: 'purchase' | 'sale' | 'trade' | 'transfer_out') => {
        setUser(prev => {
            if (!prev) return null;
            return {
                ...prev,
                balance: prev.balance + amount,
                transactions: [
                    {
                        id: `TX-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                        type,
                        description,
                        amount,
                        date: new Date().toISOString()
                    },
                    ...(prev.transactions || [])
                ]
            }
        });
    };

    const updateUserCrypto = (symbol: string, amount: number) => {
        setUser(prev => {
            if (!prev) return null;
            const newPortfolio = { ...prev.cryptoPortfolio };
            newPortfolio[symbol] = (newPortfolio[symbol] || 0) + amount;
            return {
                ...prev,
                cryptoBalance: symbol === 'TKNX' ? newPortfolio['TKNX'] : prev.cryptoBalance,
                cryptoPortfolio: newPortfolio
            };
        });
    };

    return {
        user,
        setUser,
        handleAdminLogin,
        handleLogout,
        checkMission,
        handleMinigameComplete,
        handleClaimReward,
        updateUserBalance,
        updateUserCrypto,
        updateProfileName,
        sendFriendRequest,
        respondToFriendRequest,
        transferCredits,
        transferItem,
        executePvPTrade
    };
};
