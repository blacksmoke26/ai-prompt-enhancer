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

// db
import {History, Provider} from '~/database/models';
import {FindOptions, Op} from 'sequelize';

// classes
import HistoryStats from '~/classes/HistoryStats';

// types
import type {PromptHistory, HistoryStatistics} from '~/types/history-service';

export {PromptHistory, HistoryStatistics};

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
 * @class HistoryService
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
export default class HistoryService {
  private history: PromptHistory[] = [];

  /**
   * Creates a new HistoryManager instance and initializes the history data.
   *
   * The constructor attempts to load existing history from the specified path.
   * If the file doesn't exist or is corrupted, it starts with an empty history.
   * The history file is monitored and updated automatically with each change.
   *
   * @example
   * const defaultManager = new HistoryManager();
   */
  constructor() {
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
  public async getHistory(limit?: number): Promise<PromptHistory[]> {
    const findOptions: FindOptions<Provider> = {
      where: {},
      order: [['createdAt', 'DESC']],
    };

    if (limit) findOptions.limit = limit;

    const histories = await History.findAll(findOptions);

    const providers: Record<string, string> = {};

    const records: PromptHistory[] = [];

    for await (const history of histories) {
      if (!Object.hasOwn(providers, String(history.providerId))) {
        const provider = await Provider.findByPk(history.providerId, {raw: true, attributes: ['name']});
        providers[String(history.providerId)] = provider?.name ?? '';
      }

      records.push({
        id: String(history?.id),
        model: history.model,
        enhancedPrompt: history.enhancedPrompt,
        enhancementType: history.enhancementType,
        originalPrompt: history.originalPrompt,
        processingTime: history.processingTime,
        timestamp: new Date(history?.createdAt),
        userRole: history.userRole,
        provider: providers[String(history.providerId)],
        tokensUsed: history.tokensUsed,
        maxTokens: history.maxTokens,
        temperature: history.temperature,
        systemPrompt: history.systemPrompt,
        rating: history.rating,
        notes: history.notes,
      });
    }

    return records;
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
  public async searchHistory(query: string): Promise<PromptHistory[]> {
    const lc = query.toLowerCase();

    const histories = await History.findAll({
      where: {
        [Op.or]: [
          {originalPrompt: {[Op.like]: `%${lc}%`}},
          {enhancedPrompt: {[Op.like]: `%${lc}%`}},
          {model: {[Op.like]: `%${lc}%`}},
          {enhancementType: {[Op.like]: `%${lc}%`}},
          {userRole: {[Op.like]: `%${lc}%`}},
        ],
      },
      order: [['createdAt', 'DESC']],
    });

    const records: PromptHistory[] = [];
    const providers: Record<string, string> = {};

    for await (const history of histories) {
      if (!Object.hasOwn(providers, String(history.providerId))) {
        const provider = await Provider.findByPk(history.providerId, {raw: true, attributes: ['name']});
        providers[String(history.providerId)] = provider?.name ?? '';
      }

      records.push({
        id: String(history?.id),
        model: history.model,
        enhancedPrompt: history.enhancedPrompt,
        enhancementType: history.enhancementType,
        originalPrompt: history.originalPrompt,
        processingTime: history.processingTime,
        timestamp: new Date(history?.createdAt),
        userRole: history.userRole,
        provider: providers[String(history.providerId)],
        tokensUsed: history.tokensUsed,
        maxTokens: history.maxTokens,
        temperature: history.temperature,
        systemPrompt: history.systemPrompt,
        rating: history.rating,
        notes: history.notes,
      });
    }

    return records;
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
  public async deleteHistoryItem(id: string): Promise<boolean> {
    return (await History.destroy({where: {id}})) > 0;
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
  public async updateHistoryItem(id: string, updates: Partial<PromptHistory>): Promise<boolean> {
    const record = await History.findByPk(id);

    if (!record) return false;

    const updateData: any = {};

    if (updates.rating) {
      updateData.rating = updates.rating;
    }

    if (updates.notes) {
      updateData.notes = updates.notes;
    }

    if (Object.keys(updateData).length === 0) {
      return true;
    }

    const [updatedRows] = await History.update(updateData, {
      where: {id},
    });

    return updatedRows > 0;
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
  public async clearHistory(): Promise<void> {
    await History.destroy({});
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
  public async exportHistory(format: 'json' | 'csv' | 'txt' = 'json'): Promise<string> {
    const records = await this.getHistory();

    switch (format) {
      case 'json':
        return JSON.stringify(records, null, 2);

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
          'Temperature',
          'Max Tokens',
          'Rating',
          'Notes',
        ];
        const rows = [
          headers.join(','),
          ...records.map((i) => [
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
            i.temperature ?? '',
            i.maxTokens ?? '',
            i.rating ?? 0,
            i.notes ? `"${this.escapeCsv(i.notes)}"` : '',
          ].join(',')),
        ];
        return rows.join('\n');

      case 'txt':
        return records
          .map((i) => `=== ${i.timestamp.toISOString()} ===\n` + `Model: ${i.model} | Type: ${i.enhancementType} | Role: ${i.userRole}\n` + `Provider: ${i.provider ?? 'N/A'}\n\n` + `Original Prompt:\n${i.originalPrompt}\n\n` + `Enhanced Prompt:\n${i.enhancedPrompt}\n` + `${i.tokensUsed ? `Tokens Used: ${i.tokensUsed}\n` : ''}` + `Processing Time: ${i.processingTime}ms\n` + `${i.temperature ? `Temperature: ${i.temperature}\n` : ''}` + `${i.maxTokens ? `Max Tokens: ${i.maxTokens}\n` : ''}` + `Rating: ${i.rating}\n` + `${i.notes ? `Notes: ${i.notes}\n` : ''}\n---\n`)
          .join('\n');

      default:
        return JSON.stringify(records, null, 2);
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
  public async getStats(): Promise<HistoryStatistics> {
    const histories = await History.findAll({
      raw: true,
      order: [['createdAt', 'DESC']],
    });

    const len = histories.length;
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
        averageTokensUsed: 0,
        maxTokensUsed: 0,
        averageRating: 0,
        topRatedEntries: 0,
        averageTemperature: 0,
        temperatureDistribution: [],
        enhancementFrequency: [],
        modelPerformance: [],
        roleModelDistribution: [],
        dateRange: {earliest: new Date(), latest: new Date()},
        peakUsageHour: {hour: 0, count: 0},
        monthlyUsage: [],
        averageMaxTokens: 0,
        minTokensUsed: 0,
        promptEnhancementRatio: 0,
        systemPromptUsage: {used: 0, notUsed: 0, percentage: 0},
        ratingDistribution: [],
        costAnalysis: {totalEstimatedCost: 0, avgCostPerRequest: 0},
        weeklyUsage: [],
        longestPrompt: {originalLength: 0, enhancedLength: 0, ratio: 0},
        shortestPrompt: {originalLength: 0, enhancedLength: 0, ratio: 0},
        averagePromptLength: {original: 0, enhanced: 0},
        mostEfficientModel: {model: 'N/A', avgProcessingTime: 0, avgTokensPerMs: 0},
        preferredTimeSlots: [],
        enhancementTypeEfficiency: [],
        metaFieldUsage: {withMeta: 0, withoutMeta: 0, percentage: 0},
      };
    }

    const modelCount: Record<string, number> = {};
    const typeCount: Record<string, number> = {};
    const roleCount: Record<string, number> = {};
    const providerModelCount: Record<string, number> = {};
    const modelProcessingTime: Record<string, number[]> = {};
    const roleModelCount: Record<string, number> = {};
    const hourlyUsage: Record<number, number> = {};
    const monthlyUsage: Record<string, number> = {};
    const weeklyUsage: Record<string, number> = {};
    const temperatureRanges = {
      '0-0.2': 0, '0.2-0.4': 0, '0.4-0.6': 0,
      '0.6-0.8': 0, '0.8-1.0': 0,
    };
    const ratingCounts: Record<number, number> = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    const enhancementStats: Record<string, { processingTime: number[]; tokensUsed: number[]; ratings: number[] }> = {};

    let totalTokens = 0;
    let totalProcessing = 0;
    let totalWords = 0;
    let totalLines = 0;
    let totalChars = 0;
    let maxTokens = 0;
    let minTokens = Number.MAX_SAFE_INTEGER;
    let totalRating = 0;
    let topRated = 0;
    let totalTemperature = 0;
    let totalMaxTokens = 0;
    let systemPromptUsed = 0;
    let systemPromptNotUsed = 0;
    let withMeta = 0;
    let withoutMeta = 0;
    let totalOriginalLength = 0;
    let totalEnhancedLength = 0;
    let maxOriginalLength = 0;
    let maxEnhancedLength = 0;
    let minOriginalLength = Number.MAX_SAFE_INTEGER;
    let minEnhancedLength = Number.MAX_SAFE_INTEGER;
    let earliestDate = histories[0].createdAt;
    let latestDate = histories[0].createdAt;

    for (const item of histories) {
      // Model and type counts
      modelCount[item.model] = (modelCount[item.model] ?? 0) + 1;
      typeCount[item.enhancementType] = (typeCount[item.enhancementType] ?? 0) + 1;
      roleCount[item.userRole] = (roleCount[item.userRole] ?? 0) + 1;

      // Provider usage
      const provider = await Provider.getNameByPk(item.providerId) ?? 'N/A';
      const key = `${provider}|${item.model}`;
      providerModelCount[key] = (providerModelCount[key] ?? 0) + 1;

      // Model performance tracking
      if (!modelProcessingTime[item.model]) {
        modelProcessingTime[item.model] = [];
      }
      modelProcessingTime[item.model].push(item.processingTime);

      // Role-model distribution
      const roleModelKey = `${item.userRole}|${item.model}`;
      roleModelCount[roleModelKey] = (roleModelCount[roleModelKey] ?? 0) + 1;

      // Token statistics
      const tokensUsed = item.tokensUsed ?? 0;
      totalTokens += tokensUsed;
      maxTokens = Math.max(maxTokens, tokensUsed);
      minTokens = Math.min(minTokens, tokensUsed);

      // Max tokens statistics
      totalMaxTokens += item.maxTokens ?? 0;

      // Processing time
      totalProcessing += item.processingTime;

      // Rating statistics
      totalRating += item.rating ?? 0;
      const rating = item.rating ?? 0;
      if (rating >= 4) topRated++;
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating]++;
      }

      // Temperature statistics
      totalTemperature += item.temperature ?? 0;
      const temp = item.temperature ?? 0;
      if (temp <= 0.2) temperatureRanges['0-0.2']++;
      else if (temp <= 0.4) temperatureRanges['0.2-0.4']++;
      else if (temp <= 0.6) temperatureRanges['0.4-0.6']++;
      else if (temp <= 0.8) temperatureRanges['0.6-0.8']++;
      else temperatureRanges['0.8-1.0']++;

      // Text statistics
      const originalLength = item.originalPrompt.length;
      const enhancedLength = item.enhancedPrompt.length;
      const promptText = `${item.originalPrompt}\n${item.enhancedPrompt}`;

      totalChars += promptText.length;
      totalLines += (promptText.match(/\n/g) || []).length + 1;
      totalWords += promptText.split(/\s+/).filter(Boolean).length;

      totalOriginalLength += originalLength;
      totalEnhancedLength += enhancedLength;

      maxOriginalLength = Math.max(maxOriginalLength, originalLength);
      maxEnhancedLength = Math.max(maxEnhancedLength, enhancedLength);
      minOriginalLength = Math.min(minOriginalLength, originalLength);
      minEnhancedLength = Math.min(minEnhancedLength, enhancedLength);

      // System prompt usage
      if (item.systemPrompt && item.systemPrompt.trim()) {
        systemPromptUsed++;
      } else {
        systemPromptNotUsed++;
      }

      // Meta field usage
      if (item.meta) {
        withMeta++;
      } else {
        withoutMeta++;
      }

      // Enhancement type efficiency
      if (!enhancementStats[item.enhancementType]) {
        enhancementStats[item.enhancementType] = {processingTime: [], tokensUsed: [], ratings: []};
      }
      enhancementStats[item.enhancementType].processingTime.push(item.processingTime);
      enhancementStats[item.enhancementType].tokensUsed.push(tokensUsed);
      enhancementStats[item.enhancementType].ratings.push(rating);

      // Date/time statistics
      const date = new Date(item.createdAt);
      earliestDate = date < earliestDate ? date : earliestDate;
      latestDate = date > latestDate ? date : latestDate;

      const hour = date.getHours();
      hourlyUsage[hour] = (hourlyUsage[hour] ?? 0) + 1;

      const monthKey = date.toISOString().slice(0, 7);
      monthlyUsage[monthKey] = (monthlyUsage[monthKey] ?? 0) + 1;

      const weekKey = this.getISOWeek(date);
      weeklyUsage[weekKey] = (weeklyUsage[weekKey] ?? 0) + 1;
    }

    const avgProcessing = Math.round(totalProcessing / len);
    const avgTokens = Math.round(totalTokens / len);
    const avgRating = Number((totalRating / len).toFixed(1));
    const avgTemp = Number((totalTemperature / len).toFixed(2));
    const averageMaxTokens = Math.round(totalMaxTokens / len);
    const promptEnhancementRatio = Number((totalEnhancedLength / totalOriginalLength).toFixed(2));
    const systemPromptPercentage = Number(((systemPromptUsed / len) * 100).toFixed(1));
    const metaPercentage = Number(((withMeta / len) * 100).toFixed(1));

    const stats = new HistoryStats(histories);

    const [
      mostUsedModel,
      mostUsedType,
      providerUsage,
      mostUsedRoles,
      modelPerformance,
      mostEfficient,
      enhancementFrequency,
      temperatureDistribution,
      roleModelDistribution,
      peakHour,
      monthlyStats,
      weeklyStats,
      ratingDistribution,
      preferredTimeSlots,
      enhancementTypeEfficiency,
    ] = await Promise.all([
      stats.getMostUsedModel(modelCount),
      stats.getMostUsedType(typeCount),
      stats.getProviderUsage(providerModelCount),
      stats.getMostUsedRoles(roleCount),
      stats.getModelPerformance(modelProcessingTime),
      stats.getMostEfficient(modelProcessingTime),
      stats.getEnhancementFrequency(typeCount, len),
      stats.getTemperatureDistribution(temperatureRanges),
      stats.getRoleModelDistribution(roleModelCount),
      stats.getPeakHour(hourlyUsage),
      stats.getMonthlyStats(monthlyUsage),
      stats.getWeeklyStats(weeklyUsage),
      stats.getRatingDistribution(ratingCounts, len),
      stats.getPreferredTimeSlots(hourlyUsage, len),
      stats.getEnhancementTypeEfficiency(enhancementStats),
    ]);

    const costAnalysis = {
      totalEstimatedCost: Number((totalTokens * 0.00002).toFixed(4)), // Assuming $0.02 per 1K tokens
      avgCostPerRequest: Number(((totalTokens * 0.00002) / len).toFixed(6)),
    };

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
      averageTokensUsed: avgTokens,
      maxTokensUsed: maxTokens,
      averageRating: avgRating,
      topRatedEntries: topRated,
      averageTemperature: avgTemp,
      temperatureDistribution,
      enhancementFrequency,
      modelPerformance,
      roleModelDistribution,
      dateRange: {earliest: earliestDate, latest: latestDate},
      peakUsageHour: {hour: Number(peakHour[0]), count: peakHour[1]},
      monthlyUsage: monthlyStats,
      averageMaxTokens,
      minTokensUsed: minTokens === Number.MAX_SAFE_INTEGER ? 0 : minTokens,
      promptEnhancementRatio,
      systemPromptUsage: {used: systemPromptUsed, notUsed: systemPromptNotUsed, percentage: systemPromptPercentage},
      ratingDistribution,
      costAnalysis,
      weeklyUsage: weeklyStats,
      longestPrompt: {
        originalLength: maxOriginalLength,
        enhancedLength: maxEnhancedLength,
        ratio: Number((maxEnhancedLength / maxOriginalLength).toFixed(2)),
      },
      shortestPrompt: {
        originalLength: minOriginalLength === Number.MAX_SAFE_INTEGER ? 0 : minOriginalLength,
        enhancedLength: minEnhancedLength === Number.MAX_SAFE_INTEGER ? 0 : minEnhancedLength,
        ratio: minEnhancedLength === Number.MAX_SAFE_INTEGER ? 0 : Number((minEnhancedLength / minOriginalLength).toFixed(2)),
      },
      averagePromptLength: {
        original: Math.round(totalOriginalLength / len),
        enhanced: Math.round(totalEnhancedLength / len),
      },
      mostEfficientModel: mostEfficient,
      preferredTimeSlots,
      enhancementTypeEfficiency,
      metaFieldUsage: {withMeta, withoutMeta, percentage: metaPercentage},
    };
  }

  getISOWeek(date: Date): string {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return `${d.getUTCFullYear()}-W${Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)}`;
  }
}
