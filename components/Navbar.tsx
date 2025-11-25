
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useContext } from 'react';
import { BRAND_NAME, CRYPTO_SYMBOL } from '../constants';
import { User, Language } from '../types';
import Tooltip from './Tooltip';
import { TranslationContext } from '../contexts/TranslationContext';
import { AudioMenu } from './navbar/AudioMenu';
import { UserMenu } from './navbar/UserMenu';
import { LanguageMenu } from './navbar/LanguageMenu';
import { MobileMenu } from './navbar/MobileMenu';
import { MobileMenuToggle } from './navbar/MobileMenuToggle';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  user: User | null;
  onLoginClick: () => void;
  onOrdersClick: () => void; 
  onLogoutClick: () => void;
  onMarketClick: () => void;
  onExchangeClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isTranslating?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, cartCount, onOpenCart, user, onLoginClick, onOrdersClick, onLogoutClick, onMarketClick, onExchangeClick, language, onLanguageChange, isTranslating }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { nav: t } = useContext(TranslationContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);
    onNavClick(e, targetId);
  };

  const isRestricted = user ? user.level < 5 : false;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled || mobileMenuOpen 
            ? 'bg-black/90 backdrop-blur-xl py-3 md:py-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-b border-white/5' 
            : 'bg-transparent py-4 md:py-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavClick(e, '');
            }}
            className="text-2xl md:text-3xl font-bold tracking-tighter z-50 relative group flex items-center gap-2 hover:opacity-80 transition-opacity btn-press"
            aria-label={`${BRAND_NAME} Home`}
          >
             <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:animate-pulse transition-all duration-500 transform group-hover:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 20 L20 80" stroke="var(--tk-neon)" strokeWidth="12" strokeLinecap="round" />
                <path d="M45 50 L75 20" stroke="var(--tk-neon)" strokeWidth="12" strokeLinecap="round" />
                <path d="M45 50 L75 80" stroke="var(--tk-neon)" strokeWidth="12" strokeLinecap="round" />
             </svg>
             <span className="group-hover:text-shadow-[0_0_10px_var(--tk-neon)] transition-all duration-300">{BRAND_NAME}</span>
          </a>
          
          {/* Center Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 text-sm font-bold tracking-widest uppercase">
            <Tooltip text="Browse Inventory">
              <a href="#services" onClick={(e) => handleLinkClick(e, 'services')} className="text-[var(--tk-text-muted)] hover:text-[var(--tk-neon)] transition-colors hover:translate-y-[-2px] hover:tracking-[0.15em] duration-300 inline-block">{t.services}</a>
            </Tooltip>
            
            <Tooltip text="View Live Market Data">
              <button onClick={onMarketClick} className="text-[var(--tk-text-muted)] hover:text-[var(--tk-neon)] transition-colors flex items-center gap-1 hover:translate-y-[-2px] hover:tracking-[0.15em] duration-300">
                  {t.market} <span className="text-[8px] bg-[#333] px-1 text-white animate-pulse">LIVE</span>
              </button>
            </Tooltip>

            {user && (
                 <Tooltip text={isRestricted ? "Lvl 5 Clearance Required" : `Trade ${CRYPTO_SYMBOL}`}>
                   <button onClick={onExchangeClick} className={`text-[var(--tk-text-muted)] hover:text-[var(--tk-neon)] transition-colors flex items-center gap-2 hover:translate-y-[-2px] hover:tracking-[0.15em] duration-300 ${isRestricted ? 'opacity-50 cursor-not-allowed' : ''}`}>
                       {t.exchange}
                       {isRestricted && <span className="text-[10px]">🔒</span>}
                   </button>
                 </Tooltip>
            )}
            
            <Tooltip text="System Logs & Updates">
              <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="text-[var(--tk-text-muted)] hover:text-[var(--tk-neon)] transition-colors hover:translate-y-[-2px] hover:tracking-[0.15em] duration-300 inline-block">{t.logs}</a>
            </Tooltip>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 md:gap-6 z-50 relative">
            
            <LanguageMenu 
                language={language} 
                onLanguageChange={onLanguageChange} 
                isTranslating={isTranslating} 
            />

            <AudioMenu />

            {/* Cart Button */}
            <Tooltip text="View Queue / Cart">
              <button 
                onClick={onOpenCart}
                className="relative text-white hover:text-[var(--tk-neon)] transition-all transform hover:scale-110 active:scale-90 btn-press"
                aria-label={`Cart with ${cartCount} items`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--tk-neon)] text-black text-[10px] font-bold flex items-center justify-center rounded-sm shadow-md animate-fade-in-up">
                    {cartCount}
                  </span>
                )}
              </button>
            </Tooltip>

            {user ? (
               <UserMenu 
                   user={user} 
                   onOrdersClick={onOrdersClick} 
                   onLogoutClick={onLogoutClick} 
                   t={t} 
               />
            ) : (
                <Tooltip text="Access Terminal" position="left">
                  <button 
                    onClick={onLoginClick}
                    className="hidden md:block text-xs font-bold uppercase tracking-widest text-white border border-[var(--tk-border)] px-4 py-2 hover:bg-[var(--tk-neon)] hover:text-black hover:border-[var(--tk-neon)] transition-all btn-press hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                  >
                    {t.login}
                  </button>
                </Tooltip>
            )}

            {/* Mobile Menu Toggle */}
            <MobileMenuToggle 
                isOpen={mobileMenuOpen} 
                onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          </div>
        </div>

        <MobileMenu 
            isOpen={mobileMenuOpen}
            setIsOpen={setMobileMenuOpen}
            onNavClick={handleLinkClick}
            onMarketClick={onMarketClick}
            onExchangeClick={onExchangeClick}
            onLoginClick={onLoginClick}
            user={user}
            isRestricted={isRestricted}
            language={language}
            onLanguageChange={onLanguageChange}
            t={t}
        />
      </nav>
    </>
  );
};

export default Navbar;
