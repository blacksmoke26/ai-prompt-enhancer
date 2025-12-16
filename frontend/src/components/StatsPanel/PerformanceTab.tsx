/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {PerformanceTabProps} from '~/components/StatsPanel/types.ts';

/**
 * PerformanceTab component displays various performance metrics and visualizations
 * for model performance, efficiency scores, and enhancement type efficiency.
 *
 * @example
 * <PerformanceTab
 *   stats={stats}
 *   modelPerformanceData={modelData}
 *   enhancementFrequencyData={enhancementData}
 *   topPerformingModels={topModels}
 *   COLORS={colorPalette}
 * />
 *
 * @developer-notes
 * - Uses Recharts for data visualization
 * - Responsive design with grid layout
 * - Handles empty data states gracefully
 * - Color coding for different metrics
 */
const PerformanceTab: React.FC<PerformanceTabProps> = ({
  stats,
  modelPerformanceData,
  enhancementFrequencyData,
  topPerformingModels,
  COLORS
}) => {
  return (
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
  );
};

export default PerformanceTab;
