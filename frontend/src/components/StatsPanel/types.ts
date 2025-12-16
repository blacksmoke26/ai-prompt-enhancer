/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */
import React from 'react';export interface StatsPanelProps {
  // Props for the main StatsPanel component
}

export interface HistoryStats {
  /**
   * Total number of items processed.
   * @example 1250
   * @developer Notes: Represents the total count of prompts or entries in the history.
   */
  totalItems?: number;

  /**
   * Total tokens consumed across all processed items.
   * @example 750000
   * @developer Notes: Used for billing and performance tracking.
   */
  totalTokensUsed?: number;

  /**
   * Average processing time in milliseconds.
   * @example 3200
   * @developer Notes: Helps in understanding system performance.
   */
  averageProcessingTime?: number;

  /**
   * Name of the most frequently used model.
   * @example "gpt-4"
   * @developer Notes: Identifies the preferred model for usage patterns.
   */
  mostUsedModel?: string;

  /**
   * Most frequently used enhancement type.
   * @example "auto-correct"
   * @developer Notes: Used to understand user preference in enhancements.
   */
  mostUsedEnhancementType?: string;

  /**
   * Average rating score of all items.
   * @example 4.3
   * @developer Notes: Reflects overall quality or user satisfaction.
   */
  averageRating?: number;

  /**
   * Number of top-rated entries.
   * @example 25
   * @developer Notes: Helps in identifying high-quality content.
   */
  topRatedEntries?: number;

  /**
   * Average temperature value used during processing.
   * @example 0.8
   * @developer Notes: Controls randomness in model responses.
   */
  averageTemperature?: number;

  /**
   * Provider and model usage statistics.
   * @example [{ provider: 'openai', model: 'gpt-4', count: 150 }]
   * @developer Notes: Tracks usage across different providers and models.
   */
  providerUsage?: {
    provider: string;
    model: string;
    count: number;
  }[];

  /**
   * Most used roles in the system.
   * @example [{ role: 'user', count: 120 }]
   * @developer Notes: Indicates which roles are most active.
   */
  mostUsedRoles?: {
    role: string;
    count: number;
  }[];

  /**
   * Distribution of temperature values used.
   * @example [{ name: 'Hot', count: 10 }]
   * @developer Notes: Helps visualize the spread of temperature settings.
   */
  temperatureDistribution?: {
    name: string;
    count: number;
  }[];

  /**
   * Frequency of enhancement types used.
   * @example [{ type: 'Bold', count: 15 }]
   * @developer Notes: Shows how often each type of enhancement is applied.
   */
  enhancementFrequency?: {
    type: string;
    count: number;
  }[];

  /**
   * Model performance metrics.
   * @example [{ model: 'gpt-4', avgProcessingTime: 2500, totalUsage: 1000 }]
   * @developer Notes: Used to compare performance across different models.
   */
  modelPerformance?: {
    model: string;
    avgProcessingTime: number;
    totalUsage: number;
  }[];

  /**
   * Monthly usage trends.
   * @example [{ month: 'Jan', count: 1000 }]
   * @developer Notes: Visualizes usage over time.
   */
  monthlyUsage?: {
    month: string;
    count: number;
  }[];

  /**
   * Distribution of ratings given.
   * @example [{ rating: 5, count: 20 }]
   * @developer Notes: Shows how ratings are distributed across items.
   */
  ratingDistribution?: {
    rating: number;
    count: number;
  }[];

  /**
   * Preferred time slots for usage.
   * @example [{ hour: 9, count: 100 }]
   * @developer Notes: Identifies peak activity times.
   */
  preferredTimeSlots?: {
    hour: number;
    count: number;
  }[];

  /**
   * Date range of the data.
   * @example { earliest: '2024-01-01', latest: '2024-01-31' }
   * @developer Notes: Defines the temporal scope of the history.
   */
  dateRange?: {
    earliest: string;
    latest: string;
  };

  /**
   * Ratio of prompts with enhancements.
   * @example 0.75
   * @developer Notes: Indicates the proportion of enhanced prompts.
   */
  promptEnhancementRatio?: number;

  /**
   * Hour with the highest usage.
   * @example { hour: 14 }
   * @developer Notes: Identifies the peak usage hour.
   */
  peakUsageHour?: {
    hour: number;
  };

  /**
   * Efficiency metrics for different enhancement types.
   * @example [{ type: 'Bold', avgProcessingTime: 100, successRate: 0.95 }]
   * @developer Notes: Measures performance and success rate per enhancement type.
   */
  enhancementTypeEfficiency?: {
    type: string;
    avgProcessingTime: number;
    successRate: number;
  }[];

  /**
   * Total number of words processed.
   * @example 1000
   * @developer Notes: Used for text analysis and volume tracking.
   */
  totalWords?: number;

  /**
   * Total number of lines processed.
   * @example 50
   * @developer Notes: Useful for line-based text analysis.
   */
  totalLines?: number;

  /**
   * Total number of characters processed.
   * @example 5000
   * @developer Notes: Provides insight into text length and volume.
   */
  totalChars?: number;

  /**
   * Usage statistics for system prompts.
   * @example { used: 100, notUsed: 50, percentage: 66.67 }
   * @developer Notes: Tracks usage of system prompts vs. user prompts.
   */
  systemPromptUsage?: {
    used: number;
    notUsed: number;
    percentage: number;
  };
}
/**
 * Props for the DistributionTab component.
 */
export interface DistributionTabProps {
  /**
   * Text statistics including total words, lines, and characters.
   * @example { totalWords: 1000, totalLines: 50, totalChars: 5000 }
   */
  stats: {
    totalWords: number;
    totalLines: number;
    totalChars: number;
  } | null;

  /**
   * Data for temperature distribution chart.
   * @example [{ name: 'Hot', count: 10 }]
   */
  temperatureDistributionData: {
    range: string;
    count: number;
  }[];

  /**
   * Data for rating distribution chart.
   * @example [{ rating: 5, count: 20 }]
   */
  ratingDistributionData: {
    rating: number;
    count: number;
  }[];

  /**
   * Data for enhancement type frequency chart.
   * @example [{ type: 'Bold', count: 15, percentage: 25 }]
   */
  enhancementFrequencyData: {
    type: string;
    count: number;
    percentage?: number;
  }[];

  /**
   * Array of colors for temperature distribution chart segments.
   * @example ['#ff0000', '#00ff00', '#0000ff']
   */
  COLORS: string[];
}

/**
 * Props for the OverviewTab component
 */
export interface OverviewTabProps {
  /**
   * General statistics data
   * @example { promptEnhancementRatio: 0.75, modelPerformance: [...] }
   */
  stats: any;

  /**
   * Total number of prompts processed
   * @example 1250
   */
  totalItems: number;

  /**
   * Total number of tokens used
   * @example 750000
   */
  totalTokens: number;

  /**
   * Average processing time in milliseconds
   * @example 3200
   */
  avgProcessing: number;

  /**
   * Name of the most used model
   * @example "gpt-4"
   */
  mostUsedModel: string;

  /**
   * Name of the most used enhancement type
   * @example "auto-correct"
   */
  mostUsedEnhancement: string;

  /**
   * Average number of tokens per prompt
   * @example 320
   */
  avgTokensPerPrompt: number;

  /**
   * Total processing time in seconds
   * @example 45000
   */
  totalProcessingSeconds: number;

  /**
   * Tokens processed per second
   * @example 15
   */
  tokensPerSecond: number;

  /**
   * Average rating score
   * @example 4.3
   */
  avgRating: number;

  /**
   * Number of top-rated entries
   * @example 25
   */
  topRatedEntries: number;

  /**
   * Average temperature value used
   * @example 0.8
   */
  avgTemperature: number;

  /**
   * Data about provider usage
   * @example [{ provider: 'openai', usage: 80 }, { provider: 'anthropic', usage: 20 }]
   */
  providerUsageData: any[];

  /**
   * Data about most used roles
   * @example [{ role: 'user', count: 120 }, { role: 'assistant', count: 80 }]
   */
  mostUsedRolesData: any[];

  /**
   * Temperature distribution data
   * @example [{ temp: 0.5, count: 50 }, { temp: 0.8, count: 30 }]
   */
  temperatureDistributionData: any[];

  /**
   * Enhancement frequency data
   * @example [{ type: 'auto-correct', count: 100 }, { type: 'summarize', count: 50 }]
   */
  enhancementFrequencyData: any[];

  /**
   * Model performance data
   * @example [{ model: 'gpt-4', avgTime: 2500, totalUsage: 1000 }, { model: 'gpt-3.5', avgTime: 1500, totalUsage: 2000 }]
   */
  modelPerformanceData: any[];

  /**
   * Monthly usage data
   * @example [{ month: 'Jan', count: 1000 }, { month: 'Feb', count: 1200 }]
   */
  monthlyUsageData: any[];

  /**
   * Rating distribution data
   * @example [{ rating: 5, count: 50 }, { rating: 4, count: 75 }]
   */
  ratingDistributionData: any[];

  /**
   * Preferred time slots data
   * @example [{ hour: 9, count: 100 }, { hour: 14, count: 150 }]
   */
  preferredTimeSlotsData: any[];

  /**
   * Color palette for charts
   * @example ['#0000ff', '#00ff00', '#ff0000']
   */
  COLORS: string[];

  /**
   * Maximum tokens allowed
   * @example 1000000
   */
  maxTokens: number;

  /**
   * Percentage of token usage relative to max tokens
   * @example 5
   */
  usagePercent: number;

  /**
   * Date range object
   * @example { start: '2024-01-01', end: '2024-01-31' }
   */
  dateRange: any;

  /**
   * Formatted date range string
   * @example "Last 30 days"
   */
  dateRangeString: string;

  /**
   * Top performing models as React elements
   * @example [<ModelCard />, <ModelCard />]
   */
  topPerformingModels: React.ReactNode[];
}

/**
 * Props for the PerformanceTab component
 */
export interface PerformanceTabProps {
  /**
   * General statistics data
   * @example { enhancementTypeEfficiency: [], ... }
   */
  stats: any;

  /**
   * Data for model performance visualization
   * @example [{ model: 'Model A', avgProcessingTime: 10, totalUsage: 100 }, ...]
   */
  modelPerformanceData: any[];

  /**
   * Data for enhancement frequency visualization
   * @example [{ type: 'Type A', count: 50 }, ...]
   */
  enhancementFrequencyData: any[];

  /**
   * List of top performing models to display
   * @example [<div key="1">Model A</div>, <div key="2">Model B</div>]
   */
  topPerformingModels: React.ReactNode[];

  /**
   * Color palette for chart visualizations
   * @example ['#3b82f6', '#10b981', '#8b5cf6']
   */
  COLORS: string[];
}

/**
 * Props for the UsageTab component
 */
export interface UsageTabProps {
  /**
   * General statistics data
   * @example { totalPrompts: 1000, totalUsers: 50 }
   */
  stats: any;

  /**
   * Data for provider and model usage
   * @example [{ provider: 'OpenAI', model: 'gpt-4', count: 150 }]
   */
  providerUsageData: any[];

  /**
   * Data for most used roles
   * @example [{ role: 'admin', count: 300 }]
   */
  mostUsedRolesData: any[];

  /**
   * Data for monthly usage trends
   * @example [{ month: 'January', count: 120 }]
   */
  monthlyUsageData: any[];

  /**
   * Data for preferred time slots
   * @example [{ hour: 14, count: 45 }]
   */
  preferredTimeSlotsData: any[];

  /**
   * Total number of items for percentage calculations
   * @example 1000
   */
  totalItems: number;

  /**
   * Color palette for charts
   * @example ['#3b82f6', '#10b981']
   */
  COLORS: string[];
}
