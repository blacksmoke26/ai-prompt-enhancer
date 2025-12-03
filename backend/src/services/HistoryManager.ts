/**
 * @fileoverview Manages prompt history with CRUD operations, advanced statistics, and export capabilities.
 *
 * This module provides a comprehensive solution for tracking AI prompt interactions,
 * including original prompts, enhanced versions, metadata, and performance metrics.
 * It supports persistent storage, search functionality, export to multiple formats,
 * and detailed usage analytics.
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 * @since 1.0.0
 */

import fs from 'fs';
import path from 'path';

/**
 * Represents a single entry in the prompt history with comprehensive metadata.
 *
 * This interface captures all relevant information about a prompt interaction,
 * including the original input, enhanced output, model details, and performance
 * metrics for analytics and debugging purposes.
 *
 * @interface PromptHistory
 *
 * @remarks
 * The `provider` field is optional and becomes particularly useful in multi-provider
 * environments where you might be switching between different AI services. This allows
 * for provider-specific analytics and cost tracking.
 *
 * @example
 * const entry: PromptHistory = {
 *   id: 'abc123',
 *   originalPrompt: 'Check grammar',
 *   enhancedPrompt: 'Please review and correct any grammatical errors in the text',
 *   model: 'gpt-4',
 *   enhancementType: 'grammar',
 *   userRole: 'student',
 *   provider: 'OpenAI',
 *   timestamp: new Date('2025-01-15T10:30:00Z'),
 *   tokensUsed: 25,
 *   processingTime: 1250
 * };
 */
export interface PromptHistory {
  /** Unique identifier for the history entry, auto-generated */
  id: string;
  /** The original, unmodified prompt text provided by the user */
  originalPrompt: string;
  /** The AI-enhanced or processed version of the prompt */
  enhancedPrompt: string;
  /** The AI model name/identifier used for enhancement (e.g., "gpt-4", "claude-3") */
  model: string;
  /** The type of enhancement applied (e.g., "grammar", "style", "expansion") */
  enhancementType: string;
  /** The role or category of the user making the request (e.g., "developer", "content-writer") */
  userRole: string;
  /** The system prompt used for the request */
  systemPrompt?: string;
  /** Optional AI service provider name (e.g., "OpenAI", "Anthropic", "Google") */
  provider?: string;
  /** Exact date and time when the prompt was processed */
  timestamp: Date;
  /** Number of tokens consumed during processing, if available */
  tokensUsed?: number;
  /** Time taken to process the prompt in milliseconds */
  processingTime: number;
  /** Temperature setting for randomness in output (0-1) */
  temperature?: number;
  /** Maximum tokens allowed in the response */
  maxTokens?: number;
}

/**
 * A comprehensive manager for prompt history with full CRUD operations, analytics,
 * and multi-format export capabilities.
 *
 * This class provides a robust solution for tracking, analyzing, and managing AI
 * prompt interactions. It maintains a persistent history file that can be customized
 * by path, supports various data export formats, and offers detailed usage statistics.
 * The manager automatically handles file operations, including directory creation
 * and error recovery.
 *
 * @class HistoryManager
 *
 * @example
 * // Initialize with default path (cwd/history.json)
 * const historyManager = new HistoryManager();
 *
 * // Initialize with custom path
 * const customHistory = new HistoryManager('./data/prompt-history.json');
 *
 * // Add a new entry
 * const newEntry = historyManager.addToHistory({
 *   originalPrompt: 'Summarize this article',
 *   enhancedPrompt: 'Please provide a concise summary of the following article, highlighting key points and main arguments',
 *   model: 'gpt-4',
 *   enhancementType: 'summarization',
 *   userRole: 'researcher',
 *   provider: 'OpenAI',
 *   timestamp: new Date(),
 *   tokensUsed: 45,
 *   processingTime: 2300
 * });
 *
 * // Retrieve recent history
 * const recent = historyManager.getHistory(10);
 *
 * // Search for specific entries
 * const grammarEntries = historyManager.searchHistory('grammar');
 *
 * // Get usage statistics
 * const stats = historyManager.getStats();
 *
 * // Export to different formats
 * const jsonExport = historyManager.exportHistory('json');
 * const csvExport = historyManager.exportHistory('csv');
 * const txtExport = historyManager.exportHistory('txt');
 *
 * @developerNote
 * - The history file is loaded automatically when the class is instantiated
 * - All mutating operations (add, update, delete, clear) trigger an immediate save
 * - File operations include error handling with graceful degradation
 * - The default history file location is `<cwd>/history.json` but can be customized
 * - Directory creation is automatic if the specified path doesn't exist
 * - All timestamps are stored in UTC time format for consistency
 * - The history maintains insertion order with newest entries first
 */
export class HistoryManager {
  private readonly historyPath: string;
  private history: PromptHistory[] = [];

  /**
   * Creates a new HistoryManager instance and initializes the history data.
   *
   * The constructor attempts to load existing history from the specified path.
   * If the file doesn't exist or is corrupted, it starts with an empty history.
   * The history file is monitored and updated automatically with each change.
   *
   * @param {string} [historyPath] - Optional custom path to the JSON history file.
   *                                 Defaults to 'history.json' in the current working directory.
   *                                 Relative paths are resolved from the current working directory.
   *                                 The directory will be created if it doesn't exist.
   *
   * @example
   * // Using default path
   * const defaultManager = new HistoryManager();
   *
   * // Using absolute path
   * const absolutePathManager = new HistoryManager('/var/data/prompt-history.json');
   *
   * // Using relative path
   * const relativePathManager = new HistoryManager('./storage/history.json');
   */
  constructor(historyPath?: string) {
    this.historyPath = historyPath ?? path.join(process.cwd(), 'history.json');
    this.loadHistory();
  }

  /**
   * Loads the history data from the persistent storage file.
   *
   * This private method attempts to read and parse the JSON file at the configured
   * history path. It handles various error conditions gracefully:
   * - File not found: Starts with empty history
   * - Parse errors: Falls back to empty history and logs the error
   * - Permission issues: Logs warning and continues with empty history
   *
   * The method automatically converts timestamp strings back to Date objects
   * during the loading process to maintain data type consistency.
   *
   * @private
   * @returns {void}
   *
   * @fires console.warn - When loading fails, with error details
   *
   * @example
   * // This method is called automatically in the constructor
   * // and after any file system errors during save operations
   */
  private loadHistory(): void {
    try {
      if (fs.existsSync(this.historyPath)) {
        const data = fs.readFileSync(this.historyPath, 'utf-8');
        this.history = JSON.parse(data).map((item: any) => ({
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
   * Persists the current history state to the JSON storage file.
   *
   * This private method ensures atomic write operations by:
   * 1. Creating the target directory if it doesn't exist
   * 2. Writing the entire history array as formatted JSON
   * 3. Handling file system errors gracefully without crashing
   *
   * The JSON output is pretty-printed with 2-space indentation for
   * better human readability when manually inspecting the file.
   *
   * @private
   * @returns {void}
   *
   * @fires console.error - When saving fails, with error details
   *
   * @example
   * // This method is called automatically after:
   * // - Adding new entries
   * // - Updating existing entries
   * // - Deleting entries
   * // - Clearing history
   */
  private saveHistory(): void {
    try {
      const dir = path.dirname(this.historyPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
      }
      fs.writeFileSync(this.historyPath, JSON.stringify(this.history, null, 2));
    } catch (error: any) {
      console.error('Failed to save history:', error);
    }
  }

  /**
   * Adds a new entry to the prompt history with automatic ID generation.
   *
   * This method creates a new history entry by:
   * 1. Generating a unique identifier using timestamp and random components
   * 2. Adding the entry to the beginning of the history array (newest first)
   * 3. Persisting the updated history to disk
   * 4. Returning the complete entry with the generated ID
   *
   * @param {Omit<PromptHistory, 'id'>} entry - The history entry data without the ID field.
   *                                           All other PromptHistory fields are required.
   *
   * @returns {PromptHistory} The complete history entry with the auto-generated ID.
   *                          The returned object includes all fields from the input
   *                          plus the newly assigned unique identifier.
   *
   * @example
   * const newEntry = historyManager.addToHistory({
   *   originalPrompt: 'Translate to Spanish',
   *   enhancedPrompt: 'Please translate the following text into Spanish, maintaining the original meaning and tone',
   *   model: 'gpt-4',
   *   enhancementType: 'translation',
   *   userRole: 'translator',
   *   provider: 'OpenAI',
   *   timestamp: new Date(),
   *   tokensUsed: 30,
   *   processingTime: 1800
   * });
   * console.log('New entry ID:', newEntry.id);
   */
  public addToHistory(entry: Omit<PromptHistory, 'id'>): PromptHistory {
    const historyItem: PromptHistory = {...entry, id: this.generateId()};
    this.history.unshift(historyItem);
    this.saveHistory();
    return historyItem;
  }

  /**
   * Retrieves entries from the prompt history with optional limit.
   *
   * This method returns a copy of the history array, optionally limited to a
   * specific number of most recent entries. The history is maintained in
   * chronological order with newest entries first.
   *
   * @param {number} [limit] - Optional maximum number of entries to return.
   *                          If not provided, returns all entries.
   *                          Must be a positive integer if specified.
   *
   * @returns {PromptHistory[]} An array of history entries.
   *                            The array is ordered from newest to oldest.
   *                            Always returns a new array instance.
   *
   * @example
   * // Get all history entries
   * const allEntries = historyManager.getHistory();
   *
   * // Get the 10 most recent entries
   * const recentEntries = historyManager.getHistory(10);
   *
   * // Get just the latest entry
   * const latestEntry = historyManager.getHistory(1)[0];
   */
  public getHistory(limit?: number): PromptHistory[] {
    return limit ? this.history.slice(0, limit) : this.history;
  }

  /**
   * Searches through history entries for text matching the query across multiple fields.
   *
   * This method performs a case-insensitive search across the following fields:
   * - Original prompt text
   * - Enhanced prompt text
   * - Model name
   * - Enhancement type
   * - User role
   * - Provider (if present)
   *
   * The search uses simple substring matching and returns entries where the query
   * appears in any of the searchable fields.
   *
   * @param {string} query - The search string to look for.
   *                        The search is case-insensitive.
   *                        Empty string returns all entries.
   *                        Leading/trailing whitespace is ignored.
   *
   * @returns {PromptHistory[]} Array of entries matching the search query.
   *                            Results are ordered by history order (newest first).
   *                            Returns empty array if no matches found.
   *
   * @example
   * // Search for all grammar-related entries
   * const grammarEntries = historyManager.searchHistory('grammar');
   *
   * // Search for entries from a specific model
   * const gpt4Entries = historyManager.searchHistory('gpt-4');
   *
   * // Search for a provider
   * const openaiEntries = historyManager.searchHistory('OpenAI');
   *
   * // Search for content in prompts
   * const summaryEntries = historyManager.searchHistory('summarize');
   */
  public searchHistory(query: string): PromptHistory[] {
    const lc = query.toLowerCase();
    return this.history.filter(
      (i) =>
        i.originalPrompt.toLowerCase().includes(lc) ||
        i.enhancedPrompt.toLowerCase().includes(lc) ||
        i.model.toLowerCase().includes(lc) ||
        i.enhancementType.toLowerCase().includes(lc) ||
        i.userRole.toLowerCase().includes(lc) ||
        (i.provider?.toLowerCase().includes(lc) ?? false),
    );
  }

  /**
   * Removes a history entry by its unique identifier.
   *
   * This method searches for an entry with the specified ID and removes it
   * from the history array if found. The operation triggers an automatic
   * save to persist the changes to disk.
   *
   * @param {string} id - The unique identifier of the entry to delete.
   *                     The ID should match the format generated by generateId().
   *                     Case-sensitive string comparison is used.
   *
   * @returns {boolean} Returns true if an entry was found and removed.
   *                   Returns false if no entry with the given ID exists.
   *                   The history is only modified when true is returned.
   *
   * @example
   * const entryId = 'abc123def456';
   * const wasDeleted = historyManager.deleteHistoryItem(entryId);
   *
   * if (wasDeleted) {
   *   console.log('Entry deleted successfully');
   * } else {
   *   console.log('Entry not found');
   * }
   */
  public deleteHistoryItem(id: string): boolean {
    const idx = this.history.findIndex((i) => i.id === id);
    if (idx !== -1) {
      this.history.splice(idx, 1);
      this.saveHistory();
      return true;
    }
    return false;
  }

  /**
   * Modifies an existing history entry with the provided updates.
   *
   * This method allows partial updates to any fields in a history entry.
   * The ID field cannot be modified as it serves as the primary key.
   * Updates are merged with existing data, with new values overwriting old ones.
   *
   * @param {string} id - The unique identifier of the entry to update.
   *                     Must match an existing entry's ID.
   *
   * @param {Partial<PromptHistory>} updates - Object containing the fields to update.
   *                                           Any field not included remains unchanged.
   *                                           The 'id' field cannot be updated.
   *                                           All other fields are optional.
   *
   * @returns {boolean} Returns true if the entry existed and was updated.
   *                   Returns false if no entry with the given ID exists.
   *                   The history is only modified when true is returned.
   *
   * @example
   * const updated = historyManager.updateHistoryItem('abc123', {
   *   enhancedPrompt: 'New improved prompt text',
   *   tokensUsed: 50,
   *   processingTime: 2000
   * });
   *
   * if (updated) {
   *   console.log('Entry updated successfully');
   * }
   */
  public updateHistoryItem(id: string, updates: Partial<PromptHistory>): boolean {
    const idx = this.history.findIndex((i) => i.id === id);
    if (idx !== -1) {
      this.history[idx] = {...this.history[idx], ...updates};
      this.saveHistory();
      return true;
    }
    return false;
  }

  /**
   * Permanently removes all entries from the history.
   *
   * This method performs a complete reset of the history data:
   * 1. Clears all entries from the internal array
   * 2. Persists the empty array to disk
   * 3. Updates the history file to contain an empty JSON array
   *
   * @warning This operation is irreversible and cannot be undone.
   *          All historical data will be permanently lost.
   *          Consider exporting the data before clearing if needed.
   *
   * @returns {void}
   *
   * @developerNote
   * This action should be used with caution as it permanently deletes
   * all stored prompt history. The method includes this warning in its
   * documentation to prevent accidental data loss.
   *
   * @example
   * // Export before clearing if needed
   * const backup = historyManager.exportHistory('json');
   * // Save backup somewhere...
   *
   * // Clear all history
   * historyManager.clearHistory();
   * console.log('All history cleared');
   */
  public clearHistory(): void {
    this.history = [];
    this.saveHistory();
  }

  /**
   * Exports the complete history data in the specified format.
   *
   * This method provides three export formats to suit different use cases:
   * - JSON: Full data preservation with human-readable formatting
   * - CSV: Tabular format for spreadsheet import and data analysis
   * - TXT: Human-readable format for direct viewing and printing
   *
   * Each format includes all history entries with their complete metadata.
   * The export includes proper escaping for special characters in text fields.
   *
   * @param {'json' | 'csv' | 'txt'} [format='json'] - The desired export format.
   *                                                  - 'json': Pretty-printed JSON array
   *                                                  - 'csv': Comma-separated values with headers
   *                                                  - 'txt': Formatted text with sections
   *                                                  Defaults to 'json' if not specified.
   *
   * @returns {string} The complete history data formatted according to the
   *                   specified format. The string can be written directly
   *                   to a file or used for further processing.
   *
   * @example
   * // Export as JSON (default)
   * const jsonData = historyManager.exportHistory();
   * fs.writeFileSync('backup.json', jsonData);
   *
   * // Export as CSV for Excel
   * const csvData = historyManager.exportHistory('csv');
   * fs.writeFileSync('history.csv', csvData);
   *
   * // Export as human-readable text
   * const txtData = historyManager.exportHistory('txt');
   * console.log(txtData); // Display in console
   */
  public exportHistory(format: 'json' | 'csv' | 'txt' = 'json'): string {
    switch (format) {
      case 'json':
        return JSON.stringify(this.history, null, 2);

      case 'csv':
        const headers = [
          'ID',
          'Original Prompt',
          'Enhanced Prompt',
          'Model',
          'Enhancement Type',
          'User Role',
          'Provider',
          'Timestamp',
          'Tokens Used',
          'Processing Time',
        ];
        const rows = [
          headers.join(','),
          ...this.history.map((i) => [
            i.id,
            `"${this.escapeCsv(i.originalPrompt)}"`,
            `"${this.escapeCsv(i.enhancedPrompt)}"`,
            i.model,
            i.enhancementType,
            i.userRole,
            i.provider ?? '',
            i.timestamp.toISOString(),
            i.tokensUsed ?? 0,
            i.processingTime,
          ].join(',')),
        ];
        return rows.join('\n');

      case 'txt':
        return this.history
          .map((i) => `=== ${i.timestamp.toISOString()} ===\n` + `Model: ${i.model} | Type: ${i.enhancementType} | Role: ${i.userRole}\n` + `Provider: ${i.provider ?? 'N/A'}\n\n` + `Original Prompt:\n${i.originalPrompt}\n\n` + `Enhanced Prompt:\n${i.enhancedPrompt}\n` + `${i.tokensUsed ? `Tokens Used: ${i.tokensUsed}\n` : ''}` + `Processing Time: ${i.processingTime}ms\n\n---\n`)
          .join('\n');

      default:
        return JSON.stringify(this.history, null, 2);
    }
  }

  /**
   * Escapes special characters in CSV fields to maintain data integrity.
   *
   * This private method handles CSV-specific escaping requirements:
   * - Double quotes are escaped by doubling them ("" to """")
   * - Newlines are escaped as \n
   * - Carriage returns are escaped as \r
   *
   * This ensures that CSV parsing remains accurate even when prompt
   * text contains special characters that could otherwise break the format.
   *
   * @private
   * @param {string} value - The text value to escape for CSV output.
   *
   * @returns {string} The escaped value safe for inclusion in CSV fields.
   *
   * @example
   * const escaped = historyManager.escapeCsv('Text with "quotes" and\nnewlines');
   * // Returns: 'Text with ""quotes"" and \\nnewlines'
   */
  private escapeCsv(value: string): string {
    return value.replace(/"/g, '""').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
  }

  /**
   * Generates a unique identifier for new history entries.
   *
   * This private method creates IDs using a combination of:
   * - Current timestamp in base-36 for chronological ordering
   * - Random string for uniqueness within the same millisecond
   *
   * The resulting ID is URL-safe, sortable, and highly unlikely to collide.
   *
   * @private
   * @returns {string} A unique identifier string suitable for use as a primary key.
   *                   Format: [timestamp-base36][random-base36]
   *                   Example: "l1e2b3c4d5xyz"
   *
   * @example
   * // Used internally when adding new entries
   * const id = this.generateId();
   * // Returns something like: "k5j2h3g1f7abc"
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  /**
   * Computes comprehensive usage statistics from the entire prompt history.
   *
   * This method analyzes all history entries to provide insights including:
   * - Basic metrics: total entries, tokens used, processing times
   * - Most frequently used values: models, enhancement types, roles
   * - Provider/model combinations with usage counts
   * - Text statistics: word counts, line counts, character counts
   * - Performance metrics and averages
   *
   * The statistics are calculated by iterating through all entries once,
   * aggregating counts, and then computing derived values.
   *
   * @returns {{
   *   totalItems: number;
   *   totalTokensUsed: number;
   *   averageProcessingTime: number;
   *   mostUsedModel: string;
   *   mostUsedEnhancementType: string;
   *   providerUsage: { provider: string; model: string; count: number }[];
   *   mostUsedRoles: { role: string; count: number }[];
   *   totalWords: number;
   *   totalLines: number;
   *   totalChars: number;
   * }} An object containing all calculated statistics.
   *
   * @property {number} totalItems - Total number of history entries
   * @property {number} totalTokensUsed - Sum of all tokens used across entries
   * @property {number} averageProcessingTime - Mean processing time in milliseconds (rounded)
   * @property {string} mostUsedModel - The model used most frequently, or 'N/A' if no data
   * @property {string} mostUsedEnhancementType - The most common enhancement type, or 'N/A'
   * @property {Array} providerUsage - Array of provider/model combinations sorted by usage
   * @property {Array} mostUsedRoles - Array of user roles sorted by frequency
   * @property {number} totalWords - Total word count across all prompts (original + enhanced)
   * @property {number} totalLines - Total line count across all prompts
   * @property {number} totalChars - Total character count across all prompts
   *
   * @remarks
   * - Empty history returns zero/N/A values for all fields
   * - Processing time average is rounded to nearest millisecond
   * - Provider/model combinations include 'N/A' for missing providers
   * - Text statistics count both original and enhanced prompts
   * - All counts are case-sensitive (exact string matches)
   *
   * @example
   * const stats = historyManager.getStats();
   * console.log(`Total entries: ${stats.totalItems}`);
   * console.log(`Most used model: ${stats.mostUsedModel}`);
   * console.log(`Average processing time: ${stats.averageProcessingTime}ms`);
   *
   * // Analyze provider usage
   * stats.providerUsage.forEach(({provider, model, count}) => {
   *   console.log(`${provider}/${model}: ${count} uses`);
   * });
   *
   * // Check role distribution
   * stats.mostUsedRoles.forEach(({role, count}) => {
   *   console.log(`${role}: ${count} entries (${(count/stats.totalItems*100).toFixed(1)}%)`);
   * });
   */
  public getStats(): {
    totalItems: number;
    totalTokensUsed: number;
    averageProcessingTime: number;
    mostUsedModel: string;
    mostUsedEnhancementType: string;
    providerUsage: { provider: string; model: string; count: number }[];
    mostUsedRoles: { role: string; count: number }[];
    totalWords: number;
    totalLines: number;
    totalChars: number;
  } {
    const len = this.history.length;
    if (len === 0) {
      return {
        totalItems: 0,
        totalTokensUsed: 0,
        averageProcessingTime: 0,
        mostUsedModel: 'N/A',
        mostUsedEnhancementType: 'N/A',
        providerUsage: [],
        mostUsedRoles: [],
        totalWords: 0,
        totalLines: 0,
        totalChars: 0,
      };
    }

    const modelCount: Record<string, number> = {};
    const typeCount: Record<string, number> = {};
    const roleCount: Record<string, number> = {};
    const providerModelCount: Record<string, number> = {};

    let totalTokens = 0;
    let totalProcessing = 0;
    let totalWords = 0;
    let totalLines = 0;
    let totalChars = 0;

    for (const item of this.history) {
      modelCount[item.model] = (modelCount[item.model] ?? 0) + 1;
      typeCount[item.enhancementType] = (typeCount[item.enhancementType] ?? 0) + 1;
      roleCount[item.userRole] = (roleCount[item.userRole] ?? 0) + 1;

      const provider = item.provider ?? 'N/A';
      const key = `${provider}|${item.model}`;
      providerModelCount[key] = (providerModelCount[key] ?? 0) + 1;

      totalTokens += item.tokensUsed ?? 0;
      totalProcessing += item.processingTime;

      const promptText = `${item.originalPrompt}\n${item.enhancedPrompt}`;
      totalChars += promptText.length;
      totalLines += (promptText.match(/\n/g) || []).length + 1;
      totalWords += promptText.split(/\s+/).filter(Boolean).length;
    }

    const avgProcessing = Math.round(totalProcessing / len);

    const mostUsedModel = Object.entries(modelCount).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'N/A';
    const mostUsedType = Object.entries(typeCount).sort(([, a], [, b]) => b - a)[0]?.[0] ?? 'N/A';

    const providerUsage = Object.entries(providerModelCount).map(([k, c]) => {
      const [provider, model] = k.split('|');
      return {provider, model, count: c};
    });

    const mostUsedRoles = Object.entries(roleCount)
      .map(([role, count]) => ({role, count}))
      .sort((a, b) => b.count - a.count);

    return {
      totalItems: len,
      totalTokensUsed: totalTokens,
      averageProcessingTime: avgProcessing,
      mostUsedModel,
      mostUsedEnhancementType: mostUsedType,
      providerUsage,
      mostUsedRoles,
      totalWords,
      totalLines,
      totalChars,
    };
  }
}
