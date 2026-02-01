/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import {Thermometer} from 'lucide-react';

// utils
import {providerIcons} from '~/components/assistant/utils';

// hooks
import {useAppStore} from '~/stores/appStore';
import useDebounce from '~/hooks/useDebounce';

// ui components
import Slider from '~/components/ui/Slider';

/**
 * Props for the CriticalThinking component.
 *
 * @interface CriticalThinkingProps
 */
export interface CriticalThinkingProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a criticalThinking control slider.
 *
 * This component allows users to adjust the criticalThinking setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 */
const CriticalThinking: React.FC<CriticalThinkingProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.criticalThinking ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['criticalThinking'];

  useEffect(() => {
    if (debouncedValue !== config.criticalThinking) {
      setConfig({criticalThinking: debouncedValue}, true);
    }
  }, [debouncedValue, config.criticalThinking, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Critical Thinking</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of critical thinking capability.</p>
        <p className="text-muted-foreground font-normal text-xs my-1">Higher values mean the model can critically evaluate information.</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[config.criticalThinking ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.criticalThinking}
        </span>
      </div>
    </div>
  );
};

export default CriticalThinking;
