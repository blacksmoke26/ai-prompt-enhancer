/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import Slider from '~/components/ui/Slider';

// hooks
import useDebounce from '~/hooks/useDebounce';

/**
 * Top-P input component for AI configuration
 * @component
 */
const TopPInput: React.FC = () => {
  const {config, setConfig} = useAppStore();
  const [topP, setTopP] = useState<number>(config?.topP || 1.0);
  const debouncedTopP = useDebounce(topP, 300);

  useEffect(() => {
    setTopP(config?.topP || 1.0);
  }, [config?.topP]);

  useEffect(() => {
    // Update the config in store with debounced value
    setConfig({topP: debouncedTopP}, true);
    // eslint-disable-next-line
  }, [debouncedTopP]);

  const handleChange = (value: number[]) => {
    const newValue = value[0];
    setTopP(newValue);
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
