/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';

// hooks
import {useHistory} from '~/hooks/useHistory';

// helpers
import {formatDuration, formatPercentage} from '~/utils/helpers';

// ui components
import {Card, CardContent, CardHeader, CardTitle} from '../ui/Card';
import {Badge} from '../ui/Badge';
import {Button} from '../ui/Button';
import {RefreshCw} from 'lucide-react';

// components
import OverviewTab from './OverviewTab';
import UsageTab from './UsageTab';
import PerformanceTab from './PerformanceTab';
import DistributionTab from './DistributionTab';

// types
import type {StatsPanelProps} from './types';

/**
 * Statistics panel component displaying usage analytics, performance metrics, and distribution charts.
 *
 * @example
 * ```tsx
 * <StatsPanel />
 * ```
 *
 * @developerNotes
 * - Uses `useHistory` hook to fetch stats data
 * - Implements tabbed interface for different views (Overview, Usage, Performance, Distribution)
 * - Handles sorting of model performance data
 * - Calculates derived metrics like tokens per second, average processing time
 * - Renders system prompt usage statistics with progress bar
 */
const StatsPanel: React.FC<StatsPanelProps> = () => {
  const {stats, loadStats} = useHistory();
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'performance' | 'distribution'>('overview');
  const [loading, setLoading] = useState(false);

  // Calculate derived metrics
  const totalItems = stats?.totalItems ?? 0;
  const totalTokens = stats?.totalTokensUsed ?? 0;
  const avgProcessing = stats?.averageProcessingTime ?? 0;
  const mostUsedModel = stats?.mostUsedModel ?? 'N/A';
  const mostUsedEnhancement = stats?.mostUsedEnhancementType ?? 'N/A';
  const avgTokensPerPrompt = totalItems ? Math.round(totalTokens / totalItems) : 0;
  const totalProcessingSeconds = avgProcessing * totalItems;
  const tokensPerSecond = totalProcessingSeconds ? Math.round(totalTokens / totalProcessingSeconds) : 0;
  const avgRating = stats?.averageRating ?? 0;
  const topRatedEntries = stats?.topRatedEntries ?? 0;
  const avgTemperature = stats?.averageTemperature ?? 0;

  // Prepare chart data
  const providerUsageData = stats?.providerUsage || [];
  const mostUsedRolesData = stats?.mostUsedRoles || [];
  const temperatureDistributionData = stats?.temperatureDistribution || [];
  const enhancementFrequencyData = stats?.enhancementFrequency || [];
  const modelPerformanceData = stats?.modelPerformance || [];
  const monthlyUsageData = stats?.monthlyUsage || [];
  const ratingDistributionData = stats?.ratingDistribution || [];
  const preferredTimeSlotsData = stats?.preferredTimeSlots || [];

  // Chart colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  // Calculate percentage for token usage bar
  const maxTokens = 1_000_000;
  const usagePercent = Math.min((totalTokens / maxTokens) * 100, 100);

  // Format date range
  const dateRange = stats?.dateRange;
  const dateRangeString = dateRange
    ? `${(new Date(dateRange.earliest))?.toLocaleDateString()} - ${(new Date(dateRange.latest))?.toLocaleDateString?.()}`
    : 'N/A';

  try {
    modelPerformanceData
      .sort((a, b) => b?.avgProcessingTime - a?.avgProcessingTime);
  } catch {
    // do nothing
  }

  // Get top performing models
  const topPerformingModels = modelPerformanceData
    .slice(0, 3)
    .map((model, index) => (
      <div key={index} className="flex items-center justify-between py-1">
        <span className="text-sm">{model.model}</span>
        <span className="text-sm font-medium">{formatDuration(model.avgProcessingTime)}</span>
      </div>
    ));

  const handleRefresh = async () => {
    try {
      setLoading(true);
      await loadStats();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Statistics Dashboard</span>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {totalItems} prompts
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={loading}
              aria-label="Refresh stats"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tabs for different views */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'usage' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('usage')}
          >
            Usage Patterns
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'performance' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'distribution' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('distribution')}
          >
            Distribution
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <OverviewTab
            stats={stats}
            totalItems={totalItems}
            totalTokens={totalTokens}
            avgProcessing={avgProcessing}
            mostUsedModel={mostUsedModel}
            mostUsedEnhancement={mostUsedEnhancement}
            avgTokensPerPrompt={avgTokensPerPrompt}
            totalProcessingSeconds={totalProcessingSeconds}
            tokensPerSecond={tokensPerSecond}
            avgRating={avgRating}
            topRatedEntries={topRatedEntries}
            avgTemperature={avgTemperature}
            providerUsageData={providerUsageData}
            mostUsedRolesData={mostUsedRolesData}
            temperatureDistributionData={temperatureDistributionData}
            enhancementFrequencyData={enhancementFrequencyData}
            modelPerformanceData={modelPerformanceData}
            monthlyUsageData={monthlyUsageData}
            ratingDistributionData={ratingDistributionData}
            preferredTimeSlotsData={preferredTimeSlotsData}
            COLORS={COLORS}
            maxTokens={maxTokens}
            usagePercent={usagePercent}
            dateRange={dateRange}
            dateRangeString={dateRangeString}
            topPerformingModels={topPerformingModels}
          />
        )}

        {/* Usage Patterns Tab */}
        {activeTab === 'usage' && (
          <UsageTab
            stats={stats}
            providerUsageData={providerUsageData}
            mostUsedRolesData={mostUsedRolesData}
            monthlyUsageData={monthlyUsageData}
            preferredTimeSlotsData={preferredTimeSlotsData}
            totalItems={totalItems}
            COLORS={COLORS}
          />
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <PerformanceTab
            stats={stats}
            modelPerformanceData={modelPerformanceData}
            enhancementFrequencyData={enhancementFrequencyData}
            topPerformingModels={topPerformingModels}
            COLORS={COLORS}
          />
        )}

        {/* Distribution Tab */}
        {activeTab === 'distribution' && (
          <DistributionTab
            stats={stats}
            temperatureDistributionData={temperatureDistributionData}
            ratingDistributionData={ratingDistributionData}
            enhancementFrequencyData={enhancementFrequencyData}
            COLORS={COLORS}
          />
        )}

        {/* System Prompt Usage */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">System Prompt Usage</h3>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-medium">Used:</span> {stats?.systemPromptUsage?.used || 0}
            </div>
            <div className="text-sm">
              <span className="font-medium">Not Used:</span> {stats?.systemPromptUsage?.notUsed || 0}
            </div>
            <div className="text-sm">
              <span className="font-medium">Percentage:</span> {formatPercentage(stats?.systemPromptUsage?.percentage)}
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded h-4">
            <div
              className="bg-blue-500 h-full rounded"
              style={{width: `${(stats?.systemPromptUsage?.percentage || 0)}%`}}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
