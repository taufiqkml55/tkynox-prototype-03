
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../constants';
import { SubscriptionPlan } from '../types';

interface SubscriptionViewProps {
    onSelectPlan: (plan: SubscriptionPlan) => void;
    onBack: () => void;
}

const SubscriptionView: React.FC<SubscriptionViewProps> = ({ onSelectPlan, onBack }) => {
    const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');

    const toggleInterval = () => {
        setBillingInterval(prev => prev === 'monthly' ? 'yearly' : 'monthly');
    };

    const activePlan = SUBSCRIPTION_PLANS.find(p => p.interval === billingInterval);

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-24 px-6 animate-fade-in-up">
            <div className="max-w-4xl mx-auto">
                {/* Navigation */}
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-2 text-xs font-mono text-[#666] hover:text-[#00FF41] transition-colors mb-8 uppercase"
                >
                    <span className="text-lg leading-none">&lt;</span>
                    Return to Grid
                </button>

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block border border-[#00FF41] px-4 py-1 mb-4">
                        <span className="text-[#00FF41] font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Neural Link Protocol</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">
                        UNLIMITED <br/> ACCESS.
                    </h1>
                    <p className="text-[#A0A0A0] max-w-lg mx-auto text-lg font-light">
                        Bypass individual transactions. Establish a direct line to the entire TKYNOX database.
                        Download any deck, any time.
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex justify-center mb-16">
                    <div className="bg-[#0D0D0D] border border-[#333] p-1 flex items-center gap-2 relative">
                        <button 
                            onClick={() => setBillingInterval('monthly')}
                            className={`px-6 py-2 text-sm font-mono uppercase transition-all duration-300 ${billingInterval === 'monthly' ? 'bg-[#333] text-white' : 'text-[#666] hover:text-white'}`}
                        >
                            Monthly
                        </button>
                        <button 
                            onClick={() => setBillingInterval('yearly')}
                            className={`px-6 py-2 text-sm font-mono uppercase transition-all duration-300 ${billingInterval === 'yearly' ? 'bg-[#00FF41] text-black font-bold' : 'text-[#666] hover:text-white'}`}
                        >
                            Yearly
                        </button>
                        {billingInterval === 'yearly' && (
                             <div className="absolute -right-24 top-1/2 -translate-y-1/2 text-[#00FF41] text-[10px] font-mono whitespace-nowrap">
                                 <span className="mr-2">&lt;-</span> 2 MONTHS FREE
                             </div>
                        )}
                    </div>
                </div>

                {/* Plans Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Standard Card (Context Anchor) */}
                    <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="text-xs font-mono text-[#666] uppercase mb-2">Standard Protocol</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Single Purchase</h3>
                        <div className="text-3xl font-mono text-white mb-8">
                            $45-150 <span className="text-sm text-[#666]">/ DECK</span>
                        </div>
                        <ul className="space-y-4 mb-8 border-t border-[#1A1A1A] pt-8">
                            <li className="flex items-center gap-3 text-sm text-[#888]">
                                <span className="w-1.5 h-1.5 bg-[#333]"></span>
                                Pay per download
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#888]">
                                <span className="w-1.5 h-1.5 bg-[#333]"></span>
                                Standard License
                            </li>
                            <li className="flex items-center gap-3 text-sm text-[#888]">
                                <span className="w-1.5 h-1.5 bg-[#333]"></span>
                                No access to new drops
                            </li>
                        </ul>
                        <button 
                            onClick={onBack}
                            className="w-full py-4 border border-[#333] text-[#888] font-mono text-xs uppercase hover:border-white hover:text-white transition-colors"
                        >
                            Continue Browsing
                        </button>
                    </div>

                    {/* Pro Card */}
                    <div className="relative bg-[#0D0D0D] border border-[#00FF41] p-8 transform md:scale-105 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00FF41] text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                            Recommended
                        </div>
                        
                        <div className="text-xs font-mono text-[#00FF41] uppercase mb-2">Neural Link // {billingInterval}</div>
                        <h3 className="text-2xl font-bold text-white mb-4">Unlimited Access</h3>
                        <div className="text-5xl font-mono text-white mb-8 tracking-tighter">
                            ${activePlan?.price} <span className="text-sm text-[#666]">/ {billingInterval === 'monthly' ? 'MO' : 'YR'}</span>
                        </div>

                        <ul className="space-y-4 mb-8 border-t border-[#333] pt-8">
                            {activePlan?.features.map((feat, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-white">
                                    <span className="text-[#00FF41] font-bold">✓</span>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => activePlan && onSelectPlan(activePlan)}
                            className="w-full py-5 bg-[#00FF41] text-black font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors clip-path-slant relative overflow-hidden group"
                        >
                            <span className="relative z-10">Initialize Membership</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                        </button>
                        <p className="text-center text-[10px] text-[#444] mt-4 font-mono">
                            SECURE ENCRYPTION. CANCEL ANYTIME.
                        </p>
                    </div>
                </div>
                
                {/* Footer Info */}
                <div className="mt-16 text-center">
                    <p className="text-[#666] text-xs font-mono uppercase">
                        Trusted by operatives at Google, Pentagram, and Deloitte.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionView;
