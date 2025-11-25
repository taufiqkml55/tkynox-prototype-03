
import React from 'react';

interface FailureScreenProps {
    error: string;
    onRetry: () => void;
    onBack: () => void;
}

export const FailureScreen: React.FC<FailureScreenProps> = ({ error, onRetry, onBack }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] animate-fade-in-up px-6">
            <div className="max-w-md w-full bg-[#0D0D0D] border border-red-500 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/5"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:100%_2px] pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 border-2 border-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500 animate-pulse shadow-[0_0_20px_rgba(255,0,0,0.3)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter">
                        TRANSACTION FAILED
                    </h2>
                    <div className="w-12 h-1 bg-red-500 mx-auto mb-6"></div>
                    <p className="text-[#A0A0A0] font-mono text-sm mb-8 leading-relaxed">
                        ERROR_CODE: 402 PAYMENT REQUIRED
                        <br/>
                        <span className="text-red-500">{error}</span>
                        <br/><br/>
                        PLEASE TOP UP YOUR BALANCE VIA CRYPTO EXCHANGE OR SELECT AN ALTERNATIVE PAYMENT PROTOCOL.
                    </p>
                    <div className="flex gap-4">
                        <button 
                            onClick={onBack}
                            className="flex-1 py-3 border border-[#333] text-[#666] font-bold uppercase tracking-widest text-xs hover:text-white hover:border-white transition-colors"
                        >
                            ABORT
                        </button>
                        <button 
                            onClick={onRetry}
                            className="flex-1 py-3 bg-red-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors"
                        >
                            RETRY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
