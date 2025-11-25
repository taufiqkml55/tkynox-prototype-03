
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../../types';
import { audioSystem } from '../../services/audioSystem';

// Typewriter Component
const Typewriter: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const indexRef = useRef(0);

    useEffect(() => {
        if (indexRef.current !== 0 && text !== displayedText) {
             setDisplayedText(text); 
             return;
        }
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => {
                if (prev.length < text.length) {
                    if (Math.random() > 0.9) audioSystem.playTyping();
                    return prev + text.charAt(prev.length);
                }
                clearInterval(intervalId);
                return prev;
            });
        }, 15); 

        return () => clearInterval(intervalId);
    }, [text]);

    return (
        <span>
            {displayedText}
            <span className="animate-blink inline-block w-1.5 h-3 bg-[var(--tk-neon)] align-middle ml-0.5"></span>
        </span>
    );
};

interface EnhancedChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
    products?: Product[];
}

interface ChatMessageProps {
    msg: EnhancedChatMessage;
    isLast: boolean;
    isThinking: boolean;
    onViewProduct: (product: Product) => void;
    onAddToCart: (product: Product) => void;
    marketPrices: Record<string, number>;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ msg, isLast, isThinking, onViewProduct, onAddToCart, marketPrices }) => {
    const isUser = msg.role === 'user';
    const timeString = new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`flex flex-col mb-4 animate-fade-in-up ${isUser ? 'items-end' : 'items-start'}`}>
            
            {/* Meta Info */}
            {!isUser && msg.text && (
                <div className="flex items-center gap-2 mb-1 opacity-50">
                    <span className="text-[8px] font-mono text-[var(--tk-neon)]">CORE_SYS</span>
                    <span className="text-[8px] font-mono text-white">[{timeString}]</span>
                </div>
            )}
            
            {/* Text Bubble */}
            {msg.text && (
                <div 
                    className={`relative max-w-[90%] md:max-w-[85%] py-2 px-3 text-xs md:text-sm font-mono leading-relaxed ${
                        isUser 
                        ? 'bg-[#1a1a1a] text-[#eee] clip-path-slant border-r-2 border-[#333]' 
                        : 'text-[var(--tk-neon)]'
                    }`}
                >
                    {/* AI Decorative Marker */}
                    {!isUser && (
                        <div className="absolute top-0 left-0 -ml-2 text-[var(--tk-neon)] opacity-50 font-bold">
                            ›
                        </div>
                    )}
                    
                    <div className="relative z-10">
                        {!isUser && isLast && !isThinking && !msg.products ? (
                            <Typewriter text={msg.text} />
                        ) : (
                            msg.text
                        )}
                    </div>
                </div>
            )}

            {/* User Timestamp below bubble */}
            {isUser && (
                <span className="text-[8px] text-[#444] font-mono mt-1 mr-1">{timeString}</span>
            )}

            {/* Visual Products Attachment */}
            {msg.products && (
                <div className={`mt-3 grid gap-2 w-[95%] ${isUser ? 'self-end' : 'self-start'}`}>
                    <div className="text-[9px] text-[#00FF41] font-mono uppercase mb-1 border-b border-[#00FF41]/20 pb-1 w-full flex justify-between">
                        <span>&gt; QUERY_RESULT</span>
                        <span>{msg.products.length} FOUND</span>
                    </div>
                    {msg.products.map(prod => (
                        <div key={prod.id} className="bg-[#080808] border border-[#222] hover:border-[var(--tk-neon)] p-2 flex gap-3 items-center group transition-all duration-300 hover:bg-[#0a0a0a]">
                            <div className="w-10 h-10 bg-black border border-[#333] shrink-0 relative overflow-hidden">
                                <img src={prod.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                            </div>
                            <div className="flex-1 overflow-hidden min-w-0">
                                <div className="text-white font-bold text-[10px] truncate group-hover:text-[var(--tk-neon)] transition-colors">{prod.name}</div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[#666] text-[9px] font-mono uppercase">{prod.category}</span>
                                    <span className="text-[var(--tk-neon)] text-[9px] font-mono">${marketPrices[prod.id]?.toFixed(2) || prod.price.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <button 
                                    onClick={() => onViewProduct(prod)}
                                    className="text-[8px] text-[#666] hover:text-white underline decoration-[#333]"
                                >
                                    DETAILS
                                </button>
                                <button 
                                    onClick={() => onAddToCart(prod)}
                                    className="px-2 py-1 bg-[#1a1a1a] border border-[#333] text-[var(--tk-neon)] text-[9px] font-bold uppercase hover:bg-[var(--tk-neon)] hover:text-black transition-colors"
                                >
                                    ADD +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
