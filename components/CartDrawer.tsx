
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-[#0A0A0A] z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out border-l border-[#333] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1A1A1A] bg-[#0D0D0D]">
          <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FF41] rounded-full animate-pulse"></div>
              <h2 className="text-xl font-bold text-white tracking-widest uppercase font-mono">Cart</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#666] hover:text-[#00FF41] transition-colors font-mono duration-300"
          >
            [ CLOSE ]
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <div className="w-16 h-16 border-2 border-[#333] flex items-center justify-center text-[#333] rounded-full">
                !
              </div>
              <p className="font-mono text-[#666] uppercase">Cart Empty. Select a protocol.</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 animate-fade-in-up bg-[#111] border border-[#1A1A1A] p-4 hover:border-[#333] transition-colors group">
                <div className="w-20 h-20 bg-[#000] border border-[#333] flex-shrink-0 overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-white text-sm group-hover:text-[#00FF41] transition-colors">{item.name}</h3>
                        <span className="text-sm font-mono text-[#00FF41]">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-[#666] uppercase tracking-widest mt-1 font-mono">
                        {item.category}
                        {item.quantity && item.quantity > 1 && ` • $${item.price.toFixed(2)}/unit`}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-[#333]">
                          <button 
                              onClick={() => onUpdateQuantity(idx, -1)}
                              className="px-2 py-1 text-xs text-[#888] hover:text-white hover:bg-[#222] transition-colors border-r border-[#333] active:bg-[#333]"
                          >
                              -
                          </button>
                          <div className="px-3 py-1 text-xs font-mono text-white bg-[#0D0D0D]">
                              {item.quantity || 1}
                          </div>
                          <button 
                              onClick={() => onUpdateQuantity(idx, 1)}
                              className="px-2 py-1 text-xs text-[#888] hover:text-white hover:bg-[#222] transition-colors border-l border-[#333] active:bg-[#333]"
                          >
                              +
                          </button>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(idx)}
                        className="text-xs text-[#666] hover:text-red-500 font-mono hover:underline decoration-red-500 underline-offset-4"
                        aria-label="Remove Item"
                      >
                        [ DELETE ]
                      </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1A1A1A] bg-[#0D0D0D]">
          <div className="flex justify-between items-center mb-6 font-mono">
            <span className="text-sm font-bold uppercase tracking-widest text-[#888]">Est. Total</span>
            <span className="text-xl font-bold text-[#00FF41]">${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-[#444] mb-6 font-mono text-center">FINAL COST CALCULATED AFTER SCOPING PHASE.</p>
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full py-4 bg-[#00FF41] text-black uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-transparent hover:border-[#00FF41] btn-press shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_25px_rgba(0,255,65,0.4)]"
          >
            Process Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
