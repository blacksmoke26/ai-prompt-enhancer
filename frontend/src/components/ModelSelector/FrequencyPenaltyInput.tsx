/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect } from 'react';

// store
import { useAppStore } from '~/stores/appStore';

// ui components
import { Slider } from '@radix-ui/themes';

// types
import type { PromptRequest } from '~/types';

/**
 * Frequency penalty input component for AI configuration
 * @component
 */
const FrequencyPenaltyInput: React.FC = () => {
  const { config } = useAppStore();
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(config?.frequencyPenalty || 0.0);

  useEffect(() => {
    setFrequencyPenalty(config?.frequencyPenalty || 0.0);
  }, [config?.frequencyPenalty]);

  const handleChange = (value: number[]) => {
    const newValue = value[0];
    setFrequencyPenalty(newValue);

    // Update the config in store
    useAppStore.getState().setConfig({
      frequencyPenalty: newValue
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Frequency Penalty
      </label>
      <div className="flex items-center space-x-4">
        <Slider
          value={[frequencyPenalty]}
          onValueChange={handleChange}
          min={-2}
          max={2}
          step={0.1}
          className="w-full"
        />
        <span className="text-sm w-12">{frequencyPenalty.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default FrequencyPenaltyInput;
