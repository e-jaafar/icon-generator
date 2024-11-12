import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ColorPreset } from '@/lib/color-presets';

interface ColorPresetsProps {
  presets: ColorPreset[];
  categories: { id: string; name: string; }[];
  onSelect: (preset: ColorPreset) => void;
}

export const ColorPresets: React.FC<ColorPresetsProps> = ({
  presets,
  categories,
  onSelect
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPresets = selectedCategory === 'all' 
    ? presets 
    : presets.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {filteredPresets.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            className="flex items-center gap-2 h-auto p-2"
            onClick={() => onSelect(preset)}
          >
            <div className="flex gap-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ background: preset.colors.primary }}
              />
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ background: preset.colors.secondary }}
              />
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ background: preset.colors.accent }}
              />
            </div>
            <span className="text-sm">{preset.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}; 