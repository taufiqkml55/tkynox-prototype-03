
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { useEffect } from 'react';
import { User, Order } from '../types';
import { PRODUCTS, CRYPTO_MINING_RATE } from '../constants';

export const useMining = (
    user: User | null, 
    setUser: React.Dispatch<React.SetStateAction<User | null>>, 
    orders: Order[], 
    cryptoMarket: Record<string, { price: number }>
) => {
    useEffect(() => {
        if (!user) return;
        const interval = setInterval(() => {
            setUser(prevUser => {
                if (!prevUser) return null;
                let hRate = 0;
                const bought: Record<string, number> = {};
                
                orders.forEach(o => o.items.forEach(i => {
                    if (i.category === 'Mining') {
                        bought[i.id] = (bought[i.id] || 0) + (i.quantity || 1);
                    }
                }));
                
                Object.entries(bought).forEach(([id, count]) => {
                    const sold = prevUser.soldItems[id] || 0;
                    const owned = Math.max(0, count - sold);
                    const prod = PRODUCTS.find(p => p.id === id);
                    if (owned > 0 && prod?.hashrate) {
                        hRate += prod.hashrate * owned;
                    }
                });
  
                prevUser.receivedItems?.forEach(item => {
                    const prod = PRODUCTS.find(p => p.id === item.id);
                    if (prod?.category === 'Mining' && prod?.hashrate) {
                        hRate += prod.hashrate;
                    }
                });

                const minedAmount = hRate * CRYPTO_MINING_RATE;
                
                if (minedAmount > 0 || hRate !== prevUser.miningStats?.lastHashrate) {
                    const newPortfolio = { ...prevUser.cryptoPortfolio };
                    newPortfolio['TKNX'] = (newPortfolio['TKNX'] || 0) + minedAmount;
                    
                    return {
                        ...prevUser,
                        cryptoBalance: newPortfolio['TKNX'],
                        cryptoPortfolio: newPortfolio,
                        miningStats: {
                            totalMined: (prevUser.miningStats?.totalMined || 0) + (minedAmount * (cryptoMarket['TKNX']?.price || 12.45)),
                            lastHashrate: hRate
                        }
                    };
                }
                return prevUser;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [user?.id, orders, cryptoMarket, setUser]);
};
