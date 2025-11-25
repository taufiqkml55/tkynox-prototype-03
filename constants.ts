
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Rarity } from './types';

export const BRAND_NAME = 'TKYNOX';
export const PRIMARY_COLOR = 'green-500'; 
export const ACCENT_COLOR = 'black';
export const CRYPTO_SYMBOL = 'TKNX';
export const INITIAL_CRYPTO_PRICE = 12.45;
export const CRYPTO_MINING_RATE = 0.00625;

export const AVAILABLE_CRYPTOS = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', initialPrice: 64230.50, color: '#F7931A' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', initialPrice: 3450.20, color: '#627EEA' },
    { id: 'solana', symbol: 'SOL', name: 'Solana', initialPrice: 148.10, color: '#14F195' },
    { id: 'ripple', symbol: 'XRP', name: 'Ripple', initialPrice: 0.62, color: '#FFFFFF' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', initialPrice: 0.16, color: '#C2A633' },
    { id: 'tknx', symbol: 'TKNX', name: 'TKYNOX', initialPrice: 12.45, color: '#00FF41' } // Brand token
];

export const RARITY_COLORS: Record<Rarity, string> = {
    'Basic': '#A0A0A0',     // Gray
    'Common': '#00FF41',    // Brand Green
    'Rare': '#00BFFF',      // Cyan
    'Epic': '#9D00FF',      // Purple
    'Legendary': '#FFD700'  // Gold
};

// Data Exports
export * from './data/icons';
export * from './data/missions';
export * from './data/subscriptions';
export * from './data/journal';
export * from './data/products';
