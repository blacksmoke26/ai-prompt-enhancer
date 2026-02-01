/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect } from 'react';

// hooks
import useDebounce from '~/hooks/useDebounce';
import { useAppStore } from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import { Textarea } from '~/components/ui/Textarea';

/**
 * Custom instructions input component for AI configuration
 * @component
 */
const CustomInstructionsInput: React.FC = () => {
  const { config, setConfig } = useAppStore();

  const [customInstructions, setCustomInstructions] = useState<string>(config?.customInstructions || '');
  const debouncedCustomInstructions = useDebounce(customInstructions, 500);
  const Icon = providerIcons['customInstructions'];

  useEffect(() => {
    setCustomInstructions(config?.customInstructions || '');
  }, [config?.customInstructions]);

  useEffect(() => {
    if (debouncedCustomInstructions !== config.customInstructions) {
      setConfig({customInstructions: debouncedCustomInstructions}, true);
    }
  }, [debouncedCustomInstructions, config.customInstructions, setConfig]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCustomInstructions(value);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Custom Instructions</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">Custom instructions to supplement the main prompt. <br/>
          These are additional guidelines for the model to follow.</p>
      </label>
      <Textarea
        value={customInstructions}
        onChange={handleChange}
        placeholder="Enter any custom instructions for the AI response"
        className="w-full"
        rows={3}
      />
    </div>
  );
};

export default CustomInstructionsInput;
