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
 * Top-K input component for AI configuration
 * @component
 */
const TopKInput: React.FC = () => {
  const { config } = useAppStore();
  const [topK, setTopK] = useState<number>(config?.topK || 40);

  useEffect(() => {
    setTopK(config?.topK || 40);
  }, [config?.topK]);

  const handleChange = (value: number[]) => {
    const newValue = value[0];
    setTopK(newValue);

    // Update the config in store
    useAppStore.getState().setConfig({
      topK: newValue
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Top-K Sampling
      </label>
      <div className="flex items-center space-x-4">
        <Slider
          value={[topK]}
          onValueChange={handleChange}
          min={0}
          max={100}
          step={1}
          className="w-full"
        />
        <span className="text-sm w-12">{topK}</span>
      </div>
    </div>
  );
};

export default TopKInput;
