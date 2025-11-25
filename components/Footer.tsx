
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useContext } from 'react';
import { BRAND_NAME } from '../constants';
import { TranslationContext } from '../contexts/TranslationContext';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');
  
  const { footer: t } = useContext(TranslationContext);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-[#080808] pt-24 pb-12 px-6 text-[#888] border-t border-[#1A1A1A]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-4">
          <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">{BRAND_NAME}</h4>
          <p className="max-w-xs font-light leading-relaxed text-sm whitespace-pre-line">
            {t.brand_desc}
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-widest font-mono">{t.col_1}</h4>
          <ul className="space-y-4 font-light text-sm">
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:text-[#00FF41] transition-colors hover:translate-x-1 inline-block">{t.link_inventory}</a></li>
            <li><a href="#services" onClick={(e) => onLinkClick(e, 'services')} className="hover:text-[#00FF41] transition-colors hover:translate-x-1 inline-block">{t.link_physical}</a></li>
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#00FF41] transition-colors hover:translate-x-1 inline-block">{t.link_mission}</a></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-widest font-mono">{t.col_2}</h4>
          <ul className="space-y-4 font-light text-sm">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#00FF41] transition-colors hover:translate-x-1 inline-block">{t.link_manifesto}</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-[#00FF41] transition-colors hover:translate-x-1 inline-block">{t.link_changelog}</a></li>
            <li><a href="#" className="hover:text-[#00FF41] transition-colors hover:translate-x-1 inline-block">{t.link_legal}</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-bold text-white mb-6 text-xs uppercase tracking-widest font-mono">{t.col_3}</h4>
          <div className="flex flex-col gap-4">
            <div className="relative">
                <span className="absolute left-0 top-2 text-[#00FF41]">&gt;</span>
                <input 
                  type="email" 
                  placeholder={t.placeholder_email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
                  className="bg-transparent border-b border-[#333] py-2 pl-6 text-sm outline-none focus:border-[#00FF41] transition-colors placeholder-[#333] text-white w-full font-mono" 
                />
            </div>
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-xs font-bold uppercase tracking-widest mt-2 text-[#00FF41] hover:text-white disabled:opacity-50 transition-colors"
            >
              {subscribeStatus === 'idle' && t.btn_init}
              {subscribeStatus === 'loading' && t.btn_loading}
              {subscribeStatus === 'success' && t.btn_success}
            </button>
          </div>
        </div>
      </div>

      {/* Simulation Disclaimer */}
      <div className="max-w-[1800px] mx-auto mt-16 p-4 border border-[#333] border-dashed bg-[#0A0A0A]/50 text-center">
        <p className="text-[10px] md:text-xs text-[#666] font-mono leading-relaxed uppercase">
          {t.disclaimer}
        </p>
      </div>

      <div className="max-w-[1800px] mx-auto mt-8 pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest opacity-40 font-mono">
        <p>{t.copyright}</p>
        <p>© 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
