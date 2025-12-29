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

/**
 * Top-P input component for AI configuration
 * @component
 */
const TopPInput: React.FC = () => {
  const { config } = useAppStore();
  const [topP, setTopP] = useState<number>(config?.topP || 1.0);

  useEffect(() => {
    setTopP(config?.topP || 1.0);
  }, [config?.topP]);

  const handleChange = (value: number[]) => {
    const newValue = value[0];
    setTopP(newValue);

    // Update the config in store
    useAppStore.getState().setConfig({
      topP: newValue
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Top-P Sampling
      </label>
      <div className="flex items-center space-x-4">
        <Slider
          value={[topP]}
          onValueChange={handleChange}
          min={0}
          max={1}
          step={0.01}
          className="w-full"
        />
        <span className="text-sm w-12">{topP.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default TopPInput;
