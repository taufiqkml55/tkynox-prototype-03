
import React from 'react';

interface TradeFormProps {
    mode: 'buy' | 'sell';
    setMode: (m: 'buy' | 'sell') => void;
    selectedSymbol: string;
    amount: string;
    setAmount: (a: string) => void;
    setMax: () => void;
    canBuy: boolean;
    canSell: boolean;
    isExecuting: boolean;
    totalValueUSD: number;
    onSubmit: (e: React.FormEvent) => void;
}

export const TradeForm: React.FC<TradeFormProps> = ({
    mode, setMode, selectedSymbol, amount, setAmount, setMax, canBuy, canSell, isExecuting, totalValueUSD, onSubmit
}) => {
    const numericAmount = parseFloat(amount) || 0;

    return (
        <div className={`bg-[#0A0A0A] border p-6 sticky top-32 shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-colors duration-300 ${mode === 'buy' ? 'border-[#00FF41]' : 'border-[#FF3333]'}`}>
                                
            <div className="flex border-b border-[#333] mb-6 pb-4 gap-2">
                <button 
                    onClick={() => { setMode('buy'); setAmount(''); }} 
                    className={`flex-1 py-2 text-sm font-bold font-mono uppercase transition-all ${mode === 'buy' ? 'bg-[#00FF41] text-black' : 'bg-[#111] text-[#666] hover:text-white'}`}
                >
                    BUY
                </button>
                <button 
                    onClick={() => { setMode('sell'); setAmount(''); }} 
                    className={`flex-1 py-2 text-sm font-bold font-mono uppercase transition-all ${mode === 'sell' ? 'bg-[#FF3333] text-black' : 'bg-[#111] text-[#666] hover:text-white'}`}
                >
                    SELL
                </button>
            </div>

            <div className="mb-6">
                <h2 className={`text-xl font-bold mb-1 transition-colors ${mode === 'buy' ? 'text-white' : 'text-[#FF3333]'}`}>
                    {mode === 'buy' ? `ACQUIRE ${selectedSymbol}` : `LIQUIDATE ${selectedSymbol}`}
                </h2>
                <p className="text-xs text-[#666] font-mono">
                    {mode === 'buy' ? `CONVERT USD TO ${selectedSymbol}` : `CONVERT ${selectedSymbol} TO USD`}
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-[#666] mb-2 font-mono uppercase">
                        Amount ({selectedSymbol})
                    </label>
                    <div className="relative">
                        <input 
                            type="number" 
                            step="0.000001"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={`w-full bg-black border text-white px-4 py-3 outline-none transition-colors font-mono text-lg ${mode === 'buy' ? 'focus:border-[#00FF41] border-[#333]' : 'focus:border-[#FF3333] border-[#333]'}`}
                            placeholder="0.0000"
                            disabled={isExecuting}
                        />
                        <button 
                            type="button"
                            onClick={setMax}
                            className={`absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-white px-2 py-1 transition-colors uppercase ${mode === 'buy' ? 'bg-[#333] hover:bg-[#00FF41] hover:text-black' : 'bg-[#333] hover:bg-[#FF3333] hover:text-black'}`}
                        >
                            MAX
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-[#111] border border-[#222]">
                    <div className="flex justify-between mb-1">
                        <span className="text-xs text-[#666] font-mono uppercase">Est. Value</span>
                        <span className="text-white font-mono font-bold">${totalValueUSD.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs text-[#666] font-mono uppercase">Fee (0%)</span>
                        <span className="text-[#00FF41] font-mono text-xs">$0.00</span>
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={mode === 'buy' ? !canBuy || isExecuting : !canSell || isExecuting}
                    className={`w-full py-4 text-black font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed clip-path-slant relative group overflow-hidden ${mode === 'buy' ? 'bg-[#00FF41]' : 'bg-[#FF3333]'}`}
                >
                    {isExecuting ? (
                        <span className="animate-pulse">PROCESSING CHAIN...</span>
                    ) : (
                        <>
                            <span className="relative z-10">{mode === 'buy' ? 'EXECUTE ORDER' : 'EXECUTE SALE'}</span>
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                        </>
                    )}
                </button>

                {mode === 'buy' && !canBuy && numericAmount > 0 && (
                    <p className="text-red-500 text-[10px] text-center font-mono uppercase animate-pulse">
                        INSUFFICIENT FUNDS (USD)
                    </p>
                )}
                {mode === 'sell' && !canSell && numericAmount > 0 && (
                    <p className="text-red-500 text-[10px] text-center font-mono uppercase animate-pulse">
                        INSUFFICIENT ASSETS ({selectedSymbol})
                    </p>
                )}
            </form>
        </div>
    );
};
