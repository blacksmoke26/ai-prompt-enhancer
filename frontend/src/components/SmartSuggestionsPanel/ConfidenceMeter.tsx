/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Progress} from '@radix-ui/themes';
import {AlertTriangle, ChevronDown, ChevronUp, Gauge} from 'lucide-react';

// libs
import {BrainAnalysis} from '~/lib/ai-brain';

// ui components
import {Button} from '~/components/ui/Button';

// helpers
import {cn} from '~/utils/helpers';

/**
 * Defines the props for the ConfidenceMeter component, which visualizes confidence levels based on analysis data and supports expansion state.
 * @example
 * const props = {
 *   analysis: { confidence: 0.95, timestamp: '2023-04-05' },
 *   expanded: true,
 *   onExpand: () => console.log('Expanded')
 * };
 * @developerNotes Ensure `BrainAnalysis` is properly typed and exported. If `onExpand` is used, implement it to handle expansion logic (e.g., toggling UI state).
 */
export interface ConfidenceMeterProps {
  /**
   * The analysis data containing confidence scores or related metrics.
   * This is the primary data source for rendering the confidence visualization.
   */
  analysis: BrainAnalysis;
  /**
   * Controls whether the confidence meter is expanded (e.g., showing more details).
   * Defaults to `false` if not provided.
   */
  expanded?: boolean;
  /**
   * Optional callback function triggered when the confidence meter is expanded or collapsed.
   * Use this to handle UI state changes or additional logic.
   */
  onExpand?: () => void;
}

/**
 * Renders a confidence meter visualization that displays AI confidence, awareness, understanding, and adaptability metrics.
 * @example
 * <ConfidenceMeter
 *   analysis={{ confidence: 0.9, awareness: 0.85, understanding: 0.95, adaptability: 0.7 }}
 *   expanded={true}
 *   onExpand={() => console.log('Confidence meter expanded')}
 * />
 * @developerNotes Ensure the `analysis` object contains `confidence`, `awareness`, `understanding`, and `adaptability` properties. If `onExpand` is used, implement it to handle UI state changes or additional logic.
 */
const ConfidenceMeter: React.FC<ConfidenceMeterProps> = (props) => {
  const {analysis, expanded = false, onExpand} = props;

  const confidence = analysis.confidence * 100;
  const awareness = analysis.awareness * 100;
  const understanding = analysis.understanding * 100;
  const adaptability = analysis.adaptability * 100;

  const getConfidenceColor = (value: number) => {
    if (value > 80) return 'text-green-500';
    if (value > 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceDescription = (value: number) => {
    if (value > 80) return 'High confidence - AI is highly certain about suggestions';
    if (value > 60) return 'Moderate confidence - AI has reasonable certainty';
    return 'Low confidence - AI is uncertain, suggestions may need verification';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-primary"/>
          <span className="font-medium">AI Confidence: {confidence.toFixed(1)}%</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onExpand}>
          {expanded ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
        </Button>
      </div>

      <Progress value={confidence} className={cn(
        'transition-all duration-300',
        confidence > 80 && 'bg-green-500',
        confidence > 60 && confidence <= 80 && 'bg-yellow-500',
        confidence <= 60 && 'bg-red-500',
      )}/>

      <p className={cn('text-xs', getConfidenceColor(confidence))}>
        {getConfidenceDescription(confidence)}
      </p>

      {expanded && (
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Awareness:</span>
              <span>{awareness.toFixed(1)}%</span>
            </div>
            <Progress
              value={awareness}
              className={cn(
                awareness > 80 && 'bg-green-400',
                awareness > 60 && awareness <= 80 && 'bg-yellow-400',
                awareness <= 60 && 'bg-red-400',
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Understanding:</span>
              <span>{understanding.toFixed(1)}%</span>
            </div>
            <Progress
              value={understanding}
              className={cn(
                understanding > 80 && 'bg-green-400',
                understanding > 60 && understanding <= 80 && 'bg-yellow-400',
                understanding <= 60 && 'bg-red-400',
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Adaptability:</span>
              <span>{adaptability.toFixed(1)}%</span>
            </div>
            <Progress
              value={adaptability}
              className={cn(
                adaptability > 80 && 'bg-green-400',
                adaptability > 60 && adaptability <= 80 && 'bg-yellow-400',
                adaptability <= 60 && 'bg-red-400',
              )}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Effectiveness:</span>
              <span>{(analysis.effectiveness * 100).toFixed(1)}%</span>
            </div>
            <Progress
              value={analysis.effectiveness * 100}
              className={cn(
                analysis.effectiveness > 0.8 && 'bg-green-400',
                analysis.effectiveness > 0.6 && analysis.effectiveness <= 0.8 && 'bg-yellow-400',
                analysis.effectiveness <= 0.6 && 'bg-red-400',
              )}
            />
          </div>
        </div>
      )}

      {analysis.limitations && analysis.limitations.length > 0 && (
        <div className="mt-2 p-2 bg-muted/50 rounded-md text-xs">
          <div className="flex items-start gap-1">
            <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="font-medium text-yellow-600">AI Limitations</p>
              <ul className="list-disc pl-4 mt-1 space-y-0.5">
                {analysis.limitations.slice(0, expanded ? undefined : 2).map((limitation, i) => (
                  <li key={i}>{limitation}</li>
                ))}
                {!expanded && analysis.limitations.length > 2 && (
                  <li>...and {analysis.limitations.length - 2} more</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfidenceMeter;
