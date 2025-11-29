import fs from 'fs';
import path from 'path';

// types
import type { PromptHistory } from '~/types';

/**
 * Manages prompt history with CRUD operations and export capabilities.
 *
 * @example
 * const history = new HistoryManager('./custom/path/history.json');
 * history.addToHistory({
 *   originalPrompt: 'Hello',
 *   enhancedPrompt: 'Hello, how are you?',
 *   model: 'gpt-4',
 *   enhancementType: 'greeting',
 *   userRole: 'user',
 *   timestamp: new Date(),
 *   tokensUsed: 10,
 *   processingTime: 150
 * });
 *
 * @developerNote
 * History is automatically loaded on initialization and saved after each modification.
 * Default history file location is the current working directory's history.json.
 */
export class HistoryManager {
  private historyPath: string;
  private history: PromptHistory[] = [];

  /**
   * Initialize history manager with optional custom path.
   * @param historyPath - Optional path to history file
   */
  constructor(historyPath?: string) {
    this.historyPath = historyPath || path.join(process.cwd(), 'history.json');
    this.loadHistory();
  }

  /**
   * Load history from file system.
   * @developerNote
   * Converts timestamp strings back to Date objects.
   * Gracefully handles missing or corrupted files.
   */
  private loadHistory(): void {
    try {
      if (fs.existsSync(this.historyPath)) {
        const historyData = fs.readFileSync(this.historyPath, 'utf-8');
        this.history = JSON.parse(historyData).map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
      }
    } catch (error: any) {
      console.warn('Failed to load history, starting with empty history:', error);
      this.history = [];
    }
  }

  /**
   * Save current history to file system.
   * @developerNote
   * Creates directory if it doesn't exist.
   * Errors are logged but don't prevent operation.
   */
  private saveHistory(): void {
    try {
      const historyDir = path.dirname(this.historyPath);
      if (!fs.existsSync(historyDir)) {
        fs.mkdirSync(historyDir, { recursive: true });
      }
      fs.writeFileSync(this.historyPath, JSON.stringify(this.history, null, 2));
    } catch (error: any) {
      console.error('Failed to save history:', error);
    }
  }

  /**
   * Add new entry to history with generated ID.
   * @param entry - History entry without ID
   * @returns Complete history entry with generated ID
   * @example
   * const newItem = history.addToHistory({
   *   originalPrompt: 'Test',
   *   enhancedPrompt: 'Test enhanced',
   *   model: 'gpt-3.5',
   *   enhancementType: 'test',
   *   userRole: 'admin',
   *   timestamp: new Date(),
   *   tokensUsed: 5,
   *   processingTime: 100
   * });
   */
  public addToHistory(entry: Omit<PromptHistory, 'id'>): PromptHistory {
    const historyItem: PromptHistory = {
      ...entry,
      id: this.generateId(),
    };

    this.history.unshift(historyItem);
    this.saveHistory();
    return historyItem;
  }

  /**
   * Retrieve history entries, optionally limited.
   * @param limit - Maximum number of entries to return
   * @returns Array of history entries
   * @example
   * const allHistory = history.getHistory();
   * const recentHistory = history.getHistory(10);
   */
  public getHistory(limit?: number): PromptHistory[] {
    if (limit) {
      return this.history.slice(0, limit);
    }
    return this.history;
  }

  /**
   * Search history entries for matching text.
   * @param query - Search term
   * @returns Array of matching entries
   * @example
   * const results = history.searchHistory('greeting');
   */
  public searchHistory(query: string): PromptHistory[] {
    const lowerQuery = query.toLowerCase();
    return this.history.filter(
      (item) =>
        item.originalPrompt.toLowerCase().includes(lowerQuery) ||
        item.enhancedPrompt.toLowerCase().includes(lowerQuery) ||
        item.model.toLowerCase().includes(lowerQuery) ||
        item.enhancementType.toLowerCase().includes(lowerQuery) ||
        item.userRole.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Delete history entry by ID.
   * @param id - Entry ID to delete
   * @returns True if entry was found and deleted
   * @example
   * const deleted = history.deleteHistoryItem('abc123');
   */
  public deleteHistoryItem(id: string): boolean {
    const index = this.history.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.history.splice(index, 1);
      this.saveHistory();
      return true;
    }
    return false;
  }

  /**
   * Update history entry by ID.
   * @param id - Entry ID to update
   * @param updates - Partial entry data to merge
   * @returns True if entry was found and updated
   * @example
   * const updated = history.updateHistoryItem('abc123', {
   *   enhancedPrompt: 'New enhanced prompt'
   * });
   */
  public updateHistoryItem(id: string, updates: Partial<PromptHistory>): boolean {
    const index = this.history.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.history[index] = { ...this.history[index], ...updates };
      this.saveHistory();
      return true;
    }
    return false;
  }

  /**
   * Clear all history entries.
   * @developerNote
   * This action cannot be undone.
   */
  public clearHistory(): void {
    this.history = [];
    this.saveHistory();
  }

  /**
   * Export history in specified format.
   * @param format - Export format (json, csv, or txt)
   * @returns Formatted history string
   * @example
   * const jsonData = history.exportHistory('json');
   * const csvData = history.exportHistory('csv');
   * const txtData = history.exportHistory('txt');
   */
  public exportHistory(format: 'json' | 'csv' | 'txt' = 'json'): string {
    switch (format) {
      case 'json':
        return JSON.stringify(this.history, null, 2);

      case 'csv':
        const headers = [
          'ID', 'Original Prompt', 'Enhanced Prompt', 'Model',
          'Enhancement Type', 'User Role', 'Timestamp', 'Tokens Used', 'Processing Time'
        ];
        const csvRows = [
          headers.join(','),
          ...this.history.map(item => [
            item.id,
            `"${this.escapeCsv(item.originalPrompt)}"`,
            `"${this.escapeCsv(item.enhancedPrompt)}"`,
            item.model,
            item.enhancementType,
            item.userRole,
            item.timestamp.toISOString(),
            item.tokensUsed || 0,
            item.processingTime
          ].join(','))
        ];
        return csvRows.join('\n');

      case 'txt':
        return this.history.map(item =>
          `=== ${item.timestamp.toISOString()} ===\n` +
          `Model: ${item.model} | Type: ${item.enhancementType} | Role: ${item.userRole}\n` +
          `Original Prompt:\n${item.originalPrompt}\n\n` +
          `Enhanced Prompt:\n${item.enhancedPrompt}\n` +
          `${item.tokensUsed ? `Tokens Used: ${item.tokensUsed}\n` : ''}` +
          `Processing Time: ${item.processingTime}ms\n\n` +
          '---\n'
        ).join('\n');

      default:
        return JSON.stringify(this.history, null, 2);
    }
  }

  /**
   * Escape special characters for CSV format.
   * @param value - String to escape
   * @returns CSV-safe string
   * @developerNote
   * Handles quotes, newlines, and carriage returns.
   */
  private escapeCsv(value: string): string {
    return value.replace(/"/g, '""').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
  }

  /**
   * Generate unique ID for history entries.
   * @returns Unique string ID
   * @developerNote
   * Combines timestamp and random string for uniqueness.
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  /**
   * Get statistics about history usage.
   * @returns Object containing various statistics
   * @example
   * const stats = history.getStats();
   * console.log(`Total items: ${stats.totalItems}`);
   * console.log(`Most used model: ${stats.mostUsedModel}`);
   */
  public getStats(): {
    totalItems: number;
    totalTokensUsed: number;
    averageProcessingTime: number;
    mostUsedModel: string;
    mostUsedEnhancementType: string;
  } {
    if (this.history.length === 0) {
      return {
        totalItems: 0,
        totalTokensUsed: 0,
        averageProcessingTime: 0,
        mostUsedModel: 'N/A',
        mostUsedEnhancementType: 'N/A',
      };
    }

    const modelCounts = this.history.reduce((acc, item) => {
      acc[item.model] = (acc[item.model] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeCounts = this.history.reduce((acc, item) => {
      acc[item.enhancementType] = (acc[item.enhancementType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalTokensUsed = this.history.reduce((sum, item) => sum + (item.tokensUsed || 0), 0);
    const averageProcessingTime = this.history.reduce((sum, item) => sum + item.processingTime, 0) / this.history.length;

    return {
      totalItems: this.history.length,
      totalTokensUsed,
      averageProcessingTime: Math.round(averageProcessingTime),
      mostUsedModel: Object.entries(modelCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A',
      mostUsedEnhancementType: Object.entries(typeCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A',
    };
  }
}
