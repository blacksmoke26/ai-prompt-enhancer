/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useEffect} from 'react';

// ui components
import {Button} from '~/components/ui/Button';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '~/components/ui/Tooltip';

// components
import SmartSuggestionsPanel from '~/components/SmartSuggestionsPanel';

// AI brain module
import {EnhancedAIBrainV3} from '~/lib/ai-brain-enhanced';

export interface SmartSuggestionsTriggerProps {
  /** Current prompt text */
  prompt: string;

  /** Whether suggestions panel is visible */
  isVisible: boolean;

  /** Callback when panel visibility changes */
  onTogglePanel: () => void;

  /** Response from prompt enhancement (if available) */
  response?: any | null;
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
  const {prompt, isVisible = true, onTogglePanel, response} = props;

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePanel}
              className="h-8 w-8 p-0 relative"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                {isAnalyzing ? (
                  <span className="animate-spin">🧠</span>
                ) : (
                  '🧠'
                )}
              </div>
              {isAnalyzing && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI-Powered Prompt Suggestions</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {isVisible && (
        <SmartSuggestionsPanel
          isVisible={isVisible}
          onClose={onTogglePanel}
          prompt={prompt}
          response={response}
          analysis={analysis}
        />
      )}
    </>
  );
};

export default SmartSuggestionsTrigger;
