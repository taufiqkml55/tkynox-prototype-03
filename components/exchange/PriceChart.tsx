
import React, { useRef, useEffect } from 'react';

interface PriceChartProps {
    data: number[];
    isPositive: boolean;
}

export const PriceChart: React.FC<PriceChartProps> = ({ data, isPositive }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        if (data.length < 2) return;

        const min = Math.min(...data);
        const max = Math.max(...data);
        const padding = (max - min) * 0.1; 
        const range = (max - min) + (padding * 2) || 1;
        const plotMin = min - padding;

        ctx.beginPath();
        ctx.strokeStyle = isPositive ? '#00FF41' : '#FF3333';
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';

        data.forEach((val, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((val - plotMin) / range) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, isPositive ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 51, 51, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

    }, [data, isPositive]);

    return (
        <div className="w-full h-72 bg-[#080808] border border-[#333] relative">
            <canvas ref={canvasRef} width={800} height={288} className="w-full h-full" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
        </div>
    );
};
