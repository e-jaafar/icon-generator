import React from 'react';
import { LogoParams } from '@/types/logo-templates';
import { Button } from '@/components/ui/button';

interface HistoryEntry {
  params: LogoParams;
  timestamp: number;
  templateId: string;
}

interface HistoryPanelProps {
  history: HistoryEntry[];
  onRestore: (entry: HistoryEntry) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onRestore
}) => {
  // Formater l'heure côté client uniquement
  const formatTime = (timestamp: number) => {
    if (typeof window === 'undefined') return '';
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="border rounded-lg p-4 space-y-2 max-h-[300px] overflow-y-auto">
      <h3 className="font-medium text-sm mb-2">History</h3>
      {history.map((entry, index) => (
        <div 
          key={entry.timestamp}
          className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded"
              style={{ background: entry.params.primaryColor }}
            />
            <div className="text-sm">
              <div suppressHydrationWarning>
                {formatTime(entry.timestamp)}
              </div>
              <div className="text-gray-500 text-xs">
                {entry.params.style} - {entry.params.shape}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRestore(entry)}
          >
            Restore
          </Button>
        </div>
      ))}
    </div>
  );
}; 