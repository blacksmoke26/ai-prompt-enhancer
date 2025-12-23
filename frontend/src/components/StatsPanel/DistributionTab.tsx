/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// utils
import {formatNumber} from '~/utils/helpers';

// types
import type {DistributionTabProps} from './types';

/**
 * DistributionTab component to display various distribution charts and text metrics.
 *
 * Renders temperature and rating distribution charts, enhancement frequency bar chart,
 * and text metrics like total words, lines, and characters.
 *
 * @example
 * ```tsx
 * <DistributionTab
 *   stats={{ totalWords: 1000, totalLines: 50, totalChars: 5000 }}
 *   temperatureDistributionData={[{ name: 'Hot', count: 10 }]}
 *   ratingDistributionData={[{ rating: 5, count: 20 }]}
 *   enhancementFrequencyData={[{ type: 'Bold', count: 15 }]}
 *   COLORS={['#ff0000', '#00ff00', '#0000ff']}
 * />
 * ```
 *
 * @developerNotes
 * - The component uses recharts for data visualization.
 * - Ensure all data arrays are non-empty to avoid rendering issues.
 * - The `COLORS` array should have enough colors for the data points in the temperature distribution chart.
 */
const DistributionTab: React.FC<DistributionTabProps> = (props) => {
  const {
    stats,
    temperatureDistributionData,
    ratingDistributionData,
    enhancementFrequencyData,
    COLORS,
  } = props;

  return (
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
                  nameKey="range"
                  label={({name, percent}) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {temperatureDistributionData.map((_, index) => (
                    <Cell name={_.range} key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
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
  );
};

export default DistributionTab;
