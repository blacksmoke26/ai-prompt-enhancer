import api from '~/utils/api';
import { PromptHistory, HistoryStats } from '~/types';

export const historyService = {
  // Get history
  async getHistory(limit?: number, search?: string): Promise<PromptHistory[]> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (search) params.append('search', search);

    const response = await api.get(`/history${params.toString() ? `?${params.toString()}` : ''}`);
    return response.data;
  },

  // Get history stats
  async getStats(): Promise<HistoryStats> {
    const response = await api.get('/history/stats');
    return response.data;
  },

  // Delete history item
  async deleteHistoryItem(id: string): Promise<{ success: boolean }> {
    const response = await api.delete(`/history/${id}`);
    return response.data;
  },

  // Update history item
  async updateHistoryItem(id: string, updates: { rating?: number; notes?: string }): Promise<{ success: boolean }> {
    const response = await api.put(`/history/${id}`, updates);
    return response.data;
  },

  // Clear all history
  async clearHistory(): Promise<{ success: boolean }> {
    const response = await api.delete('/history');
    return response.data;
  },

  // Export history
  async exportHistory(format: 'json' | 'csv' | 'txt' = 'json', limit?: number): Promise<void> {
    const params = new URLSearchParams();
    params.append('format', format);
    if (limit) params.append('limit', limit.toString());

    const response = await api.get(`/history/export?${params.toString()}`, {
      responseType: 'blob',
    });

    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prompt-history-${new Date().toISOString().split('T')[0]}.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
