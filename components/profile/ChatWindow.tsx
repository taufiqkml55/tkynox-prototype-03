
import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../services/firebase';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { User, Friend } from '../../types';
import { audioSystem } from '../../services/audioSystem';

interface ChatWindowProps {
    currentUser: User;
    recipient: Friend;
    onClose: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ currentUser, recipient, onClose }) => {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Generate unique conversation ID based on sorted user IDs to ensure both parties share the same room
    const conversationId = [currentUser.id, recipient.id].sort().join('_');

    useEffect(() => {
        // Subscribe to messages subcollection
        const q = query(
            collection(db, 'chats', conversationId, 'messages'),
            orderBy('timestamp', 'asc'),
            limit(50)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
            
            // Play sound if new message arrives and it's not from me
            if (snapshot.docChanges().some(change => change.type === 'added' && change.doc.data().senderId !== currentUser.id)) {
                audioSystem.playNotification();
            }
        });

        return () => unsubscribe();
    }, [conversationId, currentUser.id]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const text = newMessage;
        setNewMessage(''); // Optimistic clear
        audioSystem.playClick();

        try {
            await addDoc(collection(db, 'chats', conversationId, 'messages'), {
                text: text,
                senderId: currentUser.id,
                senderName: currentUser.name,
                timestamp: serverTimestamp()
            });
        } catch (error) {
            console.error("Error sending message:", error);
            audioSystem.playError();
        }
    };

    return (
        <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#0D0D0D] border border-[#00FF41] shadow-[0_0_30px_rgba(0,255,65,0.15)] flex flex-col h-[600px] animate-fade-in-up relative">
                
                {/* Header */}
                <div className="p-4 border-b border-[#00FF41]/30 flex justify-between items-center bg-[#00FF41]/5">
                    <div>
                        <div className="text-[10px] text-[#00FF41] font-mono uppercase tracking-widest mb-1">ENCRYPTED CHANNEL</div>
                        <div className="text-white font-bold text-lg flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${recipient.status === 'online' ? 'bg-[#00FF41] animate-pulse' : 'bg-[#666]'}`}></span>
                            {recipient.name}
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-[#666] hover:text-white font-mono text-xl px-2 hover:bg-[#333] transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages Area */}
                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-black"
                >
                    <div className="text-center py-4">
                        <span className="text-[9px] text-[#444] font-mono border border-[#222] px-2 py-1 rounded">
                            START OF ENCRYPTED HISTORY
                        </span>
                    </div>
                    
                    {messages.map((msg) => {
                        const isMe = msg.senderId === currentUser.id;
                        return (
                            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                <div 
                                    className={`max-w-[80%] p-3 text-sm border ${
                                        isMe 
                                        ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#E0E0E0]' 
                                        : 'bg-[#111] border-[#333] text-[#A0A0A0]'
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap font-mono leading-relaxed">{msg.text}</p>
                                </div>
                                <span className="text-[9px] text-[#444] mt-1 font-mono uppercase">
                                    {msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'SENDING...'}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-[#333] bg-[#050505]">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="ENTER MESSAGE..."
                            className="flex-1 bg-[#111] border border-[#333] px-4 py-3 text-white font-mono text-sm outline-none focus:border-[#00FF41] transition-colors placeholder-[#444]"
                            autoFocus
                        />
                        <button 
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="bg-[#00FF41] text-black px-4 py-2 font-bold uppercase text-xs tracking-wider hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            SEND
                        </button>
                    </div>
                </form>

                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]"></div>
            </div>
        </div>
    );
};
