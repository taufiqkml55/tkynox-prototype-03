
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface GridPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const GridPagination: React.FC<GridPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-16 gap-8 border-t border-[#1A1A1A] pt-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="text-xs font-mono font-bold uppercase tracking-widest text-[#666] hover:text-[#00FF41] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2 group btn-press"
            >
                <span className="group-hover:-translate-x-1 transition-transform">&lt;</span> PREVIOUS
            </button>

            <span className="font-mono text-xs text-[#444]">
                PAGE <span className="text-white">{currentPage + 1}</span> / {totalPages}
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className="text-xs font-mono font-bold uppercase tracking-widest text-[#666] hover:text-[#00FF41] disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2 group btn-press"
            >
                NEXT <span className="group-hover:translate-x-1 transition-transform">&gt;</span>
            </button>
        </div>
    );
};
