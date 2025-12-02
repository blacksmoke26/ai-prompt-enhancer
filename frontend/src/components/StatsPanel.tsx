/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// helpers
import {formatDuration} from '~/utils/helpers';

// components
import {Card, CardContent, CardHeader, CardTitle} from './ui/Card';

// types
import type {HistoryStats} from '~/types/index';

/**
 * Props for the StatsPanel component.
 * @developer-notes Ensure stats is properly validated before passing to avoid null reference errors.
 */
export interface StatsPanelProps {
  /** Statistics data to display, or null if no data is available. */
  stats: HistoryStats | null;
}

/**
 * Utility for formatting numbers safely.
 * @param num Value to format; returns '0' for null/undefined.
 */
const formatNumber = (num: number | undefined | null) => {
  if (num == null || isNaN(num)) return '0';
  return num.toLocaleString();
};

const StatsPanel: React.FC<StatsPanelProps> = ({stats}) => {
  // Derived metrics
  const totalItems = stats?.totalItems ?? 0;
  const totalTokens = stats?.totalTokensUsed ?? 0;
  const avgProcessing = stats?.averageProcessingTime ?? 0;
  const mostUsedModel = stats?.mostUsedModel ?? 'N/A';
  const mostUsedEnhancement = stats?.mostUsedEnhancementType ?? 'N/A';

  const avgTokensPerPrompt = totalItems ? Math.round(totalTokens / totalItems) : 0;
  const totalProcessingSeconds = avgProcessing * totalItems;
  const tokensPerSecond = avgProcessing ? Math.round(totalTokens / avgProcessing) : 0;

  // Simple bar for tokens usage relative to an arbitrary max (e.g., 1M tokens)
  const maxTokens = 1_000_000;
  const usagePercent = Math.min((totalTokens / maxTokens) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {formatNumber(totalItems)}
            </div>
            <div className="text-sm text-muted-foreground">Total Prompts</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {formatDuration(avgProcessing)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Time</div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium mb-1">Total Tokens Used</div>
            <div className="text-lg font-bold text-primary">
              {formatNumber(totalTokens)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Avg. Tokens per Prompt</div>
            <div className="text-lg font-bold text-primary">
              {formatNumber(avgTokensPerPrompt)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Tokens per Second</div>
            <div className="text-lg font-bold text-primary">
              {formatNumber(tokensPerSecond)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Total Processing Time (s)</div>
            <div className="text-lg font-bold text-primary">
              {formatNumber(totalProcessingSeconds)}
            </div>
          </div>
        </div>

        {/* Most Used Model & Enhancement */}
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-1">Most Used Model</div>
            <div className="text-lg font-bold text-primary">{mostUsedModel}</div>
          </div>
          <div>
            <div className="text-sm font-medium mb-1">Most Used Enhancement</div>
            <div className="text-lg font-bold text-primary capitalize">
              {mostUsedEnhancement}
            </div>
          </div>
        </div>

        {/* Token Usage Bar */}
        <div className="mt-4">
          <div className="text-sm font-medium mb-1">
            Token Usage (relative to 1M tokens)
          </div>
          <div className="w-full bg-gray-200 rounded h-4">
            <div
              className="bg-blue-500 h-full rounded"
              style={{width: `${usagePercent}%`}}
            />
          </div>
        </div>

        {/* Provider & Model Usage Table */}
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Provider & Model Usage</div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {(stats as any)?.providerUsage?.length ? (stats as any).providerUsage.map((pu: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-2 py-1 whitespace-nowrap">{pu.provider}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{pu.model}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{pu.count}</td>
                </tr>
              )) : (
                <tr>
                  <td className="px-2 py-1 text-sm" colSpan={3}>
                    No provider usage data available.
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Most Used Roles Table */}
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Most Used Roles</div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
              <tr>
                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {(stats as any)?.mostUsedRoles?.length ? (stats as any).mostUsedRoles.map((r: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-2 py-1 whitespace-nowrap">{r.role}</td>
                  <td className="px-2 py-1 whitespace-nowrap">{r.count}</td>
                </tr>
              )) : (
                <tr>
                  <td className="px-2 py-1 text-sm" colSpan={2}>
                    No role usage data available.
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Text Metrics */}
        <div className="mt-4">
          <div className="text-sm font-medium mb-2">Text Metrics</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Total Words</div>
              <div className="text-lg font-bold text-primary">
                {(stats as any)?.totalWords ?? 0}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Total Lines</div>
              <div className="text-lg font-bold text-primary">
                {(stats as any)?.totalLines ?? 0}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Total Chars</div>
              <div className="text-lg font-bold text-primary">
                {(stats as any)?.totalChars ?? 0}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
