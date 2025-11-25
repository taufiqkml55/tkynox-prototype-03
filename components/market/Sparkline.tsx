
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export const Sparkline: React.FC<{ data: number[], color: string, width?: number, height?: number }> = ({ data, color, width = 100, height = 30 }) => {
    if (!data || data.length < 2) return <div style={{ width, height }} />;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    // Create SVG path
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width={width} height={height} overflow="visible">
            <polyline 
                points={points} 
                fill="none" 
                stroke={color} 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
            />
        </svg>
    );
};
