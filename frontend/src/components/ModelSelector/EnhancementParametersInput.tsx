/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

// hooks
import useDebounce from '~/hooks/useDebounce';

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

  const debouncedValue = useDebounce(enhancementParameters, 500);

  useEffect(() => {
    if (debouncedValue) {
      try {
        // Try to parse the JSON to validate it
        const parsed = JSON.parse(debouncedValue);

        // Update the config in store
        useAppStore.getState().setConfig({
          enhancementParameters: parsed
        }, true);
      } catch (error) {
        // If invalid JSON, don't update the store but still update the input
        console.warn('Invalid JSON for enhancement parameters');
      }
    }
  }, [debouncedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEnhancementParameters(value);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Enhancement Parameters
      </label>
      <AdvancedTextarea jsonMode={true} enableAutoClosing={true}
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
