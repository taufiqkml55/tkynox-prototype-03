
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useContext } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';
import { AboutIntro } from './about/AboutIntro';
import { AboutFeatures } from './about/AboutFeatures';

interface AboutProps {
  onBack?: () => void;
}

const About: React.FC<AboutProps> = ({ onBack }) => {
  const { about: t } = useContext(TranslationContext);

  return (
    <section id="about" className="bg-[#050505] relative overflow-hidden min-h-screen animate-fade-in-up pt-24 pb-24">
      
      {/* Back Button */}
      {onBack && (
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-12">
            <button 
                onClick={onBack} 
                className="text-xs font-mono text-[#666] hover:text-[#00FF41] uppercase flex items-center gap-2 btn-press transition-colors"
            >
                <span>{t.return}</span>
            </button>
        </div>
      )}

      <AboutIntro t={t} />
      <AboutFeatures t={t} />

    </section>
  );
};

export default About;
