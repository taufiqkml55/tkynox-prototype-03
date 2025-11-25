
import React from 'react';
import { User } from '../../types';
import { AVAILABLE_CRYPTOS } from '../../constants';

interface CheckoutFormProps {
    user: User | null;
    email: string;
    setEmail: (e: string) => void;
    paymentMethod: 'crypto' | 'balance';
    setPaymentMethod: (m: 'crypto' | 'balance') => void;
    isSubscription: boolean;
    isBalanceAllowed: boolean;
    canAfford: boolean;
    canAffordCrypto: boolean;
    status: string;
    onSubmit: (e: React.FormEvent) => void;
    cryptoMarket: Record<string, { price: number }>;
    total: number;
    selectedCoin: string;
    setSelectedCoin: (coin: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
    user, email, setEmail, paymentMethod, setPaymentMethod, isSubscription, isBalanceAllowed, canAfford, canAffordCrypto, status, onSubmit, cryptoMarket, total, selectedCoin, setSelectedCoin 
}) => {
    const activeCoin = AVAILABLE_CRYPTOS.find(c => c.symbol === selectedCoin) || AVAILABLE_CRYPTOS[0];
    const cryptoPrice = cryptoMarket[selectedCoin]?.price || activeCoin.initialPrice;
    const cryptoAmount = cryptoPrice > 0 ? total / cryptoPrice : 0;
    const userCryptoBalance = user ? (user.cryptoPortfolio[selectedCoin] || 0) : 0;

    const validateAndSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(e);
    };

    const isInsufficientBalance = paymentMethod === 'balance' && !canAfford;
    const isInsufficientCrypto = paymentMethod === 'crypto' && !canAffordCrypto;

    return (
        <form onSubmit={validateAndSubmit}>
            <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 bg-[#00FF41] animate-pulse"></div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    {isSubscription ? 'MEMBERSHIP INITIATION' : 'PROJECT INITIATION'}
                </h1>
            </div>
            <p className="text-sm text-[#888] mb-12 font-mono border-l-2 border-[#333] pl-4">
                {isSubscription ? '> CONFIRM IDENTITY FOR RECURRING ACCESS.' : '> FILL REQUIRED FIELDS TO BEGIN SCOPING PHASE.'} <br/>
                &gt; SECURE CONNECTION ESTABLISHED.
            </p>
            
            <div className="space-y-12">
              {/* Section 1: Contact */}
              <div>
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-b border-[#333] pb-2">Client ID</h2>
                <div className="space-y-4">
                   <label htmlFor="email" className="sr-only">Email Address</label>
                   <input 
                     id="email"
                     required 
                     type="email" 
                     placeholder="EMAIL_ADDRESS" 
                     value={email}
                     onChange={(e) => !user && setEmail(e.target.value)}
                     readOnly={!!user}
                     className={`w-full bg-[#0D0D0D] border border-[#333] py-3 px-4 text-white placeholder-[#666] outline-none focus:border-[#00FF41] transition-colors font-mono text-sm ${user ? 'opacity-70 cursor-not-allowed border-l-4 border-l-[#00FF41]' : ''}`}
                   />
                   <div className="flex items-center gap-2 group">
                     <input type="checkbox" id="newsletter" className="peer h-4 w-4 shrink-0 appearance-none border border-[#333] bg-[#0D0D0D] checked:bg-[#00FF41] checked:border-[#00FF41] focus:outline-none transition-colors cursor-pointer" />
                     <label htmlFor="newsletter" className="text-xs text-[#888] font-mono cursor-pointer peer-checked:text-[#00FF41] group-hover:text-white transition-colors">SUBSCRIBE TO NEURAL LINK</label>
                   </div>
                </div>
              </div>

              {/* Section 2: Payment Toggle */}
              <div>
                  <h2 id="payment-protocol" className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-b border-[#333] pb-2">Payment Protocol</h2>
                  <div className="flex gap-4 mb-2" role="radiogroup" aria-label="Payment Method">
                      <button 
                          type="button"
                          role="radio"
                          aria-checked={paymentMethod === 'balance'}
                          onClick={() => isBalanceAllowed && setPaymentMethod('balance')}
                          disabled={!user || !isBalanceAllowed}
                          className={`flex-1 py-4 px-4 border font-mono text-xs uppercase tracking-widest transition-all ${paymentMethod === 'balance' ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]' : 'bg-[#0D0D0D] border-[#333] text-[#888] hover:border-[#666]'} ${(!user || !isBalanceAllowed) ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                          Account Balance
                      </button>
                      <button 
                          type="button"
                          role="radio"
                          aria-checked={paymentMethod === 'crypto'}
                          onClick={() => setPaymentMethod('crypto')}
                          className={`flex-1 py-4 px-4 border font-mono text-xs uppercase tracking-widest transition-all ${paymentMethod === 'crypto' ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41]' : 'bg-[#0D0D0D] border-[#333] text-[#888] hover:border-[#666]'}`}
                      >
                          Crypto Transfer
                      </button>
                  </div>
                  
                  {paymentMethod === 'balance' && user && (
                      <div className={`p-4 border ${canAfford ? 'border-[#00FF41] bg-[#00FF41]/5' : 'border-yellow-500 bg-yellow-500/5'} mb-4 transition-colors`}>
                          <div className="flex justify-between items-center font-mono text-sm">
                              <span className="text-white">Current Balance:</span>
                              <span className={`font-bold ${canAfford ? 'text-[#00FF41]' : 'text-yellow-500'}`}>
                                  {user.balance === Infinity ? '∞ (UNLIMITED)' : `$${user.balance.toFixed(2)} USD`}
                              </span>
                          </div>
                          {!canAfford && (
                              <p className="text-yellow-500 text-xs mt-2 font-mono animate-pulse">
                                  &gt; WARNING: INSUFFICIENT FUNDS. TRANSACTION MAY FAIL.
                              </p>
                          )}
                      </div>
                  )}
              </div>

              {/* Section 3: Details / Crypto UI */}
              <div>
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-widest border-b border-[#333] pb-2">
                    {isSubscription ? 'Billing Info' : 'Target Info'}
                </h2>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="sr-only">{isSubscription ? "First Name" : "Organization Name"}</label>
                        <input 
                            id="firstName"
                            required 
                            type="text" 
                            placeholder={isSubscription ? "FIRST_NAME" : "ORG_NAME"}
                            className="w-full bg-[#0D0D0D] border border-[#333] py-3 px-4 text-white placeholder-[#666] outline-none focus:border-[#00FF41] transition-colors font-mono text-sm" 
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="sr-only">{isSubscription ? "Last Name" : "Industry Sector"}</label>
                        <input 
                            id="lastName"
                            required 
                            type="text" 
                            placeholder={isSubscription ? "LAST_NAME" : "INDUSTRY_SECTOR"}
                            className="w-full bg-[#0D0D0D] border border-[#333] py-3 px-4 text-white placeholder-[#666] outline-none focus:border-[#00FF41] transition-colors font-mono text-sm" 
                        />
                      </div>
                   </div>
                   
                   {paymentMethod === 'crypto' && (
                       <div className="bg-[#0A0A0A] p-6 border border-[#333] text-sm relative group animate-fade-in-up">
                           <div className="flex flex-col gap-4">
                               {/* Coin Selector */}
                               <div>
                                   <label className="block text-[10px] font-mono text-[#888] uppercase mb-1">Select Asset to Debit</label>
                                   <div className="flex flex-wrap gap-2">
                                       {AVAILABLE_CRYPTOS.map(coin => (
                                           <button
                                               key={coin.symbol}
                                               type="button"
                                               onClick={() => setSelectedCoin(coin.symbol)}
                                               className={`px-3 py-2 text-xs font-bold border transition-all ${selectedCoin === coin.symbol ? 'border-[#00FF41] text-[#00FF41] bg-[#00FF41]/10' : 'border-[#333] text-[#666] hover:border-[#666]'}`}
                                           >
                                               {coin.symbol}
                                           </button>
                                       ))}
                                   </div>
                               </div>

                               {/* Amount Display */}
                               <div className={`p-4 border ${canAffordCrypto ? 'bg-[#111] border-[#222]' : 'bg-yellow-500/5 border-yellow-500/20'}`}>
                                   <div className="flex justify-between items-end mb-2">
                                       <span className="text-xs text-[#666] font-mono">REQUIRED AMOUNT</span>
                                       <span className="text-xl text-white font-bold font-mono tracking-tight">
                                           {cryptoAmount.toFixed(6)} <span className="text-sm text-[#00FF41]">{activeCoin.symbol}</span>
                                       </span>
                                   </div>
                                   <div className="flex justify-between items-end pt-2 border-t border-[#222]">
                                       <span className="text-xs text-[#666] font-mono">YOUR HOLDINGS</span>
                                       <span className={`text-sm font-bold font-mono ${canAffordCrypto ? 'text-white' : 'text-yellow-500'}`}>
                                           {userCryptoBalance.toFixed(6)} {activeCoin.symbol}
                                       </span>
                                   </div>
                                   {!canAffordCrypto && (
                                       <div className="mt-2 text-center text-[10px] text-yellow-500 font-mono uppercase animate-pulse">
                                           &gt; INSUFFICIENT {selectedCoin}. PLEASE RECHARGE ON EXCHANGE.
                                       </div>
                                   )}
                               </div>
                           </div>
                           
                           <div className="mt-4 flex items-center gap-2 text-[10px] text-[#444] font-mono border-t border-[#222] pt-2">
                               <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse"></div>
                               INTERNAL WALLET CONNECTION // SECURE
                           </div>
                       </div>
                   )}

                   {!isSubscription && (
                        <div>
                            <label htmlFor="briefUrl" className="sr-only">Project Brief URL</label>
                            <input 
                            id="briefUrl"
                            type="text" 
                            placeholder="PROJECT_BRIEF_URL (OPTIONAL)" 
                            className="w-full bg-[#0D0D0D] border border-[#333] py-3 px-4 text-white placeholder-[#666] outline-none focus:border-[#00FF41] transition-colors font-mono text-sm" 
                            />
                        </div>
                   )}
                </div>
              </div>

              <div>
                <button 
                    type="submit"
                    disabled={status === 'processing'}
                    className={`w-full py-5 uppercase tracking-widest text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group clip-path-slant ${
                        (isInsufficientBalance || isInsufficientCrypto)
                        ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                        : 'bg-[#00FF41] text-black hover:bg-white'
                    }`}
                >
                    {status === 'processing' ? (
                        <span className="animate-pulse font-mono">[ VERIFYING BLOCKCHAIN... ]</span>
                    ) : (
                        <>
                            <span className="relative z-10">
                                [ {paymentMethod === 'crypto' ? (isInsufficientCrypto ? 'ATTEMPT TRANSFER' : `PAY WITH ${selectedCoin}`) : (isInsufficientBalance ? 'ATTEMPT TRANSACTION' : (isSubscription ? 'ACTIVATE MEMBERSHIP' : 'CONFIRM TRANSACTION'))} ]
                            </span>
                        </>
                    )}
                </button>
                <div className="flex justify-center mt-4 gap-2">
                    <div className="w-1 h-1 bg-[#333] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#333] rounded-full"></div>
                    <div className="w-1 h-1 bg-[#00FF41] rounded-full animate-pulse"></div>
                </div>
                <p className="text-xs text-[#444] mt-2 font-mono text-center">
                    SECURE SOCKET LAYER: ACTIVE
                </p>
              </div>
            </div>
        </form>
    );
};
