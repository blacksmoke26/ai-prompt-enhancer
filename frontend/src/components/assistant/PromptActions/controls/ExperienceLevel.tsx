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
 * Props for the ExperienceLevel component.
 *
 * @interface ExperienceLevelProps
 */
export interface ExperienceLevelProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a experienceLevel control slider.
 *
 * This component allows users to adjust the experienceLevel setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 */
const ExperienceLevel: React.FC<ExperienceLevelProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.experienceLevel ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['experienceLevel'];

  useEffect(() => {
    if (debouncedValue !== config.experienceLevel) {
      setConfig({experienceLevel: debouncedValue}, true);
    }
  }, [debouncedValue, config.experienceLevel, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Experience Level</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The current experience level as a number (for more granular control). Combined with experience, this determines the depth of knowledge and reasoning patterns.</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={100}
          step={0.01}
          value={[config.experienceLevel ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.experienceLevel}
        </span>
      </div>
    </div>
  );
};

export default ExperienceLevel;
