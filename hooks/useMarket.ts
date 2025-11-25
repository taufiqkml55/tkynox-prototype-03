
import { useState, useEffect, useRef } from 'react';
import { ref, onValue, update, runTransaction, set } from 'firebase/database';
import { rtdb } from '../services/firebase';
import { PRODUCTS, AVAILABLE_CRYPTOS } from '../constants';
import { SystemStats, Product } from '../types';

export const getBaseStock = (rarity: string) => {
    switch(rarity) {
      case 'Legendary': return 20;
      case 'Epic': return 40;
      case 'Rare': return 60;
      case 'Common': return 80;
      default: return 100;
    }
};

export const useMarket = () => {
    const [marketPrices, setMarketPrices] = useState<Record<string, number>>({});
    const [marketHistory, setMarketHistory] = useState<Record<string, number[]>>({});
    const [stockLevels, setStockLevels] = useState<Record<string, number>>({});
    const [systemStats, setSystemStats] = useState<SystemStats>({ uptimeSeconds: 0, activeNodes: 0, lastUpdate: 0 });

    // Crypto is still simulated locally for now
    const [cryptoMarket, setCryptoMarket] = useState<Record<string, { price: number, history: number[] }>>(() => {
        const initialMarket: Record<string, { price: number, history: number[] }> = {};
        AVAILABLE_CRYPTOS.forEach(coin => {
            initialMarket[coin.symbol] = {
                price: coin.initialPrice,
                history: Array(30).fill(coin.initialPrice)
            };
        });
        return initialMarket;
    });

    const isSeedingRef = useRef(false);
    const pricesRef = useRef<Record<string, number>>({});

    // Keep ref updated for the history interval
    useEffect(() => {
        pricesRef.current = marketPrices;
    }, [marketPrices]);

    // 1. Listen to Inventory (Stock) & Prices from RTDB
    useEffect(() => {
        const inventoryRef = ref(rtdb, 'inventory');
        const pricesRefDB = ref(rtdb, 'market_prices');

        const unsubInventory = onValue(inventoryRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                setStockLevels(data);
            } else if (!isSeedingRef.current) {
                // Initialize Stock if empty
                isSeedingRef.current = true;
                const initialStock: Record<string, number> = {};
                PRODUCTS.forEach(p => {
                    initialStock[p.id] = p.maxStock || getBaseStock(p.rarity);
                });
                update(ref(rtdb, 'inventory'), initialStock);
            }
        });

        const unsubPrices = onValue(pricesRefDB, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setMarketPrices(data);
            } else {
                // Initialize Prices if empty
                const initialPrices: Record<string, number> = {};
                PRODUCTS.forEach(p => {
                    initialPrices[p.id] = p.price;
                });
                update(ref(rtdb, 'market_prices'), initialPrices);
            }
        });

        return () => {
            unsubInventory();
            unsubPrices();
        };
    }, []);

    // 2. History & Stats Simulation Loop
    useEffect(() => {
        const interval = setInterval(() => {
            // Update History based on current Realtime Prices
            const currentPrices = pricesRef.current;
            
            setMarketHistory(prevHistory => {
                const nextHistory: Record<string, number[]> = { ...prevHistory };
                PRODUCTS.forEach(p => {
                    const currentPrice = currentPrices[p.id] || p.price;
                    const history = nextHistory[p.id] || Array(20).fill(p.price);
                    // Keep last 20 points
                    nextHistory[p.id] = [...history, currentPrice].slice(-20);
                });
                return nextHistory;
            });

            // Crypto Simulation
            setCryptoMarket(prev => {
                const next = { ...prev };
                AVAILABLE_CRYPTOS.forEach(coin => {
                    const currentData = prev[coin.symbol] || { price: coin.initialPrice, history: [] };
                    const change = (Math.random() * 0.04) - 0.02; // +/- 2%
                    const newPrice = Math.max(0.01, currentData.price * (1 + change));
                    next[coin.symbol] = {
                        price: newPrice,
                        history: [...currentData.history, newPrice].slice(-30)
                    };
                });
                return next;
            });

            setSystemStats(prev => ({
                ...prev,
                uptimeSeconds: prev.uptimeSeconds + 3,
                activeNodes: Math.floor(Math.random() * 50) + 100,
                lastUpdate: Date.now()
            }));

        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Buying: Decrement Stock -> Increase Price
    const updateStock = async (items: Product[]) => {
        const promises = items.map(async (item) => {
            const itemRef = ref(rtdb, `inventory/${item.id}`);
            const priceRef = ref(rtdb, `market_prices/${item.id}`);
            const productDef = PRODUCTS.find(p => p.id === item.id);
            
            if (!productDef) return;

            const qty = item.quantity || 1;
            const maxStock = productDef.maxStock || getBaseStock(productDef.rarity);

            // 1. Decrement Stock Transactionally
            await runTransaction(itemRef, (currentStock) => {
                if (currentStock === null) return maxStock - qty;
                if (currentStock < qty) {
                    // Abort transaction if stock insufficient
                    throw new Error("Insufficient Stock");
                }
                return currentStock - qty;
            }).then((result) => {
                if (result.committed) {
                    const newStock = result.snapshot.val();
                    
                    // 2. Calculate New Price (Supply & Demand Logic)
                    const stockRatio = Math.max(0, newStock) / maxStock;
                    const scarcityImpact = 1.5 * (1 - stockRatio); // 0 to 1.5
                    const newPrice = productDef.price * (1 + scarcityImpact);
                    
                    // 3. Update Price in Firebase (Visible to all users)
                    set(priceRef, newPrice);
                }
            }).catch(err => {
                console.error("Stock Update Failed", err);
                throw err; // Re-throw to be caught by Promise.all
            });
        });

        await Promise.all(promises);
    };

    // Selling: Increment Stock -> Decrease Price
    const restockItem = async (productId: string, quantity: number) => {
        const itemRef = ref(rtdb, `inventory/${productId}`);
        const priceRef = ref(rtdb, `market_prices/${productId}`);
        const productDef = PRODUCTS.find(p => p.id === productId);
        
        if (!productDef) return;

        const maxStock = productDef.maxStock || getBaseStock(productDef.rarity);

        await runTransaction(itemRef, (currentStock) => {
            // Increment stock (returns to market)
            return (currentStock || 0) + quantity;
        }).then((result) => {
            if (result.committed) {
                const newStock = result.snapshot.val();
                
                // 2. Recalculate Price (Oversupply lowers price)
                const stockRatio = Math.max(0, newStock) / maxStock;
                // If stock > max, ratio > 1, scarcity < 0, price drops below base
                const scarcityImpact = 1.5 * (1 - stockRatio); 
                const newPrice = Math.max(0.01, productDef.price * (1 + scarcityImpact));
                
                set(priceRef, newPrice);
            }
        }).catch(err => {
            console.error("Restock Failed", err);
            throw err;
        });
    };

    return {
        marketPrices,
        marketHistory,
        stockLevels,
        cryptoMarket,
        systemStats,
        updateStock,
        restockItem
    };
};
