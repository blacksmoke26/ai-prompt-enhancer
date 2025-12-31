/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect, useRef } from 'react';

// store
import { useAppStore } from '~/stores/appStore';

// ui components
import { Slider } from '@radix-ui/themes';

/**
 * Presence penalty input component for AI configuration
 * @component
 */
const PresencePenaltyInput: React.FC = () => {
  const { config } = useAppStore();
  const [presencePenalty, setPresencePenalty] = useState<number>(config?.presencePenalty || 0.0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setPresencePenalty(config?.presencePenalty || 0.0);
  }, [config?.presencePenalty]);

  const handleChange = (value: number[]) => {
    const newValue = value[0];
    setPresencePenalty(newValue);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      // Update the config in store
      useAppStore.getState().setConfig({
        presencePenalty: newValue
      }, true);
    }, 500);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Presence Penalty
      </label>
      <div className="flex items-center space-x-4">
        <Slider
          value={[presencePenalty]}
          onValueChange={handleChange}
          min={-2}
          max={2}
          step={0.1}
          className="w-full"
        />
        <span className="text-sm w-12">{presencePenalty.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default PresencePenaltyInput;
