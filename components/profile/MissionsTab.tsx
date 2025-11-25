import React from 'react';
import { Mission, User, ProfileTab } from '../../types';
import { MissionCard, MissionRow } from './MissionComponents';

interface MissionsTabProps {
    missions: Mission[];
    user: User;
    onClaim: (id: string) => void;
    onPlay?: (id: string, tab: ProfileTab) => void;
    t: any;
    totalItemsPurchased: number;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({ missions, user, onClaim, onPlay, t, totalItemsPurchased }) => {
    return (
        <div className="animate-fade-in-up">
            <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-6 border-b border-[#333] pb-2">{t.daily_protocols}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {missions.filter(m => m.type === 'daily').map((mission) => (
                    <MissionCard 
                        key={mission.id} 
                        mission={mission} 
                        isCompleted={user.lastLoginDate === new Date().toISOString().split('T')[0]} 
                    />
                ))}
            </div>

            {missions.some(m => m.type === 'infinite') && (
                <div className="mb-12" id="active-simulations">
                    <h3 className="text-xs font-bold text-[#00FF41] uppercase tracking-widest mb-6 border-b border-[#00FF41]/30 pb-2 flex items-center gap-2">
                        <span className="animate-pulse">●</span> Active Simulations
                    </h3>
                    <div className="flex flex-col gap-3">
                        {missions.filter(m => m.type === 'infinite').map((mission) => {
                            const isUnlocked = user.completedMissions.includes(mission.id);
                            const isClaimed = user.claimedMissions ? user.claimedMissions.includes(mission.id) : false;
                            const currentProgress = isUnlocked ? 1 : 0;
                            const target = mission.target || 1;

                            return (
                                <MissionRow 
                                    key={mission.id} 
                                    mission={mission} 
                                    isUnlocked={isUnlocked}
                                    isClaimed={isClaimed}
                                    progress={currentProgress}
                                    target={target}
                                    onClaim={onClaim}
                                    onPlay={(id) => onPlay && onPlay(id, 'missions')}
                                />
                            );
                        })}
                    </div>
                </div>
            )}

            <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-6 border-b border-[#333] pb-2">{t.directives}</h3>
            <div className="flex flex-col gap-3">
                {missions.filter(m => m.type === 'one-time').map((mission) => {
                        const isUnlocked = user.completedMissions.includes(mission.id);
                        const isClaimed = user.claimedMissions ? user.claimedMissions.includes(mission.id) : false;
                        
                        let currentProgress = 0;
                        let target = mission.target || 1;
                        
                        if (mission.target) {
                            currentProgress = totalItemsPurchased;
                            if (currentProgress > target) currentProgress = target;
                        } else {
                            currentProgress = isUnlocked ? 1 : 0;
                        }

                        return (
                        <MissionRow 
                            key={mission.id} 
                            mission={mission} 
                            isUnlocked={isUnlocked}
                            isClaimed={isClaimed}
                            progress={currentProgress}
                            target={target}
                            onClaim={onClaim}
                            onPlay={(id) => onPlay && onPlay(id, 'missions')}
                        />
                        );
                })}
            </div>
        </div>
    );
};