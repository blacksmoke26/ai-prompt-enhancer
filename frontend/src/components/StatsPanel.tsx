import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { HistoryStats } from '../types';
import { formatDuration } from '../utils/helpers';

interface StatsPanelProps {
  stats: HistoryStats | null;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats.totalItems.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Prompts</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {formatDuration(stats.averageProcessingTime)}
            </div>
            <div className="text-sm text-muted-foreground">Avg. Time</div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium mb-1">Total Tokens Used</div>
            <div className="text-lg font-bold text-primary">
              {stats.totalTokensUsed.toLocaleString()}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">Most Used Model</div>
            <div className="text-lg font-bold text-primary">
              {stats.mostUsedModel}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">Most Used Enhancement</div>
            <div className="text-lg font-bold text-primary capitalize">
              {stats.mostUsedEnhancementType}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};