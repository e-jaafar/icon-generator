import React from 'react';
import { Input } from '@/components/ui/input';

interface DimensionsPanelProps {
  width: number;
  height: number;
  onWidthChange: (value: number) => void;
  onHeightChange: (value: number) => void;
  onReset: () => void;
}

export const DimensionsPanel: React.FC<DimensionsPanelProps> = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  onReset
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Dimensions</h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-500 hover:text-blue-600"
        >
          Reset to Square
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600">Width</label>
          <Input
            type="number"
            min={50}
            max={1000}
            value={width}
            onChange={(e) => onWidthChange(Number(e.target.value))}
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-600">Height</label>
          <Input
            type="number"
            min={50}
            max={1000}
            value={height}
            onChange={(e) => onHeightChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}; 