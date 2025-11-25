
import React from 'react';

interface SuccessScreenProps {
    ticketId: string;
    paymentMethod: string;
    isSubscription: boolean;
    countdown: number;
    onBack: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ ticketId, paymentMethod, isSubscription, countdown, onBack }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] animate-fade-in-up px-6">
            <div className="max-w-md w-full bg-[#0D0D0D] border border-[#00FF41] p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#00FF41]/5"></div>
                
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:100%_2px] pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 border-2 border-[#00FF41] rounded-full flex items-center justify-center mx-auto mb-6 text-[#00FF41] animate-pulse shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tighter">
                        {isSubscription ? 'LINK ESTABLISHED' : 'TRANSMISSION COMPLETE'}
                    </h2>
                    <div className="w-12 h-1 bg-[#00FF41] mx-auto mb-6"></div>
                    <p className="text-[#A0A0A0] font-mono text-sm mb-8 leading-relaxed">
                        {isSubscription 
                            ? 'NEURAL LINK ACTIVE. YOUR CREDENTIALS HAVE BEEN UPGRADED TO UNLIMITED STATUS.'
                            : 'YOUR PROJECT BRIEF HAS BEEN UPLOADED TO THE MAINFRAME.'
                        }
                        <br/>
                        TICKET ID: <span className="text-white font-bold">{ticketId}</span>
                        <br/>
                        PAYMENT: <span className="text-white font-bold uppercase">{paymentMethod}</span>
                        <br/><br/>
                        {isSubscription ? 'WELCOME TO THE CORE.' : 'A TKYNOX OPERATIVE WILL CONTACT YOU SHORTLY TO INITIALIZE PHASE 1.'}
                    </p>
                    <button 
                        onClick={onBack}
                        className="w-full py-4 bg-[#00FF41] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors clip-path-slant mb-4"
                    >
                        [ RETURN TO GRID ]
                    </button>
                    <p className="text-[#666] font-mono text-xs animate-pulse">
                        REDIRECTING TO ARCHIVES IN {countdown}s...
                    </p>
                </div>
            </div>
        </div>
    );
};
