/**
 * @fileoverview Statistics panel component for displaying AI prompt usage metrics.
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';

// helpers
import {formatDuration, formatNumber, formatPercentage, formatTimeRange} from '~/utils/helpers';

// hooks
import {useHistory} from '~/hooks/useHistory';

// components
import {Badge} from '../ui/Badge';
import {Card, CardContent, CardHeader, CardTitle} from '../ui/Card';

// chart components
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
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// types

/**
 * Props for the StatsPanel component.
 * @remarks
 * The component is resilient to missing fields – when optional
 * statistics are not available a fallback of `0` or `"N/A"` is shown.
 * @example
 * ```typescript
 * <StatsPanel />
 * ```
 * @developerNotes Pass null or undefined stats to show empty state with zeros
 */
export interface StatsPanelProps {
}

/**
 * Statistics panel component displaying AI prompt usage metrics with advanced charts.
 * @example
 * ```typescript
 * <StatsPanel
 *   stats={{
 *     totalItems: 50,
 *     totalTokensUsed: 25000,
 *     averageProcessingTime: 1.5,
 *     mostUsedModel: 'gpt-3.5-turbo',
 *     mostUsedEnhancementType: 'expand'
 *   }}
 * />
 * ```
 * @developerNotes Component automatically calculates derived metrics like averages and rates
 */
const StatsPanel: React.FC<StatsPanelProps> = () => {
  const {stats} = useHistory();
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'performance' | 'distribution'>('overview');

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
        <span className="text-sm font-medium">{formatTimeRange(model.avgProcessingTime)}</span>
      </div>
    ));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Statistics Dashboard</span>
          <Badge variant="secondary" className="text-xs">
            {totalItems} prompts
          </Badge>
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
        )}

        {/* Usage Patterns Tab */}
        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Usage Chart */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Monthly Usage</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyUsageData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="month"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="count" fill="#3b82f6" name="Prompts"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Peak Usage Hours */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Peak Usage Hours</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={preferredTimeSlotsData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="hour"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                      <Line type="monotone" dataKey="count" stroke="#10b981" name="Usage Count" strokeWidth={2}/>
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Provider Usage Table */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Provider & Model Usage</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {providerUsageData.length ? (
                    providerUsageData.map((pu, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 whitespace-nowrap">{pu.provider}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{pu.model}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{pu.count}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {formatPercentage(pu.count / totalItems)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-2 text-sm" colSpan={4}>
                        No provider usage data available.
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Most Used Roles */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Most Used Roles</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                  {mostUsedRolesData.length ? (
                    mostUsedRolesData.map((r, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 whitespace-nowrap">{r.role}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{r.count}</td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {formatPercentage(r.count / totalItems)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-2 text-sm" colSpan={3}>
                        No role usage data available.
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Model Performance */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Model Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="model"/>
                      <YAxis yAxisId="left"/>
                      <YAxis yAxisId="right" orientation="right"/>
                      <Tooltip/>
                      <Legend/>
                      <Bar yAxisId="left" dataKey="avgProcessingTime" fill="#3b82f6" name="Avg. Time (s)"/>
                      <Bar yAxisId="right" dataKey="totalUsage" fill="#10b981" name="Total Usage"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Efficiency Metrics */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Top Performing Models</h3>
                <div className="space-y-2">
                  {topPerformingModels.length > 0 ? (
                    topPerformingModels
                  ) : (
                    <p className="text-sm text-muted-foreground">No performance data available</p>
                  )}
                </div>
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Efficiency Score</h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={modelPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="model"/>
                        <YAxis/>
                        <Tooltip/>
                        <Area type="monotone" dataKey="avgProcessingTime" stroke="#8b5cf6" fill="#8b5cf6"
                              fillOpacity={0.3} name="Processing Time"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhancement Type Efficiency */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Enhancement Type Efficiency</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats?.enhancementTypeEfficiency || []}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="type"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="avgProcessingTime" fill="#3b82f6" name="Avg. Processing Time (s)"/>
                    <Bar dataKey="successRate" fill="#10b981" name="Success Rate"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Distribution Tab */}
        {activeTab === 'distribution' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Temperature Distribution */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Temperature Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={temperatureDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({name, percent}) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                      >
                        {temperatureDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                      </Pie>
                      <Tooltip/>
                      <Legend/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Rating Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingDistributionData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="rating"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="count" fill="#f59e0b" name="Count"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Enhancement Type Frequency */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Enhancement Type Frequency</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={enhancementFrequencyData}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="type"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="count" fill="#3b82f6" name="Count"/>
                    <Bar dataKey="percentage" fill="#10b981" name="Percentage"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Text Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-1">Total Words</div>
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(stats?.totalWords ?? 0)}
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-1">Total Lines</div>
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(stats?.totalLines ?? 0)}
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-1">Total Characters</div>
                <div className="text-2xl font-bold text-primary">
                  {formatNumber(stats?.totalChars ?? 0)}
                </div>
              </div>
            </div>
          </div>
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
