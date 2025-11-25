
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { User, Language } from '../../types';
import { LANGUAGES } from './LanguageMenu';

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
    onMarketClick: () => void;
    onExchangeClick: () => void;
    onLoginClick: () => void;
    user: User | null;
    isRestricted: boolean;
    language: Language;
    onLanguageChange: (lang: Language) => void;
    t: any;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
    isOpen, setIsOpen, onNavClick, onMarketClick, onExchangeClick, onLoginClick, user, isRestricted, language, onLanguageChange, t 
}) => {
    
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
        setIsOpen(false);
        onNavClick(e, targetId);
    };

    return (
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
           <div className="flex flex-col p-6 gap-6 text-sm font-bold tracking-widest uppercase mt-0 bg-[var(--tk-bg)] border-b border-white/10 shadow-2xl">
             <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="text-[var(--tk-text-muted)] hover:text-white flex items-center justify-between group transition-colors p-2">
                 <span>{t.services}</span>
                 <span className="text-[var(--tk-neon)] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">›</span>
             </a>
             <button onClick={() => { setIsOpen(false); onMarketClick(); }} className="text-left text-[var(--tk-text-muted)] hover:text-white flex items-center justify-between group w-full transition-colors p-2">
                <span className="flex items-center gap-2">{t.market} <span className="text-[8px] bg-[#333] px-1 text-white animate-pulse">LIVE</span></span>
                <span className="text-[var(--tk-neon)] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">›</span>
             </button>
             {user && (
                 <button onClick={() => { setIsOpen(false); onExchangeClick(); }} className="text-left text-[var(--tk-text-muted)] hover:text-white flex items-center justify-between group w-full transition-colors p-2">
                    <span className="flex items-center gap-2">
                        {t.exchange} 
                        {isRestricted && <span>🔒</span>}
                    </span>
                    <span className="text-[var(--tk-neon)] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">›</span>
                 </button>
             )}
             <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="text-[#A0A0A0] hover:text-white flex items-center justify-between group transition-colors p-2">
                 <span>{t.logs}</span>
                 <span className="text-[var(--tk-neon)] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">›</span>
             </a>
             
             {!user && (
                 <button 
                    onClick={() => { setIsOpen(false); onLoginClick(); }}
                    className="text-left text-[var(--tk-neon)] border border-[var(--tk-border)] p-3 text-center mt-2 hover:bg-[var(--tk-neon)] hover:text-black transition-all btn-press hover:shadow-[0_0_10px_rgba(0,255,65,0.2)]"
                 >
                    {t.login}
                 </button>
             )}

             {/* Language Selection (Mobile View Only) */}
             <div className="border-t border-white/10 pt-6 mt-2">
                 <div className="text-[10px] text-[#666] mb-4 font-mono text-center">SYSTEM LANGUAGE</div>
                 <div className="flex justify-center gap-4">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                onLanguageChange(lang.code);
                                setIsOpen(false);
                            }}
                            className={`flex flex-1 items-center justify-center gap-2 py-3 px-4 text-xs font-mono border transition-all active:scale-95 ${
                                language === lang.code 
                                ? 'bg-[var(--tk-neon)] text-black border-[var(--tk-neon)] font-bold' 
                                : 'bg-[var(--tk-panel)] text-[#888] border-[var(--tk-border)]'
                            }`}
                        >
                            <span className="text-lg leading-none">{lang.flag}</span>
                            <span>{lang.label}</span>
                        </button>
                    ))}
                 </div>
             </div>
           </div>
        </div>
    );
};
