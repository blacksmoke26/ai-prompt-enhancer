import { useState } from 'react';

// store
import { useHistoryStore } from '~/stores/historyStore.ts';

// services
import { historyService } from '~/utils/historyService.ts';

/**
 * Custom hook for managing user history data with loading states and error handling.
 * @example
 * const { history, loading, error, loadHistory, deleteItem } = useHistory();
 * useEffect(() => {
 *   loadHistory();
 * }, []);
 * @developer.notes Provides centralized history management with optimistic updates
 */
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

  /**
   * Loads history data with optional pagination and search filtering.
   * @param limit - Maximum number of items to fetch
   * @param search - Text to filter history items by
   * @example
   * await loadHistory(10, "search term");
   * @developer.notes Updates both loading state and history store
   */
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

  /**
   * Deletes a specific history item by ID with optimistic update.
   * @param id - Unique identifier of the history item
   * @example
   * await deleteItem("item-123");
   * @developer.notes Removes item locally first for instant UI feedback
   */
  const deleteItem = async (id: string) => {
    try {
      setError(null);
      await historyService.deleteHistoryItem(id);
      deleteHistoryItem(id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  /**
   * Updates a history item's rating or notes with server sync.
   * @param id - Unique identifier of the history item
   * @param updates - Partial updates to apply (rating and/or notes)
   * @example
   * await updateItem("item-123", { rating: 5, notes: "Great content" });
   * @developer.notes Updates both local store and remote data
   */
  const updateItem = async (id: string, updates: { rating?: number; notes?: string }) => {
    try {
      setError(null);
      await historyService.updateHistoryItem(id, updates);
      updateHistoryItem(id, updates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    }
  };

  /**
   * Clears all history data from both server and local store.
   * @example
   * await clearHistory();
   * @developer.notes Irreversible action - consider adding confirmation dialog
   */
  const clearHistory = async () => {
    try {
      setError(null);
      await historyService.clearHistory();
      clearLocalHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
    }
  };

  /**
   * Exports history data in specified format with optional limit.
   * @param format - Export format (json, csv, or txt)
   * @param limit - Maximum number of items to include
   * @example
   * await exportHistory("csv", 50);
   * @developer.notes Downloads file automatically after successful export
   */
  const exportHistory = async (format: 'json' | 'csv' | 'txt' = 'json', limit?: number) => {
    try {
      setError(null);
      await historyService.exportHistory(format, limit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export history');
    }
  };

  /**
   * Resets the error state to null.
   * @example
   * clearError();
   * @developer.notes Useful for clearing errors before new operations
   */
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
