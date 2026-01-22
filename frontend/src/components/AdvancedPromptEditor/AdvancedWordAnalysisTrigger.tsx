/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import {BookAlert} from 'lucide-react';
import {Dialog, Flex} from '@radix-ui/themes';

// ui components
import {Button} from '~/components/ui/Button';
import {TooltipMini} from '~/components/ui/Tooltip';

// components
import AdvancedWordAnalysis, {
  WordAnalysisConfig,
  AdvancedWordAnalysisProps,
} from '~/components/standalone/AdvancedWordAnalysis';

export type {WordAnalysisConfig};

/**
 * Represents the props for triggering advanced word analysis.
 * This interface is a subset of `AdvancedWordAnalysisProps` with the `text` property omitted and includes the current prompt text.
 */
export interface AdvancedWordAnalysisTriggerProps extends Omit<AdvancedWordAnalysisProps, 'text'> {
  /** The current prompt text that triggers the advanced word analysis */
  prompt: string;

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
const AdvancedWordAnalysisTrigger: React.FC<AdvancedWordAnalysisTriggerProps> = (props) => {
  const {prompt, ...rest} = props;

  const [text, setText] = useState<string>(prompt);

  useEffect(() => {
    setText(prompt);
  }, [prompt]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button disabled={!text.trim()} variant="plain" size="icon">
          <TooltipMini title="Deep Linguistic Analysis">
            <BookAlert size={props.triggerIconSize ?? 16}/>
          </TooltipMini>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content minWidth="1600px">
        <Flex direction="column" gap="3">
          <div className="p-2 pt-0 flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                <BookAlert className="w-5 h-5 display-inline text-white"/></div>
              <div>
                <h3 className="font-semibold tracking-tight text-lg flex items-center gap-2">
                  Deep Linguistic Analysis
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Engine that deeply analyzes prompts, enhancing
                  clarity, precision, and effectiveness for optimized communication.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog.Close>
                <Button variant="plain" size="icon">✕</Button>
              </Dialog.Close>
            </div>
          </div>
          <AdvancedWordAnalysis {...rest} text={text}/>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AdvancedWordAnalysisTrigger;
