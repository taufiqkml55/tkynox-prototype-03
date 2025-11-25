
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Language } from '../../types';

export const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'id', label: 'Indonesian', flag: '🇮🇩' },
];

interface LanguageMenuProps {
    language: Language;
    onLanguageChange: (lang: Language) => void;
    isTranslating?: boolean;
}

export const LanguageMenu: React.FC<LanguageMenuProps> = ({ language, onLanguageChange, isTranslating }) => {
    const [isOpen, setIsOpen] = useState(false);
    const activeLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    return (
        <div className="relative hidden md:block">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-xs font-bold font-mono text-white border border-[#333] px-2 py-1 hover:border-[#00FF41] hover:text-[#00FF41] transition-all hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] btn-press ${isTranslating ? 'animate-pulse' : ''}`}
            >
                <span>{isTranslating ? '...' : activeLang.flag}</span>
                <span className="hidden sm:inline">{activeLang.code.toUpperCase()}</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 top-10 w-40 bg-[#0A0A0A] border border-[#333] shadow-xl z-50 animate-fade-in-up max-h-64 overflow-y-auto">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setIsOpen(false);
                                    onLanguageChange(lang.code);
                                }}
                                className={`w-full text-left px-4 py-2 text-xs font-mono uppercase flex items-center gap-2 hover:bg-[#1A1A1A] transition-colors ${language === lang.code ? 'text-[#00FF41] bg-[#00FF41]/5' : 'text-[#888]'}`}
                            >
                                <span>{lang.flag}</span>
                                <span>{lang.label}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
