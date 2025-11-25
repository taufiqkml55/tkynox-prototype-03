
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect, useContext } from 'react';
import { JournalArticle, Language } from '../types';
import { TranslationContext } from '../contexts/TranslationContext';

interface JournalDetailProps {
  article: JournalArticle;
  onBack: () => void;
  language: Language;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article, onBack, language }) => {
  const [deployTime, setDeployTime] = useState(0);
  const [integrity, setIntegrity] = useState(100.00);
  const [authHash, setAuthHash] = useState('');
  
  const { journal: t, common: tCommon } = useContext(TranslationContext);

  useEffect(() => {
    // Generate a random auth hash on mount
    const hash = Math.random().toString(36).substring(2, 15).toUpperCase() + 
                 Math.random().toString(36).substring(2, 15).toUpperCase();
    setAuthHash(hash);

    // Timer Interval
    const interval = setInterval(() => {
        setDeployTime(prev => prev + 1);
        
        // Fluctuate integrity slightly
        const noise = (Math.random() * 0.04) - 0.02;
        setIntegrity(prev => {
            const newVal = prev + noise;
            return Math.min(100, Math.max(99.5, newVal));
        });

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
      const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
      const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
      const s = (seconds % 60).toString().padStart(2, '0');
      return `${h}:${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] animate-fade-in-up pt-24 pb-24 px-6">
       <div className="max-w-4xl mx-auto">
          
          {/* Nav */}
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-mono text-[#666] hover:text-[#00FF41] transition-colors mb-12 uppercase"
          >
            <span className="text-lg leading-none">&lt;</span>
            {tCommon.return_changelog}
          </button>

          {/* Header Block */}
          <div className="border-b border-[#333] pb-12 mb-12">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                 <div>
                     <div className="flex items-center gap-3 mb-4">
                         <span className="px-3 py-1 bg-[#00FF41] text-black font-bold font-mono text-sm">{article.version}</span>
                         <span className="text-xs font-mono text-[#666]">{article.date}</span>
                     </div>
                     <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-none">{article.title}</h1>
                 </div>
                 <div className="flex gap-2">
                     {article.tags.map(tag => (
                         <span key={tag} className="text-xs font-bold border border-[#333] text-[#888] px-3 py-1 uppercase">
                             {tag}
                         </span>
                     ))}
                 </div>
             </div>
             <p className="text-xl text-[#A0A0A0] font-light max-w-2xl leading-relaxed">
                 {article.excerpt}
             </p>
          </div>

          {/* Structured Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* Left: Main Content */}
              <div className="lg:col-span-2 space-y-12">
                  {article.sections ? (
                      article.sections.map((section, idx) => (
                          <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                                  <span className="w-1 h-4 bg-[#00FF41]"></span>
                                  {section.heading}
                              </h3>
                              <ul className="space-y-4">
                                  {section.items.map((item, i) => (
                                      <li key={i} className="flex items-start gap-4 group">
                                          <span className="text-[#333] group-hover:text-[#00FF41] transition-colors font-mono text-sm mt-1">0{i+1}</span>
                                          <p className="text-[#CCCCCC] font-light leading-relaxed border-b border-[#1A1A1A] pb-4 w-full group-hover:border-[#333] transition-colors">
                                              {item}
                                          </p>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      ))
                  ) : (
                      // Fallback for legacy content if needed
                      <div className="prose prose-invert prose-lg text-[#CCCCCC]">
                          {article.content}
                      </div>
                  )}
              </div>

              {/* Right: Meta/Status */}
              <div className="lg:col-span-1">
                  <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 sticky top-32">
                      <h4 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-6">{t.deployment_status}</h4>
                      
                      <div className="space-y-6">
                          <div>
                              <div className="text-[10px] text-[#555] uppercase mb-1 font-mono">{t.active_time}</div>
                              <div className="text-white font-mono text-sm flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-[#00FF41] animate-pulse"></span>
                                  T-PLUS {formatTime(deployTime)}
                              </div>
                          </div>
                          
                          <div>
                              <div className="text-[10px] text-[#555] uppercase mb-1 font-mono">Auth Hash</div>
                              <div className="text-white font-mono text-[10px] tracking-wider break-all">{authHash}</div>
                          </div>

                          <div>
                              <div className="flex justify-between text-[10px] text-[#555] uppercase mb-1 font-mono">
                                  <span>{t.integrity}</span>
                                  <span className="text-[#00FF41]">{integrity.toFixed(2)}%</span>
                              </div>
                              <div className="w-full h-1 bg-[#222] mt-2 overflow-hidden">
                                  <div className="h-full bg-[#00FF41] transition-all duration-500" style={{ width: `${integrity}%` }}></div>
                              </div>
                          </div>
                      </div>

                      <div className="mt-8 pt-8 border-t border-[#222]">
                          <button className="w-full py-3 border border-[#333] text-[#888] font-bold text-xs uppercase hover:bg-white hover:text-black transition-colors">
                              {t.download_log}
                          </button>
                          <div className="mt-2 text-center text-[9px] text-[#444] font-mono uppercase">
                              Encrypted via SHA-256
                          </div>
                      </div>
                  </div>
              </div>
          </div>

       </div>
    </div>
  );
};

export default JournalDetail;
