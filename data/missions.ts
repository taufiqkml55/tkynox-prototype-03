
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { Mission } from '../types';

export const MISSIONS: Mission[] = [
    // --- DAILY ---
    {
        id: 'm-daily-login',
        actionId: 'daily_checkin',
        title: 'Daily Handshake',
        description: 'Log into the mainframe to maintain connection stability.',
        reward: 2.50, 
        xp: 250,
        icon: '📅',
        type: 'daily'
    },
    {
        id: 'm-daily-market',
        actionId: 'view_market',
        title: 'Market Watcher',
        description: 'Analyze global market trends in the Market Overview.',
        reward: 3.00,
        xp: 150,
        icon: '📈',
        type: 'daily'
    },

    // --- MINIGAMES ---
    {
        id: 'm-hack',
        actionId: 'complete_hack',
        title: 'System Override',
        description: 'Complete the security sequence to mine crypto data.',
        reward: 5.00,
        xp: 150,
        icon: '🔓',
        type: 'infinite'
    },
    {
        id: 'm-match',
        actionId: 'play_match_game',
        title: 'Memory Sync',
        description: 'Calibrate neural pathways by completing the Memory Sync game.',
        reward: 10.00,
        xp: 300,
        icon: '🧠',
        type: 'infinite'
    },

    // --- CRYPTO MISSIONS ---
    {
        id: 'm-crypto-first',
        actionId: 'trade_crypto',
        title: 'First Exchange',
        description: 'Execute a buy or sell order on the Crypto Exchange.',
        reward: 10.00,
        xp: 500,
        icon: '💱',
        type: 'one-time'
    },
    {
        id: 'm-crypto-div',
        actionId: 'own_3_crypto',
        title: 'Diversification',
        description: 'Hold a positive balance in 3 distinct cryptocurrencies.',
        reward: 25.00,
        xp: 1200,
        icon: '📊',
        type: 'one-time'
    },

    // --- ONBOARDING / GENERAL ---
    {
        id: 'm-init',
        actionId: 'login_first',
        title: 'Identity Verified',
        description: 'Establish a secure connection to the shop for the first time.',
        reward: 12.50, 
        xp: 500,
        icon: '🔌',
        type: 'one-time'
    },
    {
        id: 'm-crypto-view',
        actionId: 'view_exchange',
        title: 'Crypto Analyst',
        description: 'Access the dedicated Crypto Exchange terminal.',
        reward: 5.00,
        xp: 200,
        icon: '₿',
        type: 'one-time'
    },
    {
        id: 'm-referral',
        actionId: 'invite_friend',
        title: 'Recruit Operative',
        description: 'Share your referral code to expand the network.',
        reward: 7.50,
        xp: 375,
        icon: '🤝',
        type: 'one-time'
    },
    {
        id: 'm-scout',
        actionId: 'view_product',
        title: 'Reconnaissance',
        description: 'Analyze the specs of any item in the inventory.',
        reward: 2.50,
        xp: 125,
        icon: '👁️',
        type: 'one-time'
    },
    {
        id: 'm-security-check',
        actionId: 'view_security_product',
        title: 'Security Audit',
        description: 'Inspect specifications of a Security category product.',
        reward: 5.00,
        xp: 200,
        icon: '🛡️',
        type: 'one-time'
    },
    {
        id: 'm-intel',
        actionId: 'view_journal',
        title: 'Intel Gathering',
        description: 'Access the System Logs (Journal) to improve knowledge base.',
        reward: 2.50, 
        xp: 150,
        icon: '💾',
        type: 'one-time'
    },
    {
        id: 'm-cart',
        actionId: 'add_to_cart',
        title: 'Resource Acquisition',
        description: 'Add an item to your supply crate.',
        reward: 2.50,
        xp: 75,
        icon: '📥',
        type: 'one-time'
    },
    {
        id: 'm-sub',
        actionId: 'view_subscription',
        title: 'Neural Link Check',
        description: 'Review the unlimited access protocols.',
        reward: 2.50,
        xp: 75,
        icon: '🧠',
        type: 'one-time'
    },
    
    // --- SHOPPING MILESTONES ---
    {
        id: 'm-automation',
        actionId: 'buy_automation',
        title: 'Automator',
        description: 'Purchase any item from the Automation category.',
        reward: 15.00,
        xp: 500,
        icon: '🤖',
        type: 'one-time'
    },
    {
        id: 'm-big-spender',
        actionId: 'spend_500',
        title: 'Whale Alert',
        description: 'Complete a single order totaling over $500 USD.',
        reward: 50.00,
        xp: 2000,
        icon: '🐋',
        type: 'one-time'
    },
    {
        id: 'm-collector-5',
        actionId: 'own_5_unique',
        title: 'Collector I',
        description: 'Own 5 unique types of items in your inventory.',
        reward: 20.00,
        xp: 1000,
        icon: '🎒',
        type: 'one-time'
    },
    {
        id: 'm-buy-2',
        actionId: 'buy_milestone_2',
        title: 'Acquisition Phase I',
        description: 'Purchase a total of 2 Items.',
        reward: 10.00,
        xp: 1000,
        icon: '📦',
        type: 'one-time',
        target: 2
    },
    {
        id: 'm-buy-4',
        actionId: 'buy_milestone_4',
        title: 'Acquisition Phase II',
        description: 'Purchase a total of 4 Items.',
        reward: 17.50,
        xp: 1750,
        icon: '📦',
        type: 'one-time',
        target: 4
    },
    {
        id: 'm-buy-6',
        actionId: 'buy_milestone_6',
        title: 'Acquisition Phase III',
        description: 'Purchase a total of 6 Items.',
        reward: 22.50,
        xp: 2500,
        icon: '📦',
        type: 'one-time',
        target: 6
    },
    {
        id: 'm-buy-8',
        actionId: 'buy_milestone_8',
        title: 'Acquisition Phase IV',
        description: 'Purchase a total of 8 Items.',
        reward: 25.00,
        xp: 3750,
        icon: '👑',
        type: 'one-time',
        target: 8
    }
];
