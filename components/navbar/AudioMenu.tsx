
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { audioSystem } from '../../services/audioSystem';
import Tooltip from '../Tooltip';

export const AudioMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(audioSystem.getMuteState());
    const [bgmVol, setBgmVol] = useState(audioSystem.getBGMVolume());
    const [sfxVol, setSfxVol] = useState(audioSystem.getSFXVolume());
    
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMute = () => {
        const newState = audioSystem.toggleMute();
        setIsMuted(newState);
        if (!newState) {
            audioSystem.playClick();
        }
    };
  
    const handleBgmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setBgmVol(val);
        audioSystem.setBGMVolume(val);
    };
  
    const handleSfxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setSfxVol(val);
        audioSystem.setSFXVolume(val);
        audioSystem.playClick();
    };

    return (
        <div className="relative" ref={menuRef}>
            <Tooltip text="Audio Settings">
            <button 
                onClick={() => {
                    setIsOpen(!isOpen);
                    audioSystem.playClick();
                }}
                className={`text-[#666] hover:text-[#00FF41] transition-all transform hover:scale-110 active:scale-90 btn-press ${isMuted ? 'opacity-50' : ''}`}
                aria-label="Audio Settings"
            >
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.002-1.408-1.002-2.205 0-1.5.5-2.205.5s1.5-.5 2.205.5c.703.703.703 2.097 0 2.798-.702.702-1.5 1.5-2.205 1.5-1.5 0-2.205-.5-2.205-1.5-.702-.702-2.096-.702-2.798 0-.703.703-.703 1.5 0 2.205z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.154a1.125 1.125 0 011.938-1.155z" />
                    </svg>
                )}
            </button>
            </Tooltip>

            {isOpen && (
                <div className="absolute right-0 top-12 w-64 bg-[#0A0A0A] border border-[#333] shadow-2xl z-[100] p-4 animate-fade-in-up before:content-[''] before:absolute before:top-[-6px] before:right-1 before:w-3 before:h-3 before:bg-[#0A0A0A] before:border-t before:border-l before:border-[#333] before:rotate-45">
                    <div className="flex justify-between items-center mb-4 border-b border-[#333] pb-2">
                        <span className="text-xs font-mono text-[#00FF41] font-bold tracking-widest">AUDIO CONFIG</span>
                        <button onClick={() => setIsOpen(false)} className="text-[#666] hover:text-white text-xs">✕</button>
                    </div>
                    
                    <div className="space-y-4 mb-4">
                        <div>
                            <div className="flex justify-between text-[10px] font-mono text-[#888] mb-1">
                                <span>MUSIC</span>
                                <span>{Math.round(bgmVol * 100)}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05" 
                                value={bgmVol}
                                onChange={handleBgmChange}
                                className="w-full h-1 bg-[#333] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#00FF41] [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-mono text-[#888] mb-1">
                                <span>SFX</span>
                                <span>{Math.round(sfxVol * 100)}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="1" 
                                step="0.05" 
                                value={sfxVol}
                                onChange={handleSfxChange}
                                className="w-full h-1 bg-[#333] appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-[#00FF41] [&::-webkit-slider-thumb]:rounded-full"
                            />
                        </div>
                    </div>

                    <button 
                        onClick={toggleMute}
                        className={`w-full py-2 text-xs font-bold font-mono uppercase border transition-colors ${
                            isMuted 
                            ? 'bg-[#00FF41] text-black border-[#00FF41]' 
                            : 'bg-transparent text-[#666] border-[#333] hover:border-[#00FF41] hover:text-[#00FF41]'
                        }`}
                    >
                        {isMuted ? "SYSTEM MUTED" : "MUTE ALL SYSTEM"}
                    </button>
                </div>
            )}
        </div>
    );
};
