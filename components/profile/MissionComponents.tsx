
import React from 'react';
import { Mission } from '../../types';

interface MissionCardProps {
    mission: Mission;
    isCompleted: boolean;
}

export const MissionCard: React.FC<MissionCardProps> = ({ mission, isCompleted }) => (
    <div className={`relative border p-4 transition-all duration-500 group ${
        isCompleted 
        ? 'bg-[#00FF41]/5 border-[#00FF41] shadow-[0_0_15px_rgba(0,255,65,0.1)]' 
        : 'bg-[#0D0D0D] border-[#333] hover:border-[#666]'
    }`}>
        <div className="absolute top-2 right-2">
            <span className={`text-[9px] font-mono uppercase font-bold px-1.5 py-0.5 border ${
                isCompleted ? 'text-[#00FF41] border-[#00FF41]' : 'text-[#666] border-[#333]'
            }`}>
                {isCompleted ? 'COMPLETE' : 'DAILY'}
            </span>
        </div>
        
        <div className="flex justify-between items-start mb-3 mt-1">
            <div className={`text-3xl transition-transform duration-300 ${isCompleted ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`}>
                {mission.icon}
            </div>
        </div>
        
        <h4 className={`font-bold text-sm mb-1 ${isCompleted ? 'text-[#00FF41]' : 'text-white'}`}>
            {mission.title}
        </h4>
        <p className="text-xs text-[#888] font-mono leading-tight min-h-[2.5em]">
            {mission.description}
        </p>
        
        <div className="mt-4 pt-3 border-t border-[#222] flex justify-between items-center text-xs font-mono">
            <span className="text-[#666] uppercase tracking-wider">Reward</span>
            <div className={`font-bold px-2 py-0.5 ${isCompleted ? 'bg-[#00FF41] text-black' : 'bg-[#1A1A1A] text-white'}`}>
                ${mission.reward.toFixed(2)}
            </div>
        </div>
    </div>
);

interface MissionRowProps {
    mission: Mission;
    isUnlocked: boolean;
    isClaimed: boolean;
    progress: number;
    target: number;
    onClaim: (id: string) => void;
    onPlay: (id: string) => void;
}

export const MissionRow: React.FC<MissionRowProps> = ({ mission, isUnlocked, isClaimed, progress, target, onClaim, onPlay }) => {
    const isCompleted = progress >= target;
    const percent = target > 0 ? Math.min(100, (progress / target) * 100) : (isUnlocked ? 100 : 0);
    const typeLabel = mission.type === 'infinite' ? 'INFINITE' : mission.type === 'one-time' ? 'CAMPAIGN' : 'MISC';

    return (
        <div className={`flex flex-col md:flex-row items-center justify-between border p-4 gap-4 transition-all duration-300 ${
            isClaimed 
            ? 'bg-[#0A0A0A] border-[#333] opacity-60' 
            : isCompleted
                ? 'bg-[#00FF41]/5 border-[#00FF41] shadow-[0_0_10px_rgba(0,255,65,0.05)]'
                : 'bg-[#0D0D0D] border-[#333] hover:border-[#555]'
        }`}>
            <div className="flex items-center gap-4 flex-1 w-full">
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border text-2xl ${
                    isCompleted && !isClaimed
                    ? 'border-[#00FF41] bg-[#00FF41] text-black'
                    : 'border-[#333] bg-black text-white'
                }`}>
                    {mission.icon}
                </div>
                
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold font-mono text-[#666] border border-[#333] px-1 rounded-sm uppercase">
                            {typeLabel}
                        </span>
                        <h4 className={`font-bold text-sm truncate ${isCompleted ? 'text-white' : 'text-[#AAA]'}`}>
                            {mission.title}
                        </h4>
                        {isClaimed && <span className="text-[9px] bg-[#333] text-[#888] px-1.5 font-bold rounded-sm">CLAIMED</span>}
                    </div>
                    <p className="text-xs text-[#666] truncate md:whitespace-normal">{mission.description}</p>
                    
                    {/* Enhanced Progress Bar */}
                    {mission.type !== 'infinite' && (
                        <div className="mt-2 w-full md:w-64 h-2 bg-[#1A1A1A] rounded-full overflow-hidden relative">
                            <div 
                                className={`h-full transition-all duration-700 ease-out relative ${
                                    isCompleted ? 'bg-[#00FF41]' : 'bg-[#444]'
                                }`} 
                                style={{ width: `${percent}%` }}
                            >
                                {/* Striped overlay for active progress */}
                                {!isCompleted && percent > 0 && (
                                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:10px_10px]"></div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                    <div className="text-[9px] text-[#666] font-mono uppercase mb-0.5">REWARD</div>
                    <div className={`font-bold font-mono text-sm px-2 py-0.5 border ${
                        isCompleted ? 'text-[#00FF41] border-[#00FF41] bg-[#00FF41]/10' : 'text-[#888] border-[#333] bg-[#111]'
                    }`}>
                        ${mission.reward.toFixed(2)}
                    </div>
                </div>
                
                {mission.type === 'infinite' ? (
                    <button 
                        onClick={() => onPlay(mission.actionId)}
                        className="bg-[#00FF41] text-black px-6 py-3 text-xs font-bold uppercase hover:bg-white transition-colors clip-path-slant min-w-[100px]"
                    >
                        START
                    </button>
                ) : (
                    <button 
                        onClick={() => onClaim(mission.id)}
                        disabled={!isCompleted || isClaimed}
                        className={`px-6 py-3 text-xs font-bold uppercase transition-colors border min-w-[100px] clip-path-slant ${
                            isClaimed 
                                ? 'border-[#333] text-[#666] bg-transparent cursor-not-allowed' 
                                : isCompleted 
                                    ? 'bg-[#00FF41] text-black border-[#00FF41] hover:bg-white hover:text-black animate-pulse' 
                                    : 'border-[#333] text-[#666] bg-transparent cursor-not-allowed'
                        }`}
                    >
                        {isClaimed ? 'DONE' : isCompleted ? 'CLAIM' : `${progress}/${target}`}
                    </button>
                )}
            </div>
        </div>
    );
};
