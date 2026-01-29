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
 * Props for the AcquisitionSpeed component.
 *
 * @interface AcquisitionSpeedProps
 */
export interface AcquisitionSpeedProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a acquisitionSpeed control slider.
 *
 * This component allows users to adjust the acquisitionSpeed setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 *
 * @example
 * ```tsx
 * <AcquisitionSpeed className="custom-styles" />
 * ```
 *
 * @developer-notes
 * - The slider value is debounced to prevent excessive updates to the store.
 * - Default acquisitionSpeed value is set to 0.7 if not provided.
 * - Uses Radix UI's Slider component for the underlying implementation.
 */
const AcquisitionSpeed: React.FC<AcquisitionSpeedProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.acquisitionSpeed ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['acquisitionSpeed'];

  useEffect(() => {
    if (debouncedValue !== config.acquisitionSpeed) {
      setConfig({acquisitionSpeed: debouncedValue}, true);
    }
  }, [debouncedValue, config.acquisitionSpeed, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Acquisition Speed</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The speed of knowledge acquisition</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={1}
          max={100}
          step={1}
          value={[config.acquisitionSpeed ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.acquisitionSpeed}
        </span>
      </div>
    </div>
  );
};

export default AcquisitionSpeed;
