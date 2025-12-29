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

// types
import type { PromptRequest } from '~/types';

/**
 * Enhancement parameters input component for AI configuration
 * @component
 */
const EnhancementParametersInput: React.FC = () => {
  const { config } = useAppStore();
  const [enhancementParameters, setEnhancementParameters] = useState<string>(config?.enhancementParameters ? JSON.stringify(config.enhancementParameters) : '');

  useEffect(() => {
    setEnhancementParameters(config?.enhancementParameters ? JSON.stringify(config.enhancementParameters) : '');
  }, [config?.enhancementParameters]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEnhancementParameters(value);

    try {
      // Try to parse the JSON to validate it
      const parsed = JSON.parse(value);

      // Update the config in store
      useAppStore.getState().setConfig({
        enhancementParameters: parsed
      }, true);
    } catch (error) {
      // If invalid JSON, don't update the store but still update the input
      console.warn('Invalid JSON for enhancement parameters');
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Enhancement Parameters
      </label>
      <Textarea
        value={enhancementParameters}
        onChange={handleChange}
        placeholder="Enter enhancement parameters as JSON (e.g. {&quot;complexity&quot;: 5, &quot;focus&quot;: &quot;performance&quot;})"
        className="w-full"
        rows={3}
      />
      <p className="text-xs text-gray-500">Enter parameters as valid JSON object</p>
    </div>
  );
};

export default EnhancementParametersInput;
