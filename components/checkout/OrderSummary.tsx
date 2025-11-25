
import React from 'react';
import { Product } from '../../types';

interface OrderSummaryProps {
    items: Product[];
    subtotal: number;
    isSubscription: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal, isSubscription }) => {
    return (
        <div className="lg:pl-12 lg:border-l border-[#1A1A1A]">
            <h2 className="text-xl font-bold text-white mb-8 font-mono">/// SELECTED PROTOCOLS</h2>
            
            <div className="space-y-4 mb-8">
               {items.length === 0 && (
                   <div className="p-4 border border-[#333] border-dashed text-center text-[#444] font-mono text-xs">
                       NO PROTOCOLS SELECTED
                   </div>
               )}
               {items.map((item, idx) => (
                 <div key={idx} className={`flex gap-4 p-4 border ${item.isSubscription ? 'bg-[#00FF41]/5 border-[#00FF41] border-dashed' : 'bg-[#0D0D0D] border-[#1A1A1A]'}`}>
                    <div className="w-12 h-12 bg-black border border-[#333] relative overflow-hidden">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale" />
                       {item.quantity && item.quantity > 1 && (
                           <div className="absolute bottom-0 right-0 bg-[#00FF41] text-black text-[9px] font-bold px-1">
                               x{item.quantity}
                           </div>
                       )}
                    </div>
                    <div className="flex-1">
                       <h3 className="font-bold text-white text-sm">{item.name}</h3>
                       <p className="text-xs text-[#888] font-mono">
                           {item.category} 
                           {item.quantity && item.quantity > 1 && ` • ${item.quantity} units`}
                       </p>
                    </div>
                    <div className="text-right">
                        <span className="text-sm text-[#00FF41] font-mono">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                        {item.isSubscription && <div className="text-[10px] text-[#888] uppercase">/{item.billingCycle}</div>}
                    </div>
                 </div>
               ))}
            </div>

            <div className="border-t border-[#1A1A1A] pt-6 space-y-2 font-mono">
              <div className="flex justify-between text-sm text-[#888]">
                 <span>BASE_COST</span>
                 <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-[#888]">
                 <span>{isSubscription ? 'SETUP_FEE' : 'CONSULTATION'}</span>
                 <span className="text-[#00FF41]">{isSubscription ? '$0.00' : 'INCLUDED'}</span>
              </div>
            </div>
            
            <div className="border-t border-[#1A1A1A] mt-6 pt-6">
               <div className="flex justify-between items-center">
                 <span className="font-bold text-xl text-white">
                     {isSubscription ? 'RECURRING TOTAL' : 'ESTIMATE'}
                 </span>
                 <div className="flex items-end gap-2">
                   <span className="text-xs text-[#888] mb-1 font-mono">USD</span>
                   <span className="font-bold text-2xl text-[#00FF41] font-mono">${subtotal.toFixed(2)}</span>
                 </div>
               </div>
               {isSubscription && <p className="text-right text-xs text-[#666] mt-1 font-mono">BILLED {items[0]?.billingCycle?.toUpperCase()}</p>}
            </div>
        </div>
    );
};
