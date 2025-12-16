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
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// utils
import {formatPercentage} from '~/utils/helpers';
import {UsageTabProps} from '~/components/StatsPanel/types.ts';

/**
 * Renders a usage statistics tab with charts and tables for provider usage, monthly usage, and most used roles.
 *
 * @example
 * ```tsx
 * <UsageTab
 *   stats={stats}
 *   providerUsageData={providerData}
 *   mostUsedRolesData={rolesData}
 *   monthlyUsageData={monthlyData}
 *   preferredTimeSlotsData={timeSlotData}
 *   totalItems={total}
 *   COLORS={colorPalette}
 * />
 * ```
 *
 * @developer-notes This component is designed to display usage analytics in a structured layout with:
 * - Monthly usage bar chart
 * - Peak usage hours line chart
 * - Provider & model usage table
 * - Most used roles table
 *
 * @property {any} stats - General statistics data
 * @property {any[]} providerUsageData - Data for provider and model usage
 * @property {any[]} mostUsedRolesData - Data for most used roles
 * @property {any[]} monthlyUsageData - Data for monthly usage trends
 * @property {any[]} preferredTimeSlotsData - Data for preferred time slots
 * @property {number} totalItems - Total number of items for percentage calculations
 * @property {string[]} COLORS - Color palette for charts
 */
const UsageTab: React.FC<UsageTabProps> = (props) => {
  const {
    stats,
    providerUsageData,
    mostUsedRolesData,
    monthlyUsageData,
    preferredTimeSlotsData,
    totalItems,
    COLORS,
  } = props;

  return (
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
  );
};

export default UsageTab;
