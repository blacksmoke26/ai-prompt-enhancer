/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import {BrainCircuit} from 'lucide-react';

// AI brain module
import {EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';

// utils
import {cn} from '~/utils/helpers';

// ui components
import {Button} from '~/components/ui/Button';
import {TooltipMini} from '~/components/ui/Tooltip';

// components
import SmartSuggestionsPanel from '~/components/SmartSuggestionsPanel';

export interface SmartSuggestionsTriggerProps {
  /** Current prompt text */
  prompt: string;

  /** Whether suggestions panel is visible */
  isVisible: boolean;

  /** Callback when panel visibility changes */
  onTogglePanel(): void;

  /** Trigger SVG icon size */
  triggerIconSize?: number;
}

/**
 * Smart suggestions trigger component with brain icon and enhanced AI features
 * @example
 * ```tsx
 * <SmartSuggestionsTrigger
 *   prompt={content}
 *   isVisible={showSuggestions}
 *   onTogglePanel={() => setShowSuggestions(!showSuggestions)}
 * />
 * ```
 */
const SmartSuggestionsTrigger: React.FC<SmartSuggestionsTriggerProps> = (props) => {
  const {prompt, isVisible = true, onTogglePanel} = props;

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    // Initialize EnhancedAIBrainV2 instance
    const enhancedBrain = EnhancedAIBrainV3.getInstance();

    // Analyze prompt when panel is visible
    if (isVisible && prompt) {
      setIsAnalyzing(true);

      // Use the EnhancedAIBrainV2 to analyze the prompt
      const analysisResult = enhancedBrain.analyzePrompt(prompt);
      setAnalysis(analysisResult);

      const timer = setTimeout(() => {
        setIsAnalyzing(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [prompt, isVisible]);

  return (
    <>
      <TooltipMini title="Intelligent Prompt Enhancement Engine">
        <Button
          disabled={!prompt.trim()}
          className={cn('text-muted-foreground', !prompt.trim() ? 'opacity-30 cursor-not-allowed' : '')}
          variant="plain"
          size="icon"
          onClick={onTogglePanel}
        >
          <TooltipMini title="Intelligent Prompt Enhancement Engine">
          <>
            {isAnalyzing ? (
              <span className="animate-spin"><BrainCircuit size={props?.triggerIconSize ?? 16}/></span>
            ) : (
              <BrainCircuit size={16}/>
            )}
            {isAnalyzing && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </>
          </TooltipMini>
        </Button>
      </TooltipMini>

      {isVisible && (
        <SmartSuggestionsPanel
          isVisible={isVisible}
          onClose={onTogglePanel}
          prompt={prompt}
          analysis={analysis}
        />
      )}
    </>
  );
};

export default SmartSuggestionsTrigger;
