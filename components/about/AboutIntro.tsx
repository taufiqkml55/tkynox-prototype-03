
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface AboutIntroProps {
    t: any;
}

export const AboutIntro: React.FC<AboutIntroProps> = ({ t }) => {
    return (
        <div className="px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32 z-10 relative">
            <div className="md:w-1/3">
                <span className="text-[#00FF41] font-mono text-xs mb-4 block tracking-widest animate-pulse">{t.mission_label}</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tighter whitespace-pre-line">
                    {t.title.replace(/\./g, '.\n')}
                </h2>
            </div>
            <div className="md:w-2/3 max-w-2xl">
              <p className="text-lg md:text-xl text-[#A0A0A0] font-light leading-relaxed mb-8">
                {t.p1}
              </p>
              <p className="text-lg md:text-xl text-[#A0A0A0] font-light leading-relaxed mb-8">
                {t.p2}
              </p>
              
              <div className="mt-12 p-6 border border-[#1A1A1A] bg-[#0A0A0A] relative overflow-hidden group hover:border-[#00FF41] transition-colors duration-500">
                 <div className="absolute top-0 left-0 w-1 h-full bg-[#00FF41] group-hover:w-full transition-all duration-500 opacity-20"></div>
                 <div className="flex justify-between items-end relative z-10">
                    <div>
                        <h4 className="text-white font-bold text-2xl">{t.hub_title}</h4>
                        <p className="text-xs font-mono text-[#666] mt-1">{t.hub_subtitle}</p>
                    </div>
                    <span className="text-[#00FF41] font-mono text-xl">JPN // 2025</span>
                 </div>
              </div>
            </div>
        </div>
    );
};
