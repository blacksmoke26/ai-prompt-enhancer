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
 * Props for the PracticalApplication component.
 *
 * @interface PracticalApplicationProps
 */
export interface PracticalApplicationProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a practicalApplication control slider.
 *
 * This component allows users to adjust the practicalApplication setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 */
const PracticalApplication: React.FC<PracticalApplicationProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.practicalApplication ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['practicalApplication'];

  useEffect(() => {
    if (debouncedValue !== config.practicalApplication) {
      setConfig({practicalApplication: debouncedValue}, true);
    }
  }, [debouncedValue, config.practicalApplication, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Practical Application</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of practical application skill.</p>
        <p className="text-muted-foreground font-normal text-xs my-1">Higher values mean the model applies knowledge effectively.</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[config.practicalApplication ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.practicalApplication}
        </span>
      </div>
    </div>
  );
};

export default PracticalApplication;
