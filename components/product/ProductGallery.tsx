
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { RARITY_COLORS } from '../../constants';

interface ProductGalleryProps {
    product: Product;
    percentChange: number;
    isPositive: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product, percentChange, isPositive }) => {
    const [activeView, setActiveView] = useState(0);
    const rarityColor = RARITY_COLORS[product.rarity];
    const illustrationPath = product.illustration || "M12 2L2 22h20L12 2z";
    const galleryLength = product.gallery ? product.gallery.length : 0;
    const totalViews = 1 + galleryLength + 2;

    // Reset view when product changes
    useEffect(() => {
        setActiveView(0);
    }, [product.id]);

    const renderView = (index: number, isThumbnail: boolean = false) => {
        const iconClass = isThumbnail ? "w-8 h-8" : "w-64 h-64 md:w-96 md:h-96";
        
        // View 0: Main Illustration (Full Color + Glow)
        if (index === 0) {
            return (
              <div className="w-full h-full flex items-center justify-center relative bg-[#050505] overflow-hidden animate-fade-in-up">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at center, ${rarityColor} 0%, transparent 70%)` }}></div>
                  <svg viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500`} style={{ color: rarityColor }}>
                      <path d={illustrationPath} />
                  </svg>
              </div>
            );
        }
  
        // Gallery images (Indices 1 to galleryLength)
        if (index > 0 && index <= galleryLength) {
            return <img src={product.gallery![index - 1]} alt={`View ${index}`} className="w-full h-full object-cover animate-fade-in-up" />;
        }
  
        // Schematic View (Index after gallery)
        if (index === galleryLength + 1) {
             return (
              <div className="w-full h-full flex items-center justify-center relative bg-[#080808] overflow-hidden animate-fade-in-up">
                   <div className="absolute inset-0 bg-[size:10px_10px] bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] opacity-50"></div>
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isThumbnail ? "1" : "0.5"} className={`${iconClass} text-[#00FF41] opacity-80`}>
                       <path d={illustrationPath} />
                   </svg>
                   {!isThumbnail && <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white border border-white px-2 py-1 uppercase tracking-widest">Schematic Mode</div>}
              </div>
             );
        }
  
        // Internal Structure View (Index after Schematic)
        if (index === galleryLength + 2) {
             return (
              <div className="w-full h-full flex items-center justify-center relative bg-[#050505] overflow-hidden animate-fade-in-up">
                   <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.05)_1px,transparent_1px)] bg-[size:100%_4px]"></div>
                   <svg viewBox="0 0 24 24" fill="currentColor" className={`${iconClass} text-[#333]`} style={{ transform: 'scale(1.2) rotate(5deg)', opacity: 0.3 }}>
                       <path d={illustrationPath} />
                   </svg>
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="1 1" className={`${iconClass} text-white absolute`}>
                       <path d={illustrationPath} />
                   </svg>
                   {!isThumbnail && <div className="absolute top-4 left-4 text-[10px] font-mono text-white bg-red-500/20 px-2 py-1 border border-red-500/50 uppercase tracking-widest">Internal Structure</div>}
              </div>
             );
        }
  
        return null;
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Main Stage */}
            <div className="w-full aspect-[4/3] bg-[#111] border border-[#1A1A1A] relative overflow-hidden group hover:border-[#00FF41]/50 transition-colors duration-500">
                {renderView(activeView)}
                
                <div className="absolute inset-0 bg-[linear-gradient(transparent_90%,#00FF41_100%)] opacity-10 pointer-events-none"></div>
                
                {/* Live Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/80 backdrop-blur border border-[#333] px-3 py-1 shadow-lg z-10 transition-all hover:border-[#00FF41] hover:shadow-[0_0_10px_rgba(0,255,65,0.2)]">
                    <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-[#00FF41]' : 'bg-[#FF3333]'} animate-pulse`}></div>
                    <span className="text-xs font-mono text-white tracking-wider">
                        {isPositive ? '+' : ''}{percentChange.toFixed(1)}% MARKET
                    </span>
                </div>
            </div>
            
            {/* Gallery Thumbs */}
            <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                {Array.from({ length: totalViews }).map((_, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => setActiveView(idx)}
                        className={`aspect-video bg-[#111] border relative overflow-hidden group transition-all duration-300 hover:scale-[1.02] active:scale-95 btn-press ${activeView === idx ? 'border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.1)]' : 'border-[#1A1A1A] hover:border-[#666]'}`}
                    >
                        {renderView(idx, true)}
                    </button>
                ))}
            </div>
        </div>
    );
};
