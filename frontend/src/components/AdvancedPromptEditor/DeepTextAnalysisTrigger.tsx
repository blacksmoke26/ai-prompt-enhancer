/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import {Brain} from 'lucide-react';
import {Dialog, Flex} from '@radix-ui/themes';

// ui components
import {Button} from '~/components/ui/Button';
import {TooltipMini} from '~/components/ui/Tooltip';

// components
import WordCloudAdvance, {WordCloudAdvanceProps} from '~/components/standalone/WordCloud/WordCloudAdvance';

/**
 * Represents the props for triggering advanced word analysis.
 */
export interface DeepTextAnalysisTriggerProps extends Omit<WordCloudAdvanceProps, 'text'> {
  /** The current prompt text that triggers the advanced word analysis */
  prompt: string;
  disabled: boolean;
}

const DeepTextAnalysisTrigger: React.FC<DeepTextAnalysisTriggerProps> = (props) => {
  const {prompt, disabled = false} = props;

  const [text, setText] = useState<string>(prompt);

  useEffect(() => {
    setText(prompt);
  }, [prompt]);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button disabled={disabled} variant="plain" size="icon">
          <TooltipMini title="Show Deep Text Analysis">
            <Brain className="w-5 h-5"/>
          </TooltipMini>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content minWidth="1600px">
        <Flex direction="column" gap="3">
          <div className="flex flex-row items-center justify-end space-y-0 ">
            <div className="flex items-center gap-2">
              <Dialog.Close>
                <Button variant="plain" size="sm">✕</Button>
              </Dialog.Close>
            </div>
          </div>
          <WordCloudAdvance text={text} {...props}/>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeepTextAnalysisTrigger;
