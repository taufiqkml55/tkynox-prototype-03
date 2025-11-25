/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { Product, Order, ViewState, User, Mission } from '../types';
import { generateGeminiResponse, ASSISTANT_TOOLS } from '../services/geminiService';
import { Content, Part } from '@google/genai';
import { audioSystem } from '../services/audioSystem';
import { ChatMessage } from './assistant/ChatMessage';
import { ChatInput } from './assistant/ChatInput';

interface EnhancedChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
    products?: Product[]; 
}

interface AssistantProps {
    cartItems: Product[];
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (index: number) => void;
    onOpenCart: () => void;
    onCheckout: () => void;
    setView: (view: ViewState) => void;
    orders: Order[];
    user: User | null;
    marketPrices: Record<string, number>;
    missions: Mission[];
    products: Product[];
    onSellItem: (productId: string) => void;
    onReplayTutorial: () => void;
    language: string;
}

const Assistant: React.FC<AssistantProps> = ({ 
    cartItems, 
    onAddToCart, 
    onRemoveFromCart, 
    onOpenCart, 
    onCheckout, 
    setView,
    orders,
    user,
    marketPrices,
    missions,
    products,
    onSellItem,
    onReplayTutorial,
    language
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // UI Messages
  const [messages, setMessages] = useState<EnhancedChatMessage[]>([
    { role: 'model', text: 'TKYNOX CORE ONLINE. WAITING FOR INPUT...', timestamp: Date.now() }
  ]);

  // AI Context History
  const [aiHistory, setAiHistory] = useState<Content[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isThinking]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    
    // 1. Update UI
    const userMsg: EnhancedChatMessage = { role: 'user', text: userText, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsThinking(true);
    audioSystem.playClick();

    try {
        // 2. Update AI History
        const newHistory = [...aiHistory, { role: 'user', parts: [{ text: userText }] }];
        setAiHistory(newHistory);

        // 3. Call API with Context
        await processTurn(newHistory);

    } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, { role: 'model', text: ">> SYSTEM OVERLOAD. TRAFFIC HIGH. PLEASE RETRY TRANSMISSION.", timestamp: Date.now() }]);
        audioSystem.playError();
    } finally {
        setIsThinking(false);
    }
  };

  const processTurn = async (currentHistory: Content[]) => {
      // Bundle context
      const context = {
          user,
          cart: cartItems,
          orders,
          marketPrices,
          missions,
          language
      };

      const response = await generateGeminiResponse(currentHistory, ASSISTANT_TOOLS, context);
      
      const candidate = response.candidates?.[0];
      if (!candidate || !candidate.content) throw new Error("No response");

      // Fix: Default to empty array if undefined to satisfy TS18048
      const modelParts = candidate.content.parts || [];
      
      const updatedHistory = [...currentHistory, candidate.content];
      setAiHistory(updatedHistory);

      let functionCallFound = false;

      for (const part of modelParts) {
          if (part.text) {
             setMessages(prev => [...prev, { role: 'model', text: part.text || '', timestamp: Date.now() }]);
             audioSystem.playNotification();
          }
          
          if (part.functionCall) {
             functionCallFound = true;
             const funcName = part.functionCall.name;
             if (!funcName) continue; // Guard clause for TS check

             // UI Feedback for action
             if (!part.text) {
                 setMessages(prev => [...prev, { 
                     role: 'model', 
                     text: `>> EXECUTING: ${funcName.toUpperCase()}...`, 
                     timestamp: Date.now() 
                 }]);
             }

             // Execute
             const result = await executeFunction(funcName, part.functionCall.args);
             
             const functionResponsePart: Part = {
                 functionResponse: {
                     name: funcName,
                     response: { result: result.text } // Return text result to AI
                 }
             };

             // If the function returned products for the UI, add them to the chat log
             if (result.products) {
                 setMessages(prev => [...prev, {
                     role: 'model',
                     text: '', // Empty text, just rendering products
                     timestamp: Date.now(),
                     products: result.products
                 }]);
             }
             
             const historyWithFunction = [...updatedHistory, { role: 'function', parts: [functionResponsePart] }];
             setAiHistory(historyWithFunction);
             
             await processTurn(historyWithFunction);
          }
      }

      if (!functionCallFound && !modelParts.some(p => p.text)) {
          setMessages(prev => [...prev, { role: 'model', text: ">> ACKNOWLEDGED.", timestamp: Date.now() }]);
      }
  };

  const executeFunction = async (name: string, args: any): Promise<{ text: string, products?: Product[] }> => {
      console.log("Executing Tool:", name, args);
      
      switch (name) {
          case 'addToQueue': {
              const query = (args.productName || '').toLowerCase();
              const product = products.find(p => 
                  p.name.toLowerCase().includes(query) || 
                  p.id.toLowerCase() === query
              );
              
              if (product) {
                  const price = marketPrices[product.id] || product.price;
                  onAddToCart({ ...product, price });
                  return { text: `Successfully added ${product.name} ($${price.toFixed(2)}) to queue.` };
              }
              return { text: `Error: Product matching "${args.productName}" not found in database.` };
          }

          case 'sellItem': {
              const query = (args.productName || '').toLowerCase();
              const product = products.find(p => 
                  p.name.toLowerCase().includes(query) || 
                  p.id.toLowerCase() === query
              );
              
              if (product) {
                  onSellItem(product.id);
                  return { text: `Sale Protocol Executed for ${product.name}. Credits transferred.` };
              }
              return { text: `Error: Item not found or not identified.` };
          }

          case 'viewProduct': {
              const query = (args.productName || '').toLowerCase();
              const product = products.find(p => 
                  p.name.toLowerCase().includes(query) || 
                  p.id.toLowerCase() === query
              );
              
              if (product) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setView({ type: 'product', product });
                  return { text: `Navigating to ${product.name} details.` };
              }
              return { text: `Error: Product matching "${args.productName}" not found in database.` };
          }
          
          case 'removeFromQueue': {
              const query = (args.productName || '').toLowerCase();
              const index = cartItems.findIndex(p => p.name.toLowerCase().includes(query));
              if (index !== -1) {
                  const removedName = cartItems[index].name;
                  onRemoveFromCart(index);
                  return { text: `Successfully removed ${removedName} from queue.` };
              }
              return { text: `Error: Product matching "${args.productName}" not found in current queue.` };
          }

          case 'viewQueue': {
              onOpenCart();
              if (cartItems.length === 0) return { text: "Queue is currently empty." };
              const itemsList = cartItems.map(p => p.name).join(', ');
              return { text: `Queue opened. Current items: ${itemsList}.` };
          }

          case 'checkout': {
              onCheckout();
              return { text: "Navigating user to checkout protocol." };
          }

          case 'navigate': {
              const dest = (args.destination || '').toLowerCase();
              if (['exchange', 'market', 'profile', 'orders', 'home'].includes(dest)) {
                  setView({ type: dest } as ViewState);
                  return { text: `Navigated to ${dest} view.` };
              }
              return { text: `Error: Unknown destination ${dest}.` };
          }

          case 'checkOrderStatus': {
              const ticketId = args.ticketId;
              const order = orders.find(o => o.ticketId === ticketId);
              if (order) {
                  return { text: `Ticket ${ticketId} found. Status: ${order.status}. Total: $${order.total}. Items: ${order.items.map(i => i.name).join(', ')}.` };
              }
              return { text: `Ticket ${ticketId} not found in local archives.` };
          }

          case 'recommendProducts': {
             const query = (args.searchQuery || '').toLowerCase();
             let recommended = products;
             if (query) {
                 recommended = products.filter(p => 
                    p.name.toLowerCase().includes(query) || 
                    p.category.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
                 );
             }
             // Limit to 3 for chat display
             const top3 = recommended.slice(0, 3);
             return { 
                 text: `Displaying ${top3.length} matching assets from the database.`,
                 products: top3
             };
          }

          case 'replayTutorial': {
              onReplayTutorial();
              return { text: "Re-initializing system onboarding protocol..." };
          }

          default:
              return { text: "Error: Unknown Protocol." };
      }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end font-mono pointer-events-none">
      {/* Container - Pointer events auto to allow interaction inside */}
      <div className={`pointer-events-auto transition-all duration-500 ease-in-out origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
        <div className="bg-[#050505]/90 backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,65,0.15)] w-[85vw] sm:w-[320px] h-[450px] mb-4 flex flex-col overflow-hidden border border-[#333] rounded-xl relative">
          
          {/* Glow Border Effect */}
          <div className="absolute inset-0 rounded-xl border border-[var(--tk-neon)] opacity-30 pointer-events-none"></div>

          {/* Header */}
          <div className="bg-[#0A0A0A]/90 p-3 border-b border-[#333] flex justify-between items-center z-10 backdrop-blur-md">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full bg-[var(--tk-neon)] ${isThinking ? 'animate-ping' : 'shadow-[0_0_5px_var(--tk-neon)]'}`}></div>
                <div className="flex flex-col">
                    <span className="text-white text-xs font-bold tracking-[0.15em]">TKYNOX_CORE</span>
                    <span className="text-[#666] text-[8px] tracking-widest flex items-center gap-2">
                        V.2.5 • {user ? 'LINKED' : 'GUEST'} 
                    </span>
                </div>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="text-[#666] hover:text-white transition-colors p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </button>
            </div>
          </div>

          {/* Chat Area */}
          <div 
            className="flex-1 overflow-y-auto p-4 bg-transparent scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent relative" 
            ref={scrollRef}
            role="log"
            aria-live="polite"
          >
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-0 bg-[length:100%_3px,3px_100%] pointer-events-none opacity-50"></div>
            
            <div className="relative z-10 flex flex-col gap-2">
                {messages.map((msg, idx) => (
                <ChatMessage 
                    key={idx}
                    msg={msg}
                    isLast={idx === messages.length - 1}
                    isThinking={isThinking}
                    onViewProduct={(p) => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setView({ type: 'product', product: p });
                    }}
                    onAddToCart={(p) => {
                        onAddToCart({ ...p, price: marketPrices[p.id] || p.price });
                        setMessages(prev => [...prev, { role: 'model', text: `>> ${p.name} ADDED TO QUEUE.`, timestamp: Date.now() }]);
                    }}
                    marketPrices={marketPrices}
                />
                ))}
                
                {isThinking && (
                    <div className="flex items-center gap-2 text-[var(--tk-neon)] text-xs font-mono p-2 animate-pulse opacity-80">
                        <span>&gt; PROCESSING_REQUEST</span>
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce delay-100">.</span>
                        <span className="animate-bounce delay-200">.</span>
                    </div>
                )}
            </div>
          </div>

          <ChatInput 
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSend={handleSend}
              isThinking={isThinking}
              userExists={!!user}
          />
        </div>
      </div>

      {/* Toggle Button - Square with AI text */}
      <button 
        onClick={() => {
             setIsOpen(!isOpen);
             audioSystem.playClick();
        }}
        className={`pointer-events-auto w-12 h-12 rounded-none flex items-center justify-center shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all duration-300 border z-[100] relative group bg-[#050505] backdrop-blur-md ${isOpen ? 'border-[#333]' : 'border-[var(--tk-neon)] hover:scale-110'}`}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
      >
        {/* Animated Glow Ring */}
        {!isOpen && (
            <div className="absolute inset-0 rounded-none border border-[var(--tk-neon)] opacity-50 animate-ping pointer-events-none"></div>
        )}

        <div className={`transition-all duration-300 font-bold font-mono text-lg ${isOpen ? 'text-white' : 'text-[var(--tk-neon)]'}`}>
            {isOpen ? 'X' : 'AI'}
        </div>
      </button>
    </div>
  );
};

export default Assistant;