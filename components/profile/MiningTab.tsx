
import React from 'react';
import { User } from '../../types';
import Tooltip from '../Tooltip';

interface MiningTabProps {
    miningHardware: { product: any, count: number }[];
    currentTotalHashrate: number;
    user: User;
    onExchange?: () => void;
    isRestricted: boolean;
    t: any;
    cryptoSymbol: string;
}

export const MiningTab: React.FC<MiningTabProps> = ({ miningHardware, currentTotalHashrate, user, onExchange, isRestricted, t, cryptoSymbol }) => {
    return (
        <div className="animate-fade-in-up space-y-8">
                <div className="bg-[#0A0A0A] border border-[#00FF41] p-0 relative overflow-hidden shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                <div className="bg-[#00FF41]/10 border-b border-[#00FF41]/30 p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#00FF41] animate-pulse"></div>
                        <h2 className="text-sm font-bold text-[#00FF41] font-mono tracking-widest uppercase">{t.mining_command}</h2>
                    </div>
                    <div className="text-[10px] text-[#00FF41] font-mono">
                        TARGET: {cryptoSymbol}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-[#333]">
                        <div className="p-8 border-b lg:border-b-0 lg:border-r border-[#333] bg-[#050505]">
                            <div className="text-[#666] text-[10px] font-mono uppercase mb-2">{t.agg_hashrate}</div>
                            <div className="text-4xl font-bold text-white font-mono">{currentTotalHashrate} <span className="text-sm text-[#888]">TH/s</span></div>
                            <div className="text-[10px] text-[#444] mt-2 font-mono uppercase">Efficiency: 98.4%</div>
                        </div>
                        <div className="p-8 border-b lg:border-b-0 lg:border-r border-[#333] bg-[#050505]">
                            <div className="text-[#666] text-[10px] font-mono uppercase mb-2">{t.current_balance}</div>
                            <div className="text-4xl font-bold text-white font-mono truncate">
                                {(user.cryptoPortfolio['TKNX'] || 0).toFixed(4)} <span className="text-sm text-[#888]">{cryptoSymbol}</span>
                            </div>
                            {onExchange && (
                                <Tooltip text={isRestricted ? "Restricted" : "Trade Crypto"}>
                                <button onClick={onExchange} className={`text-[10px] mt-2 font-mono uppercase hover:underline ${isRestricted ? 'text-gray-500 cursor-not-allowed' : 'text-[#00FF41] decoration-[#00FF41]'}`}>
                                    &gt;&gt; {isRestricted ? 'LOCKED' : 'TRADE ON EXCHANGE'}
                                </button>
                                </Tooltip>
                            )}
                        </div>
                        <div className="p-8 bg-[#050505]">
                            <div className="text-[#666] text-[10px] font-mono uppercase mb-2">{t.active_nodes}</div>
                            <div className="text-4xl font-bold text-white font-mono">{miningHardware.reduce((a,b) => a + b.count, 0)} <span className="text-sm text-[#888]">UNITS</span></div>
                            <div className="text-[10px] text-[#00FF41] mt-2 font-mono uppercase animate-pulse">ALL SYSTEMS ONLINE</div>
                        </div>
                </div>

                <div className="bg-black p-6 font-mono text-xs h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-50"></div>
                        <div className="space-y-1 text-[#00FF41]/80 animate-[fade-in-up_20s_infinite_linear]">
                            {Array.from({length: 12}).map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="text-[#666]">{new Date().toLocaleTimeString()}</span>
                                    <span>&gt; BLOCK_{Math.floor(Math.random() * 999999)} SOLVED. REWARD: {(Math.random() * 0.005).toFixed(5)} {cryptoSymbol}</span>
                                </div>
                            ))}
                        </div>
                </div>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-6 border-b border-[#333] pb-2">{t.node_config}</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {miningHardware.map((item) => (
                            <div key={item.product.id} className="flex flex-col md:flex-row md:items-center justify-between bg-[#0D0D0D] border border-[#1A1A1A] p-4 hover:border-[#333] transition-colors">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <div className="w-16 h-16 bg-black border border-[#333] shrink-0 relative">
                                        <img src={item.product.imageUrl} className="w-full h-full object-cover grayscale opacity-70" />
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00FF41] border border-black"></div>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-sm uppercase">{item.product.name}</div>
                                        <div className="text-[#666] text-[10px] font-mono mt-1">{item.product.id}</div>
                                        <div className="text-[#00FF41] text-xs font-mono mt-1 bg-[#00FF41]/10 px-2 py-0.5 inline-block">{t.running}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between md:justify-end gap-8 md:gap-12 border-t md:border-t-0 border-[#222] pt-4 md:pt-0">
                                    <div>
                                        <div className="text-[#666] text-[10px] font-mono uppercase mb-1">Individual Rate</div>
                                        <div className="text-white font-bold font-mono text-sm">{item.product.hashrate} TH/s</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[#666] text-[10px] font-mono uppercase mb-1">{t.contribution}</div>
                                        <div className="text-[#00FF41] font-bold font-mono text-sm">
                                            {((item.product.hashrate || 0) / (currentTotalHashrate || 1) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};
