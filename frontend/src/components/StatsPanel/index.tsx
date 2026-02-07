/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import {
  Activity,
  BarChart3,
  Clock,
  DollarSign,
  Download,
  PieChart,
  RefreshCw,
  Settings,
  Target,
  TrendingUp,
} from 'lucide-react';

// hooks
import {useHistory} from '~/hooks/useHistory';

// helpers
import {formatDuration, formatNumber, formatPercentage} from '~/utils/helpers';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Button} from '~/components/ui/Button';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';
import {Progress} from '@radix-ui/themes';
import {Switch} from '~/components/ui/Switch';

// types
import type {HistoryStatistics} from '~/types/history-service';

// Chart components
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

export interface StatsPanelProps {
  // Props for the main StatsPanel component
}

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
 * - Implements tabbed interface for different views (Overview, Usage, Performance, Distribution, Cost)
 * - Handles sorting of model performance data
 * - Calculates derived metrics like tokens per second, average processing time
 * - Renders system prompt usage statistics with progress bar
 * - Uses Radix UI components for enhanced UI experience
 * - Integrates Recharts for advanced data visualization
 */
const StatsPanel: React.FC<StatsPanelProps> = () => {
  const {stats, loadStats} = useHistory();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'usage' | 'performance' | 'distribution' | 'cost' | 'advanced'
  >('overview');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);

  // Check if we're on client side for proper rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

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
  const promptEnhancementRatio = stats?.promptEnhancementRatio ?? 0;
  const systemPromptUsage = stats?.systemPromptUsage ?? {used: 0, notUsed: 0, percentage: 0};
  const costAnalysis = stats?.costAnalysis ?? {totalEstimatedCost: 0, avgCostPerRequest: 0};

  // Prepare chart data
  const providerUsageData = stats?.providerUsage || [];
  const mostUsedRolesData = stats?.mostUsedRoles || [];
  const temperatureDistributionData = stats?.temperatureDistribution || [];
  const enhancementFrequencyData = stats?.enhancementFrequency || [];
  const modelPerformanceData = stats?.modelPerformance || [];
  const monthlyUsageData = stats?.monthlyUsage || [];
  const ratingDistributionData = stats?.ratingDistribution || [];
  const preferredTimeSlotsData = stats?.preferredTimeSlots || [];
  const roleModelDistributionData = stats?.roleModelDistribution || [];
  const enhancementTypeEfficiencyData = stats?.enhancementTypeEfficiency || [];
  const targetAudienceUsageData = stats?.targetAudienceUsage || [];
  const toneUsageData = stats?.toneUsage || [];
  const responseLengthUsageData = stats?.responseLengthUsage || [];
  const formatUsageData = stats?.formatUsage || [];
  const topKUsageData = stats?.topKUsage || [];
  const topPUsageData = stats?.topPUsage || [];
  const frequencyPenaltyUsageData = stats?.frequencyPenaltyUsage || [];
  const presencePenaltyUsageData = stats?.presencePenaltyUsage || [];
  const conversationIdUsageData = stats?.conversationIdUsage || [];
  const costBreakdownData = stats?.costBreakdown || {};
  const modelMetricsData = stats?.modelMetrics || [];
  const contentComplexity = stats?.contentComplexity || {};
  const seasonalPatterns = stats?.seasonalPatterns || {};
  const geographicDistribution = stats?.geographicDistribution || {};
  const errorStatistics = stats?.errorStatistics || {};
  const userActivity = stats?.userActivity || {};
  const performanceTrends = stats?.performanceTrends || {};
  const processingTimePercentiles = stats?.processingTimePercentiles || {};
  const tokenUsagePercentiles = stats?.tokenUsagePercentiles || {};
  const systemHealth = stats?.systemHealth || {};

  // Chart colors
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#84cc16'];

  // Calculate percentage for token usage bar
  const maxTokens = 1_000_000;
  const usagePercent = Math.min((totalTokens / maxTokens) * 100, 100);

  // Format date range
  const dateRange = stats?.dateRange;
  const dateRangeString = dateRange
    ? `${new Date(dateRange.earliest).toLocaleDateString()} - ${new Date(dateRange.latest).toLocaleDateString()}`
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

  // Export functionality
  const handleExport = async (format: 'csv' | 'json') => {
    // Mock export functionality - in real implementation, this would actually export data
    console.log(`Exporting data as ${format}`);

    // Create mock data for export
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        dateRange: dateRangeString,
        format: format,
        totalRecords: totalItems,
      },
      stats: stats,
      charts: {},
      rawData: {},
    };

    // Create blob and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stats-export-${new Date().toISOString().slice(0, 10)}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Only render on client side to avoid SSR issues with Radix components
  if (!isClient) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Statistics Dashboard</span>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                Loading...
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground"/>
            <p className="mt-2 text-muted-foreground">Loading statistics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-4">
      {/* Tabs for different views */}
      <RadixTabs.Root
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
        className="w-full"
      >
        <RadixTabs.List
          className="flex flex-wrap border-b border-gray-200 dark:border-gray-700 gap-2"
          aria-label="Statistics tabs"
        >
          <RadixTabs.Trigger
            className="px-4 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground hover:text-primary transition-colors"
            value="overview"
          >
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4"/>
              Overview
            </div>
          </RadixTabs.Trigger>
          <RadixTabs.Trigger
            className="px-4 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground hover:text-primary transition-colors"
            value="usage"
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4"/>
              Usage Patterns
            </div>
          </RadixTabs.Trigger>
          <RadixTabs.Trigger
            className="px-4 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground hover:text-primary transition-colors"
            value="performance"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4"/>
              Performance
            </div>
          </RadixTabs.Trigger>
          <RadixTabs.Trigger
            className="px-4 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground hover:text-primary transition-colors"
            value="distribution"
          >
            <div className="flex items-center gap-2">
              <PieChart className="h-4 w-4"/>
              Distribution
            </div>
          </RadixTabs.Trigger>
          <RadixTabs.Trigger
            className="px-4 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground hover:text-primary transition-colors"
            value="cost"
          >
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4"/>
              Cost Analysis
            </div>
          </RadixTabs.Trigger>
          <RadixTabs.Trigger
            className="px-4 py-2 text-sm font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary text-muted-foreground hover:text-primary transition-colors"
            value="advanced"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4"/>
              Advanced
            </div>
          </RadixTabs.Trigger>
        </RadixTabs.List>

        <RadixTabs.Content value="overview" className="mt-4">
          <OverviewTab
            stats={stats as HistoryStatistics}
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
            promptEnhancementRatio={promptEnhancementRatio}
            systemPromptUsage={systemPromptUsage}
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
            dateRange={dateRange as any}
            dateRangeString={dateRangeString}
            topPerformingModels={topPerformingModels}
            costAnalysis={costAnalysis}
            enhancementTypeEfficiencyData={enhancementTypeEfficiencyData}
          />
        </RadixTabs.Content>

        <RadixTabs.Content value="usage" className="mt-4">
          <UsageTab
            stats={stats as HistoryStatistics}
            providerUsageData={providerUsageData}
            mostUsedRolesData={mostUsedRolesData}
            monthlyUsageData={monthlyUsageData}
            preferredTimeSlotsData={preferredTimeSlotsData}
            roleModelDistributionData={roleModelDistributionData}
            totalItems={totalItems}
            COLORS={COLORS}
            targetAudienceUsageData={targetAudienceUsageData}
            toneUsageData={toneUsageData}
            responseLengthUsageData={responseLengthUsageData}
            formatUsageData={formatUsageData}
          />
        </RadixTabs.Content>

        <RadixTabs.Content value="performance" className="mt-4">
          <PerformanceTab
            stats={stats as HistoryStatistics}
            modelPerformanceData={modelPerformanceData}
            enhancementFrequencyData={enhancementFrequencyData}
            enhancementTypeEfficiencyData={enhancementTypeEfficiencyData}
            topPerformingModels={topPerformingModels}
            COLORS={COLORS}
            modelMetricsData={modelMetricsData as any}
            contentComplexity={contentComplexity as any}
            seasonalPatterns={seasonalPatterns as any}
            performanceTrends={performanceTrends as any}
            processingTimePercentiles={processingTimePercentiles as any}
            tokenUsagePercentiles={tokenUsagePercentiles as any}
            systemHealth={systemHealth as any}
            errorStatistics={errorStatistics as any}
            userActivity={userActivity as any}
          />
        </RadixTabs.Content>

        <RadixTabs.Content value="distribution" className="mt-4">
          <DistributionTab
            stats={stats as HistoryStatistics}
            temperatureDistributionData={temperatureDistributionData}
            ratingDistributionData={ratingDistributionData}
            enhancementFrequencyData={enhancementFrequencyData}
            COLORS={COLORS}
            topKUsageData={topKUsageData}
            topPUsageData={topPUsageData}
            frequencyPenaltyUsageData={frequencyPenaltyUsageData}
            presencePenaltyUsageData={presencePenaltyUsageData}
            conversationIdUsageData={conversationIdUsageData}
          />
        </RadixTabs.Content>

        <RadixTabs.Content value="cost" className="mt-4">
          <CostAnalysisTab
            stats={stats as HistoryStatistics}
            costBreakdownData={costBreakdownData as any}
            costAnalysis={costAnalysis}
            COLORS={COLORS}
          />
        </RadixTabs.Content>

        <RadixTabs.Content value="advanced" className="mt-4">
          <AdvancedTab
            geographicDistribution={geographicDistribution}
            stats={stats as HistoryStatistics}
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
            promptEnhancementRatio={promptEnhancementRatio}
            systemPromptUsage={systemPromptUsage}
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
            dateRange={dateRange as any}
            dateRangeString={dateRangeString}
            topPerformingModels={topPerformingModels}
            costAnalysis={costAnalysis}
            showAdvancedMetrics={showAdvancedMetrics}
            setShowAdvancedMetrics={setShowAdvancedMetrics}
          />
        </RadixTabs.Content>
      </RadixTabs.Root>

      {/* System Prompt Usage */}
      <div className="p-4 bg-muted/50 rounded-lg">
        <h3 className="text-lg font-medium mb-4">System Prompt Usage</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">
            <span className="font-medium">Used:</span> {systemPromptUsage.used || 0}
          </div>
          <div className="text-sm">
            <span className="font-medium">Not Used:</span> {systemPromptUsage.notUsed || 0}
          </div>
          <div className="text-sm">
            <span className="font-medium">Percentage:</span> {formatPercentage(systemPromptUsage.percentage)}
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-4">
          <div
            className="bg-blue-500 h-full rounded transition-all duration-500"
            style={{width: `${usagePercent}%`}}
          />
        </div>
      </div>
    </div>
  );
};

// OverviewTab Component
interface OverviewTabProps {
  stats: HistoryStatistics;
  totalItems: number;
  totalTokens: number;
  avgProcessing: number;
  mostUsedModel: string;
  mostUsedEnhancement: string;
  avgTokensPerPrompt: number;
  totalProcessingSeconds: number;
  tokensPerSecond: number;
  avgRating: number;
  topRatedEntries: number;
  avgTemperature: number;
  promptEnhancementRatio: number;
  systemPromptUsage: {
    used: number;
    notUsed: number;
    percentage: number;
  };
  providerUsageData: {
    provider: string;
    model: string;
    count: number;
  }[];
  mostUsedRolesData: {
    role: string;
    count: number;
  }[];
  temperatureDistributionData: {
    range: string;
    count: number;
  }[];
  enhancementFrequencyData: {
    type: string;
    count: number;
    percentage: number;
  }[];
  modelPerformanceData: {
    model: string;
    avgProcessingTime: number;
    totalUsage: number;
  }[];
  monthlyUsageData: {
    month: string;
    count: number;
  }[];
  ratingDistributionData: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  preferredTimeSlotsData: {
    hour: number;
    count: number;
    percentage: number;
  }[];
  COLORS: string[];
  maxTokens: number;
  usagePercent: number;
  dateRange: {
    earliest: Date;
    latest: Date;
  } | null;
  dateRangeString: string;
  topPerformingModels: React.ReactNode[];
  enhancementTypeEfficiencyData?: {
    type: string;
    avgProcessingTime: number;
    avgTokensUsed: number;
    successRate: number;
  }[];
  costAnalysis: {
    totalEstimatedCost: number;
    avgCostPerRequest: number;
  };
}

const OverviewTab: React.FC<OverviewTabProps> = (props) => {
  const {
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
    promptEnhancementRatio,
    systemPromptUsage,
    providerUsageData,
    enhancementFrequencyData,
    modelPerformanceData,
    COLORS,
    maxTokens,
    usagePercent,
    dateRangeString,
    enhancementTypeEfficiencyData = [],
    costAnalysis,
  } = props;

  // Prepare data for charts
  const providerUsageChartData = providerUsageData.map(item => ({
    name: `${item.provider} - ${item.model}`,
    value: item.count,
  }));

  const enhancementFrequencyChartData = enhancementFrequencyData.map(item => ({
    name: item.type,
    value: item.count,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary"/>
              <span>Total Prompts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatNumber(totalItems)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {formatPercentage(promptEnhancementRatio)} enhanced
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary"/>
              <span>Avg. Processing Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatDuration(avgProcessing)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {formatNumber(tokensPerSecond)} tokens/sec
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary"/>
              <span>Total Tokens</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {formatNumber(totalTokens)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {formatNumber(avgTokensPerPrompt)} avg per prompt
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary"/>
              <span>Cost</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              ${formatNumber(costAnalysis.totalEstimatedCost)}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              ${formatNumber(costAnalysis.avgCostPerRequest)} avg per request
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Rating</span>
              <span className="font-bold">{avgRating.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Top-Rated Entries</span>
              <span className="font-bold">{formatNumber(topRatedEntries)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Temperature</span>
              <span className="font-bold">{avgTemperature.toFixed(1)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">System Prompt Usage</span>
              <span className="font-bold">{formatPercentage(systemPromptUsage.percentage)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Usage Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Most Used Model</span>
              <span className="font-bold">{mostUsedModel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Most Used Enhancement</span>
              <span className="font-bold capitalize">{mostUsedEnhancement}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Peak Usage Hour</span>
              <span className="font-bold">
                {stats?.peakUsageHour?.hour !== undefined ? `${stats.peakUsageHour.hour}:00` : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Date Range</span>
              <span className="font-bold">{dateRangeString}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Processing Time</span>
              <span className="font-bold">{formatDuration(totalProcessingSeconds)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg. Tokens/Second</span>
              <span className="font-bold">{formatNumber(tokensPerSecond)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Enhancement Ratio</span>
              <span className="font-bold">{formatPercentage(promptEnhancementRatio)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Model Efficiency</span>
              <span className="font-bold">
                {modelPerformanceData.length > 0
                  ? `${formatNumber(modelPerformanceData[0].totalUsage)} uses`
                  : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Provider Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={providerUsageChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {providerUsageChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Enhancement Frequency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={enhancementFrequencyChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {enhancementFrequencyChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Pie>
                  <Tooltip/>
                  <Legend/>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Token Usage Bar */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Token Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm mb-2">
            <span className="font-medium">Usage: </span>
            <span className="text-primary">{formatNumber(totalTokens)} tokens</span>
            <span className="mx-2">|</span>
            <span className="font-medium">Max: </span>
            <span className="text-primary">{formatNumber(maxTokens)} tokens</span>
            <span className="mx-2">|</span>
            <span className="font-medium">Percentage: </span>
            <span className="text-primary">{percentage(usagePercent)}%</span>
          </div>
          <Progress
            value={parseInt(percentage(usagePercent))}
            className="h-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>1M tokens</span>
          </div>
        </CardContent>
      </Card>

      {/* Most Used Model and Enhancement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Most Used Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary">{mostUsedModel}</div>
            <div className="text-sm text-muted-foreground mt-1">
              {modelPerformanceData.find(m => m.model === mostUsedModel)?.totalUsage || 0} usage
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Avg. Processing Time</span>
                <span>
                  {formatDuration(
                    modelPerformanceData.find(m => m.model === mostUsedModel)?.avgProcessingTime || 0,
                  )}
                </span>
              </div>
              <Progress
                value={
                  parseInt(percentage((modelPerformanceData.find(m => m.model === mostUsedModel)?.avgProcessingTime || 0) / 1000))
                }
                max={5000}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Most Used Enhancement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-primary capitalize">
              {mostUsedEnhancement}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {enhancementFrequencyData.find(e => e.type === mostUsedEnhancement)?.count || 0} usage
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Success Rate</span>
                <span>
                  {enhancementTypeEfficiencyData.find(e => e.type === mostUsedEnhancement)
                    ? percentage(enhancementTypeEfficiencyData.find(e => e.type === mostUsedEnhancement)!.successRate)
                    : 'N/A'}
                </span>
              </div>
              <Progress
                value={
                  parseInt(percentage(enhancementTypeEfficiencyData.find(e => e.type === mostUsedEnhancement)
                    ? enhancementTypeEfficiencyData.find(e => e.type === mostUsedEnhancement)!.successRate * 100
                    : 0))
                }
                className="h-2"
              />
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// UsageTab Component
interface UsageTabProps {
  stats: HistoryStatistics;
  providerUsageData: {
    provider: string;
    model: string;
    count: number;
  }[];
  mostUsedRolesData: {
    role: string;
    count: number;
  }[];
  monthlyUsageData: {
    month: string;
    count: number;
  }[];
  preferredTimeSlotsData: {
    hour: number;
    count: number;
    percentage: number;
  }[];
  roleModelDistributionData: {
    role: string;
    model: string;
    count: number;
  }[];
  totalItems: number;
  COLORS: string[];
  targetAudienceUsageData: {
    audience: string;
    count: number;
    percentage: number;
  }[];
  toneUsageData: {
    tone: string;
    count: number;
    percentage: number;
  }[];
  responseLengthUsageData: {
    length: string;
    count: number;
    percentage: number;
  }[];
  formatUsageData: {
    format: string;
    count: number;
    percentage: number;
  }[];
}

const UsageTab: React.FC<UsageTabProps> = (props) => {
  const {
    monthlyUsageData,
    preferredTimeSlotsData,
    COLORS,
    targetAudienceUsageData,
    toneUsageData,
    responseLengthUsageData,
    formatUsageData,
  } = props;

  // Prepare data for charts
  const monthlyUsageChartData = monthlyUsageData.map(item => ({
    name: item.month,
    value: item.count,
  }));

  const preferredTimeSlotsChartData = preferredTimeSlotsData.map(item => ({
    name: `${item.hour}:00`,
    value: item.count,
  }));

  const targetAudienceChartData = targetAudienceUsageData.map(item => ({
    name: item.audience,
    value: item.count,
  }));

  const toneUsageChartData = toneUsageData.map(item => ({
    name: item.tone,
    value: item.count,
  }));

  const responseLengthChartData = responseLengthUsageData.map(item => ({
    name: item.length,
    value: item.count,
  }));

  const formatUsageChartData = formatUsageData.map(item => ({
    name: item.format,
    value: item.count,
  }));

  return (
    <div className="space-y-6">
      {/* Usage Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyUsageChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Line type="monotone" dataKey="value" name="Usage Count" stroke={COLORS[0]} strokeWidth={2}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Peak Usage Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={preferredTimeSlotsChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {preferredTimeSlotsChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audience and Preference Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Target Audience Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={targetAudienceChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {targetAudienceChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Tone Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={toneUsageChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {toneUsageChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Pie>
                  <Tooltip/>
                  <Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Length and Format Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Response Length Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={responseLengthChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {responseLengthChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Output Format Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formatUsageChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {formatUsageChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Pie>
                  <Tooltip/>
                  <Legend/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// PerformanceTab Component
interface PerformanceTabProps {
  stats: HistoryStatistics;
  modelPerformanceData: {
    model: string;
    avgProcessingTime: number;
    totalUsage: number;
  }[];
  enhancementFrequencyData: {
    type: string;
    count: number;
    percentage: number;
  }[];
  enhancementTypeEfficiencyData: {
    type: string;
    avgProcessingTime: number;
    avgTokensUsed: number;
    successRate: number;
  }[];
  topPerformingModels: React.ReactNode[];
  COLORS: string[];
  modelMetricsData: {
    modelName: string;
    accuracy: number;
    latency: number;
  }[];
  contentComplexity: {
    averageLength: number;
    complexityScore: number;
    complexityTrend: string;
  };
  seasonalPatterns: {
    pattern: string;
    peakMonth: string;
    amplitude: number;
  };
  performanceTrends: {
    trend: string;
    slope: number;
    confidenceInterval: [number, number];
  };
  processingTimePercentiles: {
    p50: number;
    p90: number;
    p99: number;
  };
  tokenUsagePercentiles: {
    p50: number;
    p90: number;
    p99: number;
  };
  systemHealth: {
    uptime: number;
    loadAverage: number;
    cpuUsage: number;
  };
  errorStatistics: {
    totalErrors: number;
    errorRate: number;
    mostCommonErrors: string[];
  };
  userActivity: {
    activeUsers: number;
    sessionCount: number;
    sessionDuration: number;
  };
}

const PerformanceTab: React.FC<PerformanceTabProps> = (props) => {
  const {
    modelPerformanceData,
    enhancementTypeEfficiencyData,
    COLORS,
    contentComplexity,
    processingTimePercentiles,
    tokenUsagePercentiles,
    systemHealth,
    errorStatistics,
  } = props;

  // Prepare data for charts
  const modelPerformanceChartData = modelPerformanceData.map(item => ({
    name: item.model,
    value: item.avgProcessingTime,
  }));

  const enhancementEfficiencyChartData = enhancementTypeEfficiencyData.map(item => ({
    name: item.type,
    processingTime: item.avgProcessingTime,
    tokensUsed: item.avgTokensUsed,
    successRate: item.successRate,
  }));

  const processingTimePercentilesData = [
    {name: 'P50', value: processingTimePercentiles.p50},
    {name: 'P90', value: processingTimePercentiles.p90},
    {name: 'P99', value: processingTimePercentiles.p99},
  ];

  const tokenUsagePercentilesData = [
    {name: 'P50', value: tokenUsagePercentiles.p50},
    {name: 'P90', value: tokenUsagePercentiles.p90},
    {name: 'P99', value: tokenUsagePercentiles.p99},
  ];

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelPerformanceChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Avg. Processing Time (ms)">
                    {modelPerformanceChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Enhancement Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enhancementEfficiencyChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Area type="monotone" dataKey="processingTime" name="Processing Time (ms)" stroke={COLORS[0]}
                        fill={COLORS[0]} fillOpacity={0.3}/>
                  <Area type="monotone" dataKey="tokensUsed" name="Tokens Used" stroke={COLORS[1]} fill={COLORS[1]}
                        fillOpacity={0.3}/>
                  <Area type="monotone" dataKey="successRate" name="Success Rate" stroke={COLORS[2]} fill={COLORS[2]}
                        fillOpacity={0.3}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Percentile Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Processing Time Percentiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processingTimePercentilesData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Time (ms)">
                    {processingTimePercentilesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Token Usage Percentiles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tokenUsagePercentilesData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Tokens">
                    {tokenUsagePercentilesData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health and Error Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Uptime</span>
              <span className="font-bold">{formatNumber(systemHealth.uptime)} seconds</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Load Average</span>
              <span className="font-bold">{systemHealth.loadAverage?.toFixed?.(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">CPU Usage</span>
              <span className="font-bold">{systemHealth.cpuUsage?.toFixed?.(1)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Error Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Total Errors</span>
              <span className="font-bold">{formatNumber(errorStatistics.totalErrors)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Error Rate</span>
              <span className="font-bold">{formatPercentage(errorStatistics.errorRate)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Most Common Errors</span>
              <span className="font-bold">
                {errorStatistics.mostCommonErrors?.join(', ') || 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Complexity */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Content Complexity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Average Length</span>
            <span className="font-bold">{formatNumber(contentComplexity.averageLength)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Complexity Score</span>
            <span className="font-bold">{formatNumber(contentComplexity.complexityScore)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Trend</span>
            <span className="font-bold capitalize">{contentComplexity.complexityTrend || 'N/A'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// DistributionTab Component
interface DistributionTabProps {
  stats: HistoryStatistics;
  temperatureDistributionData: {
    range: string;
    count: number;
  }[];
  ratingDistributionData: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  enhancementFrequencyData: {
    type: string;
    count: number;
    percentage: number;
  }[];
  COLORS: string[];
  topKUsageData: {
    k: number;
    count: number;
    percentage: number;
  }[];
  topPUsageData: {
    p: number;
    count: number;
    percentage: number;
  }[];
  frequencyPenaltyUsageData: {
    penalty: number;
    count: number;
    percentage: number;
  }[];
  presencePenaltyUsageData: {
    penalty: number;
    count: number;
    percentage: number;
  }[];
  conversationIdUsageData: {
    id: string;
    count: number;
    percentage: number;
  }[];
}

const DistributionTab: React.FC<DistributionTabProps> = (props) => {
  const {
    temperatureDistributionData,
    ratingDistributionData,
    enhancementFrequencyData,
    COLORS,
    topKUsageData,
    topPUsageData,
    frequencyPenaltyUsageData,
    presencePenaltyUsageData,
  } = props;

  // Prepare data for charts
  const temperatureDistributionChartData = temperatureDistributionData.map(item => ({
    name: item.range,
    value: item.count,
  }));

  const ratingDistributionChartData = ratingDistributionData.map(item => ({
    name: `${item.rating} stars`,
    value: item.count,
  }));

  const enhancementFrequencyChartData = enhancementFrequencyData.map(item => ({
    name: item.type,
    value: item.count,
  }));

  const topKUsageChartData = topKUsageData.map(item => ({
    name: `k=${item.k}`,
    value: item.count,
  }));

  const topPUsageChartData = topPUsageData.map(item => ({
    name: `p=${item.p}`,
    value: item.count,
  }));

  const frequencyPenaltyChartData = frequencyPenaltyUsageData.map(item => ({
    name: `penalty=${item.penalty}`,
    value: item.count,
  }));

  const presencePenaltyChartData = presencePenaltyUsageData.map(item => ({
    name: `penalty=${item.penalty}`,
    value: item.count,
  }));

  return (
    <div className="space-y-6">
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Temperature Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={temperatureDistributionChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {temperatureDistributionChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Rating Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={ratingDistributionChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {ratingDistributionChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Pie>
                  <Tooltip/>
                  <Legend/>
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Parameter Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Top-K Sampling Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topKUsageChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {topKUsageChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Top-P Sampling Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPUsageChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {topPUsageChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Penalty Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Frequency Penalty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequencyPenaltyChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {frequencyPenaltyChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Presence Penalty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={presencePenaltyChartData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend/>
                  <Bar dataKey="value" name="Usage Count">
                    {presencePenaltyChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhancement Type Distribution */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Enhancement Type Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enhancementFrequencyChartData}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="value" name="Usage Count">
                  {enhancementFrequencyChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// CostAnalysisTab Component
interface CostAnalysisTabProps {
  stats: HistoryStatistics;
  costBreakdownData: {
    apiCalls: number;
    storage: number;
    bandwidth: number;
  };
  costAnalysis: {
    totalEstimatedCost: number;
    avgCostPerRequest: number;
  };
  COLORS: string[];
}

const CostAnalysisTab: React.FC<CostAnalysisTabProps> = (props) => {
  const {
    costBreakdownData,
    costAnalysis,
    COLORS,
  } = props;

  // Prepare data for charts
  const costBreakdownChartData = [
    {name: 'API Calls', value: costBreakdownData.apiCalls},
    {name: 'Storage', value: costBreakdownData.storage},
    {name: 'Bandwidth', value: costBreakdownData.bandwidth},
  ];

  return (
    <div className="space-y-6">
      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary"/>
              <span>Total Estimated Cost</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              ${formatNumber(costAnalysis.totalEstimatedCost)}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary"/>
              <span>Avg. Cost Per Request</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              ${formatNumber(costAnalysis.avgCostPerRequest)}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary"/>
              <span>Cost Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm">API Calls</span>
              <span className="font-bold">${formatNumber(costBreakdownData.apiCalls)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Storage</span>
              <span className="font-bold">${formatNumber(costBreakdownData.storage)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bandwidth</span>
              <span className="font-bold">${formatNumber(costBreakdownData.bandwidth)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Distribution Chart */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Cost Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={costBreakdownChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                >
                  {costBreakdownChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                  ))}
                </Pie>
                <Tooltip/>
                <Legend/>
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cost Trend Analysis */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Cost Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={[
                  {month: 'Jan', cost: 1200},
                  {month: 'Feb', cost: 1400},
                  {month: 'Mar', cost: 1100},
                  {month: 'Apr', cost: 1600},
                  {month: 'May', cost: 1300},
                  {month: 'Jun', cost: 1800},
                ]}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="cost" name="Cost ($)" stroke={COLORS[0]} strokeWidth={2}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// AdvancedTab Component
interface AdvancedTabProps {
  stats: HistoryStatistics;
  totalItems: number;
  totalTokens: number;
  avgProcessing: number;
  mostUsedModel: string;
  mostUsedEnhancement: string;
  avgTokensPerPrompt: number;
  totalProcessingSeconds: number;
  tokensPerSecond: number;
  avgRating: number;
  topRatedEntries: number;
  avgTemperature: number;
  promptEnhancementRatio: number;
  systemPromptUsage: {
    used: number;
    notUsed: number;
    percentage: number;
  };
  providerUsageData: {
    provider: string;
    model: string;
    count: number;
  }[];
  mostUsedRolesData: {
    role: string;
    count: number;
  }[];
  temperatureDistributionData: {
    range: string;
    count: number;
  }[];
  enhancementFrequencyData: {
    type: string;
    count: number;
    percentage: number;
  }[];
  modelPerformanceData: {
    model: string;
    avgProcessingTime: number;
    totalUsage: number;
  }[];
  monthlyUsageData: {
    month: string;
    count: number;
  }[];
  ratingDistributionData: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  preferredTimeSlotsData: {
    hour: number;
    count: number;
    percentage: number;
  }[];
  COLORS: string[];
  maxTokens: number;
  usagePercent: number;
  dateRange: {
    earliest: Date;
    latest: Date;
  } | null;
  dateRangeString: string;
  topPerformingModels: React.ReactNode[];
  costAnalysis: {
    totalEstimatedCost: number;
    avgCostPerRequest: number;
  };
  showAdvancedMetrics: boolean;
  setShowAdvancedMetrics: React.Dispatch<React.SetStateAction<boolean>>;
  geographicDistribution: any;
}

const AdvancedTab: React.FC<AdvancedTabProps> = (props) => {
  const {
    COLORS,
    showAdvancedMetrics,
    setShowAdvancedMetrics,
    geographicDistribution,
  } = props;

  // Prepare geographic distribution data
  const geographicDistributionData = geographicDistribution.regions?.map(region => ({
    name: region.region,
    value: region.usage,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Advanced Metrics Toggle */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Advanced Metrics</span>
            <Switch
              checked={showAdvancedMetrics}
              onCheckedChange={setShowAdvancedMetrics}
              aria-label="Toggle advanced metrics"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {showAdvancedMetrics
              ? 'Advanced metrics are now visible'
              : 'Toggle to show advanced metrics'}
          </p>
        </CardContent>
      </Card>

      {showAdvancedMetrics && (
        <>
          {/* Geographic Distribution Widget */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={geographicDistributionData}>
                    <CartesianGrid/>
                    <XAxis type="number" dataKey="x" name="X"/>
                    <YAxis type="number" dataKey="y" name="Y"/>
                    <ZAxis type="number" dataKey="z" name="Z" range={[100, 1000]}/>
                    <Tooltip/>
                    <Scatter name="Distribution" data={geographicDistributionData} fill={COLORS[0]}/>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm">
                <p className="font-medium">Most Active Region:</p>
                <p>{geographicDistribution.mostActiveRegion || 'N/A'}</p>
                <p className="font-medium mt-2">Least Active Region:</p>
                <p>{geographicDistribution.leastActiveRegion || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      {date: '2023-01', performance: 80},
                      {date: '2023-02', performance: 82},
                      {date: '2023-03', performance: 85},
                      {date: '2023-04', performance: 83},
                      {date: '2023-05', performance: 87},
                      {date: '2023-06', performance: 89},
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="performance" name="Performance Score" stroke={COLORS[0]}
                          strokeWidth={2}/>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

/**
 * Calculate the percentage
 * @param value - The value to calculate the percentage for
 * @returns The percentage as a string
 */
const percentage = (value: number): string => {
  value = value * 100;
  return `${value >= 100 ? 100 : value}%`;
};

export default StatsPanel;
