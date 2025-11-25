
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useContext, useState } from 'react';
import { Product, Language } from '../types';
import { TranslationContext } from '../contexts/TranslationContext';
import { CategoryIndices } from './market/CategoryIndices';
import { MarketTable } from './market/MarketTable';
import { GlobalActivityFeed } from './market/GlobalActivityFeed';
import { CategoryDetailModal } from './market/CategoryDetailModal';
import { audioSystem } from '../services/audioSystem';

interface MarketOverviewProps {
    products: Product[];
    marketPrices: Record<string, number>;
    marketHistory: Record<string, number[]>;
    onBack: () => void;
    language: Language;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ products, marketPrices, marketHistory, onBack, language }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    
    const { market: t, common: tCommon, categories: tCats } = useContext(TranslationContext);

    // Calculate Aggregates per Category
    const categoryStats = useMemo(() => {
        const stats: Record<string, { total: number, count: number, history: number[] }> = {};
        
        products.forEach(p => {
            const price = marketPrices[p.id] || p.price;
            if (!stats[p.category]) {
                stats[p.category] = { total: 0, count: 0, history: Array(20).fill(0) };
            }
            stats[p.category].total += price;
            stats[p.category].count += 1;
            
            // Add to aggregate history
            const hist = marketHistory[p.id] || [];
            hist.forEach((val, i) => {
                if (stats[p.category].history[i] !== undefined) {
                    stats[p.category].history[i] += val;
                } else {
                    stats[p.category].history[i] = val;
                }
            });
        });

        return Object.entries(stats).map(([cat, data]) => ({
            name: cat,
            avgPrice: data.total / data.count,
            // Avg history for sparkline
            history: data.history.map(h => h / data.count).filter(n => !isNaN(n))
        }));
    }, [marketPrices, marketHistory, products]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
        audioSystem.playClick();
    };

    const getStatsForCategory = (cat: string) => {
        return categoryStats.find(c => c.name === cat);
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-24 px-6 animate-fade-in-up">
            <div className="max-w-[1800px] mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-12 border-b border-[#333] pb-6">
                    <div>
                        <button 
                            onClick={onBack}
                            className="group flex items-center gap-2 text-xs font-mono text-[#666] hover:text-[#00FF41] transition-colors mb-4 uppercase"
                        >
                            <span className="text-lg leading-none">&lt;</span>
                            {tCommon.return_grid}
                        </button>
                        <div className="flex items-center gap-3">
                            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{t.title}</h1>
                            <span className="w-3 h-3 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]"></span>
                        </div>
                    </div>
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-mono text-[#666] mb-1">NETWORK STATUS</div>
                        <div className="text-[#00FF41] font-mono font-bold flex items-center gap-2 justify-end">
                            <span className="w-1.5 h-1.5 bg-[#00FF41] rounded-full"></span>
                            GLOBAL FEED: ACTIVE
                        </div>
                    </div>
                </div>

                <CategoryIndices 
                    categoryStats={categoryStats} 
                    tCats={tCats} 
                    onCategoryClick={handleCategoryClick}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MarketTable 
                            products={products} 
                            marketPrices={marketPrices} 
                            marketHistory={marketHistory} 
                            tCats={tCats} 
                            t={t} 
                            onCategoryClick={handleCategoryClick}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <GlobalActivityFeed />
                    </div>
                </div>

                {/* Disclaimer Footer */}
                <div className="mt-8 text-center">
                    <p className="text-[10px] text-[#444] font-mono uppercase">
                        {t.disclaimer}
                    </p>
                </div>
            </div>

            {selectedCategory && (
                <CategoryDetailModal 
                    category={selectedCategory}
                    stats={getStatsForCategory(selectedCategory)}
                    onClose={() => setSelectedCategory(null)}
                />
            )}
        </div>
    );
};

export default MarketOverview;
