
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface AboutFeaturesProps {
    t: any;
}

export const AboutFeatures: React.FC<AboutFeaturesProps> = ({ t }) => {
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-[#1A1A1A] mt-32">
                <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group border-r border-[#1A1A1A]">
                   <div className="absolute inset-0 bg-[#00FF41] mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity z-10"></div>
                   <img 
                     src="https://placehold.co/1000x1000/050505/00FF41?text=HARDWARE+LAB+VECTOR" 
                     alt="Server Room" 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale contrast-125"
                   />
                </div>
                <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#080808]">
                   <span className="text-xs font-bold font-mono text-[#00FF41] mb-6">{t.feature_1_label}</span>
                   <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight">
                     {t.feature_1_title}
                   </h3>
                   <p className="text-lg text-[#888] font-light leading-relaxed mb-8 max-w-md">
                     {t.feature_1_desc}
                   </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-[#1A1A1A]">
                <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#050505] border-r border-[#1A1A1A]">
                   <span className="text-xs font-bold font-mono text-[#00FF41] mb-6">{t.feature_2_label}</span>
                   <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white tracking-tight">
                     {t.feature_2_title}
                   </h3>
                   <p className="text-lg text-[#888] font-light leading-relaxed mb-8 max-w-md">
                     {t.feature_2_desc}
                   </p>
                </div>
                <div className="relative h-[500px] lg:h-auto overflow-hidden group">
                    <div className="absolute inset-0 bg-[#00FF41] mix-blend-color opacity-0 group-hover:opacity-50 transition-opacity z-10"></div>
                   <img 
                     src="https://placehold.co/1000x1000/050505/00FF41?text=HYDROPONICS+VECTOR" 
                     alt="Neon Signage" 
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale contrast-125 brightness-75"
                   />
                </div>
            </div>
        </>
    );
};
