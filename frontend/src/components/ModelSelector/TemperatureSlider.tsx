/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';
import {Thermometer} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';
import useDebounce from '~/hooks/useDebounce';

// ui components
import Slider from '~/components/ui/Slider';

/**
 * Props for the TemperatureSlider component.
 *
 * @interface TemperatureSliderProps
 */
export interface TemperatureSliderProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a temperature control slider.
 *
 * This component allows users to adjust the temperature setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 *
 * @example
 * ```tsx
 * <TemperatureSlider className="custom-styles" />
 * ```
 *
 * @developer-notes
 * - The slider value is debounced to prevent excessive updates to the store.
 * - Default temperature value is set to 0.7 if not provided.
 * - Uses Radix UI's Slider component for the underlying implementation.
 */
const TemperatureSlider: React.FC<TemperatureSliderProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localTemperature, setLocalTemperature] = useState(config.temperature ?? 0.7);
  const debouncedTemperature = useDebounce(localTemperature, 300);

  useEffect(() => {
    if (debouncedTemperature !== config.temperature) {
      setConfig({temperature: debouncedTemperature}, true);
    }
  }, [debouncedTemperature, config.temperature, setConfig]);

  return (
    <div className={className}>
      <label className="text-sm font-medium"><Thermometer size="16" className="display-inline"/> Temperature</label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[config.temperature ?? 0.7]}
          onValueChange={([value]) => setLocalTemperature(value)}
          aria-label="Temperature slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.temperature?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default TemperatureSlider;
