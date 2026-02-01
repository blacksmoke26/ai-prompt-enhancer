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
 * Props for the EmpathyLevel component.
 *
 * @interface EmpathyLevelProps
 */
export interface EmpathyLevelProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a empathyLevel control slider.
 *
 * This component allows users to adjust the empathyLevel setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 */
const EmpathyLevel: React.FC<EmpathyLevelProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.empathyLevel ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['empathyLevel'];

  useEffect(() => {
    if (debouncedValue !== config.empathyLevel) {
      setConfig({empathyLevel: debouncedValue}, true);
    }
  }, [debouncedValue, config.empathyLevel, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Empathy Level</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of empathy to express in the output.</p>
        <p className="text-muted-foreground font-normal text-xs my-1">Range: 1 (neutral) to 10 (deep empathy).</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={10}
          value={[config.empathyLevel ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.empathyLevel}
        </span>
      </div>
    </div>
  );
};

export default EmpathyLevel;
