
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { audioSystem } from '../../services/audioSystem';

const COUNTRY_CODES = [
    { code: '+62', flag: '🇮🇩', label: 'ID' },
    { code: '+1', flag: '🇺🇸', label: 'US' },
    { code: '+44', flag: '🇬🇧', label: 'UK' },
    { code: '+81', flag: '🇯🇵', label: 'JP' },
    { code: '+65', flag: '🇸🇬', label: 'SG' },
    { code: '+60', flag: '🇲🇾', label: 'MY' },
    { code: '+61', flag: '🇦🇺', label: 'AU' },
    { code: '+86', flag: '🇨🇳', label: 'CN' },
    { code: '+91', flag: '🇮🇳', label: 'IN' },
    { code: '+49', flag: '🇩🇪', label: 'DE' },
    { code: '+33', flag: '🇫🇷', label: 'FR' },
    { code: '+82', flag: '🇰🇷', label: 'KR' },
    { code: '+7', flag: '🇷🇺', label: 'RU' },
    { code: '+55', flag: '🇧🇷', label: 'BR' },
];

interface UserLoginFormProps {
    onSubmit: (e: React.FormEvent) => void;
    isRegistering: boolean;
    name: string;
    setName: (n: string) => void;
    email: string;
    setEmail: (e: string) => void;
    password: string;
    setPassword: (p: string) => void;
    status: 'idle' | 'verifying' | 'success';
    errorMsg: string | null;
    successMsg?: string | null;
    loginMethod: 'email' | 'google' | 'phone' | 'admin' | null;
    handleGoogleLogin: () => void;
    onSwitchToAdmin: () => void;
    onForgotPassword: () => void;
    toggleMode: () => void;
    onCancel: () => void;
    t: any;
    
    // Phone Auth Props
    phoneNumber: string;
    setPhoneNumber: (n: string) => void;
    otp: string;
    setOtp: (o: string) => void;
    phoneStep: number;
    setPhoneStep: (step: number) => void;
    handleSendOtp: (e: React.FormEvent) => void;
    handleVerifyOtp: (e: React.FormEvent) => void;
}

export const UserLoginForm: React.FC<UserLoginFormProps> = ({
    onSubmit, isRegistering, name, setName, email, setEmail, password, setPassword, status, errorMsg, successMsg, loginMethod, handleGoogleLogin, onSwitchToAdmin, onForgotPassword, toggleMode, onCancel, t,
    phoneNumber, setPhoneNumber, otp, setOtp, phoneStep, setPhoneStep, handleSendOtp, handleVerifyOtp
}) => {
    const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
    
    // Local state for phone composition
    const [countryCode, setCountryCode] = useState('+62');
    const [localNumber, setLocalNumber] = useState('');

    const handleModeSwitch = (mode: 'email' | 'phone') => {
        setAuthMode(mode);
        audioSystem.playClick();
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCode = e.target.value;
        setCountryCode(newCode);
        setPhoneNumber(`${newCode}${localNumber}`);
    };

    const handleLocalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove non-numeric chars
        let val = e.target.value.replace(/[^0-9]/g, '');
        
        // Remove leading zero if user types it (e.g. 0812 -> 812)
        if (val.startsWith('0')) {
            val = val.substring(1);
        }

        setLocalNumber(val);
        setPhoneNumber(`${countryCode}${val}`);
    };

    return (
        <>
            {/* Method Switcher */}
            <div className="flex border-b border-[#333] mb-6">
                <button 
                    type="button"
                    onClick={() => handleModeSwitch('email')}
                    className={`flex-1 pb-2 text-xs font-bold font-mono uppercase transition-colors ${authMode === 'email' ? 'text-[#00FF41] border-b-2 border-[#00FF41]' : 'text-[#666] hover:text-white'}`}
                >
                    {t.tab_email || "EMAIL LINK"}
                </button>
                <button 
                    type="button"
                    onClick={() => handleModeSwitch('phone')}
                    className={`flex-1 pb-2 text-xs font-bold font-mono uppercase transition-colors ${authMode === 'phone' ? 'text-[#00FF41] border-b-2 border-[#00FF41]' : 'text-[#666] hover:text-white'}`}
                >
                    {t.tab_phone || "PHONE LINK"}
                </button>
            </div>

            {errorMsg && (
                <div className="p-3 mb-6 border border-red-500 bg-red-500/10 text-red-500 text-[10px] font-mono text-center uppercase tracking-widest animate-pulse">
                    {errorMsg}
                </div>
            )}

            {successMsg && (
                <div className="p-3 mb-6 border border-[#00FF41] bg-[#00FF41]/10 text-[#00FF41] text-[10px] font-mono text-center uppercase tracking-widest animate-pulse">
                    {successMsg}
                </div>
            )}

            {authMode === 'email' ? (
                // --- EMAIL FORM ---
                <form onSubmit={onSubmit} className="space-y-6">
                    {isRegistering && (
                        <div className="animate-fade-in-up">
                            <label className="block text-xs font-bold text-[#00FF41] mb-2 font-mono uppercase">{t.label_name}</label>
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black border border-[#333] text-white px-4 py-3 focus:border-[#00FF41] outline-none transition-colors font-mono text-sm"
                                placeholder="NAME / ALIAS"
                                required={isRegistering}
                                autoFocus
                                disabled={status !== 'idle'}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-[#00FF41] mb-2 font-mono uppercase">{t.label_email}</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-[#333] text-white px-4 py-3 focus:border-[#00FF41] outline-none transition-colors font-mono text-sm"
                            placeholder="USR_ID..."
                            required
                            disabled={status !== 'idle'}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-[#00FF41] mb-2 font-mono uppercase">{t.label_key}</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-[#333] text-white px-4 py-3 focus:border-[#00FF41] outline-none transition-colors font-mono text-sm"
                            placeholder="********"
                            required
                            disabled={status !== 'idle'}
                        />
                        {!isRegistering && (
                            <button 
                                type="button"
                                onClick={onForgotPassword}
                                className="text-[10px] text-[#666] hover:text-[#00FF41] underline mt-2 block text-right uppercase font-mono"
                            >
                                {t.forgot_pass || "FORGOT ACCESS KEY?"}
                            </button>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        disabled={status !== 'idle'}
                        className="w-full bg-[#00FF41] text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant group relative overflow-hidden btn-press shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {status === 'idle' && (isRegistering ? t.btn_create : t.btn_init)}
                            {status === 'verifying' && (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Authenticating...</span>
                                </>
                            )}
                            {status === 'success' && 'Access Granted'}
                        </div>
                        
                        {status === 'idle' && (
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                        )}
                    </button>
                </form>
            ) : (
                // --- PHONE FORM ---
                <form onSubmit={phoneStep === 1 ? handleSendOtp : handleVerifyOtp} className="space-y-6 animate-fade-in-up">
                    <div id="recaptcha-container"></div>
                    
                    {phoneStep === 1 ? (
                        <div>
                            <label className="block text-xs font-bold text-[#00FF41] mb-2 font-mono uppercase">{t.label_phone || "MOBILE UPLINK"}</label>
                            <div className="flex">
                                {/* Country Selector */}
                                <div className="relative w-24 bg-black border border-[#333] border-r-0">
                                    <select 
                                        value={countryCode} 
                                        onChange={handleCountryChange}
                                        className="w-full h-full bg-transparent text-white text-sm font-mono outline-none appearance-none px-2 py-3 cursor-pointer"
                                    >
                                        {COUNTRY_CODES.map((c) => (
                                            <option key={c.code} value={c.code} className="bg-black text-white">
                                                {c.flag} {c.code}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-[#666] text-[10px]">▼</div>
                                </div>
                                
                                {/* Number Input */}
                                <input 
                                    type="tel" 
                                    value={localNumber}
                                    onChange={handleLocalNumberChange}
                                    className="flex-1 bg-black border border-[#333] text-white px-4 py-3 focus:border-[#00FF41] outline-none transition-colors font-mono text-sm"
                                    placeholder="812 000 000"
                                    required
                                    autoFocus
                                    disabled={status !== 'idle'}
                                />
                            </div>
                            <p className="text-[9px] text-[#666] mt-2 font-mono flex justify-between">
                                <span>FORMAT: {countryCode} {localNumber || '...'}</span>
                                {status === 'idle' && <span className="text-[#00FF41]">READY</span>}
                            </p>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up">
                            <label className="block text-xs font-bold text-[#00FF41] mb-2 font-mono uppercase">{t.label_otp || "VERIFICATION CODE"}</label>
                            <input 
                                type="text" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-black border border-[#333] text-white px-4 py-3 focus:border-[#00FF41] outline-none transition-colors font-mono text-lg tracking-[0.5em] text-center"
                                placeholder="------"
                                maxLength={6}
                                required
                                autoFocus
                                disabled={status !== 'idle'}
                            />
                            <button 
                                type="button" 
                                onClick={() => setPhoneStep(1)} 
                                className="text-[9px] text-[#666] hover:text-white underline mt-2 block w-full text-center uppercase"
                            >
                                CHANGE NUMBER
                            </button>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={status !== 'idle'}
                        className="w-full bg-[#00FF41] text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant group relative overflow-hidden btn-press"
                    >
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            {status === 'idle' && (phoneStep === 1 ? (t.btn_send_code || "TRANSMIT CODE") : (t.btn_verify_phone || "VERIFY UPLINK"))}
                            {status === 'verifying' && (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Wait...</span>
                                </>
                            )}
                            {status === 'success' && 'Access Granted'}
                        </div>
                        
                        {status === 'idle' && (
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                        )}
                    </button>
                </form>
            )}

            {authMode === 'email' && (
                <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-[#333]"></div>
                    </div>
                    <span className="relative bg-[#0D0D0D] px-2 text-xs text-[#666] font-mono uppercase">Alternative Protocols</span>
                </div>
            )}

            {authMode === 'email' && (
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={status !== 'idle'}
                        className="w-full bg-white text-black font-bold py-3 uppercase tracking-widest hover:bg-[#E0E0E0] transition-all flex items-center justify-center gap-2 clip-path-slant disabled:opacity-70 text-[10px] btn-press"
                    >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>{t.btn_google}</span>
                    </button>

                    <button
                        type="button"
                        onClick={onSwitchToAdmin}
                        disabled={status !== 'idle'}
                        className="w-full bg-[#222] text-white border border-[#444] font-bold py-3 uppercase tracking-widest hover:bg-[#333] hover:border-[#00FF41] transition-all flex items-center justify-center gap-2 clip-path-slant disabled:opacity-70 text-[10px] btn-press"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <span>{t.btn_admin}</span>
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-4 text-center mt-6 pt-6 border-t border-[#1A1A1A]">
                {authMode === 'email' && (
                    <button 
                        type="button" 
                        onClick={toggleMode} 
                        disabled={status !== 'idle'}
                        className="text-xs text-[#666] hover:text-white font-mono uppercase tracking-wider transition-colors flex items-center justify-center gap-2 group btn-press"
                    >
                        {isRegistering ? (
                            <>
                                <span>{t.alt_login}</span>
                            </>
                        ) : (
                            <>
                                <span>{t.alt_create}</span>
                            </>
                        )}
                    </button>
                )}

                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="text-xs text-[#333] hover:text-red-500 font-mono uppercase transition-colors btn-press"
                >
                    {t.btn_abort}
                </button>
            </div>
        </>
    );
};
