
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface AdminLoginFormProps {
    onSubmit: (e: React.FormEvent) => void;
    adminPassword: string;
    setAdminPassword: (pw: string) => void;
    status: 'idle' | 'verifying' | 'success';
    errorMsg: string | null;
    onCancel: () => void;
    t: any;
}

export const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onSubmit, adminPassword, setAdminPassword, status, errorMsg, onCancel, t }) => {
    return (
        <form onSubmit={onSubmit} className="space-y-6 animate-fade-in-up">
            {errorMsg && (
               <div className="p-3 border border-red-500 bg-red-500/10 text-red-500 text-[10px] font-mono text-center uppercase tracking-widest animate-pulse">
                   {errorMsg}
               </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-[#00FF41] mb-2 font-mono uppercase">{t.label_admin_pass}</label>
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-black border border-[#333] text-white px-4 py-3 focus:border-[#00FF41] outline-none transition-colors font-mono text-sm text-center tracking-[0.5em]"
                placeholder="XXXXXX"
                maxLength={6}
                autoFocus
                disabled={status !== 'idle'}
              />
            </div>

            <button 
             type="submit" 
             disabled={status !== 'idle'}
             className="w-full bg-[#00FF41] text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant group relative overflow-hidden btn-press"
            >
             <div className="relative z-10 flex items-center justify-center gap-2">
                {status === 'idle' && t.btn_verify}
                {status === 'verifying' && (
                    <>
                        <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Decrypting...</span>
                    </>
                )}
                {status === 'success' && 'Access Granted'}
             </div>
             
             {status === 'idle' && (
                 <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
             )}
            </button>

            <button 
                type="button" 
                onClick={onCancel} 
                className="w-full text-xs text-[#666] hover:text-white font-mono uppercase tracking-wider mt-4 transition-colors btn-press"
            >
                {t.return_standard}
            </button>
        </form>
    );
};
