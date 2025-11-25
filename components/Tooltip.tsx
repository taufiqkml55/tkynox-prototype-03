
import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = 'bottom', className = '' }) => {
  const [visible, setVisible] = useState(false);

  let positionClasses = '';
  switch (position) {
    case 'top':
      positionClasses = 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      break;
    case 'bottom':
      positionClasses = 'top-full left-1/2 -translate-x-1/2 mt-2';
      break;
    case 'left':
      positionClasses = 'right-full top-1/2 -translate-y-1/2 mr-2';
      break;
    case 'right':
      positionClasses = 'left-full top-1/2 -translate-y-1/2 ml-2';
      break;
  }

  return (
    <div 
      className={`relative inline-flex ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      // On mobile, tapping might trigger mouse enter depending on browser behavior, 
      // but visual element will be hidden by CSS.
    >
      {children}
      {visible && (
        <div className={`hidden md:block absolute ${positionClasses} z-[100] bg-[#0D0D0D] border border-[#00FF41] px-2 py-1 text-[10px] font-mono text-[#00FF41] whitespace-nowrap uppercase tracking-wider shadow-[0_0_10px_rgba(0,255,65,0.2)] pointer-events-none animate-fade-in-up`}>
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
