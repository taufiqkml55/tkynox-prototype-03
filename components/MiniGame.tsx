
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { audioSystem } from '../services/audioSystem';

interface MiniGameProps {
    onComplete: () => void;
    onExit: () => void;
    rewardAmount: number;
    themeColor?: string;
    title?: string;
}

const MiniGame: React.FC<MiniGameProps> = ({ onComplete, onExit, rewardAmount, themeColor = '#00FF41', title = "System Override" }) => {
    const [sequence, setSequence] = useState<number[]>([]);
    const [userSequence, setUserSequence] = useState<number[]>([]);
    const [gameState, setGameState] = useState<'idle' | 'showing' | 'playing' | 'won' | 'lost'>('idle');
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const GRID_SIZE = 4; // 2x2 grid
    const SEQUENCE_LENGTH = 5;

    // Cleanup timer on unmount to prevent rewards if aborted
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    // Auto-scroll to game container on mount
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    const startGame = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setGameState('showing');
        setUserSequence([]);
        const newSequence = Array.from({ length: SEQUENCE_LENGTH }, () => Math.floor(Math.random() * GRID_SIZE));
        setSequence(newSequence);
        playSequence(newSequence);
        audioSystem.playProcessing();
    };

    const playSequence = async (seq: number[]) => {
        for (let i = 0; i < seq.length; i++) {
            await new Promise(r => setTimeout(r, 500));
            setActiveButton(seq[i]);
            audioSystem.playHover(); // Use hover tone for sequence
            await new Promise(r => setTimeout(r, 400));
            setActiveButton(null);
        }
        setGameState('playing');
    };

    const handleButtonClick = (index: number) => {
        if (gameState !== 'playing') return;

        setActiveButton(index);
        audioSystem.playClick(); // User click sound
        setTimeout(() => setActiveButton(null), 200);

        const newUserSequence = [...userSequence, index];
        setUserSequence(newUserSequence);

        // Check correctness
        if (newUserSequence[newUserSequence.length - 1] !== sequence[newUserSequence.length - 1]) {
            setGameState('lost');
            audioSystem.playError();
            return;
        }

        // Check win
        if (newUserSequence.length === sequence.length) {
            setGameState('won');
            audioSystem.playSuccess();
            
            // Set timer to complete, but allow cancellation via unmount
            timerRef.current = setTimeout(() => {
                onComplete();
            }, 1000);
        }
    };

    const isGameActive = gameState === 'showing' || gameState === 'playing';

    return (
        <div ref={containerRef} className="min-h-screen bg-[#050505] flex items-center justify-center p-6 animate-fade-in-up">
            <div className="max-w-md w-full border border-[#333] bg-[#0D0D0D] p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `linear-gradient(${themeColor}0D 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                }}></div>
                
                <div className="text-center mb-8 relative z-10">
                    <h2 className="text-2xl font-bold text-white tracking-widest uppercase font-mono mb-2">{title}</h2>
                    <p className="text-xs text-[#666] font-mono min-h-[1.5em]">
                        {gameState === 'idle' && "PRESS START TO INITIATE HACK"}
                        {gameState === 'showing' && "MEMORIZE THE PATTERN..."}
                        {gameState === 'playing' && "REPEAT THE SEQUENCE"}
                        {gameState === 'won' && <span style={{ color: themeColor }}>ACCESS GRANTED // +${rewardAmount.toFixed(2)} CREDITED</span>}
                        {gameState === 'lost' && <span className="text-red-500">ACCESS DENIED // CONNECTION RESET</span>}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-[280px] mx-auto mb-8 relative z-10">
                    {[0, 1, 2, 3].map((i) => (
                        <button
                            key={i}
                            disabled={gameState !== 'playing' && gameState !== 'idle'}
                            onClick={() => handleButtonClick(i)}
                            className={`aspect-square border-2 transition-all duration-100 ${
                                activeButton === i 
                                    ? 'shadow-[0_0_20px]' 
                                    : 'bg-[#111] border-[#333] hover:border-[#666]'
                            }`}
                            style={{
                                backgroundColor: activeButton === i ? themeColor : undefined,
                                borderColor: activeButton === i ? themeColor : undefined,
                                color: activeButton === i ? themeColor : undefined
                            }}
                        />
                    ))}
                </div>

                <div className="text-center space-y-4 relative z-10">
                    <button 
                        onClick={startGame}
                        disabled={isGameActive}
                        className={`w-full py-3 font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                            isGameActive
                                ? 'opacity-0 pointer-events-none' 
                                : 'text-black hover:bg-white opacity-100'
                        }`}
                        style={{ backgroundColor: themeColor }}
                    >
                        {gameState === 'idle' ? 'INITIALIZE HACK' : 'RETRY PROTOCOL'}
                    </button>
                    
                    <button 
                        onClick={onExit}
                        className="w-full py-3 border border-[#333] text-[#666] font-bold text-xs uppercase tracking-widest hover:text-white hover:border-white transition-colors"
                    >
                        ABORT MISSION
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MiniGame;
