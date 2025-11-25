
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect, useContext } from 'react';
import { Language } from '../types';
import { TranslationContext } from '../contexts/TranslationContext';

interface HeroProps {
    language: Language;
    version?: string;
}

const Hero: React.FC<HeroProps> = ({ language, version }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const { hero: t } = useContext(TranslationContext);
  const words = t.words;

  const displayTagline = version ? t.tagline.replace(/V\.\d+(\.\d+)?|V\.2025/i, version) : t.tagline;

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      let updatedText = isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      let speed = 150 - Math.random() * 50;

      if (isDeleting) {
        speed = 50;
      }

      if (!isDeleting && updatedText === fullText) {
        speed = 2000;
        setIsDeleting(true);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        speed = 500;
      }

      setTypingSpeed(speed);
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore
      }
    }
  };

  return (
    <section className="relative w-full h-[75vh] md:h-screen min-h-[500px] md:min-h-[700px] overflow-hidden bg-[#050505] pt-24 md:pt-32 flex items-center justify-center">
      
      {/* Background - Abstract Grid/Cyberpunk */}
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#050505] to-[#000]"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

        {/* Background Image Centered */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30 md:opacity-40 pointer-events-none">
             <img 
                src="https://placehold.co/1920x1080/050505/00FF41?text=TKYNOX_WORLD" 
                alt="Cyberpunk Nexus" 
                className="w-full h-full object-cover object-center mix-blend-screen grayscale-[0.3] contrast-125 md:blur-0"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80 z-10"></div>
        
        {/* Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>
      </div>

      {/* Content - Centered Layout */}
      <div className="relative z-30 container mx-auto px-6 md:px-12 text-center">
        <div className="animate-fade-in-up max-w-5xl mx-auto">
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="w-2 h-2 bg-[#00FF41] animate-pulse"></span>
            <span className="font-mono text-xs md:text-sm text-[#00FF41] uppercase tracking-[0.2em]">
              {displayTagline}
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter mb-2 md:mb-8 leading-[0.9]">
            {t.headline_prefix} <br/>
            <span className={`inline-block mt-1 md:mt-2 animate-glitch transition-colors duration-100 ${text ? 'bg-[#00FF41] text-black px-2 md:px-4' : 'bg-transparent text-[#00FF41] px-0'}`}>
              {text}<span className="animate-blink">_</span>
            </span>
          </h1>
          
          <p className="max-w-xl mx-auto text-sm md:text-xl text-[#A0A0A0] font-light leading-relaxed mb-12 bg-black/50 backdrop-blur-md p-4 md:p-6 border border-[#333] whitespace-pre-line">
            {t.description}
          </p>

          {/* Mobile Bottom Detail: Coordinates */}
          <div className="lg:hidden mt-8 border-t border-dashed border-[#333] pt-6 flex flex-col items-center gap-2 w-full max-w-xs mx-auto">
             <div className="font-mono text-[10px] text-[#666] uppercase tracking-widest">{t.coordinates}</div>
             <div className="flex flex-col items-center gap-1">
                 <div className="font-mono text-[#00FF41] text-xs">35.6762° N / 139.6503° E</div>
                 <div className="font-mono text-[#00FF41] text-xs">TOKYO // SECTOR 7</div>
             </div>
          </div>
          
        </div>
      </div>

      {/* Decorative UI Elements */}
      <div className="absolute bottom-8 left-8 hidden lg:block z-30 pointer-events-none" aria-hidden="true">
           <div className="w-3 h-3 bg-[#00FF41] rounded-full animate-pulse shadow-[0_0_10px_#00FF41]"></div>
      </div>

      {/* Coordinates - Desktop */}
      <div className="absolute bottom-8 right-8 hidden lg:block text-right z-30 pointer-events-none" aria-hidden="true">
         <div className="font-mono text-[10px] text-[#333] mb-1">{t.coordinates}</div>
         <div className="font-mono text-[#00FF41] text-xs">35.6762° N / 139.6503° E</div>
         <div className="font-mono text-[#00FF41] text-xs">TOKYO // SECTOR 7</div>
      </div>
    </section>
  );
};

export default Hero;
