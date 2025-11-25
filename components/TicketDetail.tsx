
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface TicketDetailProps {
    order: Order;
    onBack: () => void;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ order, onBack }) => {
    const [logs, setLogs] = useState<{time: string, event: string, status: string}[]>([]);

    useEffect(() => {
        // Reset logs when order changes
        const baseLogs = [
            { time: 'T-minus 00:00:00', event: 'INIT_SEQUENCE', status: 'OK' },
            { time: 'T-plus 00:00:02', event: 'PAYMENT_HANDSHAKE', status: 'VERIFIED' },
            { time: 'T-plus 00:00:05', event: 'ORDER_ROUTING', status: 'NODE_7' },
        ];

        if (order.status === 'active') {
            setLogs([
                ...baseLogs,
                { time: 'T-plus 00:00:10', event: 'ASSET_PREP', status: 'COMPLETE' },
                { time: 'T-plus 00:00:12', event: 'ACTIVE_MONITORING', status: 'COMPLETE' }
            ]);
        } else {
            setLogs(baseLogs);
        }
    }, [order.status, order.id]);

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-24 px-6 animate-fade-in-up">
             <div className="max-w-5xl mx-auto">
                <button 
                    onClick={onBack} 
                    className="text-xs font-mono text-[#666] hover:text-[#00FF41] mb-8 block uppercase flex items-center gap-2"
                >
                    <span>&lt; BACK TO ARCHIVES</span>
                </button>

                <div className="border border-[#333] bg-[#0D0D0D] p-8 relative overflow-hidden shadow-2xl shadow-[#00FF41]/5">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between border-b border-[#333] pb-8 mb-8 gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-2">
                                <h2 className="text-3xl font-bold text-white font-mono tracking-tight">{order.ticketId}</h2>
                                <span className={`px-3 py-1 text-xs font-bold uppercase border transition-colors duration-500 ${
                                    order.status === 'active' 
                                        ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/20' 
                                        : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                }`}>
                                    {order.status === 'active' ? 'COMPLETE' : 'PROCESSING...'}
                                </span>
                            </div>
                            <p className="text-xs text-[#666] font-mono">TIMESTAMP: {order.date}</p>
                        </div>
                        <div className="text-right">
                             <div className="text-xs text-[#666] font-mono uppercase mb-1">Total Value</div>
                             <div className="text-2xl text-white font-bold font-mono">${order.total.toFixed(2)}</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Items */}
                        <div className="lg:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-[#333] pb-2 w-max">Manifest Content</h3>
                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 items-start bg-[#111] p-4 border border-[#222]">
                                            <div className="w-16 h-16 bg-black border border-[#333] shrink-0 relative">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
                                                {item.quantity && item.quantity > 1 && (
                                                    <div className="absolute bottom-0 right-0 bg-[#00FF41] text-black font-bold text-[9px] px-1">
                                                        x{item.quantity}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-white font-bold text-sm mb-1">
                                                    {item.name} 
                                                    {item.quantity && item.quantity > 1 && <span className="text-[#666] ml-2 text-xs">({item.quantity} units)</span>}
                                                </div>
                                                <div className="text-[#666] text-xs font-mono mb-2">{item.category}</div>
                                                <div className="flex items-center gap-2">
                                                     <span className="text-[10px] bg-[#222] px-2 py-0.5 text-[#888] font-mono">ID: {item.id.toUpperCase()}</span>
                                                </div>
                                            </div>
                                            <div className="text-[#00FF41] font-mono text-sm">${(item.price * (item.quantity || 1)).toFixed(2)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="border-t border-[#222] pt-6">
                                <h4 className="text-xs font-bold text-[#666] uppercase mb-2">Client Notes</h4>
                                <p className="text-[#888] text-sm font-light italic">"Proceed with standard encryption protocols. Deliver via secure link."</p>
                            </div>
                        </div>

                        {/* Log */}
                        <div className="lg:col-span-1 bg-[#080808] p-6 border border-[#222] font-mono text-xs h-fit">
                            <h3 className="text-[#00FF41] font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className={`w-2 h-2 bg-[#00FF41] ${order.status === 'active' ? 'animate-pulse' : 'animate-none'}`}></span>
                                SYSTEM_LOG
                            </h3>
                            <div className="space-y-6 relative">
                                <div className="absolute left-1.5 top-2 bottom-2 w-[1px] bg-[#222]"></div>
                                {logs.map((log, i) => (
                                    <div key={i} className="relative pl-6 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className="absolute left-0 top-1.5 w-3 h-3 bg-[#000] border border-[#444] rounded-full z-10"></div>
                                        <div className="text-[#555] mb-0.5">{log.time}</div>
                                        <div className="text-[#DDD] font-bold">{log.event}</div>
                                        <div className="text-[#00FF41] opacity-80">&gt;&gt; {log.status}</div>
                                    </div>
                                ))}
                                {order.status === 'processing' && (
                                    <div className="relative pl-6 animate-pulse">
                                        <div className="absolute left-0 top-1.5 w-3 h-3 bg-yellow-500 rounded-full z-10"></div>
                                        <div className="text-[#555] mb-0.5">CURRENT</div>
                                        <div className="text-yellow-500 font-bold">PROCESSING_ASSETS...</div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-[#222]">
                                <button disabled={order.status !== 'active'} className="w-full border border-[#333] py-2 text-[#666] hover:border-[#00FF41] hover:text-[#00FF41] disabled:opacity-30 disabled:hover:border-[#333] disabled:hover:text-[#666] transition-colors uppercase text-[10px] tracking-widest">
                                    [ DOWNLOAD_FULL_REPORT ]
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default TicketDetail;
