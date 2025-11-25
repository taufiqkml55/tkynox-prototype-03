
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Order } from '../types';
import TicketDetail from './TicketDetail';

interface TicketListProps {
  orders: Order[];
  onBack: () => void;
}

const TicketList: React.FC<TicketListProps> = ({ orders, onBack }) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  if (selectedOrder) {
      return <TicketDetail order={selectedOrder} onBack={() => setSelectedOrderId(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-24 px-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-[#333] pb-6">
            <div>
                <button 
                    onClick={onBack}
                    className="text-xs font-mono text-[#666] hover:text-[#00FF41] mb-4 block uppercase"
                >
                    &lt; Return to Dashboard
                </button>
                <h1 className="text-4xl font-bold text-white tracking-tight">SECURE ARCHIVES</h1>
            </div>
            <div className="text-right hidden md:block">
                <div className="text-xs font-mono text-[#00FF41] animate-pulse">LIVE CONNECTION</div>
                <div className="text-xs font-mono text-[#666]">ENCRYPTED PROTOCOL</div>
            </div>
        </div>

        {orders.length === 0 ? (
            <div className="border border-[#1A1A1A] border-dashed p-20 text-center bg-[#0A0A0A]">
                <div className="w-16 h-16 mx-auto text-[#333] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                </div>
                <p className="text-[#666] font-mono uppercase tracking-widest">No active tickets found.</p>
            </div>
        ) : (
            <div className="space-y-8">
                {orders.map((order) => (
                    <div key={order.id} className="bg-[#0D0D0D] border border-[#1A1A1A] p-6 md:p-8 relative group hover:border-[#333] transition-colors">
                        {/* Decorative corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-[#00FF41] opacity-50"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-[#00FF41] opacity-50"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-[#00FF41] opacity-50"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-[#00FF41] opacity-50"></div>

                        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[#00FF41] font-mono font-bold text-lg">{order.ticketId}</span>
                                    <span className={`px-2 py-0.5 border text-[10px] font-mono uppercase transition-colors duration-500 ${
                                        order.status === 'active' 
                                            ? 'bg-[#00FF41]/20 border-[#00FF41] text-[#00FF41]' 
                                            : 'bg-[#111] border-[#333] text-[#888]'
                                    }`}>
                                        {order.status === 'active' ? 'COMPLETE' : 'PROCESSING'}
                                    </span>
                                </div>
                                <p className="text-xs text-[#666] font-mono">ISSUED: {order.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-[#888] font-mono">TOTAL VALUE</p>
                                <p className="text-xl text-white font-bold">${order.total.toFixed(2)}</p>
                            </div>
                        </div>

                        <div className="border-t border-[#1A1A1A] pt-6">
                            <p className="text-xs text-[#666] font-mono mb-4 uppercase tracking-widest">Manifest</p>
                            <div className="space-y-3">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-1 bg-[#00FF41]"></div>
                                            <span className="text-[#CCCCCC]">
                                                {item.name}
                                                {item.quantity && item.quantity > 1 ? <span className="text-[#00FF41] text-xs ml-2">x{item.quantity}</span> : ''}
                                            </span>
                                        </div>
                                        <span className="font-mono text-[#666]">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-[#1A1A1A] flex justify-between items-center">
                             <div className="flex gap-1">
                                 <span className={`w-2 h-2 rounded-full ${order.status === 'active' ? 'bg-[#00FF41]' : 'bg-yellow-500'} animate-ping opacity-75`}></span>
                                 <span className={`text-xs font-mono ${order.status === 'active' ? 'text-[#00FF41]' : 'text-yellow-500'}`}>
                                    {order.status === 'active' ? 'COMPLETE' : 'PENDING CONFIRMATION'}
                                 </span>
                             </div>
                             <button 
                                onClick={() => setSelectedOrderId(order.id)}
                                className="text-xs font-mono text-white hover:text-[#00FF41] underline underline-offset-4 decoration-[#333]"
                             >
                                 VIEW FULL LOG &gt;
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
