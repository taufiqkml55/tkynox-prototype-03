
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Product } from '../../types';
import { Sparkline } from './Sparkline';

interface MarketTableProps {
    products: Product[];
    marketPrices: Record<string, number>;
    marketHistory: Record<string, number[]>;
    tCats: any;
    t: any;
    onCategoryClick: (category: string) => void;
}

export const MarketTable: React.FC<MarketTableProps> = ({ products, marketPrices, marketHistory, tCats, t, onCategoryClick }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[#0D0D0D] border border-[#1A1A1A] flex flex-col h-[60vh] min-h-[400px] shadow-2xl">
            {/* Control Bar */}
            <div className="p-3 border-b border-[#333] bg-[#111] flex flex-col md:flex-row justify-between items-center gap-3 shrink-0">
                <div className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 w-full md:w-auto">
                    <span className="w-2 h-2 bg-[#00FF41] animate-pulse"></span>
                    ACTIVE ASSETS ({filteredProducts.length})
                </div>
                <div className="relative w-full md:w-64 group">
                    <input 
                        type="text" 
                        placeholder="SEARCH_TICKER..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#050505] border border-[#333] py-1.5 px-3 pl-8 text-xs text-white font-mono focus:border-[#00FF41] outline-none uppercase transition-colors placeholder-[#444]"
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#444] group-focus-within:text-[#00FF41] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 md:gap-4 p-2 px-4 border-b border-[#333] bg-[#1A1A1A] text-[9px] font-bold text-[#888] uppercase tracking-widest font-mono shrink-0 sticky top-0 z-10">
                <div className="col-span-5 md:col-span-3">{t.asset_name}</div>
                <div className="col-span-2 hidden md:block">{t.category}</div>
                <div className="col-span-4 md:col-span-2 text-right">{t.price}</div>
                <div className="col-span-3 md:col-span-2 text-right">{t.change_24h}</div>
                <div className="col-span-3 text-right hidden md:block">{t.trend}</div>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto flex-1 divide-y divide-[#1A1A1A] scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-[#0D0D0D]">
                {filteredProducts.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-[#444] font-mono text-xs uppercase">
                        <span className="text-2xl mb-2 opacity-50">∅</span>
                        NO ASSETS FOUND
                    </div>
                ) : (
                    filteredProducts.map((product) => {
                        const currentPrice = marketPrices[product.id] || product.price;
                        const history = marketHistory[product.id] || [product.price];
                        const startPrice = history[0] || product.price;
                        const change = currentPrice - startPrice;
                        const percent = (change / startPrice) * 100;
                        const isPositive = change >= 0;

                        return (
                            <div key={product.id} className="grid grid-cols-12 gap-2 md:gap-4 py-2 px-4 items-center hover:bg-[#111] transition-colors group">
                                <div className="col-span-5 md:col-span-3">
                                    <div className="font-bold text-white text-[10px] md:text-xs group-hover:text-[#00FF41] transition-colors truncate">{product.name}</div>
                                    <div className="text-[8px] text-[#666] font-mono hidden md:block">{product.id}</div>
                                </div>
                                <div className="col-span-2 hidden md:block">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onCategoryClick(product.category); }}
                                        className="text-[8px] text-[#888] font-mono px-1.5 py-0.5 bg-[#050505] border border-[#333] hover:border-[#00FF41] hover:text-[#00FF41] transition-colors cursor-pointer uppercase"
                                    >
                                        {tCats[product.category]}
                                    </button>
                                </div>
                                <div className="col-span-4 md:col-span-2 text-right font-mono text-white text-xs">
                                    ${currentPrice.toFixed(2)}
                                </div>
                                <div className={`col-span-3 md:col-span-2 text-right font-mono text-xs ${isPositive ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                                    {isPositive ? '+' : ''}{percent.toFixed(2)}%
                                </div>
                                <div className="col-span-3 hidden md:flex justify-end items-center opacity-60 group-hover:opacity-100">
                                    <Sparkline data={history} color={isPositive ? '#00FF41' : '#FF3333'} width={100} height={20} />
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};
