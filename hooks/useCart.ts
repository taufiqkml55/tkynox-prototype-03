
import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Product, Order, User, ViewState } from '../types';
import { audioSystem } from '../services/audioSystem';

// Helper to remove undefined values which Firestore rejects
const sanitizeForFirestore = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj));
};

export const useCart = (
    showNotification: (msg: string) => void,
    checkMission: (actionId: string) => void,
    user: User | null,
    setView: (view: ViewState) => void
) => {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [orderHistory, setOrderHistory] = useState<Order[]>([]);
    const [pendingCheckout, setPendingCheckout] = useState(false);
    const [pendingReturnProduct, setPendingReturnProduct] = useState<Product | undefined>(undefined);
    const [pendingCheckoutItems, setPendingCheckoutItems] = useState<Product[] | undefined>(undefined);

    // Load Order History from Firestore when user logs in
    useEffect(() => {
        if (!user) {
            setOrderHistory([]); // Clear when logged out
            return;
        }
        if (user.id === 'ADMIN') return;

        const fetchOrders = async () => {
            try {
                const ref = doc(db, 'user_orders', user.id);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    if (data.orders) {
                        setOrderHistory(data.orders);
                    }
                }
            } catch (e) {
                console.error("Failed to load orders", e);
            }
        };
        fetchOrders();
    }, [user?.id]);

    // Save Order History to Firestore whenever it changes
    useEffect(() => {
        if (!user || user.id === 'ADMIN') return;
        
        const saveOrders = async () => {
            try {
                const ref = doc(db, 'user_orders', user.id);
                // Sanitize to remove 'undefined' fields which cause Firestore to crash
                const cleanOrders = sanitizeForFirestore(orderHistory);
                await setDoc(ref, { orders: cleanOrders }, { merge: true });
            } catch (e) {
                console.error("Failed to save orders", e);
            }
        };

        // Always save if we have a user, even if empty (to clear)
        saveOrders();
    }, [orderHistory, user?.id]);

    const addToCart = (product: Product) => {
        setCartItems(prev => {
            const existing = prev.find(p => p.id === product.id);
            if (existing) {
                return prev.map(p => p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        
        // Do not open cart automatically, just notify
        audioSystem.playNotification();
        showNotification(`${product.name} ADDED TO QUEUE`);
        checkMission('add_to_cart');
    };

    const removeFromCart = (index: number) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
        audioSystem.playClick();
    };

    const updateCartQuantity = (index: number, delta: number) => {
        setCartItems(prev => prev.map((item, i) => {
            if (i === index) {
                const newQty = Math.max(1, (item.quantity || 1) + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleBuyNow = (product: Product) => {
        // Do not modify cartItems, just proceed to checkout with specific item
        handleCheckout(product, [{ ...product, quantity: 1 }]);
    };

    const handleCheckout = (returnProduct?: Product, specificItems?: Product[]) => {
        if (!user) {
            setPendingCheckout(true);
            setPendingReturnProduct(returnProduct);
            setPendingCheckoutItems(specificItems);
            setView({ type: 'login' });
        } else {
            setView({ 
                type: 'checkout', 
                returnToProduct: returnProduct,
                checkoutItems: specificItems 
            });
        }
        setIsCartOpen(false);
        audioSystem.playClick();
    };

    const placeOrder = (newOrder: Order) => {
        setOrderHistory(prev => [newOrder, ...prev]);
        setCartItems([]);
        audioSystem.playSuccess();
    };

    const recordOrder = (newOrder: Order) => {
        setOrderHistory(prev => [newOrder, ...prev]);
        audioSystem.playSuccess();
    };

    return {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        orderHistory,
        pendingCheckout,
        setPendingCheckout,
        pendingReturnProduct,
        pendingCheckoutItems,
        setPendingCheckoutItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        handleBuyNow,
        handleCheckout,
        placeOrder,
        recordOrder
    };
};
