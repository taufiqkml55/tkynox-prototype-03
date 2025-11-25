
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Sparkline } from './Sparkline';

interface CategoryIndicesProps {
    categoryStats: { name: string, avgPrice: number, history: number[] }[];
    tCats: any;
    onCategoryClick: (category: string) => void;
}

export const CategoryIndices: React.FC<CategoryIndicesProps> = ({ categoryStats, tCats, onCategoryClick }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4 mb-8 md:mb-12">
            {categoryStats.map((cat) => {
                // Calculate trend
                const start = cat.history[0] || cat.avgPrice;
                const end = cat.avgPrice;
                const change = end - start;
                const isPositive = change >= 0;
                
                return (
                    <div 
                        key={cat.name} 
                        onClick={() => onCategoryClick(cat.name)}
                        className="bg-[#0A0A0A] border border-[#1A1A1A] p-3 md:p-4 hover:border-[#00FF41] hover:bg-[#00FF41]/5 transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-[8px] md:text-[10px] text-[#666] font-mono uppercase tracking-widest group-hover:text-[#00FF41] truncate pr-2">
                                {tCats[cat.name as keyof typeof tCats]}
                            </h3>
                            <span className="text-[8px] text-[#333] group-hover:text-[#00FF41] opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">VIEW</span>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 md:mb-4">
                            <span className="text-sm md:text-xl font-bold text-white font-mono">${cat.avgPrice.toFixed(2)}</span>
                            <span className={`text-[9px] md:text-xs font-mono ${isPositive ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                                {isPositive ? '+' : ''}{((change / start) * 100).toFixed(2)}%
                            </span>
                        </div>
                        <div className="h-8 md:h-12 border-t border-[#1A1A1A] pt-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <Sparkline data={cat.history} color={isPositive ? '#00FF41' : '#FF3333'} width={120} height={30} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
