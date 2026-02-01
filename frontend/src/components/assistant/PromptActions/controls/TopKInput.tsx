/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useEffect, useCallback} from 'react';

// hooks
import useDebounce from '~/hooks/useDebounce';
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import Slider from '~/components/ui/Slider';

/**
 * Top-K input component for AI configuration
 * @component
 */
const TopKInput: React.FC = () => {
  const {config, setConfig} = useAppStore();
  const [topK, setTopK] = useState<number>(config?.topK || 40);
  const Icon = providerIcons['topK'];

  useEffect(() => {
    setTopK(config?.topK || 40);
  }, [config?.topK]);

  const updateConfig = useCallback((newValue: number) => {
    setConfig({topK: newValue}, true);
    // eslint-disable-next-line
  }, []);

  const debouncedUpdateConfig = useDebounce(updateConfig, 300);

  const handleChange = (value: number[]) => {
    const newValue = value[0];
    setTopK(newValue);
    debouncedUpdateConfig(newValue);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Top-K Sampling</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">Controls the diversity of the generated text based on token probabilities.</p>
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
