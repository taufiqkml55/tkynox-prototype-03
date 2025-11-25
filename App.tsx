
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo } from 'react';
import { ViewState, Product, Order, Language, Mission, ProfileTab, Friend } from './types';
import { TRANSLATIONS } from './translations';
import { PRODUCTS, MISSIONS, JOURNAL_ARTICLES } from './constants';
import { audioSystem } from './services/audioSystem';
import { TranslationContext } from './contexts/TranslationContext';
import { recordGlobalTransaction } from './services/marketService';

// Hooks
import { useNavigation } from './hooks/useNavigation';
import { useMarket } from './hooks/useMarket';
import { useCart } from './hooks/useCart';
import { useUserSystem } from './hooks/useUserSystem';
import { useBotEconomy } from './hooks/useBotEconomy';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Assistant from './components/Assistant';
import CartDrawer from './components/CartDrawer';
import TutorialOverlay from './components/TutorialOverlay';
import ViewRouter from './components/ViewRouter';

function App() {
  // --- 1. Navigation & UI State ---
  const {
      view, setView, scrollToSection,
      showTutorial, handleTutorialComplete, handleReplayTutorial,
      notification, showNotification, handleNavClick,
      gridCategory, gridSearch, gridPage, setGridPage,
      handleGridCategoryChange, handleGridSearchChange
  } = useNavigation();

  // --- 2. Translation Logic ---
  const [language, setLanguage] = useState<Language>('en');
  const currentTranslations = useMemo(() => TRANSLATIONS[language] || TRANSLATIONS.en, [language]);

  const handleLanguageChange = (lang: Language) => {
      setLanguage(lang);
      if (!showTutorial) showNotification(lang === 'id' ? "BAHASA DIGANTI: INDONESIA" : "LANGUAGE SWITCHED: ENGLISH", 1500);
  };

  const localizedProducts = useMemo(() => {
      const tData = (currentTranslations.product_data || {}) as any;
      return PRODUCTS.map(p => ({ ...p, ...(tData[p.id] || {}) }));
  }, [currentTranslations]);

  const localizedMissions = useMemo<Mission[]>(() => {
      const tData = (currentTranslations.mission_data || {}) as any;
      return MISSIONS.map(m => ({ ...m, ...(tData[m.id] || {}) }));
  }, [currentTranslations]);

  const localizedJournal = useMemo(() => {
      const tData = (currentTranslations.journal_data || {}) as any;
      return JOURNAL_ARTICLES.map(j => ({ ...j, ...(tData[j.id] || {}) }));
  }, [currentTranslations]);

  // --- 3. Audio Init ---
  useEffect(() => {
      const initAudio = () => {
          audioSystem.startBGM(); 
          window.removeEventListener('click', initAudio);
          window.removeEventListener('keydown', initAudio);
      };
      window.addEventListener('click', initAudio);
      window.addEventListener('keydown', initAudio);
      return () => {
          window.removeEventListener('click', initAudio);
          window.removeEventListener('keydown', initAudio);
      };
  }, []);

  // --- 4. Market Hook ---
  const { marketPrices, marketHistory, cryptoMarket, systemStats, stockLevels, updateStock, restockItem } = useMarket();
  
  // --- 5. Bot Economy Hook ---
  // Initiates autonomous bot trading to stimulate economy
  useBotEconomy();

  // --- 6. User System Hook ---
  const [tempOrders, setTempOrders] = useState<Order[]>([]); 

  const { 
      user, setUser, handleAdminLogin, handleLogout, 
      checkMission, handleMinigameComplete, handleClaimReward, 
      updateUserBalance, updateUserCrypto, updateProfileName,
      sendFriendRequest, respondToFriendRequest, transferCredits, transferItem, executePvPTrade
  } = useUserSystem(localizedMissions, showNotification, tempOrders, cryptoMarket);

  // --- Initialize Cart ---
  const cart = useCart(showNotification, checkMission, user, setView);
  
  useEffect(() => {
      setTempOrders(cart.orderHistory);
  }, [cart.orderHistory]);

  // --- Handlers ---
  
  const handleExchangeAccess = () => {
      if (!user) {
          setView({ type: 'login' });
          audioSystem.playClick();
          return;
      }
      if (user.level < 5) {
          showNotification(language === 'id' ? "DIBATASI: IZIN LEVEL 5 DIPERLUKAN" : "RESTRICTED: LEVEL 5 CLEARANCE REQUIRED");
          audioSystem.playError();
          return;
      }
      checkMission('view_exchange');
      setView({ type: 'exchange' });
      audioSystem.playClick();
  };

  const handlePlaceOrder = async (items: Product[], ticketId: string, paymentMethod: 'crypto' | 'balance', cryptoDetails?: { symbol: string, amount: number }) => {
      try {
          const isStockAvailable = items.every(i => {
              const current = stockLevels[i.id];
              return current !== undefined ? current >= (i.quantity || 1) : true;
          });

          if (!isStockAvailable) {
              showNotification(language === 'id' ? "GAGAL: STOK TIDAK MENCUKUPI" : "ERROR: INSUFFICIENT STOCK");
              audioSystem.playError();
              return;
          }

          await updateStock(items);

          const total: number = items.reduce((sum: number, i) => sum + (i.price * (i.quantity || 1)), 0);
          const newOrder: Order = {
              id: Math.random().toString(36).substring(7),
              ticketId,
              date: new Date().toLocaleString(),
              items,
              total,
              status: 'active',
              paymentMethod
          };
          
          const isBuyNow = view.type === 'checkout' && !!view.checkoutItems;

          if (isBuyNow) {
              cart.recordOrder(newOrder);
          } else {
              cart.placeOrder(newOrder);
          }
          
          if (user) {
              if (paymentMethod === 'balance') {
                  updateUserBalance(-total, `ORDER ${ticketId}`, 'purchase');
              } else if (paymentMethod === 'crypto' && cryptoDetails) {
                  updateUserCrypto(cryptoDetails.symbol, -cryptoDetails.amount);
                  updateUserBalance(0, `ORDER ${ticketId} (${cryptoDetails.amount.toFixed(6)} ${cryptoDetails.symbol})`, 'purchase');
              } else {
                  updateUserBalance(0, `ORDER ${ticketId}`, 'purchase');
              }

              // Global Activity Recording
              items.forEach(item => {
                  recordGlobalTransaction(
                      'PURCHASE',
                      user.name,
                      item.name,
                      item.id,
                      item.price,
                      false
                  );
              });

              const allOrders = [...cart.orderHistory, newOrder];
              const totalItems = allOrders.reduce((acc: number, order) => acc + order.items.reduce((s: number, i) => s + (i.quantity || 1), 0), 0);
              
              checkMission(`buy_milestone_${Math.min(8, Math.floor(totalItems / 2) * 2)}`);
              if (total > 500) checkMission('spend_500');
              if (items.some(i => i.category === 'Automation')) checkMission('buy_automation');
              
              const allPurchasedIds = new Set<string>();
              allOrders.forEach(o => o.items.forEach(i => allPurchasedIds.add(i.id)));
              if (allPurchasedIds.size >= 5) checkMission('own_5_unique');
          }
      } catch (error) {
          console.error("Transaction failed:", error);
          showNotification(language === 'id' ? "TRANSAKSI GAGAL: MASALAH JARINGAN" : "TRANSACTION FAILED: NETWORK ERROR");
          audioSystem.playError();
      }
  };

  const handleCryptoTrade = (action: 'buy' | 'sell', amount: number, symbol: string = 'TKNX') => {
      if (!user) return;
      const currentPrice = cryptoMarket[symbol]?.price || 0;
      const costUSD = amount * currentPrice;
      
      if (action === 'sell') {
          const ownedAmount = user.cryptoPortfolio[symbol] || 0;
          if (ownedAmount < amount) return;
          updateUserCrypto(symbol, -amount);
          updateUserBalance(costUSD, `SOLD ${amount.toFixed(6)} ${symbol}`, 'trade');
          showNotification(language === 'id' ? `MENJUAL ${amount} ${symbol} SEHARGA $${costUSD.toFixed(2)}` : `SOLD ${amount} ${symbol} FOR $${costUSD.toFixed(2)}`);
      } else {
          if (user.balance < costUSD) return;
          updateUserCrypto(symbol, amount);
          updateUserBalance(-costUSD, `BOUGHT ${amount.toFixed(6)} ${symbol}`, 'trade');
          showNotification(language === 'id' ? `MEMPEROLEH ${amount} ${symbol} SEHARGA $${costUSD.toFixed(2)}` : `ACQUIRED ${amount} ${symbol} FOR $${costUSD.toFixed(2)}`);
      }
      
      audioSystem.playSuccess();
      checkMission('trade_crypto');
      
      const portfolioSize = Object.values(user.cryptoPortfolio).filter((v: number) => v > 0).length;
      if (action === 'buy' && (user.cryptoPortfolio[symbol] || 0) === 0 && portfolioSize + 1 >= 3) {
          checkMission('own_3_crypto');
      } else if (portfolioSize >= 3) {
          checkMission('own_3_crypto');
      }
  };

  const handleSellItem = async (productId: string) => {
      if (!user) return;
      const price = marketPrices[productId] || PRODUCTS.find(p => p.id === productId)?.price || 0;
      const productName = PRODUCTS.find(p => p.id === productId)?.name || productId;
      
      try {
          await restockItem(productId, 1);
          setUser(prev => {
              if (!prev) return null;
              const currentSold = prev.soldItems[productId] || 0;
              return {
                  ...prev,
                  balance: prev.balance + price,
                  soldItems: { ...prev.soldItems, [productId]: currentSold + 1 },
                  transactions: [
                      {
                          id: `TX-${Date.now()}`,
                          type: 'sale',
                          description: `SOLD ASSET: ${productId}`,
                          amount: price,
                          date: new Date().toISOString()
                      },
                      ...(prev.transactions || [])
                  ]
              };
          });

          // Record to Global Feed
          recordGlobalTransaction(
              'LIQUIDATION',
              user.name,
              productName,
              productId,
              price,
              false
          );

          audioSystem.playSuccess();
          showNotification(language === 'id' ? `ASET DILIKUIDASI: +$${price.toFixed(2)}` : `ASSET LIQUIDATED: +$${price.toFixed(2)}`);
      } catch (e) {
          console.error("Sell Error:", e);
          showNotification(language === 'id' ? "KEGAGALAN LIKUIDASI: KESALAHAN JARINGAN" : "LIQUIDATION FAILED: NETWORK ERROR");
          audioSystem.playError();
      }
  };

  const handleMinigameCompletion = (actionId: string) => {
      handleMinigameComplete(actionId);
      const returnTab = (view as any).returnTab || 'missions';
      setView({ type: 'profile', initialTab: returnTab, scrollToId: 'active-simulations' });
  };

  const handlePvPTradeWrapper = async (sid: string, pid: string, price: number) => {
      try {
          await executePvPTrade(sid, pid, price);
          showNotification(language === 'id' ? "PERETASAN SUKSES: ASET DIPEROLEH DARI PASAR GELAP" : "HACK SUCCESSFUL: ASSET ACQUIRED FROM BLACK MARKET");
          audioSystem.playSuccess();
      } catch (e) {
          showNotification(language === 'id' ? "GAGAL: DANA TIDAK MENCUKUPI ATAU ERROR" : "FAILED: INSUFFICIENT FUNDS OR NETWORK ERROR");
          audioSystem.playError();
          throw e;
      }
  };

  const handlePlayMission = (actionId: string, fromTab: ProfileTab = 'missions') => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (actionId === 'complete_hack') {
          setView({ type: 'minigame', returnTab: fromTab });
      } else if (actionId === 'play_match_game') {
          setView({ type: 'matchgame', returnTab: fromTab });
      }
  };

  const handleLoginSuccess = () => {
      if (cart.pendingCheckout) {
          setView({ 
              type: 'checkout', 
              returnToProduct: cart.pendingReturnProduct,
              checkoutItems: cart.pendingCheckoutItems 
          });
          cart.setPendingCheckout(false);
          cart.setPendingCheckoutItems(undefined);
      } else {
          setView({ type: 'home' });
      }
  };

  const handleCancelLogin = () => {
      cart.setPendingCheckout(false);
      cart.setPendingCheckoutItems(undefined);
      setView({ type: 'home' });
      audioSystem.playClick();
  };

  const handleInvite = () => {
      checkMission('invite_friend');
      showNotification(language === 'id' ? "KODE UNDANGAN DISALIN KE CLIPBOARD" : "INVITE CODE COPIED TO CLIPBOARD");
  };

  // Bundle Data & Actions
  const data = {
      user, localizedProducts, localizedMissions, localizedJournal, marketPrices, stockLevels, systemStats,
      cartItems: cart.cartItems, orderHistory: cart.orderHistory, cryptoMarket, marketHistory
  };

  const actions = {
      setView,
      addToCart: cart.addToCart,
      handleBuyNow: cart.handleBuyNow,
      handlePlaceOrder,
      handleExchangeAccess,
      handleLogin: handleLoginSuccess,
      handleAdminLogin,
      handleCancelLogin,
      handleLogout,
      handleNavClick,
      handleClaimReward,
      handleSellItem,
      handlePlayMission,
      handleInvite,
      handleUpdateUserName: updateProfileName,
      sendFriendRequest,
      respondToFriendRequest,
      transferCredits,
      transferItem,
      handleCryptoTrade,
      setGridPage,
      handleGridCategoryChange,
      handleGridSearchChange,
      executePvPTrade: handlePvPTradeWrapper,
      scrollToSection,
      checkMission,
      handleMinigameCompletion
  };

  const ui = { language, gridCategory, gridSearch, gridPage };

  const isOverlayView = ['checkout', 'login', 'orders', 'market', 'exchange', 'minigame', 'matchgame', 'pvp_game', 'about'].includes(view.type);

  return (
    <TranslationContext.Provider value={currentTranslations}>
    <div className="min-h-screen bg-[#050505] font-sans text-[#E0E0E0] selection:bg-[#00FF41] selection:text-black">
      
      {showTutorial && (
          <TutorialOverlay 
            onComplete={handleTutorialComplete} 
            onLanguageChange={handleLanguageChange} 
            currentLanguage={language} 
            isTranslating={false} 
          />
      )}

      {notification && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in-up" role="alert">
              <div className="bg-[#00FF41] text-black px-6 py-3 font-bold font-mono text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,255,65,0.4)] clip-path-slant border-2 border-white text-center">
                  {notification}
              </div>
          </div>
      )}

      {!isOverlayView && (
        <Navbar 
            onNavClick={handleNavClick} 
            cartCount={cart.cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
            onOpenCart={() => { cart.setIsCartOpen(true); audioSystem.playClick(); }}
            user={user}
            onLoginClick={() => { setView({ type: 'login' }); audioSystem.playClick(); }}
            onOrdersClick={() => { setView({ type: 'profile' }); audioSystem.playClick(); }}
            onLogoutClick={handleLogout}
            onMarketClick={() => { 
                window.scrollTo({ top: 0, behavior: 'smooth' });
                checkMission('view_market'); 
                setView({ type: 'market' }); 
                audioSystem.playClick(); 
            }}
            onExchangeClick={handleExchangeAccess}
            language={language}
            onLanguageChange={handleLanguageChange}
            isTranslating={false}
        />
      )}
      
      <main id="main-content">
          <ViewRouter view={view} data={data} actions={actions} ui={ui} />
      </main>

      {!isOverlayView && (
        <div className={view.type === 'profile' ? 'hidden md:block' : ''}>
            <Footer onLinkClick={handleNavClick} />
        </div>
      )}
      
      <Assistant 
          cartItems={cart.cartItems}
          onAddToCart={cart.addToCart}
          onRemoveFromCart={cart.removeFromCart}
          onOpenCart={() => cart.setIsCartOpen(true)}
          onCheckout={() => cart.handleCheckout()}
          setView={setView}
          orders={cart.orderHistory}
          user={user}
          marketPrices={marketPrices}
          missions={localizedMissions}
          products={localizedProducts}
          onSellItem={handleSellItem}
          onReplayTutorial={handleReplayTutorial}
          language={language}
      />
      
      <CartDrawer 
        isOpen={cart.isCartOpen}
        onClose={() => cart.setIsCartOpen(false)}
        items={cart.cartItems}
        onRemoveItem={cart.removeFromCart}
        onUpdateQuantity={cart.updateCartQuantity}
        onCheckout={() => cart.handleCheckout()}
      />
    </div>
    </TranslationContext.Provider>
  );
}

export default App;
