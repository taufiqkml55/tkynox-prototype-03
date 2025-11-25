
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useContext, useMemo } from 'react';
import { JournalArticle, Language, SystemStats } from '../types';
import { audioSystem } from '../services/audioSystem';
import { TranslationContext } from '../contexts/TranslationContext';
import { JournalList } from './journal/JournalList';
import { FeedbackForm } from './journal/FeedbackForm';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
  articles: JournalArticle[];
  language: Language;
  systemStats?: SystemStats;
}

const ITEMS_PER_PAGE = 4;

const Journal: React.FC<JournalProps> = ({ onArticleClick, articles, systemStats }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [currentPage, setCurrentPage] = useState(0);
  
  const { journal: t } = useContext(TranslationContext);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);

  const currentArticles = useMemo(() => {
      const start = currentPage * ITEMS_PER_PAGE;
      return articles.slice(start, start + ITEMS_PER_PAGE);
  }, [articles, currentPage]);

  const handlePageChange = (newPage: number) => {
      if (newPage >= 0 && newPage < totalPages) {
          setCurrentPage(newPage);
          audioSystem.playClick();
          const listEl = document.getElementById('journal-list');
          if (listEl) listEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!feedbackText) return;
      
      setFeedbackStatus('sending');
      audioSystem.playProcessing();

      setTimeout(() => {
          setFeedbackStatus('sent');
          setFeedbackText('');
          audioSystem.playSuccess();
          setTimeout(() => setFeedbackStatus('idle'), 3000);
      }, 2000);
  };

  // Helper to format uptime seconds to H:M:S
  const formatUptime = (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section id="journal" className="bg-[#050505] py-24 px-6 md:px-12 border-t border-[#1A1A1A] animate-fade-in-up min-h-screen">
      <div className="max-w-[900px] mx-auto">
        
        {/* Minimal Header */}
        <div className="flex justify-between items-end mb-16 pb-6 border-b border-[#333]">
            <div>
                 <div className="flex items-center gap-2 mb-2">
                     <span className="w-2 h-2 bg-[#00FF41] animate-pulse"></span>
                     <span className="text-xs font-mono text-[#00FF41] uppercase tracking-widest">System Logs</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Changelog</h2>
            </div>
            <div className="text-right hidden md:block">
                 <div className="text-xs font-mono text-[#666] mb-1">LATEST BUILD</div>
                 <div className="text-white font-mono font-bold">{articles[0]?.version || 'V.0.0'}</div>
            </div>
        </div>

        <JournalList 
            articles={currentArticles} 
            onArticleClick={onArticleClick} 
            currentPage={currentPage} 
        />
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
            <div className="flex justify-between items-center mb-24 border-t border-[#1A1A1A] pt-6">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="text-xs font-mono font-bold uppercase tracking-widest text-[#666] hover:text-[#00FF41] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2 group"
                >
                    <span className="group-hover:-translate-x-1 transition-transform">&lt;</span> PREV
                </button>
                
                <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1 w-8 ${i === currentPage ? 'bg-[#00FF41]' : 'bg-[#333]'}`}
                        />
                    ))}
                </div>

                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="text-xs font-mono font-bold uppercase tracking-widest text-[#666] hover:text-[#00FF41] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2 group"
                >
                    NEXT <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
                </button>
            </div>
        )}

        {/* System Status Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
            <div className="bg-[#0D0D0D] border border-[#333] p-4">
                <div className="text-[10px] text-[#666] font-mono uppercase mb-1">{t.uptime}</div>
                <div className="text-xl font-mono text-white">{systemStats ? formatUptime(systemStats.uptimeSeconds) : '00:00:00'}</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#333] p-4">
                <div className="text-[10px] text-[#666] font-mono uppercase mb-1">{t.latency}</div>
                <div className="text-xl font-mono text-[#00FF41]">12ms</div>
            </div>
            <div className="bg-[#0D0D0D] border border-[#333] p-4">
                <div className="text-[10px] text-[#666] font-mono uppercase mb-1">{t.nodes}</div>
                <div className="text-xl font-mono text-white">{systemStats ? systemStats.activeNodes : '0'}</div>
            </div>
        </div>

        <FeedbackForm 
            feedbackText={feedbackText}
            setFeedbackText={setFeedbackText}
            feedbackStatus={feedbackStatus}
            onSubmit={handleFeedbackSubmit}
            t={t}
        />

      </div>
    </section>
  );
};

export default Journal;
