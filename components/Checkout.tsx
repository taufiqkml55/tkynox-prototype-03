
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Product, User } from '../types';
import { CheckoutForm } from './checkout/CheckoutForm';
import { OrderSummary } from './checkout/OrderSummary';
import { SuccessScreen } from './checkout/SuccessScreen';
import { FailureScreen } from './checkout/FailureScreen';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
  onPlaceOrder: (items: Product[], ticketId: string, paymentMethod: 'crypto' | 'balance', cryptoDetails?: { symbol: string, amount: number }) => void;
  onAutoRedirect?: () => void;
  user: User | null;
  cryptoMarket?: Record<string, { price: number }>;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack, onPlaceOrder, onAutoRedirect, user, cryptoMarket = {} }) => {
  const isSubscription = items.some(item => item.isSubscription);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedTicketId, setGeneratedTicketId] = useState('');
  const [email, setEmail] = useState(user ? user.email : '');
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const canAfford = user ? user.balance >= subtotal : false;
  const isBalanceAllowed = !isSubscription;

  const activeCoinPrice = cryptoMarket[selectedCoin]?.price || 0;
  const cryptoAmount = activeCoinPrice > 0 ? subtotal / activeCoinPrice : 0;
  const canAffordCrypto = user ? (user.cryptoPortfolio[selectedCoin] || 0) >= cryptoAmount : false;

  // Prioritize balance if user exists and allowed, regardless of affordability (to allow failure state)
  const [paymentMethod, setPaymentMethod] = useState<'crypto' | 'balance'>(
      (user && isBalanceAllowed) ? 'balance' : 'crypto'
  );
  
  const [countdown, setCountdown] = useState(10);
  
  // Scroll to payment protocol section on mount
  useEffect(() => {
      const timer = setTimeout(() => {
          const element = document.getElementById('payment-protocol');
          if (element) {
              const headerOffset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - headerOffset;
              
              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });
          } else {
              window.scrollTo(0, 0);
          }
      }, 100);
      return () => clearTimeout(timer);
  }, []);

  // Auto Redirect Timer
  useEffect(() => {
      if (status === 'success' && onAutoRedirect) {
          const interval = setInterval(() => {
              setCountdown(prev => {
                  if (prev <= 1) {
                      clearInterval(interval);
                      onAutoRedirect();
                      return 0;
                  }
                  return prev - 1;
              });
          }, 1000);
          return () => clearInterval(interval);
      }
  }, [status, onAutoRedirect]);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Do not check affordability here to allow "Processing..." -> "Failed" flow
    if (paymentMethod === 'balance' && !isBalanceAllowed) return;
    
    setStatus('processing');
    
    // Simulate secure transmission / blockchain verification
    setTimeout(() => {
        if (paymentMethod === 'balance' && !canAfford) {
            setStatus('failed');
            setErrorMessage('INSUFFICIENT_FUNDS_AVAILABLE');
            return;
        }

        if (paymentMethod === 'crypto' && !canAffordCrypto) {
            setStatus('failed');
            setErrorMessage(`INSUFFICIENT ${selectedCoin} RESERVES`);
            return;
        }

        const ticketId = `TX-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
        setGeneratedTicketId(ticketId);
        onPlaceOrder(items, ticketId, paymentMethod, paymentMethod === 'crypto' ? { symbol: selectedCoin, amount: cryptoAmount } : undefined);
        setStatus('success');
    }, 3500); // Slightly longer for "crypto" verification feel
  };

  if (status === 'success') {
      return (
        <SuccessScreen 
            ticketId={generatedTicketId}
            paymentMethod={paymentMethod}
            isSubscription={isSubscription}
            countdown={countdown}
            onBack={onBack}
        />
      );
  }

  if (status === 'failed') {
      return (
          <FailureScreen 
            error={errorMessage}
            onRetry={() => setStatus('idle')}
            onBack={onBack}
          />
      );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#050505] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#666] hover:text-[#00FF41] transition-colors mb-12 py-2"
        >
          &lt; Abort Sequence
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <CheckoutForm 
              user={user}
              email={email}
              setEmail={setEmail}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isSubscription={isSubscription}
              isBalanceAllowed={isBalanceAllowed}
              canAfford={canAfford}
              canAffordCrypto={canAffordCrypto}
              status={status}
              onSubmit={handleTransmit}
              cryptoMarket={cryptoMarket}
              total={subtotal}
              selectedCoin={selectedCoin}
              setSelectedCoin={setSelectedCoin}
          />
          
          <OrderSummary 
              items={items}
              subtotal={subtotal}
              isSubscription={isSubscription}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
