
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { User } from '../types';
import { AVAILABLE_CRYPTOS } from '../constants';
import { audioSystem } from '../services/audioSystem';
import { CoinSelector } from './exchange/CoinSelector';
import { PriceChart } from './exchange/PriceChart';
import { TradeForm } from './exchange/TradeForm';

interface CryptoExchangeProps {
    user: User;
    cryptoMarket: Record<string, { price: number, history: number[] }>;
    onTrade: (action: 'buy' | 'sell', amount: number, symbol: string) => void;
    onBack: () => void;
}

type Timeframe = '1H' | '24H' | '7D';

const CryptoExchange: React.FC<CryptoExchangeProps> = ({ user, cryptoMarket, onTrade, onBack }) => {
    const [selectedSymbol, setSelectedSymbol] = useState(AVAILABLE_CRYPTOS[5].symbol); // Default to TKNX
    const [amount, setAmount] = useState<string>('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [timeframe, setTimeframe] = useState<Timeframe>('1H');
    const [mode, setMode] = useState<'buy' | 'sell'>('buy');

    const selectedCoin = AVAILABLE_CRYPTOS.find(c => c.symbol === selectedSymbol) || AVAILABLE_CRYPTOS[0];
    const marketData = cryptoMarket[selectedSymbol] || { price: selectedCoin.initialPrice, history: [selectedCoin.initialPrice] };
    const currentPrice = marketData.price;
    const priceHistory = marketData.history;

    const numericAmount = parseFloat(amount) || 0;
    const totalValueUSD = numericAmount * currentPrice;
    
    const canBuy = user.balance >= totalValueUSD && numericAmount > 0;
    const canSell = (user.cryptoPortfolio[selectedSymbol] || 0) >= numericAmount && numericAmount > 0;

    // Generate mock shapes for 24H and 7D views based on selected coin's current volatility
    const activeData = useMemo(() => {
        if (timeframe === '1H') return priceHistory;
        
        // Generate mock history for larger timeframes that aligns with current price
        const points = timeframe === '24H' ? 50 : 100;
        const arr = [currentPrice];
        for(let i=0; i<points; i++) {
            const prev = arr[0];
            const vol = timeframe === '24H' ? 0.05 : 0.15;
            const change = prev * (Math.random() * vol - (vol/2));
            arr.unshift(prev - change);
        }
        return arr;
    }, [timeframe, priceHistory, currentPrice]);

    const startPrice = activeData[0] || currentPrice;
    const changeVal = currentPrice - startPrice;
    const changePct = (changeVal / startPrice) * 100;
    const isPositive = changeVal >= 0;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'buy' && !canBuy) return;
        if (mode === 'sell' && !canSell) return;
        if (isExecuting) return;

        setIsExecuting(true);
        audioSystem.playProcessing();

        setTimeout(() => {
            onTrade(mode, numericAmount, selectedSymbol);
            setAmount('');
            setIsExecuting(false);
        }, 1500);
    };

    const setMax = () => {
        if (mode === 'sell') {
            setAmount((user.cryptoPortfolio[selectedSymbol] || 0).toString());
        } else {
            // Max buy based on USD balance
            const maxBuy = user.balance / currentPrice;
            setAmount((Math.floor(maxBuy * 1000000) / 1000000).toString());
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-24 px-6 animate-fade-in-up">
            <div className="max-w-6xl mx-auto">
                {/* Nav */}
                <button 
                    onClick={onBack}
                    className="group flex items-center gap-2 text-xs font-mono text-[#666] hover:text-[#00FF41] transition-colors mb-8 uppercase"
                >
                    <span className="text-lg leading-none">&lt;</span>
                    EXIT EXCHANGE PROTOCOL
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    <CoinSelector 
                        cryptoMarket={cryptoMarket} 
                        selectedSymbol={selectedSymbol} 
                        onSelect={(sym) => { setSelectedSymbol(sym); setAmount(''); }} 
                    />

                    {/* Main Chart & Trading */}
                    <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-8 relative overflow-hidden">
                                {/* Header Row */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 z-10 relative gap-6">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 border-2 rounded-full flex items-center justify-center text-white font-bold" style={{ borderColor: selectedCoin.color }}>
                                                {selectedSymbol[0]}
                                            </div>
                                            <h1 className="text-3xl font-bold text-white tracking-tighter">{selectedSymbol}</h1>
                                            <span className="px-2 py-0.5 bg-[#111] border border-[#333] text-[10px] font-mono text-[#00FF41]">TRADING_ACTIVE</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`text-4xl font-mono font-bold ${isPositive ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                                                ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                                            </div>
                                            <div className={`flex items-center gap-1 text-sm font-mono ${isPositive ? 'text-[#00FF41]' : 'text-[#FF3333]'}`}>
                                                <span>{isPositive ? '▲' : '▼'}</span>
                                                <span>{Math.abs(changePct).toFixed(2)}%</span>
                                                <span className="text-[#666] text-[10px] uppercase">/ {timeframe}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeframe Toggles */}
                                    <div className="flex bg-[#111] border border-[#333] p-1">
                                        {(['1H', '24H', '7D'] as Timeframe[]).map((tf) => (
                                            <button
                                                key={tf}
                                                onClick={() => {
                                                    setTimeframe(tf);
                                                    audioSystem.playClick();
                                                }}
                                                className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-colors ${
                                                    timeframe === tf 
                                                    ? 'bg-[#333] text-white' 
                                                    : 'text-[#666] hover:text-white'
                                                }`}
                                            >
                                                {tf}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <PriceChart data={activeData} isPositive={isPositive} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6">
                                    <div className="text-xs text-[#666] font-mono uppercase mb-2">Your Balance ({selectedSymbol})</div>
                                    <div className="text-2xl text-white font-mono font-bold">
                                        {(user.cryptoPortfolio[selectedSymbol] || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                                    </div>
                                </div>
                                <div className="bg-[#0D0D0D] border border-[#1A1A1A] p-6">
                                    <div className="text-xs text-[#666] font-mono uppercase mb-2">Available USD</div>
                                    <div className="text-2xl text-[#00FF41] font-mono font-bold">
                                        {user.balance === Infinity ? '∞' : `$${user.balance.toFixed(2)}`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Trading Interface */}
                        <div className="lg:col-span-1">
                             <TradeForm 
                                mode={mode}
                                setMode={setMode}
                                selectedSymbol={selectedSymbol}
                                amount={amount}
                                setAmount={setAmount}
                                setMax={setMax}
                                canBuy={canBuy}
                                canSell={canSell}
                                isExecuting={isExecuting}
                                totalValueUSD={totalValueUSD}
                                onSubmit={handleSubmit}
                             />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CryptoExchange;
