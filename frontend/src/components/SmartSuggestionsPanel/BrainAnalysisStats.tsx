/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {ChevronDown, ChevronUp, Target} from 'lucide-react';

// libs
import {BrainAnalysis} from '~/lib/ai-brain';
import {EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';

// ui components
import {Button} from '~/components/ui/Button';

// components
import ConfidenceMeter from '~/components/SmartSuggestionsPanel/ConfidenceMeter';
import MetricsPanel from '~/components/SmartSuggestionsPanel/MetricsPanel';
import StatsPanel from '~/components/SmartSuggestionsPanel/StatsPanel';

/**
 * Renders interactive brain analysis statistics with expandable details and customizable UI elements.
 * Used to display key metrics, allow user interaction, and render dynamic content based on analysis data.
 *
 * Example:
 * <BrainAnalysisStats
 *   analysis={sampleAnalysis}
 *   expanded={true}
 *   onExpand={() => console.log('Expanded')}
 *   onClick={() => console.log('Clicked')}
 *   showMetricsPanel={true}
 *   onKeywordChange={(keyword, index) => <span>{keyword}</span>}
 *   caption="Brain Activity Metrics"
 *   enhancedAnalysis={enhancedData}
 *   brainInstance={aiBrain}
 *   onModeChange={(mode) => <div>{mode}</div>}
 * />
 */
export interface BrainAnalysisStatsProps {
  /** The brain analysis data to display */
  analysis: BrainAnalysis;
  /** Controls whether the component is expanded to show more details */
  expanded: boolean;
  /** Callback triggered when the expand/collapse button is clicked */
  onExpand(): void;
  /** Callback triggered when the component is clicked */
  onClick(): void;
  /** Controls visibility of the metrics panel */
  showMetricsPanel: boolean;
  /** Custom renderer for keywords, receives (keyword, index) and returns JSX */
  onKeywordChange(keyword: string, index: number): React.JSX.Element;
  /** Caption/title displayed above the stats component */
  caption: string;
  /** Optional enhanced analysis data for additional metrics */
  enhancedAnalysis: any;
  /** The AI brain instance providing context for analysis */
  brainInstance: EnhancedAIBrainV3;
  /** Custom renderer for mode switching UI, receives (mode) and returns JSX */
  onModeChange(mode: string): React.JSX.Element;
}

/**
 * A stats display component for brain analysis data with expandable sections and interactive elements.
 *
 * Developer Notes:
 * - Requires `analysis` and `brainInstance` props to function
 * - `onKeywordChange` and `onModeChange` allow full customization of UI elements
 * - `expanded` state controls visibility of detailed metrics
 * - `enhancedAnalysis` is optional but recommended for richer data visualization
 */
const BrainAnalysisStats: React.FC<BrainAnalysisStatsProps> = (props) => (
  <div className="mb-6 space-y-4">
    <ConfidenceMeter
      analysis={props.analysis}
      expanded={props.expanded}
      onExpand={props.onExpand}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary"/>
            <span className="font-medium text-sm">Analysis Summary</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={props.onClick}
            className="text-xs"
          >
            {props.showMetricsPanel ? 'Hide Details' : 'Show Details'}

            {props.showMetricsPanel ? (
              <ChevronUp className="ml-1 h-3 w-3"/>
            ) : (
              <ChevronDown className="ml-1 h-3 w-3"/>
            )}
          </Button>
        </div>

        {props.showMetricsPanel ? (
          <MetricsPanel
            brainAnalysis={props.analysis}
            callbackFn={props.onKeywordChange}
            caption={props.caption}
            enhancedAnalysis={props.enhancedAnalysis} brainInstance={props.brainInstance}/>
        ) : (
          <StatsPanel
            brainAnalysis={props.analysis}
            caption={props.caption}/>
        )}
      </div>

      <div className="flex items-center justify-center">
        <div className="flex flex-wrap gap-1">
          {(['basic', 'advanced', 'quantum', 'emergent'] as const).map(props.onModeChange)}
        </div>
      </div>
    </div>
  </div>
);

export default BrainAnalysisStats;
