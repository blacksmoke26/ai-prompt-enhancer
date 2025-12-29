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

/**
 * Custom instructions input component for AI configuration
 * @component
 */
const CustomInstructionsInput: React.FC = () => {
  const { config } = useAppStore();
  const [customInstructions, setCustomInstructions] = useState<string>(config?.customInstructions || '');

  useEffect(() => {
    setCustomInstructions(config?.customInstructions || '');
  }, [config?.customInstructions]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCustomInstructions(value);

    // Update the config in store
    useAppStore.getState().setConfig({
      customInstructions: value
    }, true);
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
