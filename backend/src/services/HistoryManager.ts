import fs from 'fs';
import path from 'path';
import { PromptHistory } from '../types';

export class HistoryManager {
  private historyPath: string;
  private history: PromptHistory[] = [];

  constructor(historyPath?: string) {
    this.historyPath = historyPath || path.join(process.cwd(), 'history.json');
    this.loadHistory();
  }

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

  public addToHistory(entry: Omit<PromptHistory, 'id'>): PromptHistory {
    const historyItem: PromptHistory = {
      ...entry,
      id: this.generateId(),
    };

    this.history.unshift(historyItem);
    this.saveHistory();
    return historyItem;
  }

  public getHistory(limit?: number): PromptHistory[] {
    if (limit) {
      return this.history.slice(0, limit);
    }
    return this.history;
  }

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

  public deleteHistoryItem(id: string): boolean {
    const index = this.history.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.history.splice(index, 1);
      this.saveHistory();
      return true;
    }
    return false;
  }

  public updateHistoryItem(id: string, updates: Partial<PromptHistory>): boolean {
    const index = this.history.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.history[index] = { ...this.history[index], ...updates };
      this.saveHistory();
      return true;
    }
    return false;
  }

  public clearHistory(): void {
    this.history = [];
    this.saveHistory();
  }

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

  private escapeCsv(value: string): string {
    return value.replace(/"/g, '""').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

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
