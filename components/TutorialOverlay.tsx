
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useContext } from 'react';
import { audioSystem } from '../services/audioSystem';
import { Language } from '../types';
import { TranslationContext } from '../contexts/TranslationContext';

interface TutorialOverlayProps {
  onComplete: () => void;
  onLanguageChange: (lang: Language) => void;
  currentLanguage: Language;
  isTranslating?: boolean;
}

const BOOT_SEQUENCE_KEYS = ['boot_1', 'boot_2', 'boot_3', 'boot_4', 'boot_5', 'boot_6'];

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onComplete, onLanguageChange, currentLanguage, isTranslating }) => {
  const [isSelectingLanguage, setIsSelectingLanguage] = useState(true);
  const [isBooting, setIsBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const { tutorial: t } = useContext(TranslationContext);

  const steps = [
    { 
      title: t.step_1_title, 
      content: t.step_1_desc,
      action: t.step_1_act 
    },
    { 
      title: t.step_2_title, 
      content: t.step_2_desc,
      action: t.step_2_act 
    },
    { 
      title: t.step_3_title, 
      content: t.step_3_desc,
      action: t.step_3_act 
    }
  ];
  
  const stepData = steps[currentStep];

  const handleSelectLanguage = (lang: Language) => {
      onLanguageChange(lang);
      setIsSelectingLanguage(false);
      setIsBooting(true);
      audioSystem.playSuccess();
  };

  useEffect(() => {
      if (!isBooting) return;

      // Pause the boot sequence visually while translating (wait at cursor)
      // Or we could let it run, but then it might switch language mid-stream.
      // The "Hidden" requirement suggests we should just show the boot process
      // and let it naturally wait or proceed.
      if (isTranslating) return;

      if (bootStep < BOOT_SEQUENCE_KEYS.length) {
          const delay = 300 + Math.random() * 400;
          const timeout = setTimeout(() => {
              setBootStep(prev => prev + 1);
              audioSystem.playHover();
          }, delay);
          return () => clearTimeout(timeout);
      } else {
          const timeout = setTimeout(() => {
              setIsBooting(false);
              audioSystem.playSuccess();
          }, 800);
          return () => clearTimeout(timeout);
      }
  }, [bootStep, isBooting, isTranslating]);

  const handleNext = () => {
      audioSystem.playClick();
      if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
      } else {
          onComplete();
      }
  };

  if (isSelectingLanguage) {
      return (
        <div className="fixed inset-0 z-[300] bg-black flex items-center justify-center p-6">
             <div className="max-w-md w-full text-center animate-fade-in-up">
                 <h2 className="text-xl md:text-2xl font-bold text-[#00FF41] mb-12 tracking-widest font-mono uppercase animate-pulse">
                     {t.select_lang}
                 </h2>
                 <div className="grid gap-4">
                     <button 
                        onClick={() => handleSelectLanguage('en')}
                        className="py-6 border border-[#333] hover:border-[#00FF41] hover:bg-[#00FF41]/10 transition-all text-white font-mono font-bold tracking-[0.2em] uppercase btn-press hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                     >
                         English
                     </button>
                     <button 
                        onClick={() => handleSelectLanguage('id')}
                        className="py-6 border border-[#333] hover:border-[#00FF41] hover:bg-[#00FF41]/10 transition-all text-white font-mono font-bold tracking-[0.2em] uppercase btn-press hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                     >
                         Indonesian
                     </button>
                 </div>
             </div>
        </div>
      );
  }

  if (isBooting) {
      return (
        <div className="fixed inset-0 z-[300] bg-black flex items-start justify-start p-8 md:p-16 font-mono text-xs md:text-sm">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50"></div>
            
            <div className="space-y-2 relative z-20">
                {BOOT_SEQUENCE_KEYS.slice(0, bootStep).map((key, idx) => (
                    <div key={idx} className="text-[#00FF41] animate-fade-in-up">
                        <span className="mr-2">&gt;</span> {t[key as keyof typeof t]}
                    </div>
                ))}
                <div className="text-[#00FF41] animate-pulse">
                    <span className="mr-2">&gt;</span> <span className="inline-block w-2 h-4 bg-[#00FF41] align-middle"></span>
                </div>
            </div>
        </div>
      );
  }

  const isWarningStep = currentStep === steps.length - 1;
  const accentColor = isWarningStep ? '#FF3333' : '#00FF41';
  const borderColor = isWarningStep ? 'border-[#FF3333]' : 'border-[#00FF41]';
  const textColor = isWarningStep ? 'text-[#FF3333]' : 'text-[#00FF41]';
  const bgColor = isWarningStep ? 'bg-[#FF3333]' : 'bg-[#00FF41]';
  
  return (
    <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in-up">
       <div className={`max-w-md w-full bg-[#0D0D0D] border ${borderColor} p-8 relative shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col`}>
           
           {/* Decorative Corners similar to Disclaimer Box */}
           <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${borderColor}`}></div>
           <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${borderColor}`}></div>
           <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${borderColor}`}></div>
           <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColor}`}></div>

           <div className="flex-1 flex flex-col items-center text-center z-20">
               
               <div className={`w-12 h-12 border ${borderColor} flex items-center justify-center mb-6 animate-pulse shadow-[0_0_15px_${accentColor}40]`}>
                    <span className="text-2xl">{isWarningStep ? '!' : 'i'}</span>
               </div>

               <h2 className={`text-xl font-bold text-white mb-6 tracking-[0.2em] uppercase font-mono border-b ${borderColor} pb-2 w-full`}>
                   {stepData.title}
               </h2>
               
               <p className="text-sm text-[#CCCCCC] font-mono leading-relaxed mb-8 min-h-[80px]">
                   {stepData.content}
               </p>

               <div className="w-full h-1 bg-[#222] mb-8 overflow-hidden">
                   <div className={`h-full ${bgColor} transition-all duration-500`} style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
               </div>

               <button 
                   onClick={handleNext}
                   className={`w-full py-4 ${bgColor} text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors clip-path-slant relative group overflow-hidden btn-press`}
               >
                   <span className="relative z-10">
                       {stepData.action}
                   </span>
                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
               </button>
           </div>
       </div>
    </div>
  );
};

export default TutorialOverlay;
