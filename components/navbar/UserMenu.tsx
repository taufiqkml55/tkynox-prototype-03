
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { User } from '../../types';
import Tooltip from '../Tooltip';

interface UserMenuProps {
    user: User;
    onOrdersClick: () => void;
    onLogoutClick: () => void;
    t: any;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onOrdersClick, onLogoutClick, t }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <Tooltip text="User Menu">
                <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-all active:scale-95 btn-press"
                >
                    <div className="w-8 h-8 bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-xs font-bold text-white uppercase hover:border-[#00FF41] hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all">
                        {user.name.charAt(0)}
                    </div>
                </button>
            </Tooltip>

            {/* User Dropdown */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute right-0 top-12 w-48 bg-[#0A0A0A] border border-[#333] shadow-2xl py-2 flex flex-col z-[100] animate-fade-in-up">
                        <div className="px-4 py-2 border-b border-[#222] mb-2">
                            <div className="text-xs text-white font-bold truncate">{user.name}</div>
                            <div className="text-[10px] text-[#00FF41]">LVL {user.level} OPERATIVE</div>
                        </div>
                        <button 
                            onClick={() => { setIsOpen(false); onOrdersClick(); }}
                            className="text-left px-4 py-2 text-xs text-[#888] hover:text-white hover:bg-[#111] uppercase font-mono transition-colors"
                        >
                            {t.command}
                        </button>
                        <button 
                            onClick={() => { setIsOpen(false); onLogoutClick(); }}
                            className="text-left px-4 py-2 text-xs text-[#888] hover:text-red-500 hover:bg-[#111] uppercase font-mono transition-colors"
                        >
                            {t.logout}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};
