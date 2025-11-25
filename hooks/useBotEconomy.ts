
import { useEffect, useRef } from 'react';
import { ref, runTransaction } from 'firebase/database';
import { rtdb } from '../services/firebase';
import { PRODUCTS } from '../constants';
import { getBaseStock } from './useMarket';
import { recordGlobalTransaction } from '../services/marketService';

const BOT_NAMES = [
    'NEXUS_AI', 'SECTOR_7_TRADER', 'CORPO_DRONE_A', 'CORPO_DRONE_B', 
    'VOID_WALKER', 'GHOST_PROTOCOL', 'ZAIBATSU_ALGO', 'NEON_DRIFTER',
    'GRID_RUNNER', 'SYS_DAEMON', 'NET_PHANTOM', 'DATA_WRAITH',
    'SILICON_SOUL', 'BIT_HUNTER', 'HASH_SLINGER', 'CYBER_NOMAD',
    'QUANTUM_TRADER', 'ZERO_DAY_BUYER', 'LOGIC_BOMB', 'SYNTH_DEALER'
];

const SCARCITY_MULTIPLIER = 1.5;
const ACTIVE_BOT_THREADS = 5; // Number of concurrent bot agents running

export const useBotEconomy = () => {
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        // Cleanup function to stop all loops
        const stopAll = () => {
            timeoutsRef.current.forEach(clearTimeout);
            timeoutsRef.current = [];
        };

        const runBotAgent = async (index: number) => {
            // High frequency: Random delay between 0.5s and 3s
            const delay = Math.floor(Math.random() * 2500) + 500;
            
            const timeoutId = setTimeout(async () => {
                try {
                    // 1. Select Random Identity & Target
                    const botName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
                    const product = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
                    
                    // 2. Decide Action (55% Buy, 45% Sell for slight inflation/demand bias)
                    const action = Math.random() > 0.45 ? 'BUY' : 'SELL';
                    
                    // 3. Execute Transaction on Realtime DB
                    const itemRef = ref(rtdb, `inventory/${product.id}`);
                    const priceRef = ref(rtdb, `market_prices/${product.id}`);

                    const maxStock = product.maxStock || getBaseStock(product.rarity);

                    // Use transaction to ensure atomic stock updates
                    await runTransaction(itemRef, (currentStock) => {
                        // Initialize if null
                        if (currentStock === null) return maxStock;

                        if (action === 'BUY') {
                            if (currentStock > 0) return currentStock - 1;
                            return; // Abort if no stock
                        } else {
                            // Bot "Selling" adds stock back to market
                            // Optimization: Cap at maxStock * 1.5 to prevent infinite stock accumulation/price crashes
                            if (currentStock >= maxStock * 1.5) return; 
                            return currentStock + 1;
                        }
                    }).then(async (result) => {
                        if (result.committed) {
                            const newStock = result.snapshot.val();
                            
                            // 4. Recalculate Price based on new Supply/Demand
                            // Optimization: Simple linear curve, fast calculation
                            const stockRatio = Math.max(0, newStock) / maxStock;
                            const scarcityImpact = SCARCITY_MULTIPLIER * (1 - stockRatio);
                            const newPrice = Math.max(product.price * 0.01, product.price * (1 + scarcityImpact));

                            // Update Price (Fire & Forget to keep UI snappy, let Firebase handle consistency)
                            runTransaction(priceRef, () => newPrice).catch(console.error);

                            // 5. Record Transaction via Service
                            await recordGlobalTransaction(
                                action === 'BUY' ? 'PURCHASE' : 'LIQUIDATION',
                                botName,
                                product.name,
                                product.id,
                                newPrice,
                                true
                            );
                        }
                    });

                } catch (e) {
                    // Silent fail for bot errors to not clutter console during high freq ops
                }

                // Keep the loop going for this agent
                runBotAgent(index);
            }, delay);

            timeoutsRef.current[index] = timeoutId;
        };

        // Initialize multiple independent bot agents
        for (let i = 0; i < ACTIVE_BOT_THREADS; i++) {
            // Stagger initialization to prevent "thundering herd" network spikes at load
            setTimeout(() => runBotAgent(i), i * 300);
        }

        return stopAll;
    }, []);
};
