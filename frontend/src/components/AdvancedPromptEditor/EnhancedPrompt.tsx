/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import Markdown from 'react-markdown';
import {Sparkles, Target, Clock, Zap, TrendingUp} from 'lucide-react';

// ui components
import {Badge} from '~/components/ui/Badge';

/**
 * Represents the response from an enhanced prompt generation request
 * @developer Used to display the enhanced prompt and its metadata
 * @example
 * const response: EnhancedPromptResponse = {
 *   enhancedPrompt: "Detailed and specific prompt text",
 *   model: "gpt-4",
 *   processingTime: 1234,
 *   tokensUsed: 256
 * }
 */
export interface EnhancedPromptResponse {
  /** The enhanced and detailed version of the original prompt */
  enhancedPrompt: string;
  /** The AI model used to generate the enhanced prompt (e.g., "gpt-4") */
  model: string;
  /** Time taken in milliseconds to process and enhance the prompt */
  processingTime: number;
  /** Optional: Number of tokens used during the enhancement process */
  tokensUsed?: number;
}

/**
 * Props for the EnhancedPrompt component
 * @developer Combines the response with the original prompt for comparison
 * @example
 * <EnhancedPrompt
 *   response={response}
 *   originalPrompt="Simple prompt text"
 * />
 */
export interface EnhancedPromptProps {
  /** The enhanced prompt response containing metadata and the enhanced text */
  response: EnhancedPromptResponse | null;
  /** The original prompt text for comparison */
  originalPrompt: string;
}

/**
 * Displays an enhanced prompt with metadata and comparison stats
 * @developer Shows model info, processing metrics, and character statistics
 * @example
 * <EnhancedPrompt
 *   response={response}
 *   originalPrompt="Original prompt here"
 * />
 * @note Returns null if no response is provided
 */
const EnhancedPrompt: React.FC<EnhancedPromptProps> = ({response, originalPrompt}) => {
  if (!response) return null;

  const originalLength = originalPrompt.length;
  const enhancedLength = response.enhancedPrompt.length;
  const percentageChange = Math.round(((enhancedLength - originalLength) / originalLength) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium flex items-center">
          <Sparkles className="h-4 w-4 mr-2"/>
          Enhanced Prompt
        </h4>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            <Target className="h-3 w-3 mr-1"/>
            {response.model}
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Clock className="h-3 w-3 mr-1"/>
            {response.processingTime}ms
          </Badge>
          {response.tokensUsed && (
            <Badge variant="outline" className="text-xs">
              <Zap className="h-3 w-3 mr-1"/>
              {response.tokensUsed} tokens
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            <TrendingUp className="h-3 w-3 mr-1"/>
            +{percentageChange}%
          </Badge>
        </div>
      </div>
      <div className="rounded-md p-4 max-h-96 overflow-y-auto">
        <Markdown>
        {String(response.enhancedPrompt || '')?.replace(/\\n/ig, `\n`)}
        </Markdown>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
        <div>Original: {originalLength} chars</div>
        <div>Enhanced: {enhancedLength} chars</div>
        <div>Efficiency: {Math.round((enhancedLength / originalLength) * 100)}%</div>
        <div>Time: {response.processingTime}ms</div>
        {response.tokensUsed && <div>Tokens: {response.tokensUsed}</div>}
      </div>
    </div>
  );
};

export default EnhancedPrompt;
