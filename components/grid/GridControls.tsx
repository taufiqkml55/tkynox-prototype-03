
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

const categoryKeys = ['All', 'Mining', 'Physical', 'Sustenance', 'Course', 'Digital', 'Apparel', 'EdTech', 'Fintech', 'Wellness', 'Automation', 'Templates', 'Security'];

interface GridControlsProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeCategory: string;
    onCategoryChange: (cat: string) => void;
    t: any;
    tCats: any;
}

export const GridControls: React.FC<GridControlsProps> = ({ searchQuery, onSearchChange, activeCategory, onCategoryChange, t, tCats }) => {
    const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);
    const activeIndex = categoryKeys.indexOf(activeCategory);

    return (
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-20 pb-8 border-b border-[#1A1A1A] gap-8">
          <div className="flex-1 w-full">
             <span className="font-mono text-[#00FF41] text-xs mb-2 block">{t.inventory_db}</span>
             <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t.acquisition}</h2>
          </div>
          
          {/* Controls Container */}
          <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
            
            {/* Search Input */}
            <div className="relative w-full md:w-[300px] group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#333] group-focus-within:bg-[#00FF41] transition-colors"></div>
                <input 
                    type="text" 
                    aria-label="Search Inventory"
                    placeholder={t.search_placeholder} 
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-[#0D0D0D] border border-[#333] py-3 px-4 pl-6 text-white placeholder-[#666] outline-none focus:border-[#00FF41] transition-colors font-mono text-sm uppercase"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333] group-focus-within:text-[#00FF41] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
            </div>

            {/* Filter Buttons */}
            <div className="grid grid-cols-2 md:flex md:flex-wrap justify-start md:justify-end gap-2 md:gap-4 w-full md:w-auto" role="group" aria-label="Product Categories">
                {categoryKeys.map((catKey, index) => {
                    let isVisibleMobile = true;
                    
                    if (!mobileFiltersExpanded) {
                        const isActiveFarDown = activeIndex >= 4;
                        if (index < 3) {
                            isVisibleMobile = true; 
                        } else if (index === 3) {
                            isVisibleMobile = !isActiveFarDown;
                        } else {
                            isVisibleMobile = catKey === activeCategory;
                        }
                    }

                    const isMining = catKey === 'Mining';

                    return (
                        <button
                            key={catKey}
                            onClick={() => onCategoryChange(catKey)}
                            aria-pressed={activeCategory === catKey}
                            className={`text-xs font-bold uppercase tracking-widest px-3 py-2 md:px-4 md:py-2 border transition-all duration-300 w-full md:w-auto relative group ${
                            activeCategory === catKey 
                                ? 'border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41]' 
                                : isMining
                                    ? 'border-[#00FF41] text-white shadow-[0_0_15px_rgba(0,255,65,0.3)] hover:bg-[#00FF41] hover:text-black'
                                    : 'border-[#333] text-[#888] hover:border-[#666] hover:text-white'
                            } ${isVisibleMobile ? 'block' : 'hidden md:block'}`}
                        >
                            <span className="flex items-center justify-center gap-2 relative z-10">
                                {isMining && <span>⛏</span>}
                                {tCats[catKey as keyof typeof tCats]}
                            </span>
                        </button>
                    );
                })}
                
                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
                    className={`col-span-2 md:hidden w-full mt-2 text-xs font-bold uppercase tracking-widest px-3 py-3 border border-[#333] text-[#666] hover:text-white transition-colors ${
                        mobileFiltersExpanded ? 'bg-[#333] text-white' : 'bg-[#0D0D0D]'
                    }`}
                >
                    {mobileFiltersExpanded ? 'SEE LESS [-]' : 'SEE MORE [+]'}
                </button>
            </div>
          </div>
        </div>
    );
};
