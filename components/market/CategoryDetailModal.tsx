
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { MARKET_ANALYSIS } from '../../data/marketAnalysis';
import { Sparkline } from './Sparkline';

interface CategoryDetailModalProps {
    category: string;
    stats: { avgPrice: number, history: number[] } | undefined;
    onClose: () => void;
}

export const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({ category, stats, onClose }) => {
    const analysis = MARKET_ANALYSIS[category] || {
        sentiment: 'NEUTRAL',
        volatility: 'LOW',
        volume: '---',
        analystNote: "No specific data available for this sector. Standard market fluctuations apply.",
        news: [],
        regulatoryStatus: "UNKNOWN"
    };

    const isBullish = analysis.sentiment === 'BULLISH';
    const isBearish = analysis.sentiment === 'BEARISH';
    const sentimentColor = isBullish ? 'text-[#00FF41]' : isBearish ? 'text-[#FF3333]' : 'text-yellow-500';
    const borderColor = isBullish ? 'border-[#00FF41]' : isBearish ? 'border-[#FF3333]' : 'border-yellow-500';

    return (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-start justify-center p-4 pt-20 md:pt-24 animate-fade-in-up overflow-y-auto" onClick={onClose}>
            <div 
                className={`w-full max-w-4xl bg-[#0D0D0D] border ${borderColor} p-1 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] mb-8`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="bg-[#111] p-6 border-b border-[#333] flex justify-between items-start sticky top-0 z-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tighter">{category} SECTOR</h2>
                            <span className={`px-2 py-1 text-[10px] border ${borderColor} ${sentimentColor} font-mono uppercase`}>
                                {analysis.sentiment}
                            </span>
                        </div>
                        <div className="text-xs text-[#666] font-mono">
                            REPORT ID: {category.substring(0,3).toUpperCase()}-{Math.floor(Math.random() * 9999)} // LIVE FEED
                        </div>
                    </div>
                    <button onClick={onClose} className="text-[#666] hover:text-white font-mono text-xl p-2 border border-transparent hover:border-[#333]">[ X ]</button>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Col: Stats */}
                    <div className="lg:col-span-1 space-y-6 border-r border-[#222] pr-6">
                        <div>
                            <div className="text-[10px] text-[#666] font-mono uppercase mb-1">Average Index Price</div>
                            <div className="text-2xl text-white font-mono font-bold">
                                ${stats?.avgPrice.toFixed(2) || '0.00'}
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-[#666] font-mono uppercase mb-1">24h Volume</div>
                            <div className="text-white font-mono">{analysis.volume}</div>
                        </div>

                        <div>
                            <div className="text-[10px] text-[#666] font-mono uppercase mb-1">Volatility Index</div>
                            <div className={`text-sm font-bold font-mono ${analysis.volatility === 'EXTREME' || analysis.volatility === 'HIGH' ? 'text-[#FF3333]' : 'text-[#00FF41]'}`}>
                                {analysis.volatility}
                            </div>
                            <div className="w-full h-1 bg-[#222] mt-2">
                                <div 
                                    className={`h-full ${analysis.volatility === 'EXTREME' || analysis.volatility === 'HIGH' ? 'bg-[#FF3333]' : 'bg-[#00FF41]'}`} 
                                    style={{ width: analysis.volatility === 'LOW' ? '25%' : analysis.volatility === 'MODERATE' ? '50%' : analysis.volatility === 'HIGH' ? '75%' : '100%' }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <div className="text-[10px] text-[#666] font-mono uppercase mb-1">Regulatory Status</div>
                            <div className="text-xs border border-[#333] bg-[#050505] px-2 py-1 inline-block text-[#888] font-mono">
                                {analysis.regulatoryStatus}
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Analysis */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        {/* Chart Placeholder */}
                        <div className="bg-[#050505] border border-[#333] p-4 h-32 relative flex flex-col justify-end">
                            <div className="absolute top-2 left-2 text-[10px] text-[#444] font-mono">PRICE ACTION (1H)</div>
                            {stats?.history && (
                                <Sparkline data={stats.history} color={isBullish ? '#00FF41' : (isBearish ? '#FF3333' : '#A0A0A0')} width={500} height={80} />
                            )}
                        </div>

                        <div>
                            <h3 className="text-xs font-bold text-[#fff] uppercase tracking-widest mb-3 border-b border-[#333] pb-2">
                                Chief Analyst Note
                            </h3>
                            <p className="text-sm text-[#CCCCCC] font-mono leading-relaxed">
                                "{analysis.analystNote}"
                            </p>
                        </div>

                        {analysis.news.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold text-[#fff] uppercase tracking-widest mb-3 border-b border-[#333] pb-2">
                                    Sector News Stream
                                </h3>
                                <ul className="space-y-2">
                                    {analysis.news.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-xs font-mono text-[#888]">
                                            <span className="text-[#00FF41]">&gt;</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#111] p-4 border-t border-[#333] text-center">
                    <p className="text-[9px] text-[#444] font-mono uppercase">
                        DATA PROVIDED BY TKYNOX FINANCIAL SERVICES. PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS.
                    </p>
                </div>
            </div>
        </div>
    );
};
