import { useState } from 'react';
import { useHistoryStore } from '~/stores/historyStore.ts';
import { historyService } from '~/utils/historyService.ts';

export const useHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    history,
    setHistory,
    updateHistoryItem,
    deleteHistoryItem,
    clearHistory: clearLocalHistory
  } = useHistoryStore();

  const loadHistory = async (limit?: number, search?: string) => {
    try {
      setLoading(true);
      setError(null);

      const historyData = await historyService.getHistory(limit, search);
      setHistory(historyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setError(null);
      await historyService.deleteHistoryItem(id);
      deleteHistoryItem(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  const updateItem = async (id: string, updates: { rating?: number; notes?: string }) => {
    try {
      setError(null);
      await historyService.updateHistoryItem(id, updates);
      updateHistoryItem(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    }
  };

  const clearHistory = async () => {
    try {
      setError(null);
      await historyService.clearHistory();
      clearLocalHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
    }
  };

  const exportHistory = async (format: 'json' | 'csv' | 'txt' = 'json', limit?: number) => {
    try {
      setError(null);
      await historyService.exportHistory(format, limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export history');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    history,
    loading,
    error,
    loadHistory,
    deleteItem,
    updateItem,
    clearHistory,
    exportHistory,
    clearError,
  };
};
