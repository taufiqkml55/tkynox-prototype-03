
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Product, Friend, ViewState } from '../../types';
import { RARITY_COLORS } from '../../constants';
import { ref, get } from 'firebase/database';
import { rtdb } from '../../services/firebase';
import { audioSystem } from '../../services/audioSystem';

interface ProductInfoProps {
    product: Product;
    marketPrice: number;
    stockLevel?: number;
    isPositive: boolean;
    onAddToCart: (product: Product) => void;
    onBuyNow: (product: Product) => void;
    canBuy: boolean;
    isMining: boolean;
    isOwned: boolean;
    t: any;
    tCats: any;
    tRare: any;
    // Inject setView to navigate to PvP
    // Note: Since we can't change the signature easily in App.tsx without breaking other flows, 
    // we assume the parent passes it or we use a hack. 
    // Better approach: Add onPvPClick prop.
    // But to strictly follow the prompt "Buy from player", let's assume this component
    // has access to a way to trigger it. I will modify App.tsx to pass a new handler or 
    // use a CustomEvent if I couldn't change props. 
    // However, standard React way is adding a prop. I will add `onPvPClick`? 
    // Actually, I'll use the existing patterns. 
    // Let's update App.tsx to pass setView inside `ProductDetail`.
}

// To avoid prop drilling change in App.tsx which is huge, I will use window dispatch 
// or assume `onBuyNow` can be overloaded? No.
// Let's check ProductDetail. It has `onBuyNow`. 
// I will modify ProductDetail wrapper in App.tsx to handle a specific "PVP" object passed to onBuyNow? No.
// I will access the global App context? No.
// I will accept that I need to update ProductDetail signature too? No, let's try to keep it local.
// Actually, I can just fetch the players here.
// But triggering the game requires `setView`.
// I will dispatch a custom event for now or check if I can use `window.location.hash`? No.
// Okay, I will modify App.tsx to pass `setView` down to ProductDetail -> ProductInfo. 
// BUT WAIT, I can just update `App.tsx` to pass a callback `onPvPTrade` to `ProductDetail`.

// Updated Interface with onPvPClick
// Note: I am modifying the interface here, I need to update ProductDetail.tsx too.
// Since I can't edit ProductDetail.tsx in this XML block (I'm limited), I will check if I can piggyback.
// Wait, I *can* edit multiple files. I will update ProductDetail.tsx as well.

export const ProductInfo: React.FC<ProductInfoProps & { onPvPClick?: (target: Friend, price: number) => void }> = ({ 
    product, marketPrice, stockLevel, isPositive, onAddToCart, onBuyNow, canBuy, isMining, isOwned, t, tCats, tRare, onPvPClick 
}) => {
    const rarityColor = RARITY_COLORS[product.rarity];
    const [sellers, setSellers] = useState<Friend[]>([]);
    const [isLoadingSellers, setIsLoadingSellers] = useState(false);
    const [showSellers, setShowSellers] = useState(false);
    
    // Stock Logic
    const maxStock = product.maxStock || (product.rarity === 'Legendary' ? 20 : product.rarity === 'Epic' ? 40 : product.rarity === 'Rare' ? 60 : product.rarity === 'Common' ? 80 : 100);
    const currentStock = stockLevel !== undefined ? stockLevel : maxStock;
    const isOutOfStock = currentStock <= 0;
    const stockPercent = (currentStock / maxStock) * 100;

    // Only allow purchase if general criteria met AND stock exists
    const isPurchasable = canBuy && !isOutOfStock;

    const fetchSellers = async () => {
        setIsLoadingSellers(true);
        setShowSellers(true);
        audioSystem.playProcessing();
        try {
            const playersRef = ref(rtdb, 'players');
            const snap = await get(playersRef);
            if (snap.exists()) {
                const data = snap.val();
                const found: Friend[] = [];
                Object.entries(data).forEach(([key, val]: [string, any]) => {
                    // Check if player has this item in their public inventory
                    if (val.publicInventory && Array.isArray(val.publicInventory) && val.publicInventory.includes(product.id)) {
                        found.push({
                            id: key,
                            name: val.name || 'Unknown',
                            uniqueId: val.uniqueId || '---',
                            level: val.level || 1,
                            status: val.status || 'offline'
                        });
                    }
                });
                // Sort by online status
                found.sort((a,b) => (a.status === 'online' ? -1 : 1));
                setSellers(found);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoadingSellers(false);
        }
    };

    const blackMarketPrice = marketPrice * 1.5;

    return (
        <div className="flex flex-col justify-start max-w-xl relative">
             <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#00FF41] text-black text-xs font-bold uppercase">{tCats[product.category]}</span>
                <span 
                    className="px-3 py-1 text-black text-xs font-bold uppercase border" 
                    style={{ color: rarityColor, borderColor: rarityColor, backgroundColor: `${rarityColor}15` }}
                >
                    {tRare[product.rarity]} CLASS
                </span>
                <span className="text-xs font-mono text-[#00FF41]">ID: {product.id.toUpperCase()}</span>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">{product.name}</h1>
             <p className="text-[#A0A0A0] text-xl mb-8 italic font-light">"{product.tagline}"</p>
             
             {/* Price & Description Section */}
             <div className="mb-8 border-y border-[#1A1A1A] py-6">
                 <div className="flex justify-between items-end mb-4">
                     <div>
                         <div className="text-xs font-mono text-[#666] uppercase tracking-widest mb-1">{t.current_market || "MARKET VALUE"}</div>
                         <div className="flex items-baseline gap-2">
                             <span className={`text-4xl font-bold font-mono ${isPositive ? 'text-[#00FF41]' : 'text-white'}`}>
                                 ${marketPrice.toFixed(2)}
                             </span>
                             <span className="text-sm text-[#666]">/ UNIT</span>
                         </div>
                     </div>
                     <div className="text-right">
                          <div className="text-xs font-mono text-[#666] uppercase tracking-widest mb-1">{t.base_price || "BASE PRICE"}</div>
                          <div className="text-xl font-mono text-[#666] line-through">${product.price.toFixed(2)}</div>
                     </div>
                 </div>

                 {/* Global Stock Indicator */}
                 <div className="mb-6 p-4 bg-[#0A0A0A] border border-[#333]">
                     <div className="flex justify-between text-xs font-mono uppercase mb-2">
                         <span className="text-[#888]">Global Inventory Level</span>
                         <span className={currentStock < 10 ? 'text-red-500 font-bold animate-pulse' : 'text-[#00FF41]'}>
                             {isOutOfStock ? 'DEPLETED' : `${currentStock} UNITS AVAILABLE`}
                         </span>
                     </div>
                     <div className="w-full h-2 bg-[#1A1A1A] rounded-sm overflow-hidden">
                         <div 
                             className={`h-full transition-all duration-1000 ${currentStock < 10 ? 'bg-red-500' : 'bg-[#00FF41]'}`}
                             style={{ width: `${stockPercent}%` }}
                         ></div>
                     </div>
                     <div className="mt-2 text-[10px] text-[#444] font-mono uppercase">
                         {stockPercent < 20 ? '> ALERT: SCARCITY DRIVING PRICE SURGE.' : '> SUPPLY CHAIN: STABLE.'}
                     </div>
                 </div>

                 <p className="text-[#CCCCCC] font-light leading-relaxed text-sm md:text-base">
                     {product.longDescription || product.description}
                 </p>
                 
                 {/* Features List */}
                 {product.features && product.features.length > 0 && (
                     <div className="mt-6 pt-6 border-t border-[#1A1A1A]">
                         <h4 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-3">{t.tech_specs || "TECHNICAL SPECS"}</h4>
                         <ul className="grid grid-cols-2 gap-2">
                             {product.features.map((feat, idx) => (
                                 <li key={idx} className="flex items-center gap-2 text-xs font-mono text-[#888]">
                                     <span className="w-1 h-1 bg-[#00FF41]"></span>
                                     {feat}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 )}
             </div>
             
             {isMining && product.hashrate && (
                 <div className="mb-8 p-4 border border-[#00FF41]/50 bg-[#00FF41]/5">
                     <h3 className="text-xs font-bold text-[#00FF41] uppercase tracking-widest mb-2">{t.mining_caps}</h3>
                     <p className="text-sm text-[#A0A0A0] font-mono">
                         HASHRATE: <span className="text-white font-bold">{product.hashrate} TH/s</span><br/>
                         EST. YIELD: <span className="text-white font-bold">~${(product.hashrate * 0.01875 * 6).toFixed(2)} / MIN</span>
                     </p>
                     <p className="text-[10px] text-[#666] mt-2 font-mono">
                         * YIELD FLUCTUATES WITH NETWORK DIFFICULTY
                     </p>
                 </div>
             )}

             <div className="flex flex-col gap-4">
               {isPurchasable ? (
                   <div className="flex gap-4">
                       <button 
                         onClick={() => onAddToCart({ ...product, price: parseFloat(marketPrice.toFixed(2)) })}
                         className="flex-1 py-5 uppercase tracking-widest text-sm font-bold transition-all duration-200 border border-[#333] bg-[#0A0A0A] text-white hover:border-[#00FF41] hover:text-[#00FF41] hover:shadow-[0_0_15px_rgba(0,255,65,0.15)] active:scale-95 btn-press"
                       >
                         {t.add_to_cart}
                       </button>
                       <button 
                         onClick={() => onBuyNow({ ...product, price: parseFloat(marketPrice.toFixed(2)) })}
                         className="flex-1 py-5 uppercase tracking-widest text-sm font-bold transition-all duration-200 bg-white text-black hover:bg-[#00FF41] hover:shadow-[0_0_25px_rgba(0,255,65,0.4)] clip-path-slant active:scale-95 btn-press"
                       >
                         {t.buy_now}
                       </button>
                   </div>
               ) : (
                   <div className="flex gap-2">
                        <button 
                            disabled
                            className={`flex-1 py-5 uppercase tracking-widest text-sm font-bold transition-colors clip-path-slant cursor-not-allowed opacity-50 ${isOutOfStock ? 'bg-red-900/20 border border-red-500 text-red-500' : 'bg-[#333] text-[#888]'}`}
                        >
                            {isOutOfStock ? 'OUT OF STOCK' : t.limit_reached}
                        </button>
                        {isOutOfStock && (
                            <button 
                                onClick={fetchSellers}
                                className="flex-1 py-5 bg-red-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-red-500 transition-colors clip-path-slant animate-pulse"
                            >
                                {t.pvp_market || "BLACK MARKET // PVP"}
                            </button>
                        )}
                   </div>
               )}
               
               {isMining && isOwned && (
                   <p className="text-center text-xs text-red-500 font-mono">
                       {t.limit_mining}
                   </p>
               )}
             </div>

             {/* PVP Sellers Modal/Overlay */}
             {showSellers && (
                 <div className="absolute top-0 left-0 w-full h-full bg-[#0A0A0A] border border-red-500 z-20 p-6 flex flex-col animate-fade-in-up shadow-2xl">
                     <div className="flex justify-between items-center mb-6 border-b border-red-500/30 pb-4">
                         <div className="flex items-center gap-2">
                             <div className="w-3 h-3 bg-red-500 animate-ping"></div>
                             <h3 className="text-red-500 font-bold font-mono tracking-widest uppercase">{t.find_sellers || "LOCATE SELLERS"}</h3>
                         </div>
                         <button onClick={() => setShowSellers(false)} className="text-red-500 hover:text-white font-mono">[ X ]</button>
                     </div>

                     <div className="flex-1 overflow-y-auto space-y-3">
                         {isLoadingSellers && <div className="text-center text-red-500 font-mono animate-pulse">SCANNING NETWORK...</div>}
                         
                         {!isLoadingSellers && sellers.length === 0 && (
                             <div className="text-center text-[#666] font-mono mt-10">{t.no_sellers || "NO ACTIVE OPERATIVES FOUND."}</div>
                         )}

                         {sellers.map(seller => (
                             <div key={seller.id} className="border border-[#333] hover:border-red-500 bg-[#111] p-3 flex justify-between items-center group transition-colors">
                                 <div>
                                     <div className="flex items-center gap-2">
                                         <span className={`w-2 h-2 rounded-full ${seller.status === 'online' ? 'bg-[#00FF41]' : 'bg-[#666]'}`}></span>
                                         <span className="text-white font-bold text-sm">{seller.name}</span>
                                     </div>
                                     <div className="text-[10px] text-[#666] font-mono">LVL {seller.level}</div>
                                 </div>
                                 <div className="text-right">
                                     <div className="text-red-500 font-mono font-bold mb-1">${blackMarketPrice.toFixed(2)}</div>
                                     <button 
                                        onClick={() => onPvPClick && onPvPClick(seller, blackMarketPrice)}
                                        className="text-[9px] bg-red-900/30 border border-red-500 text-red-500 px-2 py-1 uppercase hover:bg-red-500 hover:text-black transition-colors"
                                     >
                                         {t.hack_trade || "HACK TRADE"}
                                     </button>
                                 </div>
                             </div>
                         ))}
                     </div>
                     <div className="mt-4 pt-2 border-t border-red-500/30 text-[9px] text-red-500 font-mono text-center">
                         WARNING: PVP TRADES CARRY A 50% BLACK MARKET MARKUP.
                     </div>
                 </div>
             )}
        </div>
    );
};
