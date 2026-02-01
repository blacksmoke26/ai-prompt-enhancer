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
 * Props for the EmotionalIntensity component.
 *
 * @interface EmotionalIntensityProps
 */
export interface EmotionalIntensityProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a emotionalIntensity control slider.
 *
 * This component allows users to adjust the emotionalIntensity setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 */
const EmotionalIntensity: React.FC<EmotionalIntensityProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.emotionalIntensity ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['emotionalIntensity'];

  useEffect(() => {
    if (debouncedValue !== config.emotionalIntensity) {
      setConfig({emotionalIntensity: debouncedValue}, true);
    }
  }, [debouncedValue, config.emotionalIntensity, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Emotional Intensity</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The intensity of emotional expression in the output.</p>
        <p className="text-muted-foreground font-normal text-xs my-1">Range: 1 (flat) to 10 (passionate).</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={10}
          value={[config.emotionalIntensity ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.emotionalIntensity}
        </span>
      </div>
    </div>
  );
};

export default EmotionalIntensity;
