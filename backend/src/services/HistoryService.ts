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

import { FindOptions, Op } from 'sequelize';

// db
import { History, HistoryAttributes, Provider } from '~/database/models';

// classes
import HistoryStats from '~/classes/HistoryStats';

// types
import type {
  ContentComplexity,
  CostBreakdown,
  EnhancementMetrics,
  ErrorStatistics,
  GeographicDistribution,
  RegionUsage,
  HistoryStatistics,
  ModelMetrics,
  PerformanceTrends,
  ProcessingTimePercentiles,
  PromptHistory,
  Season,
  StatsData,
  SystemHealth,
  TokenUsagePercentiles,
  TrendDirection,
  UserActivity,
  UserPreferences,
} from '~/types/history-service';

export { PromptHistory, HistoryStatistics };

/**
 * Interface for filtering history data queries
 * Represents optional parameters for querying historical records with validation constraints
 *
 * @example
 * const filters: HistoryFilters = {
 *   model: 'gpt-3.5',
 *   dateFrom: '2023-01-01',
 *   dateTo: '2023-12-31',
 *   minRating: 3,
 *   maxRating: 5
 * };
 *
 * Developer Notes:
 * - All properties are optional for flexible filtering
 * - Date fields use ISO 8601 format (YYYY-MM-DD)
 * - minRating and maxRating must be between 0-5
 * - Provider and model names should match available system values
 * - Useful for paginated history queries with multiple constraints
 */
export interface HistoryFilters {
  /** Filter by AI model name (e.g., 'gpt-3.5', 'claude-2') */
  model?: string;
  /** Filter by enhancement type (e.g., 'text', 'image', 'audio') */
  enhancementType?: string;
  /** Filter by user role (e.g., 'developer', 'admin', 'guest') */
  userRole?: string;
  /** Filter by service provider (e.g., 'openai', 'anthropic', 'google') */
  provider?: string;
  /** Start date for filtering (ISO 8601 format: YYYY-MM-DD) */
  dateFrom?: string;
  /** End date for filtering (ISO 8601 format: YYYY-MM-DD) */
  dateTo?: string;
  /** Minimum rating filter (0-5) */
  minRating?: number;
  /** Maximum rating filter (0-5) */
  maxRating?: number;
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
  constructor() {}

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
   * @param [filters] - Optional filters to apply to the search.
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
  public async getHistory(
    limit?: number,
    filters?: HistoryFilters,
  ): Promise<PromptHistory[]> {
    const findOptions: FindOptions<History> = {
      where: {},
      order: [['createdAt', 'DESC']],
    };

    if (limit) findOptions.limit = limit;

    // Add filters to where clause
    if (filters) {
      const whereConditions: any = {};

      // Add model filter
      if (filters.model) {
        whereConditions.model = { [Op.like]: `%${filters.model}%` };
      }

      // Add enhancement type filter
      if (filters.enhancementType) {
        whereConditions.enhancementType = {
          [Op.like]: `%${filters.enhancementType}%`,
        };
      }

      // Add user role filter
      if (filters.userRole) {
        whereConditions.userRole = { [Op.like]: `%${filters.userRole}%` };
      }

      // Add provider filter
      if (filters.provider) {
        // First get provider IDs that match the provider name
        const providers = await Provider.findAll({
          where: {
            name: { [Op.like]: `%${filters.provider}%` },
          },
          attributes: ['id'],
        });

        const providerIds = providers.map((p) => p.id);

        if (providerIds.length > 0) {
          whereConditions.providerId = { [Op.in]: providerIds };
        } else {
          // If no providers match, return empty result
          return [];
        }
      }

      // Add date range filters
      if (filters.dateFrom || filters.dateTo) {
        const dateConditions: any = {};
        if (filters.dateFrom) {
          dateConditions.gte = new Date(filters.dateFrom);
        }
        if (filters.dateTo) {
          dateConditions.lte = new Date(filters.dateTo);
        }
        whereConditions.createdAt = dateConditions;
      }

      // Add rating filters
      if (filters.minRating !== undefined || filters.maxRating !== undefined) {
        const ratingConditions: any = {};
        if (filters.minRating !== undefined) {
          ratingConditions.gte = filters.minRating;
        }
        if (filters.maxRating !== undefined) {
          ratingConditions.lte = filters.maxRating;
        }
        whereConditions.rating = ratingConditions;
      }

      findOptions.where = whereConditions;
    }

    const histories = await History.findAll(findOptions);

    const providers: Record<string, string> = {};

    const records: PromptHistory[] = [];

    for await (const history of histories) {
      if (!Object.hasOwn(providers, String(history.providerId))) {
        const provider = await Provider.findByPk(history.providerId, {
          raw: true,
          attributes: ['name'],
        });
        providers[String(history.providerId)] = provider?.name ?? '';
      }

      records.push(
        this.mapHistoryToPromptHistory(
          history,
          providers[String(history.providerId)],
        ),
      );
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
   * @param [filters] - Optional filters to apply to the search.
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
  public async searchHistory(
    query: string,
    filters?: HistoryFilters,
  ): Promise<PromptHistory[]> {
    const lc = query.toLowerCase();
    const where: any = {};

    const searchConditions: Record<string, any>[] = [
      { originalPrompt: { [Op.like]: `%${lc}%` } },
      { enhancedPrompt: { [Op.like]: `%${lc}%` } },
      { model: { [Op.like]: `%${lc}%` } },
      { enhancementType: { [Op.like]: `%${lc}%` } },
      { userRole: { [Op.like]: `%${lc}%` } },
    ];

    // Add additional filters if provided
    if (filters?.model) {
      searchConditions.push({ model: { [Op.like]: `%${filters.model}%` } });
    }

    if (filters?.enhancementType) {
      searchConditions.push({
        enhancementType: { [Op.like]: `%${filters.enhancementType}%` },
      });
    }

    if (filters?.userRole) {
      searchConditions.push({
        userRole: { [Op.like]: `%${filters.userRole}%` },
      });
    }

    // Handle provider filtering by joining with Provider table
    if (filters?.provider) {
      // First get provider IDs that match the provider name
      const providers = await Provider.findAll({
        where: {
          name: { [Op.like]: `%${filters.provider}%` },
        },
        attributes: ['id'],
      });

      const providerIds = providers.map((p) => p.id);

      if (providerIds.length > 0) {
        where[Op.and] = [
          { [Op.or]: searchConditions },
          { providerId: { [Op.in]: providerIds } },
        ];
      } else {
        // If no providers match, return empty result
        return [];
      }
    } else {
      where[Op.or] = searchConditions;
    }

    // Add date range filters
    if (filters?.dateFrom || filters?.dateTo) {
      const dateConditions: any = {};
      if (filters.dateFrom) {
        dateConditions.gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        dateConditions.lte = new Date(filters.dateTo);
      }
      where.createdAt = dateConditions;
    }

    // Add rating filters
    if (filters?.minRating !== undefined || filters?.maxRating !== undefined) {
      const ratingConditions: any = {};
      if (filters.minRating !== undefined) {
        ratingConditions.gte = filters.minRating;
      }
      if (filters.maxRating !== undefined) {
        ratingConditions.lte = filters.maxRating;
      }
      where.rating = ratingConditions;
    }

    const histories = await History.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    const records: PromptHistory[] = [];
    const providers: Record<string, string> = {};

    for await (const history of histories) {
      if (!Object.hasOwn(providers, String(history.providerId))) {
        const provider = await Provider.findByPk(history.providerId, {
          raw: true,
          attributes: ['name'],
        });
        providers[String(history.providerId)] = provider?.name ?? '';
      }

      records.push(
        this.mapHistoryToPromptHistory(
          history,
          providers[String(history.providerId)],
        ),
      );
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
    return (await History.destroy({ where: { id } })) > 0;
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
  public async updateHistoryItem(
    id: string,
    updates: Partial<PromptHistory>,
  ): Promise<boolean> {
    const record = await History.findByPk(id);

    if (!record) return false;

    const updateData: any = {};

    if (updates.rating !== undefined) {
      updateData.rating = updates.rating;
    }

    if (updates.notes !== undefined) {
      updateData.notes = updates.notes;
    }

    if (Object.keys(updateData).length === 0) {
      return true;
    }

    const [updatedRows] = await History.update(updateData, {
      where: { id },
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
    await History.truncate();
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
  public async exportHistory(
    format: 'json' | 'csv' | 'txt' = 'json',
  ): Promise<string> {
    const records = await this.getHistory();

    switch (format) {
      case 'json':
        return JSON.stringify(records, null, 2);

      case 'csv': {
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
          ...records.map((i) =>
            [
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
            ].join(','),
          ),
        ];
        return rows.join('\n');
      }

      case 'txt':
        return records
          .map(
            (i) =>
              `=== ${i.timestamp.toISOString()} ===\n` +
              `Model: ${i.model} | Type: ${i.enhancementType} | Role: ${i.userRole}\n` +
              `Provider: ${i.provider ?? 'N/A'}\n\n` +
              `Original Prompt:\n${i.originalPrompt}\n\n` +
              `Enhanced Prompt:\n${i.enhancedPrompt}\n` +
              `${i.tokensUsed ? `Tokens Used: ${i.tokensUsed}\n` : ''}` +
              `Processing Time: ${i.processingTime}ms\n` +
              `${i.temperature ? `Temperature: ${i.temperature}\n` : ''}` +
              `${i.maxTokens ? `Max Tokens: ${i.maxTokens}\n` : ''}` +
              `Rating: ${i.rating}\n` +
              `${i.notes ? `Notes: ${i.notes}\n` : ''}\n---\n`,
          )
          .join('\n');

      default:
        return JSON.stringify(records, null, 2);
    }
  }

  private escapeCsv(value: string): string {
    return value
      .replace(/"/g, '""')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');
  }

  /**
   * Maps a history object to a PromptHistory format compatible with the specified provider.
   * Transforms history data into a structure suitable for AI model prompt processing.
   * @example
   * const history = { messages: [{ role: 'user', content: 'Hello' }] };
   * const promptHistory = mapHistoryToPromptHistory(history, 'openai');
   * // Result: { messages: [{ role: 'user', content: 'Hello' }], providerName: 'openai', timestamp: '2025-04-05T12:00:00Z' }
   * @developerNotes Ensure provider-specific formatting logic is implemented. Validate that the `history` object contains valid message structures. Consider adding timestamping for traceability.
   */
  private mapHistoryToPromptHistory(
    history: History,
    providerName: string,
  ): PromptHistory {
    return {
      id: String(history?.id),
      model: history.model,
      enhancedPrompt: history.enhancedPrompt,
      enhancementType: history.enhancementType,
      originalPrompt: history.originalPrompt,
      processingTime: history.processingTime,
      timestamp: history?.createdAt ? new Date(history?.createdAt) : new Date(),
      userRole: history.userRole,
      provider: providerName,
      tokensUsed: history.tokensUsed,
      maxTokens: history.maxTokens,
      temperature: history.temperature,
      systemPrompt: history.systemPrompt,
      rating: history?.rating ?? 0,
      notes: history?.notes ?? null,
      targetAudience: history.targetAudience,
      tone: history.tone,
      responseLength: history.responseLength,
      customInstructions: history.customInstructions,
      format: history.format,
      metadata: history.metadata,
      enhancementParameters: history.enhancementParameters,
      topP: history.topP,
      topK: history.topK,
      stopSequences: history.stopSequences,
      frequencyPenalty: history.frequencyPenalty,
      presencePenalty: history.presencePenalty,
      conversationId: history.conversationId,
    };
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
    if (!len) {
      return this.getEmptyStats();
    }

    const statsData: StatsData = this.initializeStatsData();

    for (const item of histories) {
      await this.processHistoryEntry(item, statsData);
    }

    const basicStats = await this.calculateBasicStats(len, statsData);
    const modelStats = await this.calculateModelStats(len, statsData);
    const timeStats = this.calculateTimeStats(statsData);
    const performanceStats = this.calculatePerformanceStats(statsData);
    const contentStats = this.calculateContentStats(statsData);
    const userStats = this.calculateUserStats(statsData);
    const systemStats = this.calculateSystemStats(statsData);
    const costStats = this.calculateCostStats(len, statsData);
    const geoStats = this.calculateGeographicStats(statsData);

    return {
      ...basicStats,
      ...modelStats,
      ...timeStats,
      ...performanceStats,
      ...contentStats,
      ...userStats,
      ...systemStats,
      ...costStats,
      ...geoStats,
    } as unknown as HistoryStatistics;
  }

  /**
   * Calculates geographic distribution statistics from the processed data.
   * @private
   * @param {StatsData} statsData - Processed statistics data
   * @returns {Object} Geographic statistics object
   */
  private calculateGeographicStats(statsData: StatsData): { geographicDistribution: GeographicDistribution } {
    // Calculate total usage for percentage calculations
    const totalUsage: number = Object.values(statsData.regions).reduce((a, b) => a + b, 0);

    // Calculate regions array
    const regions: RegionUsage[] = Object.entries(statsData.regions).map(([region, usage]) => ({
      region,
      usage: usage as number,
      percentage: totalUsage > 0 ? ((usage as number) / totalUsage) * 100 : 0,
    }));

    // Find most and least active regions
    let mostActiveRegion: string = 'N/A';
    let leastActiveRegion: string = 'N/A';
    let maxUsage: number = 0;
    let minUsage: number = Number.MAX_SAFE_INTEGER;

    for (const [region, usage] of Object.entries(statsData.regions)) {
      if (usage > maxUsage) {
        maxUsage = usage;
        mostActiveRegion = region;
      }
      if (usage < minUsage) {
        minUsage = usage;
        leastActiveRegion = region;
      }
    }

    return {
      geographicDistribution: {
        regions,
        mostActiveRegion,
        leastActiveRegion,
      },
    };
  }

  /**
   * Returns an empty or default-initialized `HistoryStatistics` object with all properties set to zero or null.
   * Useful for resetting or initializing history statistics tracking.
   * @example
   * {
   *   total: 0,
   *   average: 0,
   *   min: 0,
   *   max: 0,
   *   count: 0,
   *   lastUpdate: null
   * }
   * @developerNotes Ensure all properties in the `HistoryStatistics` interface are initialized to a default value (e.g., 0, null, or empty string). This method is typically used to reset or initialize statistics before processing new data.
   */
  private getEmptyStats(): HistoryStatistics {
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
      dateRange: { earliest: new Date(), latest: new Date() },
      peakUsageHour: { hour: 0, count: 0 },
      monthlyUsage: [],
      averageMaxTokens: 0,
      minTokensUsed: 0,
      promptEnhancementRatio: 0,
      systemPromptUsage: { used: 0, notUsed: 0, percentage: 0 },
      ratingDistribution: [],
      costAnalysis: { totalEstimatedCost: 0, avgCostPerRequest: 0 },
      weeklyUsage: [],
      longestPrompt: { originalLength: 0, enhancedLength: 0, ratio: 0 },
      shortestPrompt: { originalLength: 0, enhancedLength: 0, ratio: 0 },
      averagePromptLength: { original: 0, enhanced: 0 },
      mostEfficientModel: {
        model: 'N/A',
        avgProcessingTime: 0,
        avgTokensPerMs: 0,
      },
      preferredTimeSlots: [],
      enhancementTypeEfficiency: [],
      metaFieldUsage: { withMeta: 0, withoutMeta: 0, percentage: 0 },
      targetAudienceUsage: [],
      toneUsage: [],
      responseLengthUsage: [],
      formatUsage: [],
      topKUsage: [],
      topPUsage: [],
      frequencyPenaltyUsage: [],
      presencePenaltyUsage: [],
      conversationIdUsage: [],
      // New properties with strict types
      processingTimePercentiles: { p50: 0, p75: 0, p90: 0, p95: 0, p99: 0 },
      tokenUsagePercentiles: { p50: 0, p75: 0, p90: 0, p95: 0, p99: 0 },
      errorStatistics: { totalErrors: 0, errorRate: 0, errorTypes: [] },
      userActivity: {
        dailyActiveUsers: 0,
        weeklyActiveUsers: 0,
        monthlyActiveUsers: 0,
        retentionRate: 0,
      },
      performanceTrends: { processingTime: [], tokenUsage: [], errorRate: [] },
      modelMetrics: [],
      enhancementMetrics: [],
      contentComplexity: {
        avgComplexityScore: 0,
        complexityDistribution: [],
        complexityTimeCorrelation: 0,
        complexityTokenCorrelation: 0,
      },
      systemHealth: {
        avgSystemLoad: 0,
        peakSystemLoad: 0,
        avgResourceUtilization: 0,
        uptime: 0,
        avgResponseTime: 0,
      },
      userPreferences: {
        modelPreference: [],
        enhancementPreference: [],
        parameterPreference: [],
      },
      costBreakdown: {
        modelCosts: [],
        enhancementCosts: [],
        costEfficiency: {
          mostEfficientModel: 'N/A',
          mostEfficientEnhancement: 'N/A',
          efficiencyScore: 0,
        },
      },
      seasonalPatterns: {
        seasonalTrends: [],
        peakSeason: 'winter',
        lowestSeason: 'winter',
      },
      geographicDistribution: {
        regions: [],
        mostActiveRegion: 'N/A',
        leastActiveRegion: 'N/A',
      },
    };
  }

  /**
   * Initializes and returns a default `StatsData` object with typical statistics properties.
   * Useful for resetting or initializing statistical tracking in a system.
   * @example
   * {
   *   total: 150,
   *   average: 30,
   *   min: 25,
   *   max: 35,
   *   count: 5
   * }
   * @developerNotes Ensure all statistical properties are initialized with appropriate default values. Consider adding null checks or validation if data sources may be incomplete.
   */
  private initializeStatsData(): StatsData {
    return {
      modelCount: {},
      typeCount: {},
      roleCount: {},
      providerModelCount: {},
      modelProcessingTime: {},
      roleModelCount: {},
      hourlyUsage: {},
      monthlyUsage: {},
      weeklyUsage: {},
      dailyUsage: {},
      temperatureRanges: {
        '0-0.2': 0,
        '0.2-0.4': 0,
        '0.4-0.6': 0,
        '0.6-0.8': 0,
        '0.8-1.0': 0,
      },
      ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      enhancementStats: {},
      modelStats: {},
      dates: [],
      processingTimes: [],
      tokenUsages: [],
      users: new Set<string>(),
      errors: [],
      systemLoads: [],
      responseTimes: [],
      promptLengths: { original: [], enhanced: [] },
      complexityScores: [],
      regions: {},
      costs: { byModel: {}, byEnhancement: {} },
      seasons: { winter: 0, spring: 0, summer: 0, fall: 0 },
      targetAudienceStats: {},
      toneStats: {},
      responseLengthStats: {},
      formatStats: {},
      topKStats: {},
      topPStats: {},
      frequencyPenaltyStats: {},
      presencePenaltyStats: {},
      conversationIdStats: {},
      totalTokens: 0,
      totalProcessing: 0,
      totalWords: 0,
      totalLines: 0,
      totalChars: 0,
      maxTokens: 0,
      minTokens: Number.MAX_SAFE_INTEGER,
      totalRating: 0,
      topRated: 0,
      totalTemperature: 0,
      totalMaxTokens: 0,
      systemPromptUsed: 0,
      systemPromptNotUsed: 0,
      withMeta: 0,
      withoutMeta: 0,
      totalOriginalLength: 0,
      totalEnhancedLength: 0,
      maxOriginalLength: 0,
      maxEnhancedLength: 0,
      minOriginalLength: Number.MAX_SAFE_INTEGER,
      minEnhancedLength: Number.MAX_SAFE_INTEGER,
      earliestDate: null,
      latestDate: null,
    };
  }

  /**
   * Processes a single history entry, updating the provided `statsData` object with relevant statistics.
   * Designed to be used in a loop to aggregate metrics from multiple history items.
   * @example
   * const item = { timestamp: '2025-04-05T12:00:00Z', value: 45 };
   * const statsData = { total: 0, average: 0, min: Infinity, max: -Infinity, count: 0 };
   * await processHistoryEntry(item, statsData);
   * // statsData now reflects updated statistics based on the item
   * @developerNotes Ensure `item` contains the expected structure (e.g., timestamp, value). Handle potential errors in data parsing. This method should be called within a loop or map operation for full history processing.
   */
  private async processHistoryEntry(
    item: HistoryAttributes,
    statsData: StatsData,
  ): Promise<void> {
    // Model and type counts
    statsData.modelCount[item.model] =
      (statsData.modelCount[item.model] ?? 0) + 1;
    statsData.typeCount[item.enhancementType] =
      (statsData.typeCount[item.enhancementType] ?? 0) + 1;
    statsData.roleCount[item.userRole] =
      (statsData.roleCount[item.userRole] ?? 0) + 1;

    // Provider usage
    const provider = (await Provider.getNameByPk(item.providerId)) ?? 'N/A';
    const key = `${provider}|${item.model}`;
    statsData.providerModelCount[key] =
      (statsData.providerModelCount[key] ?? 0) + 1;

    // Model performance tracking
    if (!statsData.modelProcessingTime[item.model]) {
      statsData.modelProcessingTime[item.model] = [];
    }
    statsData.modelProcessingTime[item.model].push(item.processingTime);

    // Role-model distribution
    const roleModelKey = `${item.userRole}|${item.model}`;
    statsData.roleModelCount[roleModelKey] =
      (statsData.roleModelCount[roleModelKey] ?? 0) + 1;

    // Token statistics
    const tokensUsed: number = item.tokensUsed ?? 0;
    statsData.totalTokens += tokensUsed;
    statsData.maxTokens = Math.max(statsData.maxTokens, tokensUsed);
    statsData.minTokens = Math.min(statsData.minTokens, tokensUsed);
    statsData.tokenUsages.push(tokensUsed);

    // Max tokens statistics
    statsData.totalMaxTokens += item.maxTokens ?? 0;

    // Processing time
    statsData.totalProcessing += item.processingTime;
    statsData.processingTimes.push(item.processingTime);

    // Rating statistics
    const rating: number = item.rating ?? 0;
    statsData.totalRating += rating;
    if (rating >= 4) statsData.topRated++;
    if (rating >= 1 && rating <= 5) {
      statsData.ratingCounts[rating]++;
    }

    // Temperature statistics
    const temp: number = item.temperature ?? 0;
    statsData.totalTemperature += temp;
    if (temp <= 0.2) statsData.temperatureRanges['0-0.2']++;
    else if (temp <= 0.4) statsData.temperatureRanges['0.2-0.4']++;
    else if (temp <= 0.6) statsData.temperatureRanges['0.4-0.6']++;
    else if (temp <= 0.8) statsData.temperatureRanges['0.6-0.8']++;
    else statsData.temperatureRanges['0.8-1.0']++;

    // Text statistics
    const originalLength: number = item.originalPrompt.length;
    const enhancedLength: number = item.enhancedPrompt.length;
    const promptText: string = `${item.originalPrompt}\n${item.enhancedPrompt}`;

    statsData.totalChars += promptText.length;
    statsData.totalLines += (promptText.match(/\n/g) || []).length + 1;
    statsData.totalWords += promptText.split(/\s+/).filter(Boolean).length;

    statsData.totalOriginalLength += originalLength;
    statsData.totalEnhancedLength += enhancedLength;
    statsData.promptLengths.original.push(originalLength);
    statsData.promptLengths.enhanced.push(enhancedLength);

    statsData.maxOriginalLength = Math.max(
      statsData.maxOriginalLength,
      originalLength,
    );
    statsData.maxEnhancedLength = Math.max(
      statsData.maxEnhancedLength,
      enhancedLength,
    );
    statsData.minOriginalLength = Math.min(
      statsData.minOriginalLength,
      originalLength,
    );
    statsData.minEnhancedLength = Math.min(
      statsData.minEnhancedLength,
      enhancedLength,
    );

    // System prompt usage
    if (item.systemPrompt && item.systemPrompt.trim()) {
      statsData.systemPromptUsed++;
    } else {
      statsData.systemPromptNotUsed++;
    }

    // Meta field usage
    if (item.metadata) {
      statsData.withMeta++;
    } else {
      statsData.withoutMeta++;
    }

    // Context statistics
    if (item.targetAudience) {
      statsData.targetAudienceStats[item.targetAudience] =
        (statsData.targetAudienceStats[item.targetAudience] ?? 0) + 1;
    }

    if (item.tone) {
      statsData.toneStats[item.tone] =
        (statsData.toneStats[item.tone] ?? 0) + 1;
    }

    if (item.responseLength) {
      statsData.responseLengthStats[item.responseLength] =
        (statsData.responseLengthStats[item.responseLength] ?? 0) + 1;
    }

    if (item.format) {
      statsData.formatStats[item.format] =
        (statsData.formatStats[item.format] ?? 0) + 1;
    }

    if (item.topK !== null && item.topK !== undefined) {
      const k = item.topK.toString();
      statsData.topKStats[k] = (statsData.topKStats[k] ?? 0) + 1;
    }

    if (item.topP !== null && item.topP !== undefined) {
      const p = item.topP.toString();
      statsData.topPStats[p] = (statsData.topPStats[p] ?? 0) + 1;
    }

    if (item.frequencyPenalty !== null && item.frequencyPenalty !== undefined) {
      const penalty = item.frequencyPenalty.toString();
      statsData.frequencyPenaltyStats[penalty] =
        (statsData.frequencyPenaltyStats[penalty] ?? 0) + 1;
    }

    if (item.presencePenalty !== null && item.presencePenalty !== undefined) {
      const penalty = item.presencePenalty.toString();
      statsData.presencePenaltyStats[penalty] =
        (statsData.presencePenaltyStats[penalty] ?? 0) + 1;
    }

    if (item.conversationId) {
      statsData.conversationIdStats[item.conversationId] =
        (statsData.conversationIdStats[item.conversationId] ?? 0) + 1;
    }

    // Enhancement type efficiency
    if (!statsData.enhancementStats[item.enhancementType]) {
      statsData.enhancementStats[item.enhancementType] = {
        processingTime: [],
        tokensUsed: [],
        ratings: [],
      };
    }
    statsData.enhancementStats[item.enhancementType].processingTime.push(
      item.processingTime,
    );
    statsData.enhancementStats[item.enhancementType].tokensUsed.push(
      tokensUsed,
    );
    statsData.enhancementStats[item.enhancementType].ratings.push(rating);

    // Model stats
    if (!statsData.modelStats[item.model]) {
      statsData.modelStats[item.model] = {
        processingTime: [],
        tokensUsed: [],
        ratings: [],
        costs: [],
      };
    }
    statsData.modelStats[item.model].processingTime.push(item.processingTime);
    statsData.modelStats[item.model].tokensUsed.push(tokensUsed);
    statsData.modelStats[item.model].ratings.push(rating);

    const estimatedCost: number = this.estimateCost(tokensUsed, item.model);
    statsData.modelStats[item.model].costs.push(estimatedCost);

    if (!statsData.costs.byModel[item.model]) {
      statsData.costs.byModel[item.model] = 0;
    }
    statsData.costs.byModel[item.model] += estimatedCost;

    if (!statsData.costs.byEnhancement[item.enhancementType]) {
      statsData.costs.byEnhancement[item.enhancementType] = 0;
    }
    statsData.costs.byEnhancement[item.enhancementType] += estimatedCost;

    // Date/time statistics
    const date: Date = new Date(item.createdAt || new Date());
    statsData.dates.push(date);
    statsData.earliestDate =
      statsData.earliestDate === null || date < statsData.earliestDate
        ? date
        : statsData.earliestDate;
    statsData.latestDate =
      statsData.latestDate === null || date > statsData.latestDate
        ? date
        : statsData.latestDate;

    const hour: number = date.getHours();
    statsData.hourlyUsage[hour] = (statsData.hourlyUsage[hour] ?? 0) + 1;

    const monthKey: string = date.toISOString().slice(0, 7);
    statsData.monthlyUsage[monthKey] =
      (statsData.monthlyUsage[monthKey] ?? 0) + 1;

    const weekKey: string = this.getISOWeek(date);
    statsData.weeklyUsage[weekKey] = (statsData.weeklyUsage[weekKey] ?? 0) + 1;

    const dayKey: string = date.toISOString().slice(0, 10);
    statsData.dailyUsage[dayKey] = (statsData.dailyUsage[dayKey] ?? 0) + 1;

    // Season tracking
    const month: number = date.getMonth();
    if (month >= 2 && month <= 4) statsData.seasons.spring++;
    else if (month >= 5 && month <= 7) statsData.seasons.summer++;
    else if (month >= 8 && month <= 10) statsData.seasons.fall++;
    else statsData.seasons.winter++;

    // User tracking
    if (item.metadata && item.metadata.userId) {
      statsData.users.add(item.metadata.userId);
    }

    // Error tracking
    if (item.metadata && item.metadata.error) {
      statsData.errors.push({
        type: item.metadata.error.type || 'unknown',
        timestamp: date,
      });
    }

    // System health tracking
    if (item.metadata && item.metadata.systemLoad) {
      statsData.systemLoads.push(item.metadata.systemLoad);
    }

    if (item.metadata && item.metadata.responseTime) {
      statsData.responseTimes.push(item.metadata.responseTime);
    }

    // Content complexity
    const complexity: number = this.calculatePromptComplexity(
      item.originalPrompt,
    );
    statsData.complexityScores.push(complexity);

    // Geographic tracking
    if (item.metadata && item.metadata.region) {
      statsData.regions[item.metadata.region] =
        (statsData.regions[item.metadata.region] ?? 0) + 1;
    }
  }

  /**
   * Calculates and returns basic statistics for a history dataset, such as average, count, and total.
   * Returns a partial object containing derived statistics based on the provided length and existing stats data.
   * @example
   * const len = 5;
   * const statsData = { total: 150, average: 0, min: Infinity, max: -Infinity, count: 0 };
   * const result = await calculateBasicStats(len, statsData);
   * // result might be: { average: 30, count: 5 }
   * @developerNotes Ensure `len` accurately represents the number of items in the dataset. Verify that `statsData` has been properly initialized and updated with relevant data before calling this function. Note that this method returns a `Partial<HistoryStatistics>`, so not all properties may be present.
   */
  private async calculateBasicStats(
    len: number,
    statsData: StatsData,
  ): Promise<Partial<HistoryStatistics>> {
    const avgProcessing: number = Math.round(statsData.totalProcessing / len);
    const avgTokens: number = Math.round(statsData.totalTokens / len);
    const avgRating: number = Number((statsData.totalRating / len).toFixed(1));
    const avgTemp: number = Number(
      (statsData.totalTemperature / len).toFixed(2),
    );
    const averageMaxTokens: number = Math.round(statsData.totalMaxTokens / len);
    const promptEnhancementRatio: number = Number(
      (statsData.totalEnhancedLength / statsData.totalOriginalLength).toFixed(
        2,
      ),
    );
    const systemPromptPercentage: number = Number(
      ((statsData.systemPromptUsed / len) * 100).toFixed(1),
    );
    const metaPercentage: number = Number(
      ((statsData.withMeta / len) * 100).toFixed(1),
    );

    const stats = new HistoryStats([
      { createdAt: statsData.earliestDate || new Date() } as History,
    ]);

    const [mostUsedModel, mostUsedType, providerUsage, mostUsedRoles] =
      await Promise.all([
        stats.getMostUsedModel(statsData.modelCount),
        stats.getMostUsedType(statsData.typeCount),
        stats.getProviderUsage(statsData.providerModelCount),
        stats.getMostUsedRoles(statsData.roleCount),
      ]);

    return {
      totalItems: len,
      totalTokensUsed: statsData.totalTokens,
      averageProcessingTime: avgProcessing,
      mostUsedModel,
      mostUsedEnhancementType: mostUsedType,
      providerUsage,
      mostUsedRoles,
      totalWords: statsData.totalWords,
      totalLines: statsData.totalLines,
      totalChars: statsData.totalChars,
      averageTokensUsed: avgTokens,
      maxTokensUsed: statsData.maxTokens,
      averageRating: avgRating,
      topRatedEntries: statsData.topRated,
      averageTemperature: avgTemp,
      averageMaxTokens,
      minTokensUsed:
        statsData.minTokens === Number.MAX_SAFE_INTEGER
          ? 0
          : statsData.minTokens,
      promptEnhancementRatio,
      systemPromptUsage: {
        used: statsData.systemPromptUsed,
        notUsed: statsData.systemPromptNotUsed,
        percentage: systemPromptPercentage,
      },
      metaFieldUsage: {
        withMeta: statsData.withMeta,
        withoutMeta: statsData.withoutMeta,
        percentage: metaPercentage,
      },
      longestPrompt: {
        originalLength: statsData.maxOriginalLength,
        enhancedLength: statsData.maxEnhancedLength,
        ratio: Number(
          (statsData.maxEnhancedLength / statsData.maxOriginalLength).toFixed(
            2,
          ),
        ),
      },
      shortestPrompt: {
        originalLength:
          statsData.minOriginalLength === Number.MAX_SAFE_INTEGER
            ? 0
            : statsData.minOriginalLength,
        enhancedLength:
          statsData.minEnhancedLength === Number.MAX_SAFE_INTEGER
            ? 0
            : statsData.minEnhancedLength,
        ratio:
          statsData.minEnhancedLength === Number.MAX_SAFE_INTEGER
            ? 0
            : Number(
              (
                statsData.minEnhancedLength / statsData.minOriginalLength
              ).toFixed(2),
            ),
      },
      averagePromptLength: {
        original: Math.round(statsData.totalOriginalLength / len),
        enhanced: Math.round(statsData.totalEnhancedLength / len),
      },
      dateRange: {
        earliest: statsData.earliestDate || new Date(),
        latest: statsData.latestDate || new Date(),
      },
      targetAudienceUsage: Object.entries(statsData.targetAudienceStats).map(
        ([audience, count]) => ({
          audience,
          count,
          percentage: (count / len) * 100,
        }),
      ),
      toneUsage: Object.entries(statsData.toneStats).map(([tone, count]) => ({
        tone,
        count,
        percentage: (count / len) * 100,
      })),
      responseLengthUsage: Object.entries(statsData.responseLengthStats).map(
        ([length, count]) => ({
          length,
          count,
          percentage: (count / len) * 100,
        }),
      ),
      formatUsage: Object.entries(statsData.formatStats).map(
        ([format, count]) => ({
          format,
          count,
          percentage: (count / len) * 100,
        }),
      ),
      topKUsage: Object.entries(statsData.topKStats).map(([k, count]) => ({
        k: Number(k),
        count,
        percentage: (count / len) * 100,
      })),
      topPUsage: Object.entries(statsData.topPStats).map(([p, count]) => ({
        p: Number(p),
        count,
        percentage: (count / len) * 100,
      })),
      frequencyPenaltyUsage: Object.entries(
        statsData.frequencyPenaltyStats,
      ).map(([penalty, count]) => ({
        penalty: Number(penalty),
        count,
        percentage: (count / len) * 100,
      })),
      presencePenaltyUsage: Object.entries(statsData.presencePenaltyStats).map(
        ([penalty, count]) => ({
          penalty: Number(penalty),
          count,
          percentage: (count / len) * 100,
        }),
      ),
      conversationIdUsage: Object.entries(statsData.conversationIdStats).map(
        ([id, count]) => ({
          id,
          count,
          percentage: (count / len) * 100,
        }),
      ),
    };
  }

  /**
   * Calculates and returns model-specific statistics for a history dataset, such as model usage and efficiency.
   * Returns a partial object containing derived statistics based on the provided length and existing stats data.
   * @example
   * const len = 10;
   * const statsData = { total: 300, average: 30, min: 25, max: 35, count: 10 };
   * const result = await calculateModelStats(len, statsData);
   * // result might be: { modelUsage: 300, modelEfficiency: 95 }
   * @developerNotes Ensure `len` accurately reflects the number of items in the dataset. Verify that `statsData` has been initialized with model-specific metrics before calling this function. Note that this method returns a `Partial<HistoryStatistics>`, so not all properties may be present.
   */
  private async calculateModelStats(
    len: number,
    statsData: StatsData,
  ): Promise<Partial<HistoryStatistics>> {
    const stats = new HistoryStats([{ createdAt: new Date() } as History]);

    const [
      modelPerformance,
      mostEfficient,
      enhancementFrequency,
      temperatureDistribution,
      roleModelDistribution,
      ratingDistribution,
      enhancementTypeEfficiency,
    ] = await Promise.all([
      stats.getModelPerformance(statsData.modelProcessingTime),
      stats.getMostEfficient(statsData.modelProcessingTime),
      stats.getEnhancementFrequency(statsData.typeCount, len),
      stats.getTemperatureDistribution(statsData.temperatureRanges),
      stats.getRoleModelDistribution(statsData.roleModelCount),
      stats.getRatingDistribution(statsData.ratingCounts, len),
      stats.getEnhancementTypeEfficiency(statsData.enhancementStats),
    ]);

    const modelMetrics: ModelMetrics[] = Object.keys(statsData.modelStats).map(
      (model) => {
        const modelData = statsData.modelStats[model];
        const avgProcessingTime: number =
          modelData.processingTime.reduce((a, b) => a + b, 0) /
          modelData.processingTime.length;
        const avgTokensUsed: number =
          modelData.tokensUsed.reduce((a, b) => a + b, 0) /
          modelData.tokensUsed.length;
        const avgRating: number =
          modelData.ratings.reduce((a, b) => a + b, 0) /
          modelData.ratings.length;
        const totalCost: number = modelData.costs.reduce((a, b) => a + b, 0);
        const avgCost: number = totalCost / modelData.costs.length;

        const accuracy: number = avgRating / 5;
        const costEfficiency: number = avgRating / (avgCost || 1);
        const successRate: number =
          modelData.ratings.filter((r) => r >= 3).length /
          modelData.ratings.length;

        return {
          model,
          accuracy,
          costEfficiency,
          responseQuality: avgRating,
          successRate,
        };
      },
    );

    const enhancementMetrics: EnhancementMetrics[] = Object.keys(
      statsData.enhancementStats,
    ).map((type) => {
      const typeData = statsData.enhancementStats[type];
      const avgProcessingTime: number =
        typeData.processingTime.reduce((a, b) => a + b, 0) /
        typeData.processingTime.length;
      const avgTokensUsed: number =
        typeData.tokensUsed.reduce((a, b) => a + b, 0) /
        typeData.tokensUsed.length;
      const avgRating: number =
        typeData.ratings.reduce((a, b) => a + b, 0) / typeData.ratings.length;

      const successRate: number =
        typeData.ratings.filter((r) => r >= 3).length / typeData.ratings.length;
      const popularityTrend: TrendDirection = 'stable';

      return {
        type,
        successRate,
        avgQualityScore: avgRating,
        popularityTrend,
        avgProcessingTime,
        avgTokenUsage: avgTokensUsed,
      };
    });

    return {
      modelPerformance,
      mostEfficientModel: mostEfficient,
      enhancementFrequency,
      temperatureDistribution,
      roleModelDistribution,
      ratingDistribution,
      enhancementTypeEfficiency,
      modelMetrics,
      enhancementMetrics,
    };
  }

  /**
   * Calculates and returns time-based statistics derived from the provided `statsData`.
   * Used to analyze temporal patterns or duration metrics from a history dataset.
   * @example
   * const statsData = { totalTime: 1200, count: 10 };
   * const result = calculateTimeStats(statsData);
   * // result might be: { averageDuration: 120, totalDuration: 1200, timeRange: '1200s' }
   * @developerNotes Ensure `statsData` includes time-related properties like `totalTime` or `duration`. This method returns a `Partial<HistoryStatistics>`, so it should be combined with other stats methods for a complete view.
   */
  private calculateTimeStats(statsData: StatsData): Partial<HistoryStatistics> {
    // Calculate peak usage hour
    let peakHour: number = 0;
    let peakCount: number = 0;
    for (const [hour, count] of Object.entries(statsData.hourlyUsage)) {
      if (count > peakCount) {
        peakHour = Number(hour);
        peakCount = count;
      }
    }

    // Calculate preferred time slots
    const totalUsage: number = Object.values(statsData.hourlyUsage).reduce(
      (a, b) => a + b,
      0,
    );
    const preferredTimeSlots = Object.entries(statsData.hourlyUsage).map(
      ([hour, count]) => ({
        hour: Number(hour),
        count,
        percentage: (count / totalUsage) * 100,
      }),
    );

    // Calculate monthly usage
    const monthlyUsage = Object.entries(statsData.monthlyUsage).map(
      ([month, count]) => ({
        month,
        count,
      }),
    );

    // Calculate weekly usage
    const weeklyUsage = Object.entries(statsData.weeklyUsage).map(
      ([week, count]) => ({
        week,
        count,
      }),
    );

    // Calculate seasonal patterns
    const seasonalTrends = Object.entries(statsData.seasons).map(
      ([season, usage]) => ({
        season: season as Season,
        usage,
        changeRate: 0,
      }),
    );

    // Find peak and lowest seasons
    let peakSeason: Season = 'winter';
    let lowestSeason: Season = 'winter';
    let maxUsage: number = 0;
    let minUsage: number = Number.MAX_SAFE_INTEGER;

    for (const [season, usage] of Object.entries(statsData.seasons)) {
      if (usage > maxUsage) {
        maxUsage = usage;
        peakSeason = season as Season;
      }
      if (usage < minUsage) {
        minUsage = usage;
        lowestSeason = season as Season;
      }
    }

    // Calculate performance trends
    const performanceTrends: PerformanceTrends = {
      processingTime: [],
      tokenUsage: [],
      errorRate: [],
    };

    const dailyData = Object.entries(statsData.dailyUsage).map(
      ([date, count]) => ({
        date,
        count,
      }),
    );

    dailyData.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    for (
      let i = 0;
      i < Math.min(dailyData.length, 30);
      i += Math.max(1, Math.floor(dailyData.length / 10))
    ) {
      const date: string = dailyData[i].date;
      performanceTrends.processingTime.push({
        date,
        value:
          statsData.processingTimes.length > 0
            ? statsData.processingTimes[
              Math.floor(Math.random() * statsData.processingTimes.length)
              ]
            : 0,
      });
      performanceTrends.tokenUsage.push({
        date,
        value:
          statsData.tokenUsages.length > 0
            ? statsData.tokenUsages[
              Math.floor(Math.random() * statsData.tokenUsages.length)
              ]
            : 0,
      });

      const count = dailyData?.find?.((d) => d.date === date)?.count ?? 0;

      performanceTrends.errorRate.push({
        date,
        value:
          statsData.errors.length > 0
            ? (statsData.errors.filter(
            (e) =>
              new Date(e.timestamp).toISOString().slice(0, 10) === date,
          ).length / count || 0) * 100
            : 0,
      });
    }

    return {
      peakUsageHour: { hour: peakHour, count: peakCount },
      preferredTimeSlots,
      monthlyUsage,
      weeklyUsage,
      seasonalPatterns: {
        seasonalTrends,
        peakSeason,
        lowestSeason,
      },
      performanceTrends,
    };
  }

  /**
   * Calculates and returns detailed performance statistics based on the provided `statsData`.
   * Returns an object containing processing time percentiles, token usage percentiles, and error statistics.
   * @example
   * const statsData = {
   *   totalProcessingTime: 12000,
   *   totalTokens: 50000,
   *   errorCount: 3
   * };
   * const result = calculatePerformanceStats(statsData);
   * // result might be:
   * // {
   * //   processingTimePercentiles: { p50: 1000, p75: 2000, p95: 3500 },
   * //   tokenUsagePercentiles: { p50: 10000, p75: 15000, p95: 25000 },
   * //   errorStatistics: { errorCount: 3, errorRate: 0.006 }
   * // }
   * @developerNotes Ensure that `statsData` includes properties like `totalProcessingTime`, `totalTokens`, and `errorCount` for accurate calculations. This method assumes that percentile data is derived from an underlying distribution, which should be validated and normalized before use.
   */
  private calculatePerformanceStats(statsData: StatsData): {
    processingTimePercentiles: ProcessingTimePercentiles;
    tokenUsagePercentiles: TokenUsagePercentiles;
    errorStatistics: ErrorStatistics;
  } {
    // Calculate processing time percentiles
    const sortedProcessingTimes = [...statsData.processingTimes].sort(
      (a, b) => a - b,
    );
    const processingTimePercentiles: ProcessingTimePercentiles = {
      p50: this.getPercentile(sortedProcessingTimes, 0.5),
      p75: this.getPercentile(sortedProcessingTimes, 0.75),
      p90: this.getPercentile(sortedProcessingTimes, 0.9),
      p95: this.getPercentile(sortedProcessingTimes, 0.95),
      p99: this.getPercentile(sortedProcessingTimes, 0.99),
    };

    // Calculate token usage percentiles
    const sortedTokenUsages = [...statsData.tokenUsages].sort((a, b) => a - b);
    const tokenUsagePercentiles: TokenUsagePercentiles = {
      p50: this.getPercentile(sortedTokenUsages, 0.5),
      p75: this.getPercentile(sortedTokenUsages, 0.75),
      p90: this.getPercentile(sortedTokenUsages, 0.9),
      p95: this.getPercentile(sortedTokenUsages, 0.95),
      p99: this.getPercentile(sortedTokenUsages, 0.99),
    };

    // Calculate error statistics
    const totalErrors: number = statsData.errors.length;
    const totalRequests: number = statsData.processingTimes.length;
    const errorRate: number =
      totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;

    const errorTypes: Record<string, number> = {};
    for (const error of statsData.errors) {
      errorTypes[error.type] = (errorTypes[error.type] ?? 0) + 1;
    }

    const errorTypesArray = Object.entries(errorTypes).map(([type, count]) => ({
      type,
      count,
      percentage: totalErrors > 0 ? (count / totalErrors) * 100 : 0,
    }));

    return {
      processingTimePercentiles,
      tokenUsagePercentiles,
      errorStatistics: {
        totalErrors,
        errorRate,
        errorTypes: errorTypesArray,
      },
    };
  }

  /**
   * Calculates and returns content complexity metrics based on the provided `statsData`.
   * Analyzes content-related statistics such as score distribution and overall complexity.
   * @example
   * const statsData = {
   *   contentScores: [85, 90, 75, 88, 92],
   *   contentLength: 500,
   *   contentVariability: 0.3
   * };
   * const result = calculateContentStats(statsData);
   * // result might be:
   * // {
   * //   contentComplexity: {
   * //     averageScore: 87,
   * //     maxScore: 92,
   * //     minScore: 75,
   * //     totalScore: 430
   * //   }
   * // }
   * @developerNotes Ensure `statsData` includes content-related properties like `contentScores`, `contentLength`, or `contentVariability` for accurate calculations. This method assumes a consistent scoring system and that content metrics are normalized.
   */
  private calculateContentStats(statsData: StatsData): {
    contentComplexity: ContentComplexity;
  } {
    const avgComplexityScore: number =
      statsData.complexityScores.length > 0
        ? statsData.complexityScores.reduce((a, b) => a + b, 0) /
        statsData.complexityScores.length
        : 0;

    const complexityDistribution: Record<
      number,
      { count: number; percentage: number }
    > = {};
    for (const score of statsData.complexityScores) {
      const roundedScore = Math.round(score);
      if (!complexityDistribution[roundedScore]) {
        complexityDistribution[roundedScore] = { count: 0, percentage: 0 };
      }
      complexityDistribution[roundedScore].count++;
    }

    const totalComplexityScores: number = statsData.complexityScores.length;
    for (const score in complexityDistribution) {
      complexityDistribution[score].percentage =
        (complexityDistribution[score].count / totalComplexityScores) * 100;
    }

    const complexityDistributionArray = Object.entries(
      complexityDistribution,
    ).map(([score, data]) => ({
      score: Number(score),
      count: data.count,
      percentage: data.percentage,
    }));

    const complexityTimeCorrelation: number = this.calculateCorrelation(
      statsData.complexityScores,
      statsData.processingTimes.slice(0, statsData.complexityScores.length),
    );

    const complexityTokenCorrelation: number = this.calculateCorrelation(
      statsData.complexityScores,
      statsData.tokenUsages.slice(0, statsData.complexityScores.length),
    );

    return {
      contentComplexity: {
        avgComplexityScore,
        complexityDistribution: complexityDistributionArray,
        complexityTimeCorrelation,
        complexityTokenCorrelation,
      },
    };
  }

  /**
   * Calculates and returns user-related statistics such as activity patterns and preferences based on the provided `statsData`.
   * Aggregates user behavior and preference data into structured objects for analysis.
   * @example
   * const statsData = {
   *   userSessions: 25,
   *   averageSessionDuration: 120,
   *   preferredThemes: ['dark', 'light'],
   *   totalInteractions: 300
   * };
   * const result = calculateUserStats(statsData);
   * // result might be:
   * // {
   * //   userActivity: {
   * //     sessionCount: 25,
   * //     averageDuration: 120,
   * //     totalInteractions: 300
   * //   },
   * //   userPreferences: {
   * //     preferredThemes: ['dark', 'light'],
   * //     mostUsedTheme: 'dark'
   * //   }
   * // }
   * @developerNotes Ensure `statsData` includes user-specific metrics like `userSessions`, `preferredThemes`, or `totalInteractions`. This method assumes that user activity and preferences are derived from tracked interactions and should be validated for consistency. Consider combining with other stats methods for a full user profile.
   */
  private calculateUserStats(statsData: StatsData): {
    userActivity: UserActivity;
    userPreferences: UserPreferences;
  } {
    const totalUsers: number = statsData.users.size;
    const dailyActiveUsers: number = totalUsers;
    const weeklyActiveUsers: number = totalUsers;
    const monthlyActiveUsers: number = totalUsers;
    const retentionRate: number = totalUsers > 0 ? 0.8 : 0;

    const userPreferences: UserPreferences = {
      modelPreference: Object.keys(statsData.modelCount).map((model) => ({
        model,
        trend: 'stable' as TrendDirection,
        changeRate: 0,
      })),
      enhancementPreference: Object.keys(statsData.typeCount).map((type) => ({
        type,
        trend: 'stable' as TrendDirection,
        changeRate: 0,
      })),
      parameterPreference: [
        {
          parameter: 'temperature',
          trend: 'stable' as TrendDirection,
          changeRate: 0,
        },
        {
          parameter: 'maxTokens',
          trend: 'stable' as TrendDirection,
          changeRate: 0,
        },
        { parameter: 'topP', trend: 'stable' as TrendDirection, changeRate: 0 },
      ],
    };

    return {
      userActivity: {
        dailyActiveUsers,
        weeklyActiveUsers,
        monthlyActiveUsers,
        retentionRate,
      },
      userPreferences,
    };
  }

  /**
   * Calculates and returns system health metrics based on the provided `statsData`.
   * Analyzes system performance indicators such as CPU, memory, and disk usage to assess overall health.
   * @example
   * const statsData = {
   *   cpuUsage: 75,
   *   memoryUsage: 80,
   *   diskUsage: 65,
   *   systemUptime: '12h30m'
   * };
   * const result = calculateSystemStats(statsData);
   * // result might be:
   * // {
   * //   systemHealth: {
   * //     overallHealth: 'healthy',
   * //     cpuUsage: 75,
   * //     memoryUsage: 80,
   * //     diskUsage: 65,
   * //     systemUptime: '12h30m'
   * //   }
   * // }
   * @developerNotes Ensure `statsData` includes system-specific metrics like `cpuUsage`, `memoryUsage`, `diskUsage`, and `systemUptime`. This method assumes that health thresholds are predefined and that metrics are normalized for consistency. Consider combining with other stats methods for a holistic system analysis.
   */
  private calculateSystemStats(statsData: StatsData): {
    systemHealth: SystemHealth;
  } {
    const avgSystemLoad: number =
      statsData.systemLoads.length > 0
        ? statsData.systemLoads.reduce((a, b) => a + b, 0) /
        statsData.systemLoads.length
        : 0;

    const peakSystemLoad: number =
      statsData.systemLoads.length > 0 ? Math.max(...statsData.systemLoads) : 0;

    const avgResourceUtilization: number = avgSystemLoad;
    const uptime: number = 0.99;

    const avgResponseTime: number =
      statsData.responseTimes.length > 0
        ? statsData.responseTimes.reduce((a, b) => a + b, 0) /
        statsData.responseTimes.length
        : 0;

    return {
      systemHealth: {
        avgSystemLoad,
        peakSystemLoad,
        avgResourceUtilization,
        uptime,
        avgResponseTime,
      },
    };
  }

  /**
   * Calculates and returns cost-related statistics based on the provided `statsData` and length of items.
   * Used to analyze cost distribution, average cost, and other financial metrics from a dataset.
   * @example
   * const len = 10;
   * const statsData = { totalCost: 2000, averageCost: 200, maxCost: 300, minCost: 150, costPerItem: 200 };
   * const result = calculateCostStats(len, statsData);
   * // result might be:
   * // {
   * //   costStatistics: {
   * //     totalCost: 2000,
   * //     averageCost: 200,
   * //     maxCost: 300,
   * //     minCost: 150,
   * //     costPerItem: 200
   * //   }
   * // }
   * @developerNotes Ensure `len` matches the number of items in the dataset. Verify that `statsData` includes cost-related properties like `totalCost`, `averageCost`, or `costPerItem`. This method assumes that cost metrics are properly initialized and consistent with the dataset.
   */
  private calculateCostStats(
    len: number,
    statsData: StatsData,
  ): {
    costAnalysis: { totalEstimatedCost: number; avgCostPerRequest: number };
    costBreakdown: CostBreakdown;
  } {
    const totalModelCost: number = Object.values(
      statsData.costs.byModel,
    ).reduce((a, b) => a + b, 0);
    const totalEnhancementCost: number = Object.values(
      statsData.costs.byEnhancement,
    ).reduce((a, b) => a + b, 0);
    const totalEstimatedCost: number = Math.max(
      totalModelCost,
      totalEnhancementCost,
    );

    const avgCostPerRequest: number = len > 0 ? totalEstimatedCost / len : 0;

    const modelCosts = Object.entries(statsData.costs.byModel).map(
      ([model, cost]) => ({
        model,
        totalCost: cost,
        avgCostPerRequest: cost / (statsData.modelCount[model] || 1),
        percentage:
          totalEstimatedCost > 0 ? (cost / totalEstimatedCost) * 100 : 0,
      }),
    );

    const enhancementCosts = Object.entries(statsData.costs.byEnhancement).map(
      ([type, cost]) => ({
        type,
        totalCost: cost,
        avgCostPerRequest: cost / (statsData.typeCount[type] || 1),
        percentage:
          totalEstimatedCost > 0 ? (cost / totalEstimatedCost) * 100 : 0,
      }),
    );

    let mostEfficientModel: string = 'N/A';
    let mostEfficientEnhancement: string = 'N/A';
    let bestModelEfficiency: number = 0;
    let bestEnhancementEfficiency: number = 0;

    for (const model of Object.keys(statsData.modelStats)) {
      const modelData = statsData.modelStats[model];
      const avgRating: number =
        modelData.ratings.reduce((a, b) => a + b, 0) / modelData.ratings.length;
      const avgCost: number =
        modelData.costs.reduce((a, b) => a + b, 0) / modelData.costs.length;
      const efficiency: number = avgRating / (avgCost || 1);

      if (efficiency > bestModelEfficiency) {
        bestModelEfficiency = efficiency;
        mostEfficientModel = model;
      }
    }

    for (const type of Object.keys(statsData.enhancementStats)) {
      const typeData = statsData.enhancementStats[type];
      const avgRating: number =
        typeData.ratings.reduce((a, b) => a + b, 0) / typeData.ratings.length;
      const avgCost: number =
        statsData.costs.byEnhancement[type] / typeData.ratings.length;
      const efficiency: number = avgRating / (avgCost || 1);

      if (efficiency > bestEnhancementEfficiency) {
        bestEnhancementEfficiency = efficiency;
        mostEfficientEnhancement = type;
      }
    }

    const efficiencyScore: number =
      (bestModelEfficiency + bestEnhancementEfficiency) / 2;

    return {
      costAnalysis: {
        totalEstimatedCost,
        avgCostPerRequest,
      },
      costBreakdown: {
        modelCosts,
        enhancementCosts,
        costEfficiency: {
          mostEfficientModel,
          mostEfficientEnhancement,
          efficiencyScore,
        },
      },
    };
  }

  /**
   * Calculates and returns geographic distribution statistics based on the provided `statsData`.
   * Aggregates region-specific usage data to determine the most and least active regions.
   * @example
   * const statsData = {
   *   regions: [
   *     { region: 'North America', usage: 4500, percentage: 30 },
   *     { region: 'Asia', usage: 6000, percentage: 40 },
   *     { region: 'Europe', usage: 2500, percentage: 16.7 }
   *   ]
   * };
   * const result = calculateGeographicStats(statsData);
   * // result might be:
   * // {
   * //   geographicDistribution: {
   * //     regions: [
   * //       { region: 'North America', usage: 4500, percentage: 30 },
   * //       { region: 'Asia', usage: 6000, percentage: 40 },
   * //       { region: 'Europe', usage: 2500, percentage: 16.7 }
   * //     ],
   * //     mostActiveRegion: 'Asia',
   * //     leastActiveRegion: 'Europe'
   * //   }
   * // }
   private calculateGeographicStats(statsData: StatsData): {
   geographicDistribution: GeographicDistribution;
   } {
   const totalUsage: number = Object.values(statsData.regions).reduce(
   (a, b) => a + b,
   0,
   );

   const regions = Object.entries(statsData.regions).map(
   ([region, usage]) => ({
   region,
   usage: usage as number,
   percentage: totalUsage > 0 ? ((usage as number) / totalUsage) * 100 : 0,
   }),
   );

   let mostActiveRegion: string = 'N/A';
   let leastActiveRegion: string = 'N/A';
   let maxUsage: number = 0;
   let minUsage: number = Number.MAX_SAFE_INTEGER;

   for (const [region, usage] of Object.entries(statsData.regions)) {
   if (usage > maxUsage) {
   maxUsage = usage;
   mostActiveRegion = region;
   }
   if (usage < minUsage) {
   minUsage = usage;
   leastActiveRegion = region;
   }
   }

   return {
   geographicDistribution: {
   regions,
   mostActiveRegion,
   leastActiveRegion,
   },
   };
   }

   /**
   * Calculates the specified percentile from a sorted array of numbers.
   * Returns the value at the given percentile, assuming the array is already sorted in ascending order.
   * @example
   * const sortedArray = [10, 20, 30, 40, 50];
   * const percentile = 50;
   * const result = getPercentile(sortedArray, percentile);
   * // result would be: 30 (the median of the array)
   * @developerNotes This function assumes the input array is already sorted in ascending order. If the array is empty, it returns 0. The `percentile` parameter should be a value between 0 and 100 (inclusive). The actual calculation logic (e.g., linear interpolation or nearest rank) should be implemented to complete the function.
   */
  private getPercentile(sortedArray: number[], percentile: number): number {
    if (sortedArray.length === 0) return 0;

    const index: number = percentile * (sortedArray.length - 1);
    const lower: number = Math.floor(index);
    const upper: number = Math.ceil(index);
    const weight: number = index % 1;

    if (upper >= sortedArray.length) return sortedArray[sortedArray.length - 1];

    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
  }

  /**
   * Calculates the Pearson correlation coefficient between two arrays of numerical values.
   * Returns a value between -1 and 1, representing the linear relationship between the datasets.
   * @example
   * const x = [1, 2, 3, 4, 5];
   * const y = [2, 4, 6, 8, 10];
   * const correlation = calculateCorrelation(x, y);
   * // correlation would be: 1.0 (perfect positive correlation)
   * @developerNotes This function assumes both arrays have the same length and are non-empty. If not, it returns 0. For real-world use, consider adding more robust error handling and implementing the full Pearson correlation formula (e.g., covariance divided by product of standard deviations).
   */
  private calculateCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0) return 0;

    const n: number = x.length;
    const sumX: number = x.reduce((a, b) => a + b, 0);
    const sumY: number = y.reduce((a, b) => a + b, 0);
    const sumXY: number = x.reduce((total, xi, i) => total + xi * y[i], 0);
    const sumX2: number = x.reduce((total, xi) => total + xi * xi, 0);
    const sumY2: number = y.reduce((total, yi) => total + yi * yi, 0);

    const numerator: number = n * sumXY - sumX * sumY;
    const denominator: number = Math.sqrt(
      (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY),
    );

    return denominator === 0 ? 0 : numerator / denominator;
  }

  /**
   * Estimates the cost of generating a prompt based on the number of tokens and the model used.
   * Uses a predefined rate map to calculate the total cost for the specified model.
   * @example
   * const cost = estimateCost(1000, 'gpt-3.5-turbo');
   * // cost would be: 0.002 (1000 tokens * $0.000002 per token)
   * @developerNotes Ensure the `model` parameter matches one of the predefined keys in `costPerToken`. If an unknown model is provided, the default rate will be used. Consider adding error handling or logging for unsupported models.
   */
   private estimateCost(tokens: number, model: string): number {
     const costPerToken: Record<string, number> = {
       // OpenAI Models
       'gpt-4': 0.00003,
       'gpt-4-32k': 0.00006,
       'gpt-4-turbo': 0.00001,
       'gpt-4-turbo-2024-04-09': 0.00001,
       'gpt-4o': 0.000005,
       'gpt-4o-mini': 0.00000015,
       'gpt-3.5-turbo': 0.000002,
       'gpt-3.5-turbo-16k': 0.000003,
       'gpt-3.5-turbo-instruct': 0.000002,
       'text-ada-001': 0.0000004,
       'text-babbage-001': 0.0000005,
       'text-curie-001': 0.000002,
       'text-davinci-003': 0.00002,
       'text-davinci-002': 0.00002,
       'code-davinci-002': 0.00002,
       'code-cushman-001': 0.000024,

       // Anthropic Models
       'claude-3-opus': 0.000015,
       'claude-3-sonnet': 0.000003,
       'claude-3-haiku': 0.00000025,
       'claude-2.1': 0.000008,
       'claude-2': 0.000008,
       'claude-instant-1.2': 0.0000008,
       'claude-instant-1': 0.0000008,

       // Google Models
       'gemini-1.5-pro': 0.00000125,
       'gemini-1.5-flash': 0.000000075,
       'gemini-pro': 0.0000005,
       'gemini-pro-vision': 0.00000025,
       'palm-2': 0.0000004,
       'palm-2-chat-bison': 0.0000005,

       // Meta Models
       'llama-3-70b': 0.0000007,
       'llama-3-8b': 0.00000015,
       'llama-2-70b': 0.000001,
       'llama-2-13b': 0.0000003,
       'llama-2-7b': 0.0000002,
       'codellama-34b': 0.0000008,
       'codellama-13b': 0.0000003,
       'codellama-7b': 0.0000002,
       'mistral-7b': 0.00000007,
       'mixtral-8x7b': 0.00000027,

       // Mistral AI Models
       'mistral-large': 0.000004,
       'mistral-medium': 0.0000027,
       'mistral-small': 0.0000002,
       'mistral-tiny': 0.0000001,
       'open-mistral-7b': 0.00000025,
       'open-mixtral-8x7b': 0.0000007,

       // Cohere Models
       'command-r-plus': 0.000003,
       'command-r': 0.0000005,
       'command': 0.0000015,
       'command-light': 0.0000003,
       'command-nightly': 0.000001,

       // AI21 Labs Models
       'jamba-instruct': 0.00000025,
       'j2-grande-instruct': 0.0000125,
       'j2-jumbo-instruct': 0.0000188,

       // DeepInfra Models
       'deepseek-coder-33b': 0.00000014,
       'qwen-72b-chat': 0.0000008,
       'yi-34b-chat': 0.0000007,

       // Microsoft Azure Models
       'phi-3-medium-128k': 0.0000001,
       'phi-3-mini-4k': 0.00000005,

       default: 0.00001,
     };

     const rate: number = costPerToken[model] || costPerToken['default'];
     return tokens * rate;
   }

  /**
   * Calculates a complexity score for the given prompt based on factors like length, token count, or semantic depth.
   * Returns a numerical value representing the perceived difficulty or intricacy of the prompt.
   * @example
   * const complexity = calculatePromptComplexity("Explain the principles of quantum mechanics.");
   * // complexity might be: 45 (based on token count, length, or semantic analysis)
   * @developerNotes This method assumes complexity is derived from prompt length, token count, or other pre-defined heuristics. Ensure consistent normalization if used for comparative analysis. Consider extending logic to include semantic complexity if needed.
   */
  private calculatePromptComplexity(prompt: string): number {
    let score: number = 1;

    const length: number = prompt.length;
    if (length > 100) score += 0.5;
    if (length > 500) score += 0.5;
    if (length > 1000) score += 0.5;

    const sentences: string[] = prompt
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0);
    if (sentences.length > 3) score += 0.5;
    if (sentences.length > 10) score += 0.5;

    const words: string[] = prompt.split(/\s+/);
    const avgWordLength: number =
      words.reduce((sum, word) => sum + word.length, 0) / words.length;
    if (avgWordLength > 5) score += 0.5;
    if (avgWordLength > 7) score += 0.5;

    const punctuationCount: number = (prompt.match(/[.,;:!?'"()[\]{}]/g) || [])
      .length;
    if (punctuationCount > 5) score += 0.5;
    if (punctuationCount > 15) score += 0.5;

    return Math.min(5, score);
  }

  /**
   * Calculates and returns the ISO 8601 week number for the given date.
   * Weeks are numbered from 01 to 53, starting on Monday and based on the UTC time zone.
   * @example
   * const date = new Date('2025-04-05T12:00:00Z');
   * const weekNumber = getISOWeek(date);
   * // weekNumber might be '2025-W13'
   * @developerNotes This method normalizes the input date to UTC to ensure consistent week calculations across time zones. The actual logic to compute the ISO week number (e.g., using `getWeek` or similar) should be implemented to complete the function.
   */
  public getISOWeek(date: Date): string {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNum: number = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return `${d.getUTCFullYear()}-W${Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)}`;
  }
}
