
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState, useRef } from 'react';
import { ref, query, limitToLast, onValue } from 'firebase/database';
import { rtdb } from '../../services/firebase';
import { GlobalActivity } from '../../types';

export const GlobalActivityFeed: React.FC = () => {
    const [activities, setActivities] = useState<GlobalActivity[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const activityRef = ref(rtdb, 'global_activity');
        const recentActivityQuery = query(activityRef, limitToLast(50));

        const unsubscribe = onValue(recentActivityQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.values(data) as GlobalActivity[];
                setActivities(list);
            }
        });

        return () => unsubscribe();
    }, []);

    // Auto-scroll to bottom on new activity
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [activities]);

    return (
        <div className="bg-[#050505] border border-[#333] h-[60vh] min-h-[400px] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-3 border-b border-[#333] bg-[#111] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 animate-pulse rounded-full"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest font-mono">Global Feed</span>
                </div>
                <span className="text-[9px] font-mono text-[#666] uppercase">LIVE TX STREAM</span>
            </div>

            {/* Feed Content */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-[#0D0D0D] relative"
            >
                {/* Scanline Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_2px] pointer-events-none z-0"></div>

                {activities.map((act, idx) => {
                    const isBuy = act.type === 'PURCHASE';
                    // Timestamp handling: RTDB timestamp can be a placeholder initially, handling mostly for display
                    // Using simple index key as fallback since RTDB list order is maintained
                    return (
                        <div key={idx} className="relative z-10 flex items-start gap-2 animate-fade-in-up">
                            <span className="text-[#444]">[{new Date().toLocaleTimeString()}]</span>
                            <div className="flex-1 break-words">
                                <span className="text-white font-bold">{act.user}</span>
                                <span className="text-[#666]"> executed </span>
                                <span className={isBuy ? 'text-[#00FF41]' : 'text-yellow-500'}>
                                    {act.type}
                                </span>
                                <span className="text-[#666]"> on </span>
                                <span className="text-white">{act.item}</span>
                                <span className="text-[#666]"> @ </span>
                                <span className="text-white">${act.price.toFixed(2)}</span>
                            </div>
                        </div>
                    );
                })}
                
                {activities.length === 0 && (
                    <div className="text-[#444] text-center mt-10 uppercase">Waiting for network traffic...</div>
                )}
            </div>
            
            {/* Footer Status */}
            <div className="p-2 border-t border-[#333] bg-[#080808] text-[9px] text-[#444] font-mono uppercase flex justify-between">
                <span>Encryption: AES-256</span>
                <span>Nodes: {activities.length} Active</span>
            </div>
        </div>
    );
};
