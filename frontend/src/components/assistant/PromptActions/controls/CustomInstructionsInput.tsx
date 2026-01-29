/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect } from 'react';

// store
import { useAppStore } from '~/stores/appStore';

// ui components
import { Textarea } from '~/components/ui/Textarea';

// hooks
import useDebounce from '~/hooks/useDebounce';

/**
 * Custom instructions input component for AI configuration
 * @component
 */
const CustomInstructionsInput: React.FC = () => {
  const { config, setConfig } = useAppStore();

  const [customInstructions, setCustomInstructions] = useState<string>(config?.customInstructions || '');
  const debouncedCustomInstructions = useDebounce(customInstructions, 500);

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
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Custom Instructions
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
