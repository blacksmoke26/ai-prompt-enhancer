/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useRef, useState} from 'react';
import {ScrollText} from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Button} from '~/components/ui/Button';
import {TooltipMini} from '~/components/ui/Tooltip';
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

/**
 * Represents the props for the `DefaultSystemPrompt` component.
 * Currently, this interface is intentionally empty as no props are required.
 */
export interface DefaultSystemPromptProps {
  /** Trigger SVG icon size */
  triggerIconSize?: number;
}

/**
 * Renders the default system prompt component.
 * This component serves as a base for other prompt components and can be extended with additional props in the future.
 *
 * @example
 * import { DefaultSystemPrompt } from './DefaultSystemPrompt';
 *
 * function App() {
 *   return <DefaultSystemPrompt />;
 * }
 *
 * @remarks
 * Developers can extend this component by adding props to `DefaultSystemPromptProps` and using them within the component body.
 */
export const DefaultSystemPrompt: React.FC<DefaultSystemPromptProps> = (props) => {
  const {config, setConfig} = useAppStore();

  const [localSystemPrompt, setLocalSystemPrompt] = useState<string>(config.defaultSystemPrompt);
  const popoverRef = useRef<HTMLButtonElement>(null);

  return (
    <Popover.Root>
      <Popover.Trigger asChild ref={popoverRef}>
        <Button variant="plain" className="px-0 text-sm" size="icon">
          <TooltipMini title="Change the system's default prompt">
            <ScrollText size={props.triggerIconSize ?? 16}/>
          </TooltipMini>
        </Button>
      </Popover.Trigger>
      <Popover.Content
        side="bottom"
        align="end"
        className="w-96 p-4 rounded bg-background border border-border shadow-lg z-50 outline-2 outline-blue-500 outline-solid"
      >
        <div className="space-y-2">
          <h3 className="font-medium">Default System Prompt</h3>
          <AdvancedTextarea
            maxLength={300} showCopyButton
            value={localSystemPrompt}
            onChange={v => setLocalSystemPrompt(v)}
            placeholder="Enter default system prompt..."
            rows={3}
          />
          <div className="flex justify-end space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLocalSystemPrompt('You are a helpful AI assistant specialised in enhancing and improving prompts.');
              }}
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setConfig({defaultSystemPrompt: config.defaultSystemPrompt}, true);
                popoverRef.current?.click();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>

  );
}

export default DefaultSystemPrompt;
