/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {EnhancementType, History, Provider, UserRole} from '~/database/models';
import {ModelStatic} from 'sequelize';

/**
 * Utility class for analyzing and computing statistics from history records.
 * @example
 * const histories = await History.find();
 * const stats = new HistoryStats(histories);
 * const modelUsage = stats.getProviderUsage({'openai|gpt-4': 10, 'anthropic|claude': 5});
 * @developerNote This class caches database lookups for providers, roles, and enhancement types to optimize performance.
 */
export default class HistoryStats {
  /** Cache for provider name to caption mappings. */
  private providers: Map<string, string> = new Map();
  /** Cache for user role key to name mappings. */
  private userRoles: Map<string, string> = new Map();
  /** Cache for enhancement type key to name mappings. */
  private enhancementTypes: Map<string, string> = new Map();

  constructor(private histories: History[]) {}

  /**
   * Generic method to fetch and cache display names from database models.
   * @developerNote This method is used to reduce database queries by caching results in memory.
   */
  private async getCachedValue<T extends typeof Provider | typeof UserRole | typeof EnhancementType>(
    cache: Map<string, string>,
    key: string,
    model: T,
    keyField: string,
    valueField: string
  ): Promise<string> {
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const record = await (model as ModelStatic<any>).findOne({
      attributes: [valueField],
      where: {[keyField]: key},
      raw: true,
    });

    const value = record?.[valueField] ?? key;
    cache.set(key, value);
    return value;
  }

  /**
   * Retrieves the provider caption from the database or cache.
   * @example
   * const providerName = await stats.getProviderFromDb('openai');
   */
  public async getProviderFromDb(name: string): Promise<string> {
    return this.getCachedValue(this.providers, name, Provider, 'name', 'caption');
  }

  /**
   * Retrieves the user role name from the database or cache.
   * @example
   * const roleName = await stats.getUserRoleFromDb('admin');
   */
  public async getUserRoleFromDb(key: string): Promise<string> {
    return this.getCachedValue(this.userRoles, key, UserRole, 'key', 'name');
  }

  /**
   * Retrieves the enhancement type name from the database or cache.
   * @example
   * const typeName = await stats.getEnhancementTypeFromDb('grammar');
   */
  public async getEnhancementTypeFromDb(key: string): Promise<string> {
    return this.getCachedValue(this.enhancementTypes, key, EnhancementType, 'key', 'name');
  }

  /**
   * Calculates the usage statistics for each provider-model combination.
   * @example
   * const usage = await stats.getProviderUsage({'openai|gpt-4': 10, 'anthropic|claude': 5});
   */
  public async getProviderUsage(providerModelCount: Record<string, number>): Promise<Array<{
    provider: string;
    model: string;
    count: number;
  }>> {
    const entries = Object.entries(providerModelCount);

    return Promise.all(
      entries.map(async ([k, c]) => {
        const [name, model] = k.split('|');
        return {
          provider: await this.getProviderFromDb(name),
          model,
          count: c,
        };
      }),
    );
  }

  /**
   * Returns the most frequently used roles, sorted by usage count.
   * @example
   * const roles = await stats.getMostUsedRoles({'admin': 5, 'user': 10});
   */
  public async getMostUsedRoles(roleCount: Record<string, number>): Promise<Array<{ role: string; count: number }>> {
    const entries = Object.entries(roleCount);

    const results = await Promise.all(
      entries.map(async ([role, count]) => ({
        role: await this.getUserRoleFromDb(role),
        count,
      })),
    );

    return results.sort((a, b) => b.count - a.count);
  }

  /**
   * Provides performance metrics for each model based on processing time.
   * @example
   * const performance = await stats.getModelPerformance({'gpt-4': [100, 150]});
   */
  public async getModelPerformance(modelProcessingTime: Record<string, number[]>): Promise<Array<{
    model: string;
    avgProcessingTime: number;
    totalUsage: number;
  }>> {
    return Object.entries(modelProcessingTime)
      .map(([model, times]) => ({
        model,
        avgProcessingTime: Math.round(times.reduce((a, b) => a + b, 0) / times.length),
        totalUsage: times.length,
      }))
      .sort((a, b) => b.totalUsage - a.totalUsage);
  }

  /**
   * Displays the distribution of model usage across different user roles.
   * @example
   * const distribution = await stats.getRoleModelDistribution({'admin|gpt-4': 5});
   */
  public async getRoleModelDistribution(roleModelCount: Record<string, number>): Promise<Array<{
    role: string;
    model: string;
    count: number;
  }>> {
    const entries = Object.entries(roleModelCount);

    const results = await Promise.all(
      entries.map(async ([key, count]) => {
        const [role, model] = key.split('|');
        return {
          role: await this.getUserRoleFromDb(role),
          model,
          count,
        };
      }),
    );

    return results.sort((a, b) => b.count - a.count);
  }

  /**
   * Identifies the most frequently used model based on usage count.
   * @example
   * const model = stats.getMostUsedModel({'gpt-4': 10, 'claude': 5});
   */
  public async getMostUsedModel(modelCount: Record<string, number>): Promise<string> {
    const entries = Object.entries(modelCount);
    if (entries.length === 0) return 'N/A';

    const {model} = entries.reduce((max, [model, count]) =>
      count > max.count ? {model, count} : max,
      {model: '', count: 0},
    );

    return model || 'N/A';
  }

  /**
   * Determines the most commonly used enhancement type.
   * @example
   * const type = await stats.getMostUsedType({'grammar': 10, 'style': 5});
   */
  public async getMostUsedType(typeCount: Record<string, number>): Promise<string> {
    const entries = Object.entries(typeCount);
    if (entries.length === 0) return 'N/A';

    const {type} = entries.reduce((max, [type, count]) =>
      count > max.count ? {type, count} : max,
      {type: 'N/A', count: 0},
    );

    return this.getEnhancementTypeFromDb(type);
  }

  /**
   * Finds the most efficient model based on tokens processed per millisecond.
   * @example
   * const efficient = await stats.getMostEfficient({'gpt-4': [100, 150]});
   */
  public async getMostEfficient(modelProcessingTime: Record<string, number[]>): Promise<{
    model: string;
    avgProcessingTime: number;
    avgTokensPerMs: number;
  }> {
    const entries = Object.entries(modelProcessingTime);
    if (entries.length === 0) {
      return {model: 'N/A', avgProcessingTime: 0, avgTokensPerMs: 0};
    }

    const tokenMap = new Map<string, number>();
    this.histories.forEach(h => {
      if (h.model && h.tokensUsed) {
        tokenMap.set(h.model, (tokenMap.get(h.model) || 0) + h.tokensUsed);
      }
    });

    return entries
      .map(([model, times]) => {
        const totalTokens = tokenMap.get(model) || 0;
        const totalTime = times.reduce((a, b) => a + b, 0);
        return {
          model,
          avgProcessingTime: Math.round(totalTime / times.length),
          avgTokensPerMs: Number((totalTokens / totalTime).toFixed(4)),
        };
      })
      .sort((a, b) => b.avgTokensPerMs - a.avgTokensPerMs)[0];
  }

  /**
   * Calculates the frequency of each enhancement type as a percentage.
   * @example
   * const frequency = await stats.getEnhancementFrequency({'grammar': 10}, 20);
   */
  public async getEnhancementFrequency(typeCount: Record<string, number>, len: number): Promise<Array<{
    type: string;
    count: number;
    percentage: number;
  }>> {
    const entries = Object.entries(typeCount);

    const results = await Promise.all(
      entries.map(async ([type, count]) => {
        const percentage = Number(((count / len) * 100).toFixed(1));
        return {
          type: await this.getEnhancementTypeFromDb(type),
          count,
          percentage,
        };
      }),
    );

    return results.sort((a, b) => b.count - a.count);
  }

  /**
   * Provides the distribution of usage across temperature ranges.
   * @example
   * const distribution = await stats.getTemperatureDistribution({'0-0.2': 5, '0.2-0.4': 10});
   */
  public async getTemperatureDistribution(temperatureRanges: {
    '0-0.2': number;
    '0.2-0.4': number;
    '0.4-0.6': number;
    '0.6-0.8': number;
    '0.8-1.0': number;
  }): Promise<Array<{ range: string; count: number }>> {
    return Object.entries(temperatureRanges).map(([range, count]) => ({
      range,
      count,
    }));
  }

  /**
   * Evaluates the efficiency of enhancement types based on processing time, tokens, and ratings.
   * @example
   * const efficiency = await stats.getEnhancementTypeEfficiency({'grammar': {processingTime: [100], tokensUsed: [50], ratings: [4]}});
   */
  public async getEnhancementTypeEfficiency(enhancementStats: Record<string, {
    processingTime: number[];
    tokensUsed: number[];
    ratings: number[];
  }>): Promise<Array<{
    type: string;
    avgProcessingTime: number;
    avgTokensUsed: number;
    successRate: number;
  }>> {
    const entries = Object.entries(enhancementStats);

    const results = await Promise.all(
      entries.map(async ([type, stats]) => {
        const avgProcessingTime = Math.round(
          stats.processingTime.reduce((a, b) => a + b, 0) / stats.processingTime.length,
        );
        const avgTokensUsed = Math.round(
          stats.tokensUsed.reduce((a, b) => a + b, 0) / stats.tokensUsed.length,
        );
        const successRate = Number(
          ((stats.ratings.filter(r => r >= 4).length / stats.ratings.length) * 100).toFixed(1),
        );
        return {
          type: await this.getEnhancementTypeFromDb(type),
          avgProcessingTime,
          avgTokensUsed,
          successRate,
        };
      }),
    );

    return results.sort((a, b) => b.successRate - a.successRate);
  }

  /**
   * Identifies the top 5 preferred time slots based on usage.
   * @example
   * const slots = await stats.getPreferredTimeSlots({0: 5, 1: 10}, 15);
   */
  public async getPreferredTimeSlots(hourlyUsage: Record<number, number>, len: number): Promise<Array<{
    hour: number;
    count: number;
    percentage: number;
  }>> {
    return Object.entries(hourlyUsage)
      .map(([hour, count]) => ({
        hour: Number(hour),
        count,
        percentage: Number(((count / len) * 100).toFixed(1)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  /**
   * Determines the hour with the highest usage.
   * @example
   * const peak = await stats.getPeakHour({0: 5, 1: 10});
   */
  public async getPeakHour(hourlyUsage: Record<number, number>): Promise<[string, number]> {
    return Object.entries(hourlyUsage).sort(([, a], [, b]) => b - a)[0] ?? ['0', 0];
  }

  /**
   * Provides monthly usage statistics sorted chronologically.
   * @example
   * const monthly = await stats.getMonthlyStats({'2023-01': 50, '2023-02': 60});
   */
  public async getMonthlyStats(monthlyUsage: Record<string, number>): Promise<Array<{ month: string; count: number }>> {
    return Object.entries(monthlyUsage)
      .map(([month, count]) => ({month, count}))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  /**
   * Provides weekly usage statistics sorted chronologically.
   * @example
   * const weekly = await stats.getWeeklyStats({'2023-W01': 20, '2023-W02': 30});
   */
  public async getWeeklyStats(weeklyUsage: Record<string, number>): Promise<Array<{ week: string; count: number }>> {
    return Object.entries(weeklyUsage)
      .map(([week, count]) => ({week, count}))
      .sort((a, b) => a.week.localeCompare(b.week));
  }

  /**
   * Calculates the distribution of ratings as percentages.
   * @example
   * const ratings = await stats.getRatingDistribution({1: 5, 2: 10}, 15);
   */
  public async getRatingDistribution(ratingCounts: Record<number, number>, len: number): Promise<Array<{
    rating: number;
    count: number;
    percentage: number;
  }>> {
    return Object.entries(ratingCounts)
      .map(([rating, count]) => ({
        rating: Number(rating),
        count,
        percentage: Number(((count / len) * 100).toFixed(1)),
      }))
      .filter(r => r.count > 0);
  }
}
