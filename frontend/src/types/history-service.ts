/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

export interface ListRoleItem {
  /** Total count associated with the role */
  total: number;
  /** Name of the role */
  name: string;
  /** Unique key identifier for the role */
  key: string;
  /** Unique ID for the role item */
  id: string;
}


/**
 * Represents comprehensive statistical data summarizing historical usage, performance, and behavior across operations, models, and user interactions.
 * @example
 * {
 *   totalItems: 1500,
 *   totalTokensUsed: 120000,
 *   providerUsage: [{ provider: 'ProviderA', model: 'ModelX', count: 800 }],
 *   dateRange: { earliest: new Date('2023-01-01'), latest: new Date('2023-12-31') }
 * }
 *
 * Developer Notes:
 * - All properties are required, though arrays may be empty if no relevant data exists.
 * - Dates are stored as JavaScript `Date` objects.
 * - Percentages and ratios are normalized (e.g., 0.0–1.0 or 0–100%).
 * - Ensure consistency in units (e.g., tokens, words, lines).
 */
export interface HistoryStatistics {
  /**
   * The total number of items processed in the tracked history.
   */
  totalItems: number;

  /**
   * The cumulative number of tokens used across all requests.
   */
  totalTokensUsed: number;

  /**
   * The average processing time (in milliseconds) per request.
   */
  averageProcessingTime: number;

  /**
   * The model that was used most frequently in the history.
   */
  mostUsedModel: string;

  /**
   * The enhancement type that was used most frequently.
   */
  mostUsedEnhancementType: string;

  /**
   * Represents usage statistics for provider-model combinations, including the provider name, model name, and the number of times the combination was used.
   * @example
   * { provider: 'ProviderA', model: 'ModelX', count: 800 }
   *
   * Developer Notes:
   * - `provider` and `model` should be valid identifiers (e.g., 'ProviderA', 'ModelX').
   * - `count` is a non-negative integer representing the number of times the combination was used.
   * - This interface is typically used in arrays to track multiple provider-model usage statistics.
   */
  providerUsage: {
    /** The name or identifier of the service provider (e.g., 'ProviderA', 'ProviderB') */
    provider: string;
    /** The name or identifier of the specific model used by the provider (e.g., 'ModelX', 'ModelY') */
    model: string;
    /** The total number of times this provider-model combination was used */
    count: number;
  }[];

  /**
   * Represents a mapping of roles to their usage frequency, tracking the most commonly used roles in the dataset.
   * @example
   * { role: 'user', count: 150 }
   *
   * Developer Notes:
   * - `role` is a string identifier representing a specific user or system role (e.g., 'user', 'assistant', 'admin').
   * - `count` is a non-negative integer indicating how many times the role was used or encountered.
   * - This interface is typically part of an array to list multiple roles and their usage statistics.
   */
  mostUsedRoles: {
    /** The name or identifier of the role (e.g., 'user', 'assistant', 'admin') */
    role: string;
    /** The total number of times this role was used or encountered in the dataset */
    count: number;
  }[];

  /**
   * The total number of words processed across all requests.
   */
  totalWords: number;

  /**
   * The total number of lines processed across all requests.
   */
  totalLines: number;

  /**
   * The total number of characters processed across all requests.
   */
  totalChars: number;

  /**
   * The average number of tokens used per request.
   */
  averageTokensUsed: number;

  /**
   * The maximum number of tokens used in a single request.
   */
  maxTokensUsed: number;

  /**
   * The average rating assigned to processed items (e.g., 1–5 scale).
   */
  averageRating: number;

  /**
   * The number of entries rated as "top-rated" (based on predefined criteria).
   */
  topRatedEntries: number;

  /**
   * The average temperature value used in generation processes (controls randomness).
   */
  averageTemperature: number;

  /**
   * Represents the distribution of temperature values across predefined ranges, showing the count of occurrences in each range.
   * @example
   * { range: '0.0–0.5', count: 120 }
   *
   * Developer Notes:
   * - `range` should be a string defining the temperature interval (e.g., '0.0–0.5', '0.5–1.0').
   * - `count` is a non-negative integer representing the number of occurrences in that range.
   * - Ranges are typically inclusive (e.g., '0.0–0.5' includes both 0.0 and 0.5).
   * - This interface is commonly used in arrays to analyze temperature distribution patterns.
   */
  temperatureDistribution: {
    /** A string representing the temperature range (e.g., '0.0–0.5', '0.5–1.0') */
    range: string;
    /** The number of occurrences (e.g., requests, operations) within the specified temperature range */
    count: number;
  }[];

  /**
   * Represents the frequency of different enhancement types, including their usage count and proportion of total enhancements.
   * @example
   * { type: 'summarize', count: 150, percentage: 0.3 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalEnhancements` and should be a decimal between 0 and 1 (inclusive).
   * - `type` should be a valid enhancement type (e.g., 'summarize', 'translate', 'rewrite').
   * - This interface is commonly used in arrays to track and analyze enhancement usage patterns.
   */
  enhancementFrequency: {
    /** The name or identifier of the enhancement type (e.g., 'summarize', 'translate', 'rewrite') */
    type: string;
    /** The total number of times this enhancement type was used */
    count: number;
    /** The proportion of total enhancements that this type represents, as a decimal (0–1) */
    percentage: number;
  }[];

  /**
   * Represents performance metrics for a specific model, including average processing time and total usage count.
   * @example
   * { model: 'ModelX', avgProcessingTime: 150, totalUsage: 800 }
   *
   * Developer Notes:
   * - `avgProcessingTime` is measured in milliseconds (ms) and reflects the average time taken to process a request.
   * - `totalUsage` is a non-negative integer representing the total number of times the model was used.
   * - These metrics are typically derived from historical usage data and are useful for comparing model efficiency and popularity.
   */
  modelPerformance: {
    /** The identifier or name of the model being evaluated */
    model: string;
    /** The average time (in milliseconds) required to process a request using this model */
    avgProcessingTime: number;
    /** The total number of times this model was used across all requests */
    totalUsage: number;
  }[];

  /**
   * Represents the distribution of model usage by role, including the role name, model name, and usage count.
   * @example
   * { role: 'user', model: 'ModelX', count: 120 }
   *
   * Developer Notes:
   * - `role` and `model` are strings identifying the specific role and model being tracked.
   * - `count` is a non-negative integer representing the number of times the model was used by the role.
   * - This interface is commonly used in arrays to analyze usage patterns across different roles and models.
   */
  roleModelDistribution: {
    /** The role or user type associated with the model usage (e.g., 'user', 'assistant', 'admin') */
    role: string;
    /** The model name or identifier used by the specified role */
    model: string;
    /** The total number of times this model was used by the specified role */
    count: number;
  }[];

  /**
   * Represents the date range with the earliest and latest dates recorded in the dataset.
   * @example
   * { earliest: new Date('2023-01-01'), latest: new Date('2023-12-31') }
   *
   * Developer Notes:
   * - Ensure `earliest` and `latest` are valid `Date` objects representing the minimum and maximum dates in the dataset.
   * - If the dataset contains no entries, both properties may be `null` or `undefined` depending on implementation.
   */
  dateRange: {
    /** The earliest (minimum) date in the dataset */
    earliest: Date;
    /** The latest (maximum) date in the dataset */
    latest: Date;
  };

  /**
   * Represents the hour with the highest usage, including the specific hour and the count of events/requests during that hour.
   * @example
   * { hour: 15, count: 200 }
   *
   * Developer Notes:
   * - `hour` is in 24-hour format (0–23), representing the peak hour of usage.
   * - `count` is a non-negative integer indicating the number of occurrences during the peak hour.
   * - This interface is often used to identify the busiest time of day for operations or user activity.
   */
  peakUsageHour: {
    /** The hour of the day in 24-hour format (0–23) with the highest usage */
    hour: number;
    /** The total number of events, requests, or operations recorded during the peak hour */
    count: number;
  };

  /**
   * Represents monthly usage statistics, tracking the number of events or occurrences during a specific month.
   * @example
   * { month: '2023-01', count: 150 }
   *
   * Developer Notes:
   * - `month` should follow the ISO 8601 format (e.g., '2023-01' for January 2023).
   * - `count` is a non-negative integer representing the total occurrences during the month.
   * - This interface is typically used in arrays to represent usage trends over time.
   */
  monthlyUsage: {
    /** The month identifier in ISO 8601 format (e.g., '2023-01') */
    month: string;
    /** The total number of events or occurrences recorded during the specified month */
    count: number;
  }[];

  /**
   * The average maximum number of tokens used per request.
   */
  averageMaxTokens: number;

  /**
   * The minimum number of tokens used in a single request.
   */
  minTokensUsed: number;

  /**
   * The ratio of prompts that were enhanced compared to those that were not.
   */
  promptEnhancementRatio: number;

  /**
   * Represents statistics for the usage of system prompts, including counts of usage and non-usage, along with the proportion of total usage.
   * @example
   * { used: 450, notUsed: 550, percentage: 0.45 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `used / (used + notUsed)` and should be a decimal between 0 and 1.
   * - `used` and `notUsed` should be non-negative integers representing the total number of times system prompts were used or not used.
   * - This interface is useful for analyzing system prompt adoption rates and user behavior patterns.
   */
  systemPromptUsage: {
    /** The total number of times a system prompt was used in the tracked period */
    used: number;
    /** The total number of times a system prompt was not used in the tracked period */
    notUsed: number;
    /** The proportion of total prompts that were used, represented as a decimal (0–1 */
    percentage: number;
  };

  /**
   * Represents the distribution of ratings, including the rating value, count of occurrences, and percentage of total ratings.
   * @example
   * { rating: 5, count: 120, percentage: 0.24 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRatings` and should be a decimal between 0 and 1 (inclusive).
   * - `rating` is typically on a scale (e.g., 1–5 for star ratings), but can be adapted to other scales.
   * - Ensure `count` is a non-negative integer and `percentage` is derived accurately from the total ratings.
   */
  ratingDistribution: {
    /** The rating value (e.g., 1–5 for star ratings) being tracked in this distribution entry */
    rating: number;
    /** The number of times this rating was recorded or assigned */
    count: number;
    /** The proportion of total ratings that this entry represents, as a decimal (0–1) */
    percentage: number;
  }[];

  /**
   * Represents cost-related statistics, including total estimated cost and average cost per request.
   * @example
   * { totalEstimatedCost: 250.75, avgCostPerRequest: 1.25 }
   *
   * Developer Notes:
   * - `totalEstimatedCost` is the cumulative cost based on usage data (e.g., in USD or another currency).
   * - `avgCostPerRequest` is calculated as `totalEstimatedCost / totalRequests` and reflects the average cost per operation.
   * - Ensure values are rounded appropriately for reporting or display purposes.
   */
  costAnalysis: {
    /** The total estimated cost accumulated across all requests or operations */
    totalEstimatedCost: number;
    /** The average cost per individual request or operation, derived from total estimated cost */
    avgCostPerRequest: number;
  };

  /**
   * Represents weekly usage statistics, tracking the number of events or occurrences during a specific week.
   * @example
   * { week: '2023-W01', count: 150 }
   *
   * Developer Notes:
   * - `week` should follow the ISO 8601 format (e.g., '2023-W01' for the first week of 2023).
   * - `count` is a non-negative integer representing the total occurrences during the week.
   * - This interface is typically used in arrays to represent usage trends over time.
   */
  weeklyUsage: {
    /** The week identifier in ISO 8601 format (e.g., '2023-W01') */
    week: string;
    /** The total number of events or occurrences recorded during the specified week */
    count: number;
  }[];

  /**
   * Represents statistics for the longest prompt, including original and enhanced lengths and their ratio.
   * @example
   * { originalLength: 500, enhancedLength: 600, ratio: 0.83 }
   *
   * Developer Notes:
   * - `ratio` is calculated as `originalLength / enhancedLength` and reflects the relative size change.
   * - Ensure `originalLength` and `enhancedLength` are non-negative numbers (e.g., character count, token count).
   * - Useful for analyzing the impact of enhancements on maximal input sizes.
   */
  longestPrompt: {
    /** The length of the original longest prompt (e.g., number of characters, tokens, or words) */
    originalLength: number;
    /** The length of the enhanced longest prompt after processing (e.g., number of characters, tokens, or words) */
    enhancedLength: number;
    /** The ratio of original length to enhanced length, indicating the relative change in size. */
    ratio: number;
  };

  /**
   * Represents statistics for the shortest prompt, including original and enhanced lengths and their ratio.
   * @example
   * { originalLength: 50, enhancedLength: 60, ratio: 0.83 }
   *
   * Developer Notes:
   * - `ratio` is calculated as `originalLength / enhancedLength` and reflects the relative size change.
   * - Ensure `originalLength` and `enhancedLength` are non-negative numbers (e.g., character count, token count).
   * - Useful for analyzing the impact of enhancements on minimal input sizes.
   */
  shortestPrompt: {
    /** The length of the original shortest prompt (e.g., number of characters, tokens, or words) */
    originalLength: number;
    /** The length of the enhanced shortest prompt after processing (e.g., number of characters, tokens, or words) */
    enhancedLength: number;
    /** The ratio of original length to enhanced length, indicating the relative change in size */
    ratio: number;
  };

  /**
   * Represents the lengths of original and enhanced content, such as prompts or text segments.
   * @example
   * { original: 150, enhanced: 200 }
   *
   * Developer Notes:
   * - These values are typically used for comparison or analytics (e.g., measuring the impact of enhancements).
   * - Ensure `original` and `enhanced` are non-negative numbers representing lengths (e.g., character count, token count).
   */
  averagePromptLength: {
    /** The length of the original content (e.g., number of characters, tokens, or words) */
    original: number;
    /** The length of the enhanced content after processing (e.g., number of characters, tokens, or words) */
    enhanced: number;
  };

  /**
   * Represents performance metrics for a specific model, including average processing time and efficiency in token processing.
   * @example
   * { model: 'ModelX', avgProcessingTime: 150, avgTokensPerMs: 2.5 }
   *
   * Developer Notes:
   * - `avgProcessingTime` is measured in milliseconds (ms) and reflects the average time taken to process a request.
   * - `avgTokensPerMs` represents the average number of tokens processed per millisecond, indicating efficiency.
   * - These metrics are typically derived from historical usage data and are useful for model comparison and optimization.
   */
  mostEfficientModel: {
    /** The identifier or name of the model being evaluated */
    model: string;
    /** The average time (in milliseconds) required to process a request using this model */
    avgProcessingTime: number;
    /** The average number of tokens processed per millisecond, indicating the model's efficiency */
    avgTokensPerMs: number;
  };

  /**
   * Represents statistics for a specific hour, including the count of events/usage and the percentage of total occurrences.
   * @example
   * { hour: 15, count: 200, percentage: 0.35 }
   *
   * Developer Notes:
   * - `hour` is in 24-hour format (0–23).
   * - `percentage` is calculated as `count / totalOccurrences` and should be a decimal between 0 and 1.
   * - Use this interface for time-based distribution statistics (e.g., peak hours, usage patterns).
   */
  preferredTimeSlots: {
    /** The hour of the day in 24-hour format (0–23) */
    hour: number;
    /** The number of occurrences or events recorded during this hour */
    count: number;
    /** The proportion of total occurrences during this hour, represented as a decimal (0–1) */
    percentage: number;
  }[];

  /**
   * Represents efficiency metrics for a specific enhancement type, including processing time, token usage, and success rate.
   * @example
   * { type: 'summarize', avgProcessingTime: 120, avgTokensUsed: 50, successRate: 0.95 }
   *
   * Developer Notes:
   * - Ensure `type` corresponds to a valid enhancement type (e.g., 'summarize', 'translate').
   * - `successRate` should be a decimal between 0 and 1 (inclusive), representing the percentage of successful operations.
   * - Metrics are typically calculated over a defined time frame or dataset.
   */
  enhancementTypeEfficiency: {
    /** The name or identifier of the enhancement type (e.g., 'summarize', 'translate', 'rewrite') */
    type: string;
    /** The average processing time (in milliseconds) for this enhancement type */
    avgProcessingTime: number;
    /** The average number of tokens used per operation for this enhancement type */
    avgTokensUsed: number;
    /** The success rate of operations for this enhancement type, represented as a decimal (0–1) */
    successRate: number;
  }[];

  /**
   * Represents statistics for the usage of metadata fields, including counts of prompts with/without metadata and the corresponding percentage.
   * @example
   * { withMeta: 450, withoutMeta: 550, percentage: 0.45 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `withMeta / (withMeta + withoutMeta)` and should always be a decimal between 0 and 1.
   * - Ensure `withMeta` and `withoutMeta` are non-negative integers representing total counts.
   */
  metaFieldUsage: {
    /** The total number of prompts that included metadata fields */
    withMeta: number;
    /** The total number of prompts that did not include metadata fields */
    withoutMeta: number;
    /** The proportion of prompts that included metadata fields, represented as a decimal (0–1) */
    percentage: number;
  };

  /**
   * Represents the usage statistics for target audiences, including audience name, count, and percentage.
   * @example
   * { audience: 'technical-experts', count: 120, percentage: 24.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze target audience usage patterns.
   */
  targetAudienceUsage: {
    /** The name or identifier of the target audience (e.g., 'technical-experts', 'general-users') */
    audience: string;
    /** The total number of times this audience was used */
    count: number;
    /** The proportion of total requests that used this audience, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for tone preferences, including tone name, count, and percentage.
   * @example
   * { tone: 'professional', count: 150, percentage: 30.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze tone usage patterns.
   */
  toneUsage: {
    /** The name or identifier of the tone (e.g., 'professional', 'casual', 'formal') */
    tone: string;
    /** The total number of times this tone was used */
    count: number;
    /** The proportion of total requests that used this tone, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for response lengths, including length category, count, and percentage.
   * @example
   * { length: 'short', count: 80, percentage: 16.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze response length usage patterns.
   */
  responseLengthUsage: {
    /** The category or identifier of the response length (e.g., 'short', 'medium', 'long') */
    length: string;
    /** The total number of times this length was used */
    count: number;
    /** The proportion of total requests that used this length, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for output formats, including format name, count, and percentage.
   * @example
   * { format: 'markdown', count: 200, percentage: 40.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze output format usage patterns.
   */
  formatUsage: {
    /** The name or identifier of the output format (e.g., 'markdown', 'json', 'text') */
    format: string;
    /** The total number of times this format was used */
    count: number;
    /** The proportion of total requests that used this format, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for top-k sampling parameters, including parameter value, count, and percentage.
   * @example
   * { k: 40, count: 100, percentage: 20.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze top-k parameter usage patterns.
   */
  topKUsage: {
    /** The top-k sampling parameter value */
    k: number;
    /** The total number of times this k value was used */
    count: number;
    /** The proportion of total requests that used this k value, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for top-p sampling parameters, including parameter value, count, and percentage.
   * @example
   * { p: 0.9, count: 150, percentage: 30.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze top-p parameter usage patterns.
   */
  topPUsage: {
    /** The top-p sampling parameter value */
    p: number;
    /** The total number of times this p value was used */
    count: number;
    /** The proportion of total requests that used this p value, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for frequency penalty parameters, including penalty value, count, and percentage.
   * @example
   * { penalty: 0.5, count: 120, percentage: 24.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze frequency penalty parameter usage patterns.
   */
  frequencyPenaltyUsage: {
    /** The frequency penalty parameter value */
    penalty: number;
    /** The total number of times this penalty value was used */
    count: number;
    /** The proportion of total requests that used this penalty value, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for presence penalty parameters, including penalty value, count, and percentage.
   * @example
   * { penalty: 0.3, count: 100, percentage: 20.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze presence penalty parameter usage patterns.
   */
  presencePenaltyUsage: {
    /** The presence penalty parameter value */
    penalty: number;
    /** The total number of times this penalty value was used */
    count: number;
    /** The proportion of total requests that used this penalty value, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the usage statistics for conversation IDs, including ID, count, and percentage.
   * @example
   * { id: 'conv_12345', count: 150, percentage: 30.0 }
   *
   * Developer Notes:
   * - `percentage` is calculated as `count / totalRequests` and should be a decimal between 0 and 100.
   * - This interface is commonly used in arrays to track and analyze conversation ID usage patterns.
   */
  conversationIdUsage: {
    /** The conversation ID used for tracking context */
    id: string;
    /** The total number of times this conversation ID was used */
    count: number;
    /** The proportion of total requests that used this conversation ID, represented as a percentage (0–100) */
    percentage: number;
  }[];

  /**
   * Represents the distribution of processing times across different percentiles.
   * Example: { p50: 150, p90: 300, p99: 500 }
   * @developerNotes Ensure percentiles align with backend data collection intervals.
   */
  processingTimePercentiles: ProcessingTimePercentiles;

  /**
   * Tracks token usage distribution across different percentiles.
   * Example: { p50: 100, p90: 500, p99: 1000 }
   * @developerNotes Validate that token counting logic is consistent across services.
   */
  tokenUsagePercentiles: TokenUsagePercentiles;

  /**
   * Contains statistics about errors encountered during processing.
   * Example: { totalErrors: 42, errorRate: 0.05, mostCommonErrors: ['404', '500'] }
   * @developerNotes Maintain error classification consistency with backend logging.
   */
  errorStatistics: ErrorStatistics;

  /**
   * Tracks user engagement metrics over time.
   * Example: { activeUsers: 1000, sessionCount: 2500, sessionDuration: 120 }
   * @developerNotes Ensure tracking events are synchronized with analytics tools.
   */
  userActivity: UserActivity;

  /**
   * Tracks performance trends over time intervals.
   * Example: { trend: 'increasing', slope: 0.5, confidenceInterval: [0.4, 0.6] }
   * @developerNotes Use time-series data to validate trend calculations.
   */
  performanceTrends: PerformanceTrends;

  /**
   * Contains metrics for different models used in the system.
   * Example: [{ modelName: 'gpt-4', accuracy: 0.95, latency: 200 }, ...]
   * @developerNotes Update model list when new models are deployed.
   */
  modelMetrics: ModelMetrics[];

  /**
   * Tracks improvements and enhancements across features.
   * Example: [{ feature: 'search', improvementRate: 0.3 }, ...]
   * @developerNotes Align enhancement metrics with feature release cycles.
   */
  enhancementMetrics: EnhancementMetrics[];

  /**
   * Measures complexity of content processed by the system.
   * Example: { averageLength: 250, complexityScore: 75, complexityTrend: 'stable' }
   * @developerNotes Ensure scoring aligns with content analysis algorithms.
   */
  contentComplexity: ContentComplexity;

  /**
   * Tracks system health and resource utilization.
   * Example: { uptime: 14400, loadAverage: 0.75, cpuUsage: 65 }
   * @developerNotes Monitor metrics in real-time for proactive maintenance.
   */
  systemHealth: SystemHealth;

  /**
   * Captures user interface and interaction preferences.
   * Example: { preferredThemes: ['dark'], languageSettings: 'en-US' }
   * @developerNotes Synchronize with user profile storage mechanisms.
   */
  userPreferences: UserPreferences;

  /**
   * Breaks down costs by category and usage type.
   * Example: { apiCalls: 150, storage: 25, bandwidth: 50 }
   * @developerNotes Ensure cost tracking aligns with billing system definitions.
   */
  costBreakdown: CostBreakdown;

  /**
   * Tracks seasonal patterns in usage and performance.
   * Example: { pattern: 'winter_peak', peakMonth: 'December', amplitude: 2.5 }
   * @developerNotes Validate patterns against historical data archives.
   */
  seasonalPatterns: SeasonalPatterns;

  /**
   * Tracks geographic distribution of users and activity.
   * Example: { regions: [{ country: 'US', users: 1200 }, { country: 'IN', users: 800 }] }
   * @developerNotes Maintain region definitions in sync with localization systems.
   */
  geographicDistribution: GeographicDistribution;
}

/**
 * A structure containing processing time percentiles (p50, p75, p90, p95, p99) for analyzing performance distributions.
 * @example
 * {
 *   p50: 150,
 *   p75: 200,
 *   p90: 250,
 *   p95: 300,
 *   p99: 350
 * }
 * @developerNotes Ensure percentile values are calculated from a representative dataset and are consistent with other performance metrics.
 */
export interface ProcessingTimePercentiles {
  /** The 50th percentile (median) of processing times */
  p50: number;
  /** The 75th percentile of processing times */
  p75: number;
  /** The 90th percentile of processing times */
  p90: number;
  /** The 95th percentile of processing times */
  p95: number;
  /** The 99th percentile of processing times */
  p99: number;
}

/**
 * Represents token usage percentiles (e.g., 50th, 75th, 99th percentiles) for a dataset.
 * Used to analyze distribution patterns in token consumption.
 * @example
 * {
 *   p50: 100,
 *   p75: 150,
 *   p90: 200,
 *   p95: 250,
 *   p99: 300
 * }
 * @developerNotes Ensure percentile values are calculated from a representative dataset. Percentile keys should be standard (p50, p75, etc.) for consistency with other systems.
 */
export interface TokenUsagePercentiles {
  /** The 50th percentile (median) of token usage */
  p50: number;
  /** The 75th percentile of token usage */
  p75: number;
  /** The 90th percentile of token usage */
  p90: number;
  /** The 95th percentile of token usage */
  p95: number;
  /** The 99th percentile of token usage */
  p99: number;
}

/**
 * Tracks statistics related to errors, including total counts, error rates, and breakdown by type.
 * Used to monitor and improve system reliability.
 * @example
 * {
 *   totalErrors: 150,
 *   errorRate: 0.05,
 *   errorTypes: [
 *     { type: 'validation', count: 80, percentage: 53.3 },
 *     { type: 'network', count: 50, percentage: 33.3 }
 *   ]
 * }
 * @developerNotes Ensure `errorTypes` percentages sum to 100%. Validate that error types are properly categorized and tracked in the system.
 */
export interface ErrorStatistics {
  /** Total number of errors recorded */
  totalErrors: number;
  /** The proportion of errors relative to total requests or operations */
  errorRate: number;
  /** An array of error type statistics */
  errorTypes: ErrorTypeStats[];
}

/**
 * Represents statistics for a specific error type, including its frequency and proportion.
 * @example
 * { type: 'validation', count: 80, percentage: 53.3 }
 * @developerNotes Ensure `percentage` is calculated correctly relative to `totalErrors`. Validate that `type` corresponds to a recognized error category.
 */
export interface ErrorTypeStats {
  /** The name or category of the error */
  type: string;
  /** The number of occurrences for this error type */
  count: number;
  /** The percentage of total errors this type represents */
  percentage: number;
}

/**
 * Tracks user activity metrics, including daily, weekly, monthly active users and retention.
 * @example
 * {
 *   dailyActiveUsers: 1000,
 *   weeklyActiveUsers: 8000,
 *   monthlyActiveUsers: 30000,
 *   retentionRate: 0.85
 * }
 * @developerNotes Ensure metrics are updated in real-time or at regular intervals. Validate that retention rate is calculated from accurate user engagement data.
 */
export interface UserActivity {
  /** The number of unique users active on a daily basis */
  dailyActiveUsers: number;
  /** The number of unique users active on a weekly basis */
  weeklyActiveUsers: number;
  /** The number of unique users active on a monthly basis */
  monthlyActiveUsers: number;
  /** The proportion of users who continue to engage with the system */
  retentionRate: number;
}

/**
 * Tracks performance trends over time, including processing time, token usage, and error rate.
 * @example
 * {
 *   processingTime: [
 *     { date: '2025-04-01', value: 200 },
 *     { date: '2025-04-02', value: 210 }
 *   ],
 *   tokenUsage: [
 *     { date: '2025-04-01', value: 1000 },
 *     { date: '2025-04-02', value: 1050 }
 *   ],
 *   errorRate: [
 *     { date: '2025-04-01', value: 0.05 },
 *     { date: '2025-04-02', value: 0.04 }
 *   ]
 * }
 * @developerNotes Ensure date formats are standardized (e.g., ISO 8601) and values are consistent with other metrics. Validate that trends are updated regularly.
 */
export interface PerformanceTrends {
  /** An array of data points representing processing time trends over time */
  processingTime: TrendDataPoint[];
  /** An array of data points representing token usage trends over time */
  tokenUsage: TrendDataPoint[];
  /** An array of data points representing error rate trends over time */
  errorRate: TrendDataPoint[];
}

/**
 * Represents a single data point in a trend, with a date and a numeric value.
 * @example
 * { date: '2025-04-01', value: 200 }
 * @developerNotes Ensure the date format is consistent (e.g., YYYY-MM-DD) and the value is a numeric type. Validate that data points are ordered chronologically.
 */
export interface TrendDataPoint {
  /** The date associated with this data point */
  date: string;
  /** The numeric value representing the metric at the given date */
  value: number;
}

/**
 * Metrics related to a specific AI model, including accuracy, cost efficiency, and response quality.
 * @example
 * {
 *   model: 'gpt-4',
 *   accuracy: 0.95,
 *   costEfficiency: 85,
 *   responseQuality: 0.92,
 *   successRate: 0.98
 * }
 * @developerNotes Ensure metrics are updated based on real-world performance data. Validate that values are normalized and consistent across models.
 */
export interface ModelMetrics {
  /** The name of the model being evaluated */
  model: string;
  /** The accuracy of the model's predictions or outputs */
  accuracy: number;
  /** A measure of how efficiently the model uses resources (e.g., cost per request) */
  costEfficiency: number;
  /** The quality of the model's responses or outputs */
  responseQuality: number;
  /** The proportion of successful requests or operations */
  successRate: number;
}

/**
 * Metrics related to an enhancement (e.g., feature or tool), including success rate, quality, and usage trends.
 * @example
 * {
 *   type: 'text_summary',
 *   successRate: 0.99,
 *   avgQualityScore: 88,
 *   popularityTrend: 'increasing',
 *   avgProcessingTime: 150,
 *   avgTokenUsage: 200
 * }
 * @developerNotes Ensure metrics are tracked consistently for all enhancements. Validate that popularity trends are calculated based on user interaction data.
 */
export interface EnhancementMetrics {
  /** The type or name of the enhancement */
  type: string;
  /** The proportion of successful enhancement requests */
  successRate: number;
  /** The average quality score for the enhancement */
  avgQualityScore: number;
  /** The trend in popularity of the enhancement (e.g., increasing, stable) */
  popularityTrend: 'increasing' | 'decreasing' | 'stable';
  /** The average time taken to process the enhancement */
  avgProcessingTime: number;
  /** The average number of tokens used by the enhancement */
  avgTokenUsage: number;
}

/**
 * Metrics related to content complexity, including average scores, distribution, and correlations.
 * @example
 * {
 *   avgComplexityScore: 75,
 *   complexityDistribution: [
 *     { score: 50, count: 100, percentage: 10 },
 *     { score: 75, count: 400, percentage: 40 }
 *   ],
 *   complexityTimeCorrelation: 0.65,
 *   complexityTokenCorrelation: 0.35
 * }
 * @developerNotes Ensure complexity scores are calculated consistently. Validate that correlations are based on accurate statistical analysis.
 */
export interface ContentComplexity {
  /** The average complexity score across all content items */
  avgComplexityScore: number;
  /** An array of complexity score distributions */
  complexityDistribution: ComplexityDistribution[];
  /** The correlation between content complexity and processing time */
  complexityTimeCorrelation: number;
  /** The correlation between content complexity and token usage */
  complexityTokenCorrelation: number;
}

/**
 * Represents a distribution of complexity scores across a dataset.
 * @example
 * { score: 75, count: 400, percentage: 40 }
 * @developerNotes Ensure percentages sum to 100% across all entries. Validate that scores are normalized to a consistent scale.
 */
export interface ComplexityDistribution {
  /** The complexity score for this range */
  score: number;
  /** The number of content items with this complexity score */
  count: number;
  /** The percentage of total content items with this complexity score */
  percentage: number;
}

/**
 * Metrics related to system health, including load, utilization, and uptime.
 * @example
 * {
 *   avgSystemLoad: 70,
 *   peakSystemLoad: 95,
 *   avgResourceUtilization: 80,
 *   uptime: 1209600,
 *   avgResponseTime: 200
 * }
 * @developerNotes Ensure metrics are collected in real-time or at regular intervals. Validate that thresholds for load and utilization are properly defined.
 */
export interface SystemHealth {
  /** The average system load over a defined period */
  avgSystemLoad: number;
  /** The highest system load recorded */
  peakSystemLoad: number;
  /** The average resource utilization (e.g., CPU, memory */
  avgResourceUtilization: number;
  /** The total uptime of the system in seconds */
  uptime: number;
  /** The average response time for system operations */
  avgResponseTime: number;
}

/**
 * Tracks user preferences for models, enhancements, and parameters.
 * @example
 * {
 *   modelPreference: [
 *     { model: 'gpt-4', trend: 'increasing', changeRate: 15 },
 *     { model: 'gpt-3.5-turbo', trend: 'stable', changeRate: 0 }
 *   ],
 *   enhancementPreference: [
 *     { type: 'text_summary', trend: 'increasing', changeRate: 10 }
 *   ],
 *   parameterPreference: [
 *     { parameter: 'max_tokens', trend: 'decreasing', changeRate: -5 }
 *   ]
 * }
 * @developerNotes Ensure preference trends are calculated based on user behavior data. Validate that `changeRate` reflects accurate changes in preference over time.
 */
export interface UserPreferences {
  /** An array of preference trends for specific models */
  modelPreference: PreferenceTrend[];
  /** An array of preference trends for specific enhancements */
  enhancementPreference: PreferenceTrend[];
  /** An array of preference trends for specific parameters */
  parameterPreference: ParameterPreference[];
}

/**
 * Represents a trend in preference for a specific model or parameter type over time.
 * Tracks whether the preference is increasing, decreasing, or stable, along with the rate of change.
 * @example
 * {
 *   model: 'gpt-4',
 *   type: 'temperature',
 *   trend: 'increasing',
 *   changeRate: 15.2
 * }
 * @developerNotes Ensure `trend` is one of the allowed values: 'increasing', 'decreasing', or 'stable'. Validate that `changeRate` is a numeric value reflecting the rate of change in preference.
 */
export interface PreferenceTrend {
  /** The model or parameter type associated with the preference trend */
  model?: string;
  /** The type of parameter being tracked for preference trends */
  type?: string;
  /** The direction of the preference trend (e.g., increasing, stable) */
  trend: 'increasing' | 'decreasing' | 'stable';
  /** The rate of change in preference, measured as a percentage or absolute value */
  changeRate: number;
}

/**
 * Represents a preference trend for a specific parameter.
 * Tracks how the preference for a parameter changes over time.
 * @example
 * {
 *   parameter: 'max_tokens',
 *   trend: 'decreasing',
 *   changeRate: -5.3
 * }
 * @developerNotes Ensure `parameter` is a valid parameter name and `trend` is one of the allowed values. Validate that `changeRate` reflects the actual rate of change in parameter usage.
 */
export interface ParameterPreference {
  /** The name of the parameter being tracked */
  parameter: string;
  /** The direction of the preference trend (e.g., increasing, stable) */
  trend: 'increasing' | 'decreasing' | 'stable';
  /** The rate of change in preference, measured as a percentage or absolute value */
  changeRate: number;
}

/**
 * Provides a detailed breakdown of costs associated with different models and enhancements.
 * Includes metrics for cost distribution, average cost, and overall efficiency.
 * @example
 * {
 *   modelCosts: [
 *     { model: 'gpt-4', totalCost: 500, avgCostPerRequest: 2.5, percentage: 40 },
 *     { model: 'gpt-3.5-turbo', totalCost: 300, avgCostPerRequest: 1.2, percentage: 25 }
 *   ],
 *   enhancementCosts: [
 *     { type: 'text_summary', totalCost: 150, avgCostPerRequest: 0.5, percentage: 10 }
 *   ],
 *   costEfficiency: {
 *     mostEfficientModel: 'gpt-3.5-turbo',
 *     mostEfficientEnhancement: 'text_summary',
 *     efficiencyScore: 95
 *   }
 * }
 * @developerNotes Ensure `modelCosts` and `enhancementCosts` arrays are populated with valid entries. Verify that percentages sum up to 100% for accurate cost distribution. The `efficiencyScore` in `costEfficiency` should reflect a calculated value based on usage and cost data.
 */
export interface CostBreakdown {
  /** An array of cost metrics for different AI models */
  modelCosts: ModelCost[];
  /** An array of cost metrics for different enhancement types */
  enhancementCosts: EnhancementCost[];
  /** Metrics representing overall cost efficiency */
  costEfficiency: CostEfficiency;
}

/**
 * Represents cost metrics for a specific AI model.
 * Includes total cost, average cost per request, and the percentage of total cost.
 * @example
 * {
 *   model: 'gpt-4',
 *   totalCost: 500,
 *   avgCostPerRequest: 2.5,
 *   percentage: 40
 * }
 * @developerNotes Ensure `model` is a valid AI model name. Verify that `totalCost`, `avgCostPerRequest`, and `percentage` are consistent and accurately reflect the model's usage and cost.
 */
export interface ModelCost {
  /** The name of the AI model */
  model: string;
  /** The total cost incurred for using the model */
  totalCost: number;
  /** The average cost per request for the model */
  avgCostPerRequest: number;
  /** The percentage of total cost attributed to this model */
  percentage: number;
}

/**
 * Represents cost metrics for a specific enhancement type.
 * Includes total cost, average cost per request, and the percentage of total cost.
 * @example
 * {
 *   type: 'text_summary',
 *   totalCost: 150,
 *   avgCostPerRequest: 0.5,
 *   percentage: 10
 * }
 * @developerNotes Ensure `type` is a valid enhancement type. Verify that `totalCost`, `avgCostPerRequest`, and `percentage` are consistent and accurately reflect the enhancement's usage and cost.
 */
export interface EnhancementCost {
  /** The type of enhancement being tracked */
  type: string;
  /** The total cost incurred for using the enhancement */
  totalCost: number;
  /** The average cost per request for the enhancement */
  avgCostPerRequest: number;
  /** The percentage of total cost attributed to this enhancement */
  percentage: number;
}

/**
 * Represents metrics for cost efficiency across models and enhancements.
 * Includes the most efficient model and enhancement, along with an efficiency score.
 * @example
 * {
 *   mostEfficientModel: 'gpt-3.5-turbo',
 *   mostEfficientEnhancement: 'text_summary',
 *   efficiencyScore: 95
 * }
 * @developerNotes Ensure `mostEfficientModel` and `mostEfficientEnhancement` are derived from the actual cost and usage data. The `efficiencyScore` should be calculated based on a predefined formula or benchmark.
 */
export interface CostEfficiency {
  /** The model with the highest cost efficiency */
  mostEfficientModel: string;
  /** The enhancement with the highest cost efficiency */
  mostEfficientEnhancement: string;
  /** A numeric score representing overall cost efficiency */
  efficiencyScore: number;
}

/**
 * Represents seasonal trends in data usage or preference.
 * Tracks usage trends for each season and identifies peak and lowest seasons.
 * @example
 * {
 *   seasonalTrends: [
 *     { season: 'summer', usage: 7500, changeRate: 12.5 },
 *     { season: 'winter', usage: 5000, changeRate: -5.0 }
 *   ],
 *   peakSeason: 'summer',
 *   lowestSeason: 'winter'
 * }
 * @developerNotes Ensure `seasonalTrends` contains valid `SeasonalTrend` objects. `peakSeason` and `lowestSeason` must match the seasons listed in `seasonalTrends` to avoid mismatches.
 */
export interface SeasonalPatterns {
  /** An array of seasonal trends with usage data and change rates */
  seasonalTrends: SeasonalTrend[];
  /** The season with the highest usage or preference */
  peakSeason: 'winter' | 'spring' | 'summer' | 'fall';
  /** The season with the lowest usage or preference */
  lowestSeason: 'winter' | 'spring' | 'summer' | 'fall';
}

/**
 * Represents a seasonal trend with associated usage data and rate of change.
 * Used to analyze patterns in usage over different seasons.
 * @example
 * {
 *   season: 'summer',
 *   usage: 7500,
 *   changeRate: 12.5
 * }
 * @developerNotes Ensure `season` is one of the allowed values, and `usage`/`changeRate` are numeric and reflect real-world data.
 */
export interface SeasonalTrend {
  /** The season associated with the trend (e.g., winter, summer) */
  season: 'winter' | 'spring' | 'summer' | 'fall';
  /** The total usage recorded during the season */
  usage: number;
  /** The rate of change in usage compared to the previous season */
  changeRate: number;
}

/**
 * Describes the geographic distribution of usage across different regions.
 * Includes aggregated region data and identifies the most and least active regions.
 * @example
 * {
 *   regions: [
 *     { region: 'North America', usage: 4500, percentage: 30 },
 *     { region: 'Asia', usage: 6000, percentage: 40 }
 *   ],
 *   mostActiveRegion: 'Asia',
 *   leastActiveRegion: 'Europe'
 * }
 * @developerNotes Ensure `regions` array is populated with valid `RegionUsage` objects. `mostActiveRegion` and `leastActiveRegion` must match region names in the `regions` array.
 */
export interface GeographicDistribution {
  /** An array of region-specific usage data */
  regions: RegionUsage[];
  /** The region with the highest usage */
  mostActiveRegion: string;
  /** The region with the lowest usage */
  leastActiveRegion: string;
}

/**
 * Represents usage statistics for a specific geographic region.
 * @example
 * { region: 'Europe', usage: 2500, percentage: 16.7 }
 * @developerNotes Ensure `percentage` reflects the proportion of total usage relative to all regions.
 */
export interface RegionUsage {
  /** The name of the geographic region */
  region: string;
  /** The total usage recorded in the region */
  usage: number;
  /** The percentage of total usage attributed to this region */
  percentage: number;
}
