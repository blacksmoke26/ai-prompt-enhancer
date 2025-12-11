/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// ui components
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/Card';

/**
 * Interface for QuickStats component props
 */
export interface QuickStatsProps {
  /** API response containing enhancement results */
  response: any | null;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * Displays quick statistics about prompt enhancement results
 * @example
 * <QuickStats
 *   response={{
 *     processingTime: 120,
 *     tokensUsed: 150,
 *     originalPrompt: "Hello",
 *     enhancedPrompt: "Hello world"
 *   }}
 * />
 * @developer Note: Ensure response has all required properties before rendering
 */
const QuickStats: React.FC<QuickStatsProps> = ({ response, className = '' }) => {
  if (!response) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Enhancement Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {response.processingTime}ms
            </div>
            <div className="text-sm text-muted-foreground">Processing Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {response.tokensUsed || 'N/A'}
            </div>
            <div className="text-sm text-muted-foreground">Tokens Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {response.originalPrompt.length}
            </div>
            <div className="text-sm text-muted-foreground">Original Length</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {response.enhancedPrompt.length}
            </div>
            <div className="text-sm text-muted-foreground">Enhanced Length</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
