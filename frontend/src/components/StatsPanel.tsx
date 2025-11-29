import React from 'react';

// helpers
import {formatDuration} from '~/utils/helpers.ts';

// components
import {Card, CardContent, CardHeader, CardTitle} from './ui/Card';

// types
import type {HistoryStats} from '~/types';

/**
 * Props for the StatsPanel component.
 * @developer-notes Ensure stats is properly validated before passing to avoid null reference errors.
 */
export interface StatsPanelProps {
  /** Statistics data to display, or null if no data is available. */
  stats: HistoryStats | null;
}

/**
 * A panel component displaying usage statistics in a card layout.
 * @example
 * ```tsx
 * const stats = {
 *   totalItems: 100,
 *   averageProcessingTime: 1500,
 *   totalTokensUsed: 50000,
 *   mostUsedModel: 'GPT-4',
 *   mostUsedEnhancementType: 'summarize'
 * };
 * <StatsPanel stats={stats} />
 * ```
 * @developer-notes The component gracefully handles null stats by displaying zeros or fallback values.
 */
const StatsPanel: React.FC<StatsPanelProps> = ({stats}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats?.totalItems?.toLocaleString?.() ?? 0}
            </div>
            <div className="text-sm text-muted-foreground">Total Prompts</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {formatDuration(stats?.averageProcessingTime ?? 0)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Time</div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-1">Total Tokens Used</div>
            <div className="text-lg font-bold text-primary">
              {stats?.totalTokensUsed?.toLocaleString?.() ?? 0}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">Most Used Model</div>
            <div className="text-lg font-bold text-primary">
              {stats?.mostUsedModel ?? 0}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">Most Used Enhancement</div>
            <div className="text-lg font-bold text-primary capitalize">
              {stats?.mostUsedEnhancementType ?? 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
