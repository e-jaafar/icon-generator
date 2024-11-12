import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface EffectsPanelProps {
  rotation: number;
  onRotationChange: (value: number) => void;
  strokeWidth: number;
  onStrokeWidthChange: (value: number) => void;
  hasGlow: boolean;
  onGlowChange: (value: boolean) => void;
}

export const EffectsPanel: React.FC<EffectsPanelProps> = ({
  rotation,
  onRotationChange,
  strokeWidth,
  onStrokeWidthChange,
  hasGlow,
  onGlowChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Effects</h3>
        <div className="grid gap-4">
          <div>
            <label className="text-sm text-gray-600">Rotation</label>
            <Slider
              min={0}
              max={360}
              step={15}
              value={[rotation]}
              onValueChange={(values) => onRotationChange(values[0])}
            />
            <span className="text-sm text-gray-500">{rotation}°</span>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Stroke Width</label>
            <Slider
              min={0}
              max={10}
              step={1}
              value={[strokeWidth]}
              onValueChange={(values) => onStrokeWidthChange(values[0])}
            />
            <span className="text-sm text-gray-500">{strokeWidth}px</span>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm text-gray-600">Glow Effect</label>
            <Switch
              checked={hasGlow}
              onCheckedChange={onGlowChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 