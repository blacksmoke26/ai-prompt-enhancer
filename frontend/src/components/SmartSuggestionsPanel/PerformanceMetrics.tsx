/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';

// libs
import {EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';

// helpers
import {cn} from '~/utils/helpers';

/**
 * Defines the props for the PerformanceMetrics component, which displays analysis data and a brain instance.
 * @example
 * const props = {
 *   analysis: { score: 95, timestamp: '2023-04-05' },
 *   brainInstance: new EnhancedAIBrainV3()
 * };
 * @developerNotes The `analysis` type is currently `any` for flexibility, but consider replacing it with a specific type for better type safety. Ensure `EnhancedAIBrainV3` is properly defined and exported.
 */
export interface PerformanceMetricsProps {
  /**
   * The analysis data to be displayed in the component.
   * This can include metrics, scores, timestamps, or other relevant information.
   */
  analysis: any;
  /**
   * The AI brain instance that provides contextual or computational data for the analysis.
   * This instance is expected to be of type `EnhancedAIBrainV3`.
   */
  brainInstance: EnhancedAIBrainV3;
}

/**
 * Renders performance metrics visualization based on analysis data and an AI brain instance.
 * @example
 * <PerformanceMetrics
 *   analysis={{ score: 95, timestamp: '2023-04-05' }}
 *   brainInstance={new EnhancedAIBrainV3()}
 * />
 * @developerNotes Ensure `analysis` uses a specific type instead of `any` for type safety. Verify `EnhancedAIBrainV3` is properly exported and initialized.
 */
const PerformanceMetrics: React.FC<PerformanceMetricsProps> = (props) => {
  const {analysis, brainInstance} = props;

  const [metricsState, setMetricsState] = useState({
    processingTime: 0,
    suggestionEffectiveness: 0,
    learningRate: 0,
    selfAwarenessLevel: 0,
  });

  useEffect(() => {
    if (analysis) {
      setMetricsState({
        processingTime: analysis.processingTime || 0,
        suggestionEffectiveness: analysis.effectiveness || 0,
        learningRate: brainInstance['adaptationParameters']?.learningRate || 0.1,
        selfAwarenessLevel: brainInstance['selfAwareness']?.confidence || 0.5,
      });
    }
  }, [analysis, brainInstance]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Processing Time</span>
          <span className="font-mono">{metricsState.processingTime}ms</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
            style={{width: `${Math.min(100, metricsState.processingTime / 2)}%`}}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Suggestion Effectiveness</span>
          <span>{(metricsState.suggestionEffectiveness * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              metricsState.suggestionEffectiveness > 0.8 ? 'bg-green-500' :
                metricsState.suggestionEffectiveness > 0.6 ? 'bg-yellow-500' : 'bg-red-500',
            )}
            style={{width: `${metricsState.suggestionEffectiveness * 100}%`}}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Adaptive Learning</span>
          <span>{(metricsState.learningRate * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-purple-500 h-1.5 rounded-full transition-all duration-300"
            style={{width: `${metricsState.learningRate * 100}%`}}
          />
        </div>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Self-Awareness</span>
          <span>{(metricsState.selfAwarenessLevel * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
            style={{width: `${metricsState.selfAwarenessLevel * 100}%`}}
          />
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
