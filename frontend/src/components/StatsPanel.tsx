/**
 * @fileoverview Statistics panel component for displaying AI prompt usage metrics.
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// helpers
import {formatDuration} from '~/utils/helpers';

// components
import {Card, CardContent, CardHeader, CardTitle} from './ui/Card';

/**
 * Represents a provider-model usage bucket.
 * @example
 * ```typescript
 * const usage: ProviderUsage = {
 *   provider: 'OpenAI',
 *   model: 'gpt-4',
 *   count: 42
 * };
 * ```
 * @developerNotes Used to track how many times each provider/model combination was used
 */
export interface ProviderUsage {
  /** The provider used for the prompt. */
  provider: string;
  /** The model used for the prompt. */
  model: string;
  /** The number of times this provider/model combination was used. */
  count: number;
}

/**
 * Represents a role usage bucket.
 * @example
 * ```typescript
 * const role: RoleUsage = {
 *   role: 'system',
 *   count: 15
 * };
 * ```
 * @developerNotes Tracks the frequency of different roles in prompts (system, user, assistant)
 */
export interface RoleUsage {
  /** The role used for the prompt. */
  role: string;
  /** The number of times this role was used. */
  count: number;
}

/**
 * Comprehensive statistics shape returned by `HistoryManager.getStats`.
 * @example
 * ```typescript
 * const stats: StatsPanelStats = {
 *   totalItems: 100,
 *   totalTokensUsed: 50000,
 *   averageProcessingTime: 2.5,
 *   mostUsedModel: 'gpt-4',
 *   mostUsedEnhancementType: 'summary'
 * };
 * ```
 * @developerNotes All numeric fields should be provided, optional fields may be omitted
 */
export interface StatsPanelStats {
  /** Total number of processed items/prompts. */
  totalItems: number;
  /** Total number of tokens used across all items. */
  totalTokensUsed: number;
  /** Average processing time per item in seconds. */
  averageProcessingTime: number;
  /** The most frequently used model name. */
  mostUsedModel: string;
  /** The most frequently used enhancement type. */
  mostUsedEnhancementType: string;
  /** Array of provider-specific usage statistics. */
  providerUsage?: ProviderUsage[];
  /** Array of role usage statistics sorted by frequency. */
  mostUsedRoles?: RoleUsage[];
  /** Total word count across all processed text. */
  totalWords?: number;
  /** Total line count across all processed text. */
  totalLines?: number;
  /** Total character count across all processed text. */
  totalChars?: number;
}

/**
 * Props for the StatsPanel component.
 * @remarks
 * The component is resilient to missing fields – when optional
 * statistics are not available a fallback of `0` or `"N/A"` is shown.
 * @example
 * ```typescript
 * <StatsPanel stats={usageStats} />
 * ```
 * @developerNotes Pass null or undefined stats to show empty state with zeros
 */
interface StatsPanelProps {
  /** Statistics data to display, or null if no data is available. */
  stats: StatsPanelStats | null;
}

/**
 * Utility for formatting numbers safely.
 * @param num Value to format; returns `'0'` for null/undefined.
 * @example
 * ```typescript
 * formatNumber(1234.56); // "1,235"
 * formatNumber(null); // "0"
 * ```
 * @developerNotes Handles NaN and null/undefined gracefully
 */
const formatNumber = (num: number | undefined | null) => {
  if (num == null || isNaN(num)) return '0';
  return num.toLocaleString();
};

/**
 * Statistics panel component displaying AI prompt usage metrics.
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
const StatsPanel: React.FC<StatsPanelProps> = ({stats}) => {
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
              {stats?.providerUsage?.length ? (
                stats.providerUsage.map((pu, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1 whitespace-nowrap">{pu.provider}</td>
                    <td className="px-2 py-1 whitespace-nowrap">{pu.model}</td>
                    <td className="px-2 py-1 whitespace-nowrap">{pu.count}</td>
                  </tr>
                ))
              ) : (
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
              {stats?.mostUsedRoles?.length ? (
                stats.mostUsedRoles.map((r, idx) => (
                  <tr key={idx}>
                    <td className="px-2 py-1 whitespace-nowrap">{r.role}</td>
                    <td className="px-2 py-1 whitespace-nowrap">{r.count}</td>
                  </tr>
                ))
              ) : (
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
                {stats?.totalWords ?? 0}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Total Lines</div>
              <div className="text-lg font-bold text-primary">
                {stats?.totalLines ?? 0}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Total Chars</div>
              <div className="text-lg font-bold text-primary">
                {stats?.totalChars ?? 0}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
