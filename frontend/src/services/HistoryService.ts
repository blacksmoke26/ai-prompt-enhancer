/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// types
import type { PromptHistory, HistoryStats } from '~/types';

export const historyService = {
  /**
   * Retrieves prompt history with optional filtering
   * @param limit - Maximum number of items to return
   * @param search - Search term to filter results
   * @param dateRange - Optional date range to filter results
   * @param category - Optional category to filter results
   * @param sortBy - Optional sort field (date|rating|usage)
   * @param sortOrder - Optional sort order (asc|desc)
   * @returns Array of prompt history items
   * @example
   * // Get last 10 items
   * const recent = await historyService.getHistory(10);
   * // Search for specific prompts
   * const results = await historyService.getHistory(50, "weather");
   * // Filter by date range
   * const filtered = await historyService.getHistory(undefined, undefined, { start: "2023-01-01", end: "2023-12-31" });
   * @developerNote Results are returned in descending order by creation date by default
   */
  async getHistory(
    limit?: number,
    search?: string,
    dateRange?: { start: string; end: string },
    category?: string,
    sortBy?: 'date' | 'rating' | 'usage',
    sortOrder?: 'asc' | 'desc'
  ): Promise<PromptHistory[]> {
    try {
      const params = new URLSearchParams();

      if (limit && limit > 0) {
        params.append('limit', Math.min(limit, 1000).toString()); // Cap at 1000 to prevent excessive requests
      }

      if (search && search.trim()) {
        params.append('search', search.trim().substring(0, 100)); // Limit search term length
      }

      if (dateRange?.start) {
        const startDate = new Date(dateRange.start);
        if (!isNaN(startDate.getTime())) {
          params.append('start', startDate.toISOString());
        }
      }

      if (dateRange?.end) {
        const endDate = new Date(dateRange.end);
        if (!isNaN(endDate.getTime())) {
          params.append('end', endDate.toISOString());
        }
      }

      if (category && category.trim()) {
        params.append('category', category.trim());
      }

      if (sortBy) {
        params.append('sortBy', sortBy);
      }

      if (sortOrder) {
        params.append('sortOrder', sortOrder);
      }

      const response = await api.get(`/history${params.toString() ? `?${params.toString()}` : ''}`);

      if (!response.data || !Array.isArray(response.data)) {
        console.warn('Invalid response format from history API');
        return [];
      }

      return response.data;
    } catch (error) {
      console.error('Failed to retrieve history:', error);
      throw new Error('Unable to fetch history. Please try again later.');
    }
  },

  /**
   * Retrieves aggregated statistics about prompt history
   * @param refreshCache - Force refresh of cached statistics
   * @returns Object containing usage statistics
   * @example
   * const stats = await historyService.getStats();
   * console.log(`Total prompts: ${stats.total}`);
   * @developerNote Includes counts by category and most used prompts
   */
  async getStats(refreshCache: boolean = false): Promise<HistoryStats> {
    try {
      const params = refreshCache ? '?refresh=true' : '';
      const {data} = await api.get<HistoryStats>(`/history/stats${params}`);
      return data;
    } catch (error) {
      console.error('Failed to retrieve statistics:', error);
      throw new Error('Unable to fetch statistics. Please try again later.');
    }
  },

  /**
   * Permanently deletes a specific history item
   * @param id - Unique identifier of the history item
   * @param confirmDelete - Confirmation flag to prevent accidental deletion
   * @returns Success status of the operation
   * @example
   * await historyService.deleteHistoryItem("abc-123", true);
   * @developerNote This action is irreversible
   */
  async deleteHistoryItem(id: string, confirmDelete: boolean = false): Promise<{ success: boolean; message?: string }> {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return { success: false, message: 'Invalid history item ID' };
    }

    if (!confirmDelete) {
      return { success: false, message: 'Deletion not confirmed' };
    }

    try {
      const response = await api.delete(`/history/${encodeURIComponent(id.trim())}`);

      if (response.data?.success) {
        return { success: true, message: 'History item deleted successfully' };
      }

      return { success: false, message: response.data?.message || 'Failed to delete history item' };
    } catch (error) {
      console.error('Failed to delete history item:', error);
      throw new Error('Unable to delete history item. Please try again later.');
    }
  },

  /**
   * Updates rating or notes for a history item
   * @param id - Unique identifier of the history item
   * @param updates - Object containing fields to update
   * @returns Success status of the operation
   * @example
   * await historyService.updateHistoryItem("abc-123", { rating: 5 });
   * @developerNote Only provided fields will be updated
   */
  async updateHistoryItem(
    id: string,
    updates: { rating?: number; notes?: string; category?: string }
  ): Promise<{ success: boolean; message?: string; data?: PromptHistory }> {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return { success: false, message: 'Invalid history item ID' };
    }

    const sanitizedUpdates: any = {};

    if (updates.rating !== undefined) {
      if (typeof updates.rating !== 'number' || updates.rating < 1 || updates.rating > 5) {
        return { success: false, message: 'Rating must be between 1 and 5' };
      }
      sanitizedUpdates.rating = Math.round(updates.rating);
    }

    if (updates.notes !== undefined) {
      if (typeof updates.notes !== 'string') {
        return { success: false, message: 'Notes must be a string' };
      }
      sanitizedUpdates.notes = updates.notes.trim().substring(0, 500); // Limit note length
    }

    if (updates.category !== undefined) {
      if (typeof updates.category !== 'string' || updates.category.trim().length === 0) {
        return { success: false, message: 'Category must be a non-empty string' };
      }
      sanitizedUpdates.category = updates.category.trim().substring(0, 50); // Limit category length
    }

    if (Object.keys(sanitizedUpdates).length === 0) {
      return { success: false, message: 'No valid fields to update' };
    }

    try {
      const response = await api.put(`/history/${encodeURIComponent(id.trim())}`, sanitizedUpdates);

      if (response.data?.success) {
        return {
          success: true,
          message: 'History item updated successfully',
          data: response.data.data
        };
      }

      return { success: false, message: response.data?.message || 'Failed to update history item' };
    } catch (error) {
      console.error('Failed to update history item:', error);
      throw new Error('Unable to update history item. Please try again later.');
    }
  },

  /**
   * Permanently removes all items from history
   * @param confirmation - Confirmation string to prevent accidental deletion
   * @returns Success status of the operation
   * @example
   * await historyService.clearHistory("DELETE_ALL_HISTORY");
   * @developerNote This action cannot be undone and affects all users in shared environments
   */
  async clearHistory(confirmation?: string): Promise<{ success: boolean; message?: string }> {
    if (confirmation !== "DELETE_ALL_HISTORY") {
      return { success: false, message: 'Invalid confirmation. Use "DELETE_ALL_HISTORY" to confirm' };
    }

    try {
      const response = await api.delete('/history');

      if (response.data?.success) {
        return { success: true, message: 'All history cleared successfully' };
      }

      return { success: false, message: response.data?.message || 'Failed to clear history' };
    } catch (error) {
      console.error('Failed to clear history:', error);
      throw new Error('Unable to clear history. Please try again later.');
    }
  },

  /**
   * Exports prompt history in specified format
   * @param format - Export file format (json|csv|txt)
   * @param limit - Maximum number of items to export
   * @param filters - Optional filters for export
   * @example
   * // Export all as CSV
   * await historyService.exportHistory('csv');
   * // Export last 100 as JSON
   * await historyService.exportHistory('json', 100);
   * @developerNote Triggers browser download with filename containing current date
   */
  async exportHistory(
    format: 'json' | 'csv' | 'txt' = 'json',
    limit?: number,
    filters?: {
      search?: string;
      dateRange?: { start: string; end: string };
      category?: string;
    }
  ): Promise<void> {
    if (!['json', 'csv', 'txt'].includes(format)) {
      throw new Error('Invalid export format. Must be json, csv, or txt');
    }

    if (limit && (typeof limit !== 'number' || limit < 1 || limit > 10000)) {
      throw new Error('Limit must be a number between 1 and 10000');
    }

    try {
      const params = new URLSearchParams();
      params.append('format', format);

      if (limit) {
        params.append('limit', limit.toString());
      }

      if (filters?.search) {
        params.append('search', filters.search.trim().substring(0, 100));
      }

      if (filters?.dateRange?.start) {
        const startDate = new Date(filters.dateRange.start);
        if (!isNaN(startDate.getTime())) {
          params.append('start', startDate.toISOString());
        }
      }

      if (filters?.dateRange?.end) {
        const endDate = new Date(filters.dateRange.end);
        if (!isNaN(endDate.getTime())) {
          params.append('end', endDate.toISOString());
        }
      }

      if (filters?.category) {
        params.append('category', filters.category.trim());
      }

      const response = await api.get(`/history/export?${params.toString()}`, {
        responseType: 'blob',
        timeout: 30000, // 30 second timeout for large exports
      });

      if (!response.data) {
        throw new Error('No data received from export endpoint');
      }

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      link.setAttribute('download', `prompt-history-${timestamp}.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export history:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to export history. Please try again later.');
    }
  },
};
