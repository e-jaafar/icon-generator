import { useState, useCallback } from 'react';
import { LogoParams } from '@/types/logo-templates';

interface HistoryEntry {
  params: LogoParams;
  timestamp: number;
  templateId: string;
}

export const useLogoHistory = (initialParams: LogoParams, initialTemplateId: string) => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { params: initialParams, timestamp: Date.now(), templateId: initialTemplateId }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToHistory = useCallback((params: LogoParams, templateId: string) => {
    setHistory(prev => [
      { params, timestamp: Date.now(), templateId },
      ...prev.slice(0, 9) // Keep only last 10 entries
    ]);
    setCurrentIndex(0);
  }, []);

  const restore = useCallback((index: number) => {
    setCurrentIndex(index);
    return history[index];
  }, [history]);

  const canUndo = currentIndex < history.length - 1;
  const canRedo = currentIndex > 0;

  const undo = useCallback(() => {
    if (canUndo) {
      return restore(currentIndex + 1);
    }
    return null;
  }, [canUndo, currentIndex, restore]);

  const redo = useCallback(() => {
    if (canRedo) {
      return restore(currentIndex - 1);
    }
    return null;
  }, [canRedo, currentIndex, restore]);

  return {
    history,
    addToHistory,
    restore,
    undo,
    redo,
    canUndo,
    canRedo
  };
}; 