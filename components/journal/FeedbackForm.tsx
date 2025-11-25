
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface FeedbackFormProps {
    feedbackText: string;
    setFeedbackText: (text: string) => void;
    feedbackStatus: 'idle' | 'sending' | 'sent';
    onSubmit: (e: React.FormEvent) => void;
    t: any;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ feedbackText, setFeedbackText, feedbackStatus, onSubmit, t }) => {
    return (
        <div className="relative p-8 border border-[#333] bg-[#0A0A0A] overflow-hidden group hover:border-[#00FF41] transition-colors duration-500">
             {/* Decorative Lines */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00FF41]"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00FF41]"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00FF41]"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00FF41]"></div>

             <div className="flex flex-col md:flex-row gap-8 items-start">
                 <div className="md:w-1/3">
                     <div className="flex items-center gap-2 mb-3">
                         <span className="w-1.5 h-1.5 bg-[#00FF41] animate-pulse"></span>
                         <h4 className="text-xs font-bold text-[#00FF41] uppercase tracking-widest">{t.feedback_title}</h4>
                     </div>
                     <p className="text-[10px] text-[#888] font-mono leading-relaxed mb-4">
                        {t.feedback_desc}
                     </p>
                     <div className="text-[9px] text-[#444] font-mono uppercase">
                        SECURE CHANNEL // ENCRYPTED
                     </div>
                 </div>
                 
                 <form onSubmit={onSubmit} className="flex-1 w-full relative">
                     <div className="relative group/input">
                        <textarea 
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder="CMD:// ENTER_TRANSMISSION..." 
                            className="bg-[#050505] border border-[#333] w-full h-24 px-4 py-3 text-xs text-white font-mono outline-none placeholder-[#333] focus:border-[#00FF41] transition-colors resize-none"
                            disabled={feedbackStatus !== 'idle'}
                        />
                        <div className="absolute bottom-2 right-2">
                             <button 
                                type="submit" 
                                disabled={feedbackStatus !== 'idle' || !feedbackText}
                                className="bg-[#111] border border-[#333] text-[#00FF41] px-4 py-1 text-[10px] font-bold uppercase hover:bg-[#00FF41] hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                             >
                                 {feedbackStatus === 'idle' && <span>TRANSMIT</span>}
                                 {feedbackStatus === 'sending' && <span className="animate-pulse">SENDING...</span>}
                                 {feedbackStatus === 'sent' && <span>SENT</span>}
                             </button>
                        </div>
                     </div>
                 </form>
             </div>
        </div>
    );
};
