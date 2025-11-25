
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useContext } from 'react';
import { Product, Language } from '../types';
import { RARITY_COLORS } from '../constants';
import { audioSystem } from '../services/audioSystem';
import Tooltip from './Tooltip';
import { TranslationContext } from '../contexts/TranslationContext';

interface ProductCardProps {
  product: Product;
  marketPrice: number; // Received from parent simulation
  stockLevel?: number; // Dynamic stock
  onClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  language?: Language; // Optional for backward compatibility if needed, but prefer passing it
}

export const ProductCard = React.memo<ProductCardProps>(({ product, marketPrice, stockLevel, onClick, onAddToCart, onBuyNow, language = 'en' }) => {
  const [showBuyNow, setShowBuyNow] = useState(false);

  const { products: t, rarities: tRare } = useContext(TranslationContext);

  // Use marketPrice from props, or base price if toggled to "Buy Now" mode
  const displayPrice = showBuyNow ? product.price : marketPrice;
  
  // Calculate change relative to base price
  const priceChange = marketPrice - product.price;
  const percentChange = (priceChange / product.price) * 100;
  const isPositive = priceChange >= 0;
  
  const rarityColor = RARITY_COLORS[product.rarity];
  
  // Stock Logic
  // If stockLevel is undefined, assume full (e.g. before sync). 
  // We default maxStock based on rarity if not provided, mimicking backend logic for UI display consistency.
  const maxStock = product.maxStock || (product.rarity === 'Legendary' ? 20 : product.rarity === 'Epic' ? 40 : product.rarity === 'Rare' ? 60 : product.rarity === 'Common' ? 80 : 100);
  const currentStock = stockLevel !== undefined ? stockLevel : maxStock;
  const isOutOfStock = currentStock <= 0;
  const stockPercent = (currentStock / maxStock) * 100;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        audioSystem.playClick();
        onClick({ ...product, price: parseFloat(displayPrice.toFixed(2)) });
    }
  };

  // Fallback if illustration is missing for some reason
  const illustrationPath = product.illustration || "M12 2L2 22h20L12 2z";

  return (
    <div 
      id={`product-${product.id}`}
      className="group cursor-pointer relative bg-[#0D0D0D] border border-[#1A1A1A] hover:border-[#00FF41] hover:shadow-[0_0_30px_rgba(0,255,65,0.2)] transition-all duration-300 overflow-hidden flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-[#00FF41] btn-press hover:-translate-y-1"
      onClick={() => {
          audioSystem.playClick();
          onClick({ ...product, price: parseFloat(displayPrice.toFixed(2)) });
      }}
      onMouseEnter={() => audioSystem.playHover()}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${product.name}, price $${displayPrice.toFixed(2)}`}
    >
      
      {/* Image Section - SVG Illustration */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#050505] border-b border-[#1A1A1A] shrink-0 flex items-center justify-center group-hover:bg-[#080808] transition-colors">
         
         {/* Ambient Glow based on Rarity */}
         <div className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-50" style={{ 
             background: `radial-gradient(circle at center, ${rarityColor} 0%, transparent 70%)` 
         }}></div>

         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]"></div>

         {/* Main Illustration */}
         <svg 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className={`w-32 h-32 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] ${isOutOfStock ? 'grayscale opacity-50' : ''}`}
            style={{ color: rarityColor }}
         >
            <path d={illustrationPath} fillOpacity="0.9" />
         </svg>

        {/* Live Ticker Badge - Only shown in Market Mode */}
        {!showBuyNow && (
            <div className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-black/90 backdrop-blur-md border border-[#333] px-2 py-1 shadow-lg group-hover:border-[#666] transition-colors">
                <div className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-[#00FF41]' : 'bg-[#FF3333]'} animate-pulse`} aria-hidden="true"></div>
                <span className={`font-mono text-xs font-bold ${isPositive ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                    {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
                </span>
            </div>
        )}
        
        {/* Protocol Badge */}
        <div className="absolute top-3 left-3 z-30">
            <span className="font-mono text-[10px] text-[#A0A0A0] bg-black/80 backdrop-blur-md border border-[#333] px-2 py-1 shadow-lg uppercase tracking-wider group-hover:text-white transition-colors">
                {product.category.substring(0, 3).toUpperCase()}-{product.id}
            </span>
        </div>

        {/* Stock Overlay */}
        {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-40 backdrop-blur-sm">
                <div className="border border-red-500 text-red-500 px-4 py-2 font-bold uppercase tracking-widest text-sm rotate-[-15deg]">
                    SOLD OUT
                </div>
            </div>
        )}
      </div>
      
      {/* Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-[#0A0A0A] relative min-h-[180px]">
        {/* Rarity Line */}
        <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: rarityColor }} aria-hidden="true"></div>
        
        {/* Background Illustration Watermark */}
        <div className="absolute right-2 bottom-16 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-500">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d={illustrationPath} />
            </svg>
        </div>

        <div>
            <div className="flex justify-between items-start mb-3 gap-2">
                <h3 className="text-lg font-bold text-white group-hover:text-[#00FF41] transition-colors leading-tight">
                    {product.name}
                </h3>
                <span 
                    className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 shrink-0 mt-1 text-black shadow-sm transform group-hover:scale-105 transition-transform" 
                    style={{ 
                        background: `linear-gradient(135deg, ${rarityColor}, ${rarityColor}CC)`,
                        boxShadow: `0 0 10px ${rarityColor}40`
                    }}
                >
                    {tRare[product.rarity]}
                </span>
            </div>
            
            {/* Stock Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-[9px] font-mono text-[#666] mb-1 uppercase">
                    <span>Availability</span>
                    <span className={currentStock < 10 ? 'text-red-500 animate-pulse' : 'text-white'}>
                        {currentStock} / {maxStock}
                    </span>
                </div>
                <div className="w-full h-1 bg-[#222]">
                    <div 
                        className={`h-full transition-all duration-500 ${currentStock < 10 ? 'bg-red-500' : 'bg-[#00FF41]'}`}
                        style={{ width: `${stockPercent}%` }}
                    ></div>
                </div>
            </div>

            <p className="text-xs text-[#A0A0A0] font-mono leading-relaxed line-clamp-3 mb-4 relative z-10">
                {product.description}
            </p>
        </div>
        
        <div className="flex justify-between items-end font-mono pt-4 border-t border-[#1A1A1A] mt-auto z-10 relative bg-[#0A0A0A] group-hover:border-[#333] transition-colors">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-[#888] uppercase tracking-wider">{showBuyNow ? t.fixed_price : t.market_value}</span>
                    <Tooltip text={showBuyNow ? "Enable Market Price" : "Enable Fixed Price"}>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowBuyNow(!showBuyNow); }}
                            aria-label={`Toggle price display to ${showBuyNow ? 'Market Value' : 'Fixed Price'}`}
                            className={`text-[8px] uppercase px-1.5 py-0.5 border transition-all focus:outline-none focus:ring-1 focus:ring-white hover:scale-105 active:scale-95 ${
                                showBuyNow 
                                ? 'border-[#00FF41] text-[#00FF41] bg-[#00FF41]/10' 
                                : 'border-[#555] text-[#A0A0A0] hover:border-[#888] hover:text-white'
                            }`}
                        >
                            {showBuyNow ? t.go_live : t.fixed_price}
                        </button>
                    </Tooltip>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className={`text-xl font-bold tracking-tight ${showBuyNow ? 'text-white' : (isPositive ? 'text-white' : (priceChange < 0 ? 'text-[#FF3333]' : 'text-white'))} transition-colors duration-300 group-hover:text-[#00FF41]`}>
                        ${displayPrice.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-[#666]">USD</span>
                </div>
            </div>
            <div className="flex flex-col items-end gap-1">
                {!showBuyNow && (
                     <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                        <span aria-hidden="true">{isPositive ? '▲' : '▼'}</span>
                        <span className="sr-only">{isPositive ? 'Up' : 'Down'}</span>
                        <span>{Math.abs(priceChange).toFixed(2)}%</span>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
});
