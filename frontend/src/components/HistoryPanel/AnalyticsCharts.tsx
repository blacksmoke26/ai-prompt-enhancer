/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {BarChart3, EyeOff, PieChart as PieChartIcon, TrendingUp} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// hooks
import {useTheme} from '~/components/ThemeProvider';

// ui components
import {Button} from '~/components/ui/Button';
import {TooltipMini} from '~/components/ui/Tooltip';

/**
 * Props interface for the AnalyticsCharts component, used to render various data visualizations.
 * Supports trend lines, bar charts, and pie charts with customizable rendering and toggle functionality.
 */
export interface AnalyticsChartsProps {
  /**
   * The data structure containing chart-specific information for trend, bar, and pie charts.
   * Can be either a typed structure or a generic fallback.
   */
  chartData: {
    trendData: { date: string; tokens: any; count: number }[];
    barData: { model: string; count: number }[];
    pieData: { name: string; value: number }[];
  } | {
    trendData: any[];
    barData: any[];
    pieData: any[];
  };

  /**
   * Custom rendering function for chart entries.
   * @param entry The current data entry being rendered.
   * @param index The index of the entry in the array.
   * @returns A React JSX element representing the entry.
   */
  element(entry: any, index: number): React.JSX.Element;

  /**
   * Handler function called when the user clicks to hide or show the charts.
   */
  onHideChartsClick(): void;
}

/**
 * A component that renders customizable data visualizations (trend, bar, pie charts) based on provided data.
 * Includes a toggle to hide or show the charts and supports custom rendering of chart entries.
 * @developerNotes
 * - Assumes the use of a charting library (e.g., `recharts`, `chart.js`) for rendering visualizations.
 * - The `element` function is intended for custom rendering of chart entries (e.g., tooltips, labels).
 * - The `chartData` structure supports both typed and generic data for flexibility.
 * - The `onHideChartsClick` handler is used to toggle the visibility of the charts.
 * - Designed to be used in analytics or dashboard sections for data insights.
 */
const AnalyticsCharts: React.FC<AnalyticsChartsProps> = (props) => {
  const {theme} = useTheme();

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 px-1 animate-in fade-in slide-in-from-top-4 duration-500">
      <div
        className="col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2"><TrendingUp
            className="h-5 w-5 text-indigo-500"/>Token Usage Trend</h3>
          <Button
            variant="ghost" size="icon" onClick={props.onHideChartsClick}
            className="h-6 w-6 text-gray-400 hover:text-gray-600">
            <TooltipMini title="Hide the analytics charts"><EyeOff className="h-4 w-4"/></TooltipMini>
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={250}><AreaChart data={props.chartData.trendData}>
          <defs>
            <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700"/><XAxis
          dataKey="date" className="text-xs text-gray-500 dark:text-gray-400"/><YAxis
          className="text-xs text-gray-500 dark:text-gray-400"/><Tooltip contentStyle={{
          backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
          borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
          borderRadius: '8px',
        }}/>
          <Area
            type="monotone" dataKey="tokens" stroke="#6366f1" fillOpacity={1}
            fill="url(#colorTokens)"/>
        </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-4">
        <div
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[272px] flex flex-col">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2"><BarChart3
            className="h-4 w-4 text-purple-500"/>Models Used</h3>
          <ResponsiveContainer width="100%" height={220}><BarChart data={props.chartData.barData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false}
                           className="stroke-gray-200 dark:stroke-gray-700"/><XAxis
            dataKey="model" className="text-xs text-gray-500 dark:text-gray-400"/><YAxis
            className="text-xs text-gray-500 dark:text-gray-400"/><Tooltip contentStyle={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            borderRadius: '8px',
          }}/><Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]}/></BarChart>
          </ResponsiveContainer>
        </div>
        <div
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 h-[120px] flex items-center justify-between">
          <div><h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            <PieChartIcon className="h-4 w-4 text-pink-500"/>Ratings</h3><p
            className="text-xs text-gray-500 mt-1">Satisfaction score.</p></div>
          <ResponsiveContainer
            width="50%" height="100%">
            <PieChart>
              <Pie
                data={props.chartData.pieData} cx="50%" cy="50%"
                innerRadius={20} outerRadius={40}
                paddingAngle={5}
                dataKey="value">{props.chartData.pieData.map(props.element)}</Pie><Tooltip contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              borderRadius: '8px',
            }}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
