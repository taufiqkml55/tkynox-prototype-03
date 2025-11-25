import React from 'react';
import { Transaction } from '../../types';

interface HistoryTabProps {
    sortedTransactions: Transaction[];
    t: any;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ sortedTransactions, t }) => {
    return (
        <div className="animate-fade-in-up">
            <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-6 border-b border-[#333] pb-2">{t.ledger}</h3>
            {sortedTransactions.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#111] text-[10px] font-bold text-[#888] uppercase tracking-widest font-mono">
                                <th className="p-4 border-b border-[#333]">Date/Time</th>
                                <th className="p-4 border-b border-[#333]">Operation</th>
                                <th className="p-4 border-b border-[#333]">Details</th>
                                <th className="p-4 border-b border-[#333] text-right">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTransactions.map((tx) => (
                                <tr key={tx.id} className="border-b border-[#1A1A1A] hover:bg-[#0D0D0D] transition-colors font-mono text-xs">
                                    <td className="p-4 text-[#666]">{new Date(tx.date).toLocaleString()}</td>
                                    <td className="p-4 text-white">
                                        <span className={`px-2 py-0.5 border uppercase text-[10px] ${
                                            tx.type === 'purchase' ? 'text-yellow-500 border-yellow-500/30' :
                                            tx.type === 'reward' ? 'text-[#00FF41] border-[#00FF41]/30' :
                                            tx.type === 'sale' ? 'text-blue-400 border-blue-400/30' :
                                            'text-white border-[#333]'
                                        }`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-[#CCC] uppercase">{tx.description}</td>
                                    <td className={`p-4 text-right font-bold ${tx.amount >= 0 ? 'text-[#00FF41]' : 'text-white'}`}>
                                        {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="p-12 border border-[#333] border-dashed text-center text-[#666] font-mono bg-[#0A0A0A]">
                    {t.no_ledger}
                </div>
            )}
        </div>
    );
};