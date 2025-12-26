/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// libs
import {BrainAnalysis} from '~/lib/ai-brain';

// ui components
import {Badge, BadgeVariant} from '~/components/ui/Badge';

/**
 * Interface defining the props for the `StatsPanel` component.
 * Contains the brain analysis data and a caption for displaying statistical information.
 */
export interface StatsPanelProps {
  /**
   * An object containing the brain analysis results to be visualized.
   * Expected to have structured data about performance, accuracy, or other relevant metrics.
   */
  brainAnalysis: BrainAnalysis;

  /**
   * A string used as a caption or title for the panel.
   * Typically used to provide context or describe the content of the panel.
   */
  caption: string;
}

/**
 * A panel component that displays statistical information based on the provided brain analysis data.
 * Renders the analysis results alongside a descriptive caption for clarity and context.
 *
 * @example
 * <StatsPanel
 *   brainAnalysis={brainAnalysisData}
 *   caption="System Performance Overview"
 * />
 */
export const StatsPanel: React.FC<StatsPanelProps> = (props) => (
  <div
    className="flex flex-wrap gap-2">
    <Badge variant="secondary" className="text-xs">Context: {props.brainAnalysis.context}</Badge>
    <Badge variant="secondary" className="text-xs">Intent: {props.brainAnalysis.intent}</Badge>
    <Badge variant="secondary" className="text-xs">Domain: {props.brainAnalysis.domain}</Badge>
    <Badge
      variant={
        props.brainAnalysis.complexity === 'beginner' ? 'default' :
          props.brainAnalysis.complexity === 'intermediate' ? 'secondary' :
            props.brainAnalysis.complexity === 'advanced' ? 'outline' : 'destructive'
      }
      className="text-xs"
    >
      Complexity: {props.brainAnalysis.complexity}
    </Badge>
    <Badge
      variant={
        (props.brainAnalysis.intelligenceLevel === 'basic' ? 'default' :
          props.brainAnalysis.intelligenceLevel === 'advanced' ? 'secondary' : 'gradient') as BadgeVariant
      }
      className="text-xs"
    >
      Intelligence: {props.caption}
    </Badge>
  </div>
);

export default StatsPanel;
