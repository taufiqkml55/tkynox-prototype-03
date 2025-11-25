
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export type Rarity = 'Basic' | 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type Language = string;
export type ProfileTab = 'status' | 'inventory' | 'missions' | 'archives' | 'history' | 'mining' | 'friends';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number;
  category: 'Digital' | 'Physical' | 'Sustenance' | 'Course' | 'Apparel' | 'Subscription' | 'Mining' | 'EdTech' | 'Fintech' | 'Wellness' | 'Automation' | 'Templates' | 'Security';
  rarity: Rarity;
  imageUrl: string;
  illustration: string; // SVG Path Data
  gallery?: string[];
  features: string[];
  isSubscription?: boolean;
  billingCycle?: 'monthly' | 'yearly';
  hashrate?: number; // TH/s for mining items
  quantity?: number; // Quantity in cart/order
  maxStock?: number; // Maximum/Initial stock level
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    interval: 'monthly' | 'yearly';
    features: string[];
}

export interface JournalSection {
    heading: string;
    items: string[];
}

export interface JournalArticle {
  id: number;
  version: string; // e.g., V.2.4
  title: string;
  date: string;
  excerpt: string;
  image: string; // Keep for backwards compat or hero
  content?: React.ReactNode; // Optional legacy content
  sections?: JournalSection[]; // New structured content
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export interface Mission {
    id: string;
    actionId: string; // Event trigger identifier
    title: string;
    description: string;
    reward: number; // Currency in USD
    xp: number; // Experience
    icon: string;
    type: 'one-time' | 'daily' | 'infinite';
    target?: number; // For progress tracking (e.g. Buy 5 items)
}

export interface RewardEntry {
    id: string;
    source: string; // Mission Title or "Level Up"
    amount: number;
    xp: number;
    date: string; // ISO timestamp
}

export interface Transaction {
    id: string;
    type: 'purchase' | 'sale' | 'reward' | 'trade' | 'adjustment' | 'transfer_in' | 'transfer_out' | 'pvp_buy' | 'pvp_sell';
    description: string;
    amount: number; // Positive for income, negative for expense
    date: string;
}

export interface GlobalActivity {
    type: 'PURCHASE' | 'LIQUIDATION';
    user: string;
    item: string;
    itemId: string;
    price: number;
    timestamp: any;
    isBot?: boolean;
}

export interface Friend {
    id: string; // Database UID
    uniqueId: string; // New Unique ID
    referralCode?: string; // Legacy ID support
    name: string;
    level: number;
    status: 'online' | 'offline' | 'mission';
    publicInventory?: string[]; // IDs of items owned
}

export interface FriendRequest {
    fromId: string;
    fromName: string;
    fromCode: string; // Stores uniqueId now
    date: string;
}

export interface ReceivedItem {
    id: string; // Product ID
    fromName: string;
    date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number; // USD
  cryptoBalance: number; // Legacy field for TKNX display, sync with portfolio['TKNX']
  cryptoPortfolio: Record<string, number>; // Symbol -> Amount (e.g., { BTC: 0.5, TKNX: 100 })
  level: number;
  xp: number;
  completedMissions: string[]; // IDs of missions where task is done
  claimedMissions: string[]; // IDs of missions where reward is collected
  lastLoginDate?: string; // YYYY-MM-DD for daily check-in
  uniqueId?: string; // New dedicated ID field (TX-XXXXXX)
  referralCode?: string; // Legacy field
  soldItems: Record<string, number>; // ProductID -> Quantity Sold (or transferred out)
  receivedItems?: ReceivedItem[]; // Items gifted from friends
  rewardHistory: RewardEntry[];
  transactions: Transaction[]; // Comprehensive balance history
  miningStats?: {
    totalMined: number; // Historical USD value for records
    lastHashrate: number; // Cached for quick display
  };
  friends?: Friend[];
  friendRequests?: FriendRequest[];
  sentRequests?: string[]; // List of User IDs we have sent requests to
}

export interface Order {
  id: string;
  ticketId: string;
  date: string;
  items: Product[];
  total: number;
  status: 'processing' | 'active' | 'archived';
  paymentMethod?: 'crypto' | 'balance';
}

export interface SystemStats {
    uptimeSeconds: number;
    activeNodes: number;
    lastUpdate: number;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle }
  | { type: 'checkout', returnToProduct?: Product, checkoutItems?: Product[] }
  | { type: 'login' }
  | { type: 'orders' }
  | { type: 'market' }
  | { type: 'profile', initialTab?: ProfileTab, scrollToId?: string }
  | { type: 'exchange' }
  | { type: 'minigame', returnTab?: ProfileTab }
  | { type: 'matchgame', returnTab?: ProfileTab }
  | { type: 'pvp_game', product: Product, targetUser: Friend, price: number }
  | { type: 'about' };
