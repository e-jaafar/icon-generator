import React from 'react';
import { LogoParams } from '@/types/logo-templates';

interface LivePreviewProps {
  svg: string;
  isAnimated: boolean;
  showGrid?: boolean;
  size: number;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  svg,
  isAnimated,
  showGrid = false,
  size
}) => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      {showGrid && (
        <div 
          className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(156, 163, 175, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(156, 163, 175, 0.1) 1px, transparent 1px)'
          }}
        />
      )}
      <div 
        className={`w-full h-full transition-all duration-500 ${
          isAnimated ? 'animate-spin' : ''
        }`}
      >
        <div 
          dangerouslySetInnerHTML={{ __html: svg }}
          className="w-full h-full"
          style={{ 
            filter: showGrid ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' : 'none'
          }}
        />
      </div>
      <div className="absolute bottom-2 right-2 text-xs text-gray-500">
        {size}x{size}px
      </div>
    </div>
  );
}; 