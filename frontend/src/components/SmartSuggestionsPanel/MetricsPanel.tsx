/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Brain} from 'lucide-react';

// libs
import {BrainAnalysis} from '~/lib/ai-brain';
import {EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';

// ui components
import {Badge, BadgeVariant} from '~/components/ui/Badge';

// components
import PerformanceMetrics from './PerformanceMetrics';

/**
 * Interface defining the props for the `MetricsPanel` component.
 * Contains essential data and callback functions needed to render the metrics visualization.
 */
export type MetricsPanelProps = {
  /**
   * An object containing the brain analysis results to be visualized.
   * Expected to have structured data about performance, accuracy, and other relevant metrics.
   */
  brainAnalysis: BrainAnalysis;

  /**
   * A render callback function for customizing individual item rendering.
   * Receives a keyword and its index to return a React JSX element.
   */
  callbackFn(keyword: string, index: number): React.JSX.Element;

  /**
   * A string used as a title, label, or identifier for the panel.
   * Often used for display purposes such as section headers or tooltips.
   */
  caption: string;

  /**
   * An object containing advanced or extended analysis data.
   * The type is flexible (`any`) to accommodate future enhancements or custom metrics.
   */
  enhancedAnalysis: any;

  /**
   * An instance of the `EnhancedAIBrainV3` class.
   * Used for accessing AI-related features, state, or methods within the panel.
   */
  brainInstance: EnhancedAIBrainV3;
};

/**
 * A panel component that displays metrics and analysis results from the AI brain.
 * Uses custom rendering through a callback function and supports advanced analysis data.
 *
 * @example
 * <MetricsPanel
 *   brainAnalysis={brainAnalysisData}
 *   callbackFn={(keyword, index) => <div key={index}>{keyword}</div>}
 *   caption="Performance Overview"
 *   enhancedAnalysis={advancedData}
 *   brainInstance={aiBrain}
 * />
 */
export const MetricsPanel: React.FC<MetricsPanelProps> = (props) => (
  <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Context:</span>
          <Badge variant="secondary" className="text-xs">
            {props.brainAnalysis.context}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Intent:</span>
          <Badge variant="secondary" className="text-xs">
            {props.brainAnalysis.intent}
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Domain:</span>
          <Badge variant="secondary" className="text-xs">
            {props.brainAnalysis.domain}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Complexity:</span>
          <Badge
            variant={
              props.brainAnalysis.complexity === 'beginner' ? 'default' :
                props.brainAnalysis.complexity === 'intermediate' ? 'secondary' :
                  props.brainAnalysis.complexity === 'advanced' ? 'outline' : 'destructive'
            }
            className="text-xs"
          >
            {props.brainAnalysis.complexity}
          </Badge>
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Keywords:</span>
          <Badge variant="secondary" className="text-xs">
            {props.brainAnalysis.keywords.length}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {props.brainAnalysis.keywords.slice(0, 4).map(props.callbackFn)}
          {props.brainAnalysis.keywords.length > 4 && (
            <Badge variant="outline" className="text-xs px-1.5 py-0">
              +{props.brainAnalysis.keywords.length - 4}
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Intelligence:</span>
          <Badge
            variant={
              (props.brainAnalysis.intelligenceLevel === 'basic' ? 'default' :
                props.brainAnalysis.intelligenceLevel === 'advanced' ? 'secondary' : 'gradient') as BadgeVariant
            }
            className="text-xs"
          >
            {props.caption}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">Learning:</span>
          <Badge variant="secondary" className="text-xs">
            {props.brainAnalysis.learning.length}
          </Badge>
        </div>
      </div>
    </div>

    {props.enhancedAnalysis && props.enhancedAnalysis.metaAnalysis && (
      <div className="pt-2 border-t border-border mt-2">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="h-4 w-4 text-purple-500"/>
          <span className="text-xs font-medium text-muted-foreground">Advanced Metrics</span>
        </div>
        <PerformanceMetrics analysis={props.enhancedAnalysis} brainInstance={props.brainInstance}/>
      </div>
    )}
  </div>
);

export default MetricsPanel;
