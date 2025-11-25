
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { audioSystem } from '../services/audioSystem';
import { ICONS } from '../constants';

interface MatchGameProps {
    onComplete: () => void;
    onExit: () => void;
    rewardAmount: number;
}

const CARD_ICONS = [
    ICONS.MINING,
    ICONS.CHIP,
    ICONS.PHYSICAL,
    ICONS.GLOVES,
    ICONS.SECURITY,
    ICONS.AUTO
];

const MatchGame: React.FC<MatchGameProps> = ({ onComplete, onExit, rewardAmount }) => {
    const [cards, setCards] = useState<{id: number, icon: string, flipped: boolean, matched: boolean}[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number>(0);
    const [gameStatus, setGameStatus] = useState<'init' | 'playing' | 'won'>('init');
    const containerRef = useRef<HTMLDivElement>(null);

    // Initialize Game
    useEffect(() => {
        const initGame = () => {
            // Create pairs
            const pairCards = [...CARD_ICONS, ...CARD_ICONS].map((icon, index) => ({
                id: index,
                icon,
                flipped: false,
                matched: false
            }));
            
            // Shuffle
            for (let i = pairCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [pairCards[i], pairCards[j]] = [pairCards[j], pairCards[i]];
            }
            
            setCards(pairCards);
            setGameStatus('playing');
            setMatchedPairs(0);
            setFlippedCards([]);
        };
        
        initGame();
    }, []);

    // Auto-scroll to game container on mount
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    const handleCardClick = (index: number) => {
        if (gameStatus !== 'playing') return;
        if (flippedCards.length >= 2) return; // Block clicks while checking
        if (cards[index].flipped || cards[index].matched) return;

        audioSystem.playClick();

        // Flip the card
        const newCards = [...cards];
        newCards[index].flipped = true;
        setCards(newCards);
        
        const newFlipped = [...flippedCards, index];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            checkForMatch(newFlipped[0], newFlipped[1]);
        }
    };

    const checkForMatch = (index1: number, index2: number) => {
        const match = cards[index1].icon === cards[index2].icon;

        if (match) {
            setTimeout(() => {
                audioSystem.playSuccess();
                setCards(prev => prev.map((card, i) => {
                    if (i === index1 || i === index2) {
                        return { ...card, matched: true };
                    }
                    return card;
                }));
                setFlippedCards([]);
                setMatchedPairs(prev => prev + 1);
            }, 500);
        } else {
            setTimeout(() => {
                audioSystem.playError();
                setCards(prev => prev.map((card, i) => {
                    if (i === index1 || i === index2) {
                        return { ...card, flipped: false };
                    }
                    return card;
                }));
                setFlippedCards([]);
            }, 1000);
        }
    };

    useEffect(() => {
        if (matchedPairs === CARD_ICONS.length && gameStatus === 'playing') {
            setGameStatus('won');
            setTimeout(() => {
                audioSystem.playSuccess();
                onComplete();
            }, 1500);
        }
    }, [matchedPairs, gameStatus, onComplete]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] flex items-center justify-center p-6 animate-fade-in-up">
            <div className="max-w-2xl w-full border border-[#333] bg-[#0D0D0D] p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                
                <div className="flex justify-between items-end mb-8 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-widest uppercase font-mono">Memory Sync</h2>
                        <p className="text-xs text-[#666] font-mono mt-1">MATCH IDENTICAL DATA PACKETS</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-mono text-[#00FF41]">
                            {gameStatus === 'won' ? 'SYNC COMPLETE' : 'SYNCING...'}
                        </div>
                    </div>
                </div>

                {gameStatus === 'won' ? (
                    <div className="text-center py-20 animate-fade-in-up">
                        <div className="text-4xl mb-4">🧠</div>
                        <h3 className="text-xl font-bold text-white mb-2">NEURAL PATHWAY ESTABLISHED</h3>
                        <p className="text-[#00FF41] font-mono mb-8">+${rewardAmount.toFixed(2)} CREDITED</p>
                        <button 
                            onClick={onExit}
                            className="px-8 py-3 bg-[#00FF41] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            RETURN TO PROFILE
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 relative z-10">
                        {cards.map((card, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleCardClick(idx)}
                                disabled={card.flipped || card.matched}
                                className={`aspect-square border-2 transition-all duration-300 relative perspective-1000 group ${
                                    card.flipped || card.matched 
                                        ? 'border-[#00FF41] bg-[#00FF41]/10 rotate-y-180' 
                                        : 'border-[#333] bg-[#111] hover:border-[#666]'
                                }`}
                            >
                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${card.flipped || card.matched ? 'opacity-100' : 'opacity-0'}`}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#00FF41]">
                                        <path d={card.icon} />
                                    </svg>
                                </div>
                                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${card.flipped || card.matched ? 'opacity-0' : 'opacity-100'}`}>
                                    <span className="text-[#333] font-mono text-xs">#{idx}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <button 
                        onClick={onExit}
                        className="text-xs text-[#666] hover:text-white font-mono uppercase underline decoration-[#333] hover:decoration-white underline-offset-4"
                    >
                        ABORT SYNC
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchGame;
