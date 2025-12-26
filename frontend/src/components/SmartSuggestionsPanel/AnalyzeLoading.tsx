/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {BrainCircuit} from 'lucide-react';

/**
 * Interface defining the props for the `AnalyzeLoading` component.
 * The `aiMode` prop determines the visual and behavioral characteristics of the loading indicator.
 */
export interface AnalyzeLoadingProps {
  /**
   * Specifies the AI mode for the loading state.
   * Different modes may influence the visual representation and interaction logic.
   */
  aiMode: 'basic' | 'advanced' | 'quantum' | 'emergent';
}

/**
 * A loading indicator component that visually represents the AI analysis process based on the specified mode.
 * Renders different UI states depending on the `aiMode` prop, providing feedback during analysis.
 *
 * @example
 * <AnalyzeLoading aiMode="advanced" />
 * <AnalyzeLoading aiMode="quantum" />
 */
export const AnalyzeLoading: React.FC<AnalyzeLoadingProps> = (props) => (
  <div
    className="flex flex-col items-center justify-center h-64">
    <div className="relative">
      <div
        className="absolute inset-0 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-purple-500 opacity-20"></div>
      <div
        className="absolute inset-0 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-blue-500 opacity-20 delay-100"></div>
      <div className="relative">
        <BrainCircuit className="h-16 w-16 text-purple-500 animate-pulse"/>
      </div>
    </div>
    <div className="mt-4 text-center">
      <p className="font-medium text-lg">Enhancing Your Prompt</p>
      <p className="text-sm text-muted-foreground mt-1">
        AI is analyzing your prompt
        with {props.aiMode === 'quantum' ? 'quantum' : props.aiMode === 'emergent' ? 'emergent' : 'advanced'} intelligence
      </p>
    </div>
  </div>
);

export default AnalyzeLoading;
