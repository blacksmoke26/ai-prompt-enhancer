/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// utils
import {formatDuration, formatNumber, formatPercentage} from '~/utils/helpers';
import {OverviewTabProps} from '~/components/StatsPanel/types.ts';

/**
 * OverviewTab component displays a comprehensive dashboard with various metrics and visualizations
 * @example
 * ```tsx
 * <OverviewTab
 *   stats={stats}
 *   totalItems={100}
 *   totalTokens={50000}
 *   avgProcessing={2500}
 *   mostUsedModel="gpt-4"
 *   mostUsedEnhancement="auto-correct"
 *   avgTokensPerPrompt={250}
 *   totalProcessingSeconds={25000}
 *   tokensPerSecond={20}
 *   avgRating={4.5}
 *   topRatedEntries={15}
 *   avgTemperature={0.7}
 *   providerUsageData={[]}
 *   mostUsedRolesData={[]}
 *   temperatureDistributionData={[]}
 *   enhancementFrequencyData={[]}
 *   modelPerformanceData={[]}
 *   monthlyUsageData={[]}
 *   ratingDistributionData={[]}
 *   preferredTimeSlotsData={[]}
 *   COLORS={[]}
 *   maxTokens={1000000}
 *   usagePercent={5}
 *   dateRange={{}}
 *   dateRangeString="Last 30 days"
 *   topPerformingModels={[]}
 * />
 * ```
 * @developerNotes This component displays an overview dashboard with various metrics and visualizations.
 * It includes summary statistics, processing metrics, key performance indicators, token usage visualization,
 * and information about most used models and enhancements.
 */
const OverviewTab: React.FC<OverviewTabProps> = ({
                                                   stats,
                                                   totalItems,
                                                   totalTokens,
                                                   avgProcessing,
                                                   mostUsedModel,
                                                   mostUsedEnhancement,
                                                   avgTokensPerPrompt,
                                                   totalProcessingSeconds,
                                                   tokensPerSecond,
                                                   avgRating,
                                                   topRatedEntries,
                                                   avgTemperature,
                                                   providerUsageData,
                                                   mostUsedRolesData,
                                                   temperatureDistributionData,
                                                   enhancementFrequencyData,
                                                   modelPerformanceData,
                                                   monthlyUsageData,
                                                   ratingDistributionData,
                                                   preferredTimeSlotsData,
                                                   COLORS,
                                                   maxTokens,
                                                   usagePercent,
                                                   dateRange,
                                                   dateRangeString,
                                                   topPerformingModels,
                                                 }) => {
  return (
    <div className="space-y-6">
      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatNumber(totalItems)}
          </div>
          <div className="text-sm text-muted-foreground">Total Prompts</div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatDuration(avgProcessing)}
          </div>
          <div className="text-sm text-muted-foreground">Avg. Processing Time</div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatNumber(totalTokens)}
          </div>
          <div className="text-sm text-muted-foreground">Total Tokens Used</div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatNumber(avgTokensPerPrompt)}
          </div>
          <div className="text-sm text-muted-foreground">Avg. Tokens per Prompt</div>
        </div>
      </div>

      {/* Processing Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatDuration(totalProcessingSeconds)}
          </div>
          <div className="text-sm text-muted-foreground">Total Processing Time</div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-2xl font-bold text-primary">
            {formatNumber(tokensPerSecond)}
          </div>
          <div className="text-sm text-muted-foreground">Tokens per Second</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-1">Average Rating</div>
          <div className="text-2xl font-bold text-primary">
            {avgRating.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {topRatedEntries} top-rated entries
          </div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-1">Average Temperature</div>
          <div className="text-2xl font-bold text-primary">
            {avgTemperature.toFixed(1)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {formatPercentage(stats?.promptEnhancementRatio)}
          </div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-1">Date Range</div>
          <div className="text-2xl font-bold text-primary">
            {dateRangeString}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {stats?.peakUsageHour?.hour !== undefined ? `Peak: ${stats.peakUsageHour.hour}:00` : ''}
          </div>
        </div>
      </div>

      {/* Token Usage Bar */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <div className="text-sm font-medium mb-2">
          Token Usage (relative to 1M tokens)
        </div>
        <div className="w-full bg-gray-200 rounded h-6">
          <div
            className="bg-blue-500 h-full rounded flex items-center justify-center text-xs text-white font-medium"
            style={{width: `${usagePercent ?? 0}%`}}
          >
            {formatNumber(totalTokens)}
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0</span>
          <span>1M tokens</span>
        </div>
      </div>

      {/* Most Used Model and Enhancement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-2">Most Used Model</div>
          <div className="text-xl font-bold text-primary">{mostUsedModel}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {stats?.modelPerformance?.find(m => m.model === mostUsedModel)?.totalUsage || 0} usage
          </div>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-2">Most Used Enhancement</div>
          <div className="text-xl font-bold text-primary capitalize">
            {mostUsedEnhancement}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {enhancementFrequencyData.find(e => e.type === mostUsedEnhancement)?.count || 0} usage
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
