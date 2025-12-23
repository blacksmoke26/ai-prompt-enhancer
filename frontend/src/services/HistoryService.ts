// noinspection SuspiciousTypeOfGuard,ExceptionCaughtLocallyJS

/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import api from '~/utils/api';

// types
import type {PromptHistory, HistoryStats} from '~/types';

/**
 * History service class for managing prompt history operations
 */
export default abstract class HistoryService {
  /**
   * Validates and sanitizes a date range
   * @param dateRange - Date range to validate
   * @returns Sanitized date range or null if invalid
   * @example
   * const range = HistoryService.validateDateRange({ start: "2023-01-01", end: "2023-12-31" });
   * @developerNote Converts dates to ISO format for API consistency
   */
  private static validateDateRange(dateRange?: { start: string; end: string }): { start: string; end: string } | null {
    if (!dateRange) return null;

    const startDate = new Date(dateRange.start);
    const endDate = new Date(dateRange.end);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return null;
    }

    return {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
  }

  /**
   * Validates and sanitizes a string input
   * @param input - String to validate
   * @param maxLength - Maximum allowed length
   * @returns Sanitized string or null if invalid
   * @example
   * const cleaned = HistoryService.validateString("  hello  ", 10);
   * @developerNote Trims whitespace and enforces length limits
   */
  private static validateString(input?: string, maxLength: number = 100): string | null {
    if (!input || typeof input !== 'string') return null;
    const trimmed = input.trim();
    return trimmed.length > 0 ? trimmed.substring(0, maxLength) : null;
  }

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
   * const recent = await HistoryService.getHistory(10);
   * @developerNote Results are returned in descending order by creation date by default
   */
  static async getHistory(
    limit?: number,
    search?: string,
    dateRange?: { start: string; end: string },
    category?: string,
    sortBy?: 'date' | 'rating' | 'usage',
    sortOrder?: 'asc' | 'desc',
  ): Promise<PromptHistory[]> {
    try {
      const params = new URLSearchParams();

      if (limit && limit > 0) {
        params.append('limit', Math.min(limit, 1000).toString());
      }

      const searchTerm = this.validateString(search, 100);
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const validDateRange = this.validateDateRange(dateRange);
      if (validDateRange) {
        params.append('start', validDateRange.start);
        params.append('end', validDateRange.end);
      }

      const categoryTerm = this.validateString(category, 50);
      if (categoryTerm) {
        params.append('category', categoryTerm);
      }

      if (sortBy) {
        params.append('sortBy', sortBy);
      }

      if (sortOrder) {
        params.append('sortOrder', sortOrder);
      }

      const {data} = await api.get(`/history${params.toString() ? `?${params.toString()}` : ''}`);

      if (!data.data || !Array.isArray(data.data)) {
        console.warn('Invalid response format from history API');
        return [];
      }

      return data.data;
    } catch (error) {
      console.error('Failed to retrieve history:', error);
      throw new Error('Unable to fetch history. Please try again later.');
    }
  }

  /**
   * Retrieves aggregated statistics about prompt history
   * @param refreshCache - Force refresh of cached statistics
   * @returns Object containing usage statistics
   * @example
   * const stats = await HistoryService.getStats();
   * @developerNote Includes counts by category and most used prompts
   */
  static async getStats(refreshCache: boolean = false): Promise<HistoryStats> {
    try {
      const params = refreshCache ? '?refresh=true' : '';
      const {data} = await api.get<{ data: HistoryStats }>(`/history/stats${params}`);
      return data.data;
    } catch (error) {
      console.error('Failed to retrieve statistics:', error);
      throw new Error('Unable to fetch statistics. Please try again later.');
    }
  }

  /**
   * Validates a history item ID
   * @param id - ID to validate
   * @returns Validated ID or null
   * @example
   * const validId = HistoryService.validateId("abc-123");
   * @developerNote Ensures ID is non-empty string after trimming
   */
  private static validateId(id: string): string | null {
    if (!id || typeof id !== 'string') return null;
    const trimmed = id.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  /**
   * Permanently deletes a specific history item
   * @param id - Unique identifier of the history item
   * @returns Success status of the operation
   * @example
   * await HistoryService.deleteHistoryItem("abc-123", true);
   * @developerNote This action is irreversible
   */
  static async deleteHistoryItem(id: string): Promise<{
    success: boolean;
    message?: string
  }> {
    const validId = this.validateId(id);
    if (!validId) {
      return {success: false, message: 'Invalid history item ID'};
    }

    try {
      const {data} = await api.delete<{
        data: { success: boolean; message?: string }
      }>(`/history/${encodeURIComponent(validId)}`);

      if (data.data?.success) {
        return {success: true, message: 'History item deleted successfully'};
      }

      return {success: false, message: data.data?.message || 'Failed to delete history item'};
    } catch (error) {
      console.error('Failed to delete history item:', error);
      throw new Error('Unable to delete history item. Please try again later.');
    }
  }

  /**
   * Validates and sanitizes update fields
   * @param updates - Updates to validate
   * @returns Sanitized updates or null if invalid
   * @example
   * const valid = HistoryService.validateUpdates({ rating: 5, notes: "Great" });
   * @developerNote Enforces rating range (1-5) and string length limits
   */
  private static validateUpdates(updates: { rating?: number; notes?: string; category?: string }): {
    rating?: number;
    notes?: string;
    category?: string
  } | null {
    const sanitized: { rating?: number; notes?: string; category?: string } = {};

    if (updates.rating !== undefined) {
      if (typeof updates.rating !== 'number' || updates.rating < 1 || updates.rating > 5) {
        return null;
      }
      sanitized.rating = Math.round(updates.rating);
    }

    if (updates.notes !== undefined) {
      const notes = this.validateString(updates.notes, 500);
      if (notes === null) return null;
      sanitized.notes = notes;
    }

    if (updates.category !== undefined) {
      const category = this.validateString(updates.category, 50);
      if (category === null) return null;
      sanitized.category = category;
    }

    return Object.keys(sanitized).length > 0 ? sanitized : null;
  }

  /**
   * Updates rating or notes for a history item
   * @param id - Unique identifier of the history item
   * @param updates - Object containing fields to update
   * @returns Success status of the operation
   * @example
   * await HistoryService.updateHistoryItem("abc-123", { rating: 5 });
   * @developerNote Only provided fields will be updated
   */
  static async updateHistoryItem(
    id: string,
    updates: { rating?: number; notes?: string; },
  ): Promise<{ success: boolean; message?: string; }> {
    const validId = this.validateId(id);
    if (!validId) {
      return {success: false, message: 'Invalid history item ID'};
    }

    const sanitizedUpdates = this.validateUpdates(updates);
    if (!sanitizedUpdates) {
      return {success: false, message: 'No valid fields to update'};
    }

    try {
      const {data} = await api.put<{ success: boolean; }>(`/history/${encodeURIComponent(validId)}`, sanitizedUpdates);

      if (data?.success) {
        return {
          success: true,
          message: 'History item updated successfully',
        };
      }

      return {success: false, message: 'Failed to update history item'};
    } catch (error) {
      console.error('Failed to update history item:', error);
      throw new Error('Unable to update history item. Please try again later.');
    }
  }

  /**
   * Permanently removes all items from history
   * @returns Success status of the operation
   * @example
   * await HistoryService.clearHistory();
   * @developerNote This action cannot be undone and affects all users in shared environments
   */
  static async clearHistory(): Promise<{ success: boolean; message?: string }> {
    try {
      const {data} = await api.patch<{ success: boolean }>('/history');

      if (data?.success) {
        return {success: true, message: 'All history cleared successfully'};
      }

      return {success: false, message: 'Failed to clear history'};
    } catch (error) {
      console.error('Failed to clear history:', error);
      throw new Error('Unable to clear history. Please try again later.');
    }
  }

  /**
   * Triggers a file download in the browser
   * @param blob - Data to download
   * @param filename - Name of the file
   * @param format - File format
   * @example
   * HistoryService.triggerDownload(blob, "export", "json");
   * @developerNote Creates temporary download link and cleans up after
   */
  private static triggerDownload(blob: Blob, filename: string, format: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  /**
   * Exports prompt history in specified format
   * @param format - Export file format (json|csv|txt)
   * @param limit - Maximum number of items to export
   * @param filters - Optional filters for export
   * @example
   * await HistoryService.exportHistory('csv');
   * @developerNote Triggers browser download with filename containing current date
   */
  static async exportHistory(
    format: 'json' | 'csv' | 'txt' = 'json',
    limit?: number,
    filters?: {
      search?: string;
      dateRange?: { start: string; end: string };
      category?: string;
    },
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

      const searchTerm = this.validateString(filters?.search, 100);
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const validDateRange = this.validateDateRange(filters?.dateRange);
      if (validDateRange) {
        params.append('start', validDateRange.start);
        params.append('end', validDateRange.end);
      }

      const categoryTerm = this.validateString(filters?.category, 50);
      if (categoryTerm) {
        params.append('category', categoryTerm);
      }

      const response = await api.get(`/history/export?${params.toString()}`, {
        responseType: 'blob',
        timeout: 30000,
      });

      if (!response.data) {
        throw new Error('No data received from export endpoint');
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      this.triggerDownload(response.data, `prompt-history-${timestamp}`, format);
    } catch (error) {
      console.error('Failed to export history:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unable to export history. Please try again later.');
    }
  }
}
