
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { JournalArticle } from '../../types';
import { audioSystem } from '../../services/audioSystem';

interface JournalListProps {
    articles: JournalArticle[];
    onArticleClick: (article: JournalArticle) => void;
    currentPage: number;
}

export const JournalList: React.FC<JournalListProps> = ({ articles, onArticleClick, currentPage }) => {
    return (
        <div id="journal-list" className="flex flex-col mb-12 border-t border-[#1A1A1A] min-h-[400px]">
            {articles.map((article, index) => (
                <div 
                    key={article.id} 
                    className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-[#1A1A1A] cursor-pointer hover:bg-[#0A0A0A] transition-all duration-200"
                    onClick={() => onArticleClick(article)}
                    onMouseEnter={() => audioSystem.playHover()}
                >
                    <div className="flex items-baseline gap-6 md:gap-12">
                        {/* Version */}
                        <div className="w-20 flex-shrink-0 font-mono text-right md:text-left">
                            <span className={`text-sm font-bold ${index === 0 && currentPage === 0 ? 'text-[#00FF41]' : 'text-[#666] group-hover:text-white'} transition-colors`}>
                                {article.version}
                            </span>
                        </div>
                        
                        {/* Title */}
                        <div>
                             <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#00FF41] transition-colors uppercase">
                                {article.title}
                             </h3>
                             <div className="md:hidden mt-2">
                                <span className="text-[10px] font-mono text-[#555]">{article.date}</span>
                             </div>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="hidden md:flex items-center gap-8">
                         <span className="text-xs font-mono text-[#666]">{article.date}</span>
                         <div className="w-6 flex justify-end text-[#333] group-hover:text-[#00FF41] transition-colors duration-300 group-hover:translate-x-1">
                            →
                         </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
