
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { ViewState, User, Product, Order, Mission, JournalArticle, Friend, ProfileTab, Language } from '../types';
import { audioSystem } from '../services/audioSystem';

// Components
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import Journal from './Journal';
import ProductDetail from './ProductDetail';
import About from './About';
import JournalDetail from './JournalDetail';
import Checkout from './Checkout';
import Login from './Login';
import TicketList from './TicketList';
import UserProfile from './UserProfile';
import MarketOverview from './MarketOverview';
import CryptoExchange from './CryptoExchange';
import MiniGame from './MiniGame';
import MatchGame from './MatchGame';

interface ViewRouterProps {
    view: ViewState;
    data: {
        user: User | null;
        localizedProducts: Product[];
        localizedMissions: Mission[];
        localizedJournal: JournalArticle[];
        marketPrices: Record<string, number>;
        stockLevels: Record<string, number>;
        systemStats: any;
        cartItems: Product[];
        orderHistory: Order[];
        cryptoMarket: Record<string, any>;
        marketHistory: Record<string, number[]>;
    };
    actions: {
        setView: (view: ViewState) => void;
        addToCart: (p: Product) => void;
        handleBuyNow: (p: Product) => void;
        handlePlaceOrder: (items: Product[], ticketId: string, paymentMethod: 'crypto' | 'balance', cryptoDetails?: any) => void;
        handleExchangeAccess: () => void;
        handleLogin: () => void;
        handleAdminLogin: () => void;
        handleCancelLogin: () => void;
        handleLogout: () => void;
        handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
        handleClaimReward: (id: string) => void;
        handleSellItem: (id: string) => void;
        handlePlayMission: (id: string, tab: ProfileTab) => void;
        handleInvite: () => void;
        handleUpdateUserName: (name: string) => void;
        sendFriendRequest: (code: string, targetId?: string) => void;
        respondToFriendRequest: (id: string, accept: boolean) => void;
        transferCredits: (id: string, amount: number) => void;
        transferItem: (rid: string, pid: string) => void;
        handleCryptoTrade: (action: 'buy' | 'sell', amount: number, symbol?: string) => void;
        setGridPage: (page: number) => void;
        handleGridCategoryChange: (cat: string) => void;
        handleGridSearchChange: (query: string) => void;
        executePvPTrade: (sid: string, pid: string, price: number) => Promise<void>;
        scrollToSection: (id: string) => void;
        checkMission: (id: string) => void;
        // Game handlers
        handleMinigameCompletion: (actionId: string) => void;
    };
    ui: {
        language: Language;
        gridCategory: string;
        gridSearch: string;
        gridPage: number;
    };
}

const ViewRouter: React.FC<ViewRouterProps> = ({ view, data, actions, ui }) => {
    const { user, localizedProducts, localizedMissions, localizedJournal, marketPrices, stockLevels, systemStats, cartItems, orderHistory, cryptoMarket, marketHistory } = data;
    const { language, gridCategory, gridSearch, gridPage } = ui;

    const handlePvPTradeSuccess = async (targetUser: Friend, product: Product, price: number) => {
        try {
            await actions.executePvPTrade(targetUser.id, product.id, price);
            // App handles notification success
            actions.setView({ type: 'product', product: product });
        } catch (e: any) {
            console.error("PvP Trade Error", e);
            actions.setView({ type: 'product', product: product });
        }
    };

    switch (view.type) {
        case 'home':
            return (
                <>
                    <Hero language={language} version={localizedJournal[0]?.version} />
                    <ProductGrid 
                        products={localizedProducts}
                        marketPrices={marketPrices}
                        stockLevels={stockLevels}
                        onProductClick={(p) => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            actions.setView({ type: 'product', product: p });
                            actions.checkMission('view_product');
                            if (p.category === 'Security') actions.checkMission('view_security_product');
                            audioSystem.playClick();
                        }} 
                        onAddToCart={actions.addToCart}
                        onBuyNow={actions.handleBuyNow}
                        language={language}
                        activeCategory={gridCategory}
                        onCategoryChange={actions.handleGridCategoryChange}
                        searchQuery={gridSearch}
                        onSearchChange={actions.handleGridSearchChange}
                        currentPage={gridPage}
                        onPageChange={actions.setGridPage}
                    />
                    <Journal 
                        articles={localizedJournal}
                        language={language}
                        onArticleClick={(a) => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            actions.setView({ type: 'journal', article: a });
                            actions.checkMission('view_journal');
                            audioSystem.playClick();
                        }} 
                        systemStats={systemStats}
                    />
                </>
            );

        case 'product':
            const isProductOwned = (productId: string) => {
                if (!user) return false;
                const bought = orderHistory.reduce((acc: number, o) => acc + o.items.filter(i => i.id === productId).length, 0);
                const sold = user.soldItems[productId] || 0;
                const received = user.receivedItems?.filter(i => i.id === productId).length || 0;
                return (bought + received - sold) > 0;
            };

            return (
                <ProductDetail 
                    product={view.product}
                    marketPrice={marketPrices[view.product.id] || view.product.price}
                    stockLevel={stockLevels[view.product.id]}
                    onBack={() => { 
                        actions.setView({ type: 'home' }); 
                        setTimeout(() => actions.scrollToSection(`product-${view.product.id}`), 100);
                        audioSystem.playClick(); 
                    }}
                    onAddToCart={actions.addToCart}
                    onBuyNow={actions.handleBuyNow}
                    isOwned={isProductOwned(view.product.id)}
                    language={language}
                    setView={actions.setView}
                />
            );

        case 'about':
            return <About onBack={() => { actions.setView({ type: 'home' }); audioSystem.playClick(); }} />;

        case 'journal':
            return (
                <JournalDetail 
                    article={view.article} 
                    onBack={() => { 
                        actions.setView({ type: 'home' }); 
                        setTimeout(() => actions.scrollToSection('journal'), 100);
                        audioSystem.playClick(); 
                    }}
                    language={language}
                />
            );

        case 'checkout':
            return (
                <Checkout 
                    items={view.checkoutItems || cartItems}
                    onBack={() => { 
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        if (view.returnToProduct) {
                            actions.setView({ type: 'product', product: view.returnToProduct });
                        } else {
                            actions.setView({ type: 'home' }); 
                        }
                        audioSystem.playClick(); 
                    }}
                    onPlaceOrder={actions.handlePlaceOrder}
                    onAutoRedirect={() => actions.setView({ type: 'orders' })}
                    user={user}
                    cryptoMarket={cryptoMarket}
                />
            );

        case 'login':
            return (
                <Login 
                    onLogin={actions.handleLogin}
                    onAdminLogin={actions.handleAdminLogin}
                    onCancel={actions.handleCancelLogin}
                    language={language}
                />
            );

        case 'orders':
            return (
                <TicketList 
                    orders={orderHistory}
                    onBack={() => { actions.setView({ type: 'profile' }); audioSystem.playClick(); }} 
                />
            );

        case 'profile':
            if (!user) return null;
            return (
                <UserProfile 
                    user={user}
                    missions={localizedMissions}
                    orders={orderHistory}
                    products={localizedProducts}
                    marketPrices={marketPrices}
                    onBack={() => { actions.setView({ type: 'home' }); audioSystem.playClick(); }}
                    onInvite={actions.handleInvite}
                    onClaim={actions.handleClaimReward}
                    onSell={actions.handleSellItem}
                    onPlay={actions.handlePlayMission}
                    onExchange={actions.handleExchangeAccess}
                    onUpdateName={actions.handleUpdateUserName}
                    onSendRequest={actions.sendFriendRequest}
                    onRespondRequest={actions.respondToFriendRequest}
                    onTransferCredits={actions.transferCredits}
                    onTransferItem={actions.transferItem}
                    language={language}
                    initialTab={view.initialTab}
                    scrollToId={view.scrollToId}
                />
            );

        case 'market':
            return (
                <MarketOverview 
                    products={localizedProducts}
                    marketPrices={marketPrices}
                    marketHistory={marketHistory}
                    onBack={() => { actions.setView({ type: 'home' }); audioSystem.playClick(); }}
                    language={language}
                />
            );

        case 'exchange':
            if (!user) return null;
            return (
                <CryptoExchange 
                    user={user}
                    cryptoMarket={cryptoMarket}
                    onTrade={actions.handleCryptoTrade}
                    onBack={() => { actions.setView({ type: 'home' }); audioSystem.playClick(); }}
                />
            );

        case 'minigame':
            return (
                <MiniGame 
                    onComplete={() => actions.handleMinigameCompletion('complete_hack')}
                    onExit={() => { actions.setView({ type: 'profile', initialTab: view.returnTab || 'missions', scrollToId: 'active-simulations' }); audioSystem.playClick(); }}
                    rewardAmount={localizedMissions.find(m => m.actionId === 'complete_hack')?.reward || 0}
                />
            );

        case 'matchgame':
             return (
                <MatchGame
                    onComplete={() => actions.handleMinigameCompletion('play_match_game')}
                    onExit={() => { actions.setView({ type: 'profile', initialTab: view.returnTab || 'missions', scrollToId: 'active-simulations' }); audioSystem.playClick(); }}
                    rewardAmount={localizedMissions.find(m => m.actionId === 'play_match_game')?.reward || 0}
                />
             );

        case 'pvp_game':
            return (
                <div className="relative">
                    <div className="fixed top-0 left-0 right-0 z-[60] p-4 bg-red-900/90 text-center border-b border-red-500 text-white font-bold animate-pulse font-mono">
                        ⚠️ HACKING {view.targetUser.name.toUpperCase()}'S INVENTORY... COST: ${view.price.toFixed(2)}
                    </div>
                    <MiniGame 
                        onComplete={() => handlePvPTradeSuccess(view.targetUser, view.product, view.price)}
                        onExit={() => { actions.setView({ type: 'product', product: view.product }); audioSystem.playClick(); }}
                        rewardAmount={0}
                        themeColor="#FF3333"
                        title={`HACKING: ${view.targetUser.name}`}
                    />
                </div>
            );

        default:
            return null;
    }
};

export default ViewRouter;
