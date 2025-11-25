
import React, { useState, useEffect, useMemo } from 'react';
import { User, Friend } from '../../types';
import { audioSystem } from '../../services/audioSystem';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../services/firebase';
import { ChatWindow } from './ChatWindow';

interface FriendsTabProps {
    friendsList: Friend[];
    user: User;
    handleCopyReferral: () => void;
    onSendRequest: (code: string, targetId?: string) => void;
    onRespondRequest: (id: string, accept: boolean) => void;
    onTransferCredits: (id: string, amount: number) => void;
    t: any;
}

export const FriendsTab: React.FC<FriendsTabProps> = ({ 
    friendsList, user, handleCopyReferral, onSendRequest, onRespondRequest, onTransferCredits, t 
}) => {
    const [inputId, setInputId] = useState('');
    const [transferTarget, setTransferTarget] = useState<string | null>(null);
    const [transferAmount, setTransferAmount] = useState('');
    const [globalPlayers, setGlobalPlayers] = useState<any[]>([]);
    const [rtdbError, setRtdbError] = useState<string | null>(null);
    const [activeChatFriend, setActiveChatFriend] = useState<Friend | null>(null);

    // Fetch global players from RTDB
    useEffect(() => {
        const playersRef = ref(rtdb, 'players');
        const unsubscribe = onValue(playersRef, (snapshot) => {
            setRtdbError(null);
            const data = snapshot.val();
            if (data) {
                const list = Object.entries(data).map(([key, val]: [string, any]) => ({
                    id: key,
                    ...val
                }));
                // Sort by status (online first) then name
                list.sort((a, b) => {
                    if (a.status === b.status) return a.name.localeCompare(b.name);
                    return a.status === 'online' ? -1 : 1;
                });
                setGlobalPlayers(list);
            }
        }, (error) => {
            console.error("Global Network Error:", error);
            if (error.code === 'PERMISSION_DENIED') {
                setRtdbError("ACCESS DENIED: CHECK FIREBASE REALTIME DB RULES");
            } else {
                setRtdbError("NETWORK SIGNAL LOST");
            }
        });
        return () => unsubscribe();
    }, []);

    // Merge friendsList with real-time data from globalPlayers
    const enrichedFriendsList = useMemo(() => {
        return friendsList.map(friend => {
            const liveData = globalPlayers.find(p => p.id === friend.id);
            if (liveData) {
                return {
                    ...friend,
                    name: liveData.name || friend.name,
                    level: liveData.level || friend.level,
                    status: liveData.status || 'offline',
                    uniqueId: liveData.uniqueId || friend.uniqueId || friend.referralCode
                };
            }
            return friend;
        });
    }, [friendsList, globalPlayers]);

    const handleAdd = () => {
        if (inputId.trim()) {
            onSendRequest(inputId.trim());
            setInputId('');
        }
    };

    const handleConnect = (uniqueId: string, targetUid: string) => {
        // Pass both the display ID and the actual UID to guarantee a hit
        onSendRequest(uniqueId, targetUid);
        audioSystem.playProcessing();
    };

    const handleTransferSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (transferTarget && transferAmount) {
            const amt = parseFloat(transferAmount);
            if (!isNaN(amt) && amt > 0) {
                onTransferCredits(transferTarget, amt);
                setTransferTarget(null);
                setTransferAmount('');
            }
        }
    };

    const handleOpenChat = (friend: Friend) => {
        setActiveChatFriend(friend);
        audioSystem.playClick();
    };

    const displayId = user.uniqueId || user.referralCode || 'PENDING';

    return (
        <div className="animate-fade-in-up">
                <div className="flex justify-between items-center mb-6 border-b border-[#333] pb-2">
                    <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest">
                        {t.friends_network}
                    </h3>
                    <div className="text-xs font-mono text-[#666]">
                        NODES: <span className="text-white">{enrichedFriendsList.length}</span>
                    </div>
                </div>

                {/* Incoming Requests */}
                {user.friendRequests && user.friendRequests.length > 0 && (
                    <div className="mb-8 bg-[#0A0A0A] border border-[#00FF41] p-4 animate-pulse-border">
                        <h4 className="text-[10px] text-[#00FF41] font-mono uppercase mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#00FF41] rounded-full animate-ping"></span>
                            INCOMING SIGNAL DETECTED
                        </h4>
                        <div className="space-y-2">
                            {user.friendRequests.map((req) => (
                                <div key={req.fromId} className="flex items-center justify-between bg-black p-3 border border-[#333]">
                                    <div>
                                        <div className="text-sm font-bold text-white">{req.fromName}</div>
                                        <div className="text-[10px] text-[#666] font-mono">ID: {req.fromCode}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => onRespondRequest(req.fromId, true)}
                                            className="px-3 py-1 bg-[#00FF41] text-black text-[10px] font-bold uppercase hover:bg-white transition-colors"
                                        >
                                            ACCEPT
                                        </button>
                                        <button 
                                            onClick={() => onRespondRequest(req.fromId, false)}
                                            className="px-3 py-1 border border-[#333] text-[#666] text-[10px] font-bold uppercase hover:text-white hover:border-white transition-colors"
                                        >
                                            DENY
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {enrichedFriendsList.length === 0 ? (
                            <div className="p-12 border border-[#333] border-dashed text-center text-[#666] font-mono bg-[#0A0A0A] mb-8">
                                <div className="mb-4 text-4xl opacity-50">📡</div>
                                {t.no_friends}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 mb-8">
                                {enrichedFriendsList.map((friend) => (
                                    <div key={friend.id} className="bg-[#0D0D0D] border border-[#1A1A1A] p-4 flex items-center justify-between hover:border-[#333] transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 border border-[#333] bg-black flex items-center justify-center text-xs font-bold text-white relative">
                                                {friend.name.charAt(0)}
                                                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                                                    friend.status === 'online' ? 'bg-[#00FF41]' : 
                                                    friend.status === 'mission' ? 'bg-yellow-500' : 'bg-[#333]'
                                                }`}></div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white group-hover:text-[#00FF41] transition-colors">{friend.name}</div>
                                                <div className="text-[10px] text-[#666] font-mono uppercase">ID: {friend.uniqueId || friend.referralCode} • LVL {friend.level}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => handleOpenChat(friend)}
                                                className="text-[10px] font-mono border border-[#00FF41] px-3 py-1.5 text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-colors uppercase font-bold"
                                            >
                                                MSG
                                            </button>
                                            <button 
                                                onClick={() => { setTransferTarget(friend.id); audioSystem.playClick(); }}
                                                className="text-[10px] font-mono border border-[#333] px-2 py-1.5 text-[#888] hover:text-white hover:border-white transition-colors uppercase"
                                            >
                                                SEND CR
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Global Network Directory */}
                        <h3 className="text-xs font-bold text-[#00FF41] uppercase tracking-widest mb-4 border-b border-[#00FF41]/30 pb-2 mt-8 flex items-center gap-2">
                            <span className="animate-pulse">●</span> GLOBAL OPERATIVE NETWORK
                        </h3>
                        
                        {rtdbError ? (
                            <div className="p-6 text-center border border-red-500/50 bg-red-500/10 animate-fade-in-up">
                                <div className="text-red-500 font-bold text-sm mb-1">NETWORK ERROR</div>
                                <div className="text-[10px] text-red-400 font-mono uppercase">{rtdbError}</div>
                            </div>
                        ) : (
                            <div className="bg-[#0A0A0A] border border-[#1A1A1A] max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333]">
                                {globalPlayers.filter(p => p.id !== user.id).map((player) => {
                                    const isFriend = enrichedFriendsList.some(f => f.id === player.id);
                                    const isSent = user.sentRequests?.includes(player.id);
                                    const isReceived = user.friendRequests?.some(r => r.fromId === player.id);

                                    return (
                                        <div key={player.id} className="flex items-center justify-between p-3 border-b border-[#222] hover:bg-[#111] transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${player.status === 'online' ? 'bg-[#00FF41]' : 'bg-[#333]'}`}></div>
                                                <div>
                                                    <div className={`text-xs font-bold ${player.status === 'online' ? 'text-white' : 'text-[#666]'}`}>{player.name}</div>
                                                    <div className="text-[9px] text-[#444] font-mono">LVL {player.level} • {player.uniqueId}</div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    if (isReceived) {
                                                        onRespondRequest(player.id, true);
                                                    } else if (!isFriend && !isSent) {
                                                        handleConnect(player.uniqueId || 'UNKNOWN', player.id);
                                                    }
                                                }}
                                                disabled={isFriend || isSent}
                                                className={`text-[9px] font-mono border px-2 py-1 uppercase transition-colors ${
                                                    isFriend 
                                                    ? 'border-[#00FF41] text-[#00FF41] cursor-default bg-[#00FF41]/10' 
                                                    : isSent 
                                                        ? 'border-[#333] text-[#666] cursor-not-allowed'
                                                        : isReceived
                                                            ? 'border-[#00FF41] bg-[#00FF41] text-black font-bold hover:bg-white'
                                                            : 'border-[#333] text-[#666] hover:text-white hover:border-white cursor-pointer'
                                                }`}
                                            >
                                                {isFriend ? 'LINKED' : isSent ? 'PENDING...' : isReceived ? 'ACCEPT' : 'CONNECT'}
                                            </button>
                                        </div>
                                    );
                                })}
                                {globalPlayers.filter(p => p.id !== user.id).length === 0 && (
                                    <div className="p-4 text-center text-[10px] text-[#444] font-mono">NO OTHER OPERATIVES DETECTED IN SECTOR.</div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-[#0D0D0D] border border-[#00FF41]/30 p-6 sticky top-32">
                            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 border-b border-[#333] pb-2">
                                {t.add_friend}
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] text-[#666] font-mono uppercase mb-1">Enter Unique ID (TX-XXXXXX)</label>
                                    <div className="flex gap-0">
                                        <input 
                                            type="text" 
                                            value={inputId}
                                            onChange={(e) => setInputId(e.target.value)}
                                            placeholder="TX-XXXXXX" 
                                            className="w-full bg-black border border-[#333] px-3 py-2 text-xs font-mono text-white focus:border-[#00FF41] outline-none uppercase" 
                                        />
                                        <button 
                                            onClick={handleAdd}
                                            className="bg-[#333] text-white px-3 text-xs font-bold hover:bg-[#00FF41] hover:text-black transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="pt-4 border-t border-[#333]">
                                        <div className="text-[10px] text-[#00FF41] font-mono uppercase mb-2">{t.invite_code}</div>
                                        <div className="bg-[#111] border border-[#333] p-3 text-center">
                                            <div className="text-lg font-mono font-bold text-white select-all">{displayId}</div>
                                            <button 
                                                onClick={handleCopyReferral}
                                                className="text-[9px] text-[#666] hover:text-[#00FF41] uppercase mt-1 font-mono underline decoration-[#333] underline-offset-2"
                                            >
                                                Click to Copy
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transfer Modal */}
                {transferTarget && (
                    <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="bg-[#0D0D0D] border border-[#333] p-6 max-w-sm w-full shadow-2xl relative animate-fade-in-up">
                            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest">Initiate Transfer</h3>
                            <p className="text-xs text-[#666] font-mono mb-6">
                                SENDING TO OPERATIVE: <span className="text-white">{enrichedFriendsList.find(f => f.id === transferTarget)?.name}</span>
                            </p>
                            <form onSubmit={handleTransferSubmit}>
                                <div className="mb-6">
                                    <label className="block text-[10px] text-[#00FF41] font-mono uppercase mb-2">Amount (USD)</label>
                                    <input 
                                        type="number" 
                                        min="0.01" 
                                        step="0.01"
                                        value={transferAmount}
                                        onChange={(e) => setTransferAmount(e.target.value)}
                                        className="w-full bg-black border border-[#333] px-4 py-3 text-white font-mono text-lg outline-none focus:border-[#00FF41]"
                                        autoFocus
                                    />
                                    <div className="text-right text-[10px] text-[#666] mt-1">
                                        AVAIL: ${user.balance.toFixed(2)}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setTransferTarget(null)}
                                        className="flex-1 py-3 border border-[#333] text-[#666] text-xs font-bold uppercase hover:text-white transition-colors"
                                    >
                                        CANCEL
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 py-3 bg-[#00FF41] text-black text-xs font-bold uppercase hover:bg-white transition-colors"
                                    >
                                        CONFIRM
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Chat Window Modal */}
                {activeChatFriend && (
                    <ChatWindow 
                        currentUser={user}
                        recipient={activeChatFriend}
                        onClose={() => setActiveChatFriend(null)}
                    />
                )}
        </div>
    );
};
