
import React from 'react';
import { User } from '../../types';
import Tooltip from '../Tooltip';

interface StatusTabProps {
    user: User;
    totalPortfolioValue: number;
    totalUnrealizedPL: number;
    activeCryptoAssets: { symbol: string, amount: number, info: { color: string } }[];
    onExchange?: () => void;
    handleCopyReferral: () => void;
    onInvite: () => void;
    t: any;
    isRestricted: boolean;
}

export const StatusTab: React.FC<StatusTabProps> = ({ user, totalPortfolioValue, totalUnrealizedPL, activeCryptoAssets, onExchange, handleCopyReferral, t, isRestricted }) => {
    const currentLevel = user.level;
    const nextLevelXp = currentLevel * 1000;
    const progress = (user.xp % 1000) / 1000 * 100;
    const displayId = user.uniqueId || user.referralCode || 'PENDING';

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Balance Card */}
                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 text-[#1A1A1A] text-9xl font-bold opacity-20 select-none group-hover:text-[#00FF41] group-hover:opacity-5 transition-all">$</div>
                    <h3 className="text-xs text-[#666] font-mono uppercase tracking-widest mb-2">{t.fiat_liquidity}</h3>
                    <div className="text-4xl font-bold text-white font-mono mb-4">
                        {user.balance === Infinity ? (
                            <span className="text-5xl">∞</span>
                        ) : (
                            `$${user.balance.toFixed(2)}`
                        )} <span className="text-sm text-[#00FF41]">USD</span>
                    </div>
                </div>

                {/* Portfolio Value */}
                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 relative overflow-hidden group">
                    <h3 className="text-xs text-[#666] font-mono uppercase tracking-widest mb-2">{t.item_valuation}</h3>
                    <div className="text-4xl font-bold text-white font-mono mb-2">
                        ${totalPortfolioValue.toFixed(2)}
                    </div>
                    <div className={`text-sm font-mono font-bold ${totalUnrealizedPL >= 0 ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                        {totalUnrealizedPL >= 0 ? '+' : ''}{totalUnrealizedPL.toFixed(2)} P/L
                    </div>
                </div>

                {/* Level Card */}
                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="text-xs text-[#666] font-mono uppercase tracking-widest">{t.clearance_level}</h3>
                            <span className="text-2xl font-bold text-[#00FF41]">{currentLevel}</span>
                        </div>
                        <div className="w-full h-2 bg-[#222] mb-1">
                            <div 
                                className="h-full bg-[#00FF41] relative" 
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 -top-1 w-1 h-4 bg-white shadow-[0_0_10px_#fff]"></div>
                            </div>
                        </div>
                        <div className="flex justify-between text-[10px] text-[#444] font-mono">
                            <span>0 XP</span>
                            <span>{nextLevelXp} XP</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Crypto Breakdown */}
            <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8">
                <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-4">
                    <h3 className="text-xs text-[#666] font-mono uppercase tracking-widest">{t.crypto_assets}</h3>
                    {onExchange && (
                        <button 
                            onClick={onExchange} 
                            className={`text-xs underline font-mono hover:text-white flex items-center gap-2 ${isRestricted ? 'text-gray-500 cursor-not-allowed' : 'text-[#00FF41]'}`}
                        >
                            EXCHANGE {isRestricted ? '🔒' : '>'}
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {activeCryptoAssets.map(asset => (
                        <div key={asset.symbol} className="bg-[#111] p-4 border border-[#222] hover:border-[#666] transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: asset.info.color }}></div>
                                <span className="text-xs font-bold text-white">{asset.symbol}</span>
                            </div>
                            <div className="text-lg font-mono text-white font-bold truncate" title={asset.amount.toString()}>
                                {(asset.amount as any).toLocaleString(undefined, { maximumFractionDigits: 6 })}
                            </div>
                        </div>
                    ))}
                    {activeCryptoAssets.length === 0 && (
                        <div className="col-span-full text-xs text-[#666] font-mono italic py-2">
                            NO CRYPTO ASSETS DETECTED.
                        </div>
                    )}
                </div>
            </div>

            {/* Referral Module */}
            <div className="bg-[#111] border border-[#333] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{t.recruit_title}</h3>
                    <p className="text-sm text-[#888] font-light">{t.recruit_desc}</p>
                </div>
                <div className="w-full md:w-auto flex gap-0">
                    <div className="bg-black border border-[#333] px-4 py-3 text-[#00FF41] font-mono text-lg tracking-widest select-all">
                        {displayId}
                    </div>
                    <Tooltip text="COPY UNIQUE ID">
                        <button 
                            onClick={handleCopyReferral}
                            className="bg-[#333] hover:bg-[#00FF41] hover:text-black text-white px-6 py-3 font-bold text-sm uppercase transition-colors"
                        >
                            COPY
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
