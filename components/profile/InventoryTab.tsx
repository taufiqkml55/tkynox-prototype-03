
import React, { useState, useMemo } from 'react';
import { Product, Friend } from '../../types';
import { RARITY_COLORS } from '../../constants';
import Tooltip from '../Tooltip';
import { audioSystem } from '../../services/audioSystem';

interface InventoryItem {
    product: Product;
    count: number;
    avgCost: number;
    currentValue: number;
    unrealizedPL: number;
}

interface InventoryTabProps {
    inventory: InventoryItem[];
    marketPrices: Record<string, number>;
    onSell: (id: string) => void;
    onTransferItem: (recipientId: string, productId: string) => void;
    friends: Friend[];
    userLevel: number;
    t: any;
    tRare: any;
    tCats: any;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ 
    inventory, marketPrices, onSell, onTransferItem, friends, userLevel, t, tRare, tCats 
}) => {
    const [transferModalItem, setTransferModalItem] = useState<Product | null>(null);
    const [selectedFriendId, setSelectedFriendId] = useState<string>('');
    const [isConfirming, setIsConfirming] = useState(false);

    // Summary Calculations
    const summary = useMemo(() => {
        const totalItems = inventory.reduce((acc, i) => acc + i.count, 0);
        const totalVal = inventory.reduce((acc, i) => acc + i.currentValue, 0);
        const topPerformer = [...inventory].sort((a, b) => b.unrealizedPL - a.unrealizedPL)[0];
        return { totalItems, totalVal, topPerformer };
    }, [inventory]);

    const handleTransferInit = (product: Product) => {
        setTransferModalItem(product);
        setIsConfirming(false);
        setSelectedFriendId('');
        audioSystem.playClick();
    };

    const handleReviewTransfer = () => {
        if (selectedFriendId) {
            setIsConfirming(true);
            audioSystem.playClick();
        }
    };

    const handleTransferSubmit = () => {
        if (transferModalItem && selectedFriendId) {
            onTransferItem(selectedFriendId, transferModalItem.id);
            setTransferModalItem(null);
            setSelectedFriendId('');
            setIsConfirming(false);
        }
    };

    const handleCancel = () => {
        setTransferModalItem(null);
        setSelectedFriendId('');
        setIsConfirming(false);
        audioSystem.playClick();
    };

    const selectedFriendName = friends.find(f => f.id === selectedFriendId)?.name || 'Unknown';

    return (
        <div className="animate-fade-in-up space-y-8">
             {/* Summary Dashboard */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-4 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 text-4xl text-[#1A1A1A] font-bold opacity-20 group-hover:text-[#00FF41] group-hover:opacity-10 transition-colors">#</div>
                    <div className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1">Total Assets</div>
                    <div className="text-2xl text-white font-bold font-mono">{summary.totalItems} <span className="text-xs text-[#444]">UNITS</span></div>
                </div>
                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-4 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 text-4xl text-[#1A1A1A] font-bold opacity-20 group-hover:text-[#00FF41] group-hover:opacity-10 transition-colors">$</div>
                    <div className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1">Portfolio Value</div>
                    <div className="text-2xl text-white font-bold font-mono">${summary.totalVal.toFixed(2)}</div>
                </div>
                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-4 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 text-4xl text-[#1A1A1A] font-bold opacity-20 group-hover:text-[#00FF41] group-hover:opacity-10 transition-colors">↑</div>
                    <div className="text-[10px] text-[#666] font-mono uppercase tracking-widest mb-1">Top Performer</div>
                    <div className="text-xl text-[#00FF41] font-bold font-mono truncate">
                        {summary.topPerformer ? summary.topPerformer.product.name : 'N/A'}
                    </div>
                    {summary.topPerformer && (
                        <div className="text-xs text-[#00FF41] font-mono">
                            +${summary.topPerformer.unrealizedPL.toFixed(2)}
                        </div>
                    )}
                </div>
             </div>
             
             {inventory.length === 0 ? (
                <div className="p-12 border border-[#333] border-dashed text-center text-[#666] font-mono bg-[#0A0A0A]">
                    <div className="mb-4 text-4xl opacity-50">📦</div>
                    {t.no_assets}
                </div>
             ) : (
                <div className="grid grid-cols-1 gap-4">
                    {inventory.map(({ product, count, avgCost, currentValue, unrealizedPL }) => {
                        const rarityColor = RARITY_COLORS[product.rarity];
                        const currentMarketPrice = marketPrices[product.id] || product.price;
                        const isProfitable = unrealizedPL >= 0;
                        const isTransferLocked = userLevel < 10;
                        
                        // Calculate P/L percentage for bar visualization (capped at +/- 50% for visuals)
                        const plPercent = avgCost > 0 ? (unrealizedPL / (avgCost * count)) * 100 : 0;
                        const barWidth = Math.min(Math.abs(plPercent), 100);

                        return (
                            <div key={product.id} className="bg-[#0D0D0D] border border-[#1A1A1A] p-4 flex flex-col md:flex-row items-center gap-6 hover:border-[#333] transition-colors group relative overflow-hidden">
                                {/* Rarity Line */}
                                <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: rarityColor }}></div>

                                <div className="flex items-center gap-4 flex-1 w-full pl-2">
                                    <div className="w-16 h-16 bg-black border border-[#333] relative shrink-0">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                        {count > 1 && (
                                            <div className="absolute -top-2 -right-2 bg-[#00FF41] text-black font-bold text-xs px-1.5 border border-white shadow-md">
                                                x{count}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                            <h4 className="text-white font-bold text-sm truncate">{product.name}</h4>
                                            <span 
                                                className="text-[9px] font-bold font-mono uppercase px-1.5 py-0.5 border rounded-sm backdrop-blur-sm" 
                                                style={{ color: rarityColor, borderColor: `${rarityColor}40`, backgroundColor: `${rarityColor}10` }}
                                            >
                                                {tRare[product.rarity]}
                                            </span>
                                            <span className="text-[9px] bg-[#222] text-[#888] px-1.5 py-0.5 border border-[#333] rounded-sm font-mono uppercase">
                                                {tCats[product.category]}
                                            </span>
                                        </div>
                                        <p className="text-[10px] text-[#666] font-mono uppercase tracking-wider">ID: {product.id}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-8 w-full md:w-auto items-center">
                                    <div className="hidden md:block text-right">
                                        <div className="text-[9px] text-[#555] uppercase font-bold mb-1">{t.avg_cost}</div>
                                        <div className="text-xs text-[#888] font-mono">${avgCost.toFixed(2)}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[9px] text-[#555] uppercase font-bold mb-1">{t.current_market}</div>
                                        <div className="text-xs text-white font-mono">${currentMarketPrice.toFixed(2)}</div>
                                    </div>
                                    <div className="text-right relative group/pl">
                                        <div className="text-[9px] text-[#555] uppercase font-bold mb-1">{t.total_pl}</div>
                                        <div className={`text-xs font-mono font-bold ${isProfitable ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                                            {isProfitable ? '+' : ''}{unrealizedPL.toFixed(2)}
                                        </div>
                                        {/* Visual P/L Bar */}
                                        <div className="w-full h-1 bg-[#222] mt-1 relative overflow-hidden rounded-full">
                                            <div 
                                                className={`h-full absolute top-0 ${isProfitable ? 'bg-[#00FF41] left-0' : 'bg-[#FF3333] right-0'}`}
                                                style={{ width: `${barWidth}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 justify-end">
                                        <Tooltip text={isTransferLocked ? "Lvl 10 Required" : "Transfer Asset"}>
                                            <button 
                                                onClick={() => !isTransferLocked && handleTransferInit(product)}
                                                disabled={isTransferLocked}
                                                className={`flex items-center justify-center w-8 h-8 border transition-all ${
                                                    isTransferLocked 
                                                    ? 'border-[#333] bg-[#111] text-[#444] cursor-not-allowed' 
                                                    : 'border-[#333] bg-[#111] hover:border-white hover:text-white text-[#888]'
                                                }`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                                </svg>
                                            </button>
                                        </Tooltip>
                                        <Tooltip text="Liquidate Asset">
                                            <button 
                                                onClick={() => onSell(product.id)}
                                                className="flex items-center justify-center w-8 h-8 border border-[#333] bg-[#111] hover:bg-[#00FF41] hover:text-black hover:border-[#00FF41] text-white transition-all"
                                            >
                                                <span className="font-bold text-xs">$</span>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
             )}

             {/* Transfer Modal */}
             {transferModalItem && (
                <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#0D0D0D] border border-[#333] p-6 max-w-sm w-full shadow-2xl relative animate-fade-in-up">
                        {!isConfirming ? (
                            <>
                                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">Transfer Asset</h3>
                                <p className="text-xs text-[#666] font-mono mb-6">
                                    ITEM: <span className="text-white">{transferModalItem.name}</span>
                                </p>
                                
                                <div className="mb-6">
                                    <label className="block text-[10px] text-[#00FF41] font-mono uppercase mb-2">Select Recipient</label>
                                    {friends.length > 0 ? (
                                        <select 
                                            value={selectedFriendId}
                                            onChange={(e) => setSelectedFriendId(e.target.value)}
                                            className="w-full bg-black border border-[#333] px-4 py-3 text-white font-mono text-sm outline-none focus:border-[#00FF41] uppercase"
                                        >
                                            <option value="" disabled>SELECT OPERATIVE...</option>
                                            {friends.map(f => (
                                                <option key={f.id} value={f.id}>{f.name} (ID: {f.uniqueId || f.referralCode})</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <div className="text-xs text-[#666] border border-[#333] p-3">NO CONNECTED OPERATIVES. ADD FRIENDS IN PROFILE.</div>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={handleCancel}
                                        className="flex-1 py-3 border border-[#333] text-[#666] text-xs font-bold uppercase hover:text-white transition-colors"
                                    >
                                        CANCEL
                                    </button>
                                    <button 
                                        onClick={handleReviewTransfer}
                                        disabled={!selectedFriendId}
                                        className="flex-1 py-3 bg-[#00FF41] text-black text-xs font-bold uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        REVIEW
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest text-center">Confirm Transfer</h3>
                                
                                <div className="bg-[#111] border border-[#333] p-4 mb-6 space-y-3">
                                    <div className="flex justify-between items-center border-b border-[#222] pb-2">
                                        <span className="text-[10px] text-[#666] uppercase">Asset</span>
                                        <span className="text-sm text-white font-bold text-right">{transferModalItem.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] text-[#666] uppercase">Recipient</span>
                                        <span className="text-sm text-[#00FF41] font-bold font-mono text-right">{selectedFriendName}</span>
                                    </div>
                                </div>

                                <p className="text-[10px] text-red-500 font-mono mb-6 text-center animate-pulse">
                                    WARNING: THIS ACTION IS IRREVERSIBLE. ASSET OWNERSHIP WILL BE TRANSFERRED IMMEDIATELY.
                                </p>

                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => setIsConfirming(false)}
                                        className="flex-1 py-3 border border-[#333] text-[#666] text-xs font-bold uppercase hover:text-white transition-colors"
                                    >
                                        BACK
                                    </button>
                                    <button 
                                        onClick={handleTransferSubmit}
                                        className="flex-1 py-3 bg-[#00FF41] text-black text-xs font-bold uppercase hover:bg-white transition-colors"
                                    >
                                        CONFIRM SEND
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
             )}
        </div>
    );
};
