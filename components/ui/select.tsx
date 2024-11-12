import React from 'react';

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string = string> {
  value: T;
  onValueChange: (value: T) => void;
  options: SelectOption<T>[];
  className?: string;
}

export const Select = <T extends string = string>({ 
  value, 
  onValueChange, 
  options,
  className = "w-full p-2 border border-gray-300 rounded-md bg-white"
}: SelectProps<T>) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value as T)}
      className={className}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}; 