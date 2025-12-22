/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

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
  /** Rating given to the response (1-5) */
  rating: number;
  /** Any additional notes about the response */
  notes: string | null;
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
}
