import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (newColor: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-12 border border-gray-300 rounded"
      />
    </div>
  );
};