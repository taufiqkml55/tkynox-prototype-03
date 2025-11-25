
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useContext, useEffect } from 'react';
import { User, Mission, Order, Product, Language, Friend, ProfileTab } from '../types';
import { AVAILABLE_CRYPTOS, CRYPTO_SYMBOL } from '../constants';
import TicketDetail from './TicketDetail';
import { TranslationContext } from '../contexts/TranslationContext';
import { audioSystem } from '../services/audioSystem';

// Import Sub-components
import { StatusTab } from './profile/StatusTab';
import { InventoryTab } from './profile/InventoryTab';
import { MissionsTab } from './profile/MissionsTab';
import { MiningTab } from './profile/MiningTab';
import { FriendsTab } from './profile/FriendsTab';
import { HistoryTab } from './profile/HistoryTab';

interface UserProfileProps {
  user: User;
  missions: Mission[];
  orders: Order[];
  products: Product[]; 
  marketPrices: Record<string, number>;
  onBack: () => void;
  onInvite: () => void;
  onClaim: (missionId: string) => void;
  onSell: (productId: string) => void;
  onPlay?: (actionId: string, fromTab: ProfileTab) => void;
  onExchange?: () => void;
  onUpdateName: (name: string) => void;
  // New Props
  onSendRequest: (code: string, targetId?: string) => void;
  onRespondRequest: (id: string, accept: boolean) => void;
  onTransferCredits: (id: string, amount: number) => void;
  onTransferItem: (recipientId: string, productId: string) => void;
  language: Language;
  initialTab?: ProfileTab;
  scrollToId?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
    user, missions, orders, products, marketPrices, onBack, onInvite, onClaim, onSell, onPlay, onExchange, onUpdateName, 
    onSendRequest, onRespondRequest, onTransferCredits, onTransferItem,
    language, initialTab = 'status', scrollToId 
}) => {
    const [activeTab, setActiveTab] = useState<ProfileTab>(initialTab);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    
    // Name editing state
    const [isEditingName, setIsEditingName] = useState(false);
    const [tempName, setTempName] = useState(user.name);

    const { profile: t, common: tCommon, categories: tCats, rarities: tRare } = useContext(TranslationContext);

    // Scroll to specific section if ID provided
    useEffect(() => {
        if (scrollToId) {
            const timer = setTimeout(() => {
                const element = document.getElementById(scrollToId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [scrollToId, activeTab]);

    // Sync temp name if user changes externally
    useEffect(() => {
        if (!isEditingName) setTempName(user.name);
    }, [user.name, isEditingName]);

    const saveName = () => {
        if (tempName.trim()) {
            onUpdateName(tempName.trim());
            setIsEditingName(false);
            audioSystem.playSuccess();
        }
    };

    // Calculate Purchasing Progress for Milestones
    const totalItemsPurchased = orders.reduce((acc, order) => acc + order.items.reduce((s, i) => s + (i.quantity || 1), 0), 0);

    // Aggregate Inventory with Valuation
    const inventory = useMemo(() => {
        const itemMap = new Map<string, { product: Product, purchasedCount: number, totalCost: number }>();
        
        // 1. Process Purchased Orders
        orders.forEach(order => {
            order.items.forEach(item => {
                const qty = item.quantity || 1;
                const cost = item.price * qty;
                const localizedProduct = products.find(p => p.id === item.id) || item;

                if (itemMap.has(item.id)) {
                    const entry = itemMap.get(item.id)!;
                    entry.purchasedCount += qty;
                    entry.totalCost += cost;
                } else {
                    itemMap.set(item.id, { product: localizedProduct, purchasedCount: qty, totalCost: cost });
                }
            });
        });

        // 2. Process Received Items (Gifts)
        const received = user.receivedItems || [];
        if (received.length > 0) {
            received.forEach(item => {
                const localizedProduct = products.find(p => p.id === item.id);
                if (localizedProduct) {
                    if (itemMap.has(item.id)) {
                        const entry = itemMap.get(item.id)!;
                        entry.purchasedCount += 1;
                    } else {
                        itemMap.set(item.id, { product: localizedProduct, purchasedCount: 1, totalCost: 0 });
                    }
                }
            });
        }
        
        const inventoryList: Array<{
            product: Product, 
            count: number, 
            avgCost: number, 
            currentValue: number,
            unrealizedPL: number
        }> = [];

        itemMap.forEach((value, key) => {
            // Safety check for undefined soldItems
            const soldItems = user.soldItems || {};
            const soldCount = soldItems[key] || 0;
            const ownedCount = Math.max(0, value.purchasedCount - soldCount);
            
            if (ownedCount > 0) {
                const avgCost = value.purchasedCount > 0 ? value.totalCost / value.purchasedCount : 0;
                const marketPrice = marketPrices[key] || value.product.price;
                const currentValue = marketPrice * ownedCount;
                const costBasis = avgCost * ownedCount;
                const unrealizedPL = currentValue - costBasis;

                inventoryList.push({
                    product: value.product,
                    count: ownedCount,
                    avgCost: avgCost,
                    currentValue: currentValue,
                    unrealizedPL: unrealizedPL
                });
            }
        });
        
        return inventoryList;
    }, [orders, user.soldItems, user.receivedItems, marketPrices, products]);

    // Portfolio Stats
    const totalPortfolioValue = inventory.reduce((sum, item) => sum + item.currentValue, 0);
    const totalUnrealizedPL = inventory.reduce((sum, item) => sum + item.unrealizedPL, 0);

    // Mining Status
    const miningHardware = inventory.filter(i => i.product.category === 'Mining');
    const hasMiner = miningHardware.length > 0;
    const currentTotalHashrate = miningHardware.reduce((acc, item) => acc + ((item.product.hashrate || 0) * item.count), 0);
    
    // Crypto Portfolio - Filter non-zero balances
    const activeCryptoAssets = Object.entries(user.cryptoPortfolio || {})
        .filter(([_, amount]: [string, number]) => amount > 0.000001)
        .map(([symbol, amount]) => {
            const info = AVAILABLE_CRYPTOS.find(c => c.symbol === symbol) || { name: symbol, color: '#888' };
            return { symbol, amount, info };
        });

    // Sorted Transactions
    const sortedTransactions = useMemo(() => {
        return [...(user.transactions || [])].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, [user.transactions]);

    const handleCopyUniqueId = () => {
        const code = user.uniqueId || user.referralCode;
        if (code) {
            navigator.clipboard.writeText(code);
            onInvite(); 
        }
    };

    const isRestricted = user.level < 5;

    const tabs = ['status', 'inventory', 'missions', 'archives', 'history', 'friends'];
    if (hasMiner) tabs.push('mining');

    if (activeTab === 'archives' && selectedOrderId) {
        const selectedOrder = orders.find(o => o.id === selectedOrderId);
        if (selectedOrder) {
            return <TicketDetail order={selectedOrder} onBack={() => setSelectedOrderId(null)} />;
        }
    }

    const friendsList: Friend[] = user.friends || [];

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-24 px-6 animate-fade-in-up">
            <div className="max-w-6xl mx-auto">
                {/* Header / Nav */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#333] pb-6">
                    <div className="flex-1">
                        <button 
                            onClick={onBack}
                            className="text-xs font-mono text-[#666] hover:text-[#00FF41] mb-4 block uppercase"
                        >
                            &lt; {tCommon.exit_command}
                        </button>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 border-2 border-[#00FF41] flex items-center justify-center bg-[#0D0D0D]">
                                <span className="text-2xl">👾</span>
                            </div>
                            <div>
                                {isEditingName ? (
                                    <div className="flex items-center gap-2 mb-1">
                                        <input 
                                            type="text" 
                                            value={tempName} 
                                            onChange={(e) => setTempName(e.target.value)}
                                            className="bg-[#050505] border border-[#00FF41] text-white font-bold text-xl md:text-3xl uppercase px-2 py-1 w-full md:w-96 outline-none font-mono tracking-tight"
                                            autoFocus
                                            onKeyDown={(e) => e.key === 'Enter' && saveName()}
                                            maxLength={20}
                                        />
                                        <button 
                                            onClick={saveName} 
                                            className="text-[#00FF41] hover:bg-[#00FF41] hover:text-black border border-[#00FF41] p-1 transition-colors"
                                            title="Save Name"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => { setIsEditingName(false); setTempName(user.name); }} 
                                            className="text-red-500 hover:bg-red-500 hover:text-white border border-red-500 p-1 transition-colors"
                                            title="Cancel"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 mb-1 group">
                                        <h1 
                                            className="text-3xl font-bold text-white tracking-tight uppercase hover:text-[#00FF41] transition-colors cursor-pointer"
                                            onClick={() => { setIsEditingName(true); audioSystem.playClick(); }}
                                        >
                                            {user.name}
                                        </h1>
                                        <button 
                                            className="text-[#444] hover:text-[#00FF41] transition-colors ml-2 p-1 border border-transparent hover:border-[#00FF41] rounded-sm"
                                            title="Edit Name"
                                            onClick={() => { setIsEditingName(true); audioSystem.playClick(); }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                                <p className="text-xs text-[#00FF41] font-mono">OPERATIVE STATUS: ONLINE</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:flex flex-wrap gap-2 mt-8 md:mt-0 w-full md:w-auto">
                        {tabs.map((tab, index) => {
                            const isLast = index === tabs.length - 1;
                            const isOddTotal = tabs.length % 2 !== 0;
                            const spanClass = (isOddTotal && isLast) ? "col-span-2" : "col-span-1";
                            const isRequestPending = tab === 'friends' && (user.friendRequests?.length || 0) > 0;
                            
                            return (
                                <button
                                    key={tab}
                                    onClick={() => { 
                                        audioSystem.playClick();
                                        setActiveTab(tab as ProfileTab); 
                                        setSelectedOrderId(null); 
                                    }}
                                    className={`${spanClass} px-4 md:px-6 py-3 text-xs font-bold uppercase tracking-widest border transition-all md:w-auto relative ${
                                        activeTab === tab 
                                            ? 'bg-[#00FF41] text-black border-[#00FF41]' 
                                            : 'bg-[#0D0D0D] text-[#666] border-[#333] hover:text-white hover:border-[#666]'
                                    } ${tab === 'mining' ? 'animate-pulse' : ''}`}
                                >
                                    {tab === 'mining' ? 'MINING' : t[tab as keyof typeof t] || tab}
                                    {isRequestPending && (
                                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF41] opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF41]"></span>
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div className="min-h-[400px]">
                    
                    {activeTab === 'status' && (
                        <StatusTab 
                            user={user}
                            totalPortfolioValue={totalPortfolioValue}
                            totalUnrealizedPL={totalUnrealizedPL}
                            activeCryptoAssets={activeCryptoAssets}
                            onExchange={onExchange}
                            handleCopyReferral={handleCopyUniqueId}
                            onInvite={onInvite}
                            t={t}
                            isRestricted={isRestricted}
                        />
                    )}

                    {activeTab === 'friends' && (
                        <FriendsTab 
                            friendsList={friendsList}
                            user={user}
                            handleCopyReferral={handleCopyUniqueId}
                            onSendRequest={onSendRequest}
                            onRespondRequest={onRespondRequest}
                            onTransferCredits={onTransferCredits}
                            t={t}
                        />
                    )}

                    {activeTab === 'mining' && hasMiner && (
                        <MiningTab 
                            miningHardware={miningHardware}
                            currentTotalHashrate={currentTotalHashrate}
                            user={user}
                            onExchange={onExchange}
                            isRestricted={isRestricted}
                            t={t}
                            cryptoSymbol={CRYPTO_SYMBOL}
                        />
                    )}

                    {activeTab === 'inventory' && (
                        <InventoryTab 
                            inventory={inventory}
                            marketPrices={marketPrices}
                            onSell={onSell}
                            onTransferItem={onTransferItem}
                            friends={user.friends || []}
                            userLevel={user.level}
                            t={t}
                            tRare={tRare}
                            tCats={tCats}
                        />
                    )}

                    {/* Other tabs remain same */}
                    {activeTab === 'missions' && (
                        <MissionsTab 
                            missions={missions}
                            user={user}
                            onClaim={onClaim}
                            onPlay={onPlay}
                            t={t}
                            totalItemsPurchased={totalItemsPurchased}
                        />
                    )}

                    {activeTab === 'history' && (
                        <HistoryTab 
                            sortedTransactions={sortedTransactions}
                            t={t}
                        />
                    )}

                    {activeTab === 'archives' && (
                        <div className="animate-fade-in-up space-y-4">
                            {orders.length === 0 ? (
                                <div className="p-12 border border-[#333] border-dashed text-center text-[#666] font-mono">
                                    {t.no_transmissions}
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div 
                                        key={order.id} 
                                        onClick={() => setSelectedOrderId(order.id)}
                                        className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 flex justify-between items-center cursor-pointer hover:border-[#00FF41] transition-colors group"
                                    >
                                        <div>
                                            <div className="text-white font-bold mb-1 group-hover:text-[#00FF41] transition-colors">{order.ticketId}</div>
                                            <div className="text-xs text-[#666] font-mono">
                                                {order.date} • {order.items.reduce((sum, i) => sum + (i.quantity || 1), 0)} Items
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#00FF41] font-mono font-bold">${order.total.toFixed(2)}</div>
                                            <div className="text-[10px] uppercase text-[#888] border border-[#333] px-2 py-0.5 inline-block mt-1 mr-2">
                                                {order.paymentMethod === 'balance' ? t.paid_balance : t.paid_card}
                                            </div>
                                            <div className={`text-[10px] uppercase border border-[#333] px-2 py-0.5 inline-block mt-1 ${order.status === 'active' ? 'text-[#00FF41] border-[#00FF41]/30' : 'text-yellow-500'}`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default UserProfile;
