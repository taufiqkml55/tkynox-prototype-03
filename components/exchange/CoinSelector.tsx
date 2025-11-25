
import React from 'react';
import { AVAILABLE_CRYPTOS } from '../../constants';
import { audioSystem } from '../../services/audioSystem';

interface CoinSelectorProps {
    cryptoMarket: Record<string, { price: number }>;
    selectedSymbol: string;
    onSelect: (symbol: string) => void;
}

export const CoinSelector: React.FC<CoinSelectorProps> = ({ cryptoMarket, selectedSymbol, onSelect }) => {
    return (
        <div className="lg:col-span-1 bg-[#0A0A0A] border border-[#1A1A1A] p-4 flex flex-col gap-2 h-fit">
            <h3 className="text-xs text-[#666] font-mono uppercase mb-4 px-2">Available Assets</h3>
            {AVAILABLE_CRYPTOS.map(coin => {
                const price = cryptoMarket[coin.symbol]?.price || coin.initialPrice;
                const isSelected = selectedSymbol === coin.symbol;
                return (
                    <button
                        key={coin.id}
                        onClick={() => { onSelect(coin.symbol); audioSystem.playClick(); }}
                        className={`flex justify-between items-center p-3 transition-all ${isSelected ? 'bg-[#1A1A1A] border-l-2 border-[#00FF41]' : 'hover:bg-[#111] border-l-2 border-transparent'}`}
                    >
                        <div className="text-left">
                            <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-[#888]'}`}>{coin.symbol}</div>
                            <div className="text-[10px] text-[#666] font-mono">{coin.name}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-mono text-white">${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</div>
                        </div>
                    </button>
                )
            })}
        </div>
    );
};
