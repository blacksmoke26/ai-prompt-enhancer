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
 * Props for the PatternRecognitionSensitivity component.
 *
 * @interface PatternRecognitionSensitivityProps
 */
export interface PatternRecognitionSensitivityProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a patternRecognitionSensitivity control slider.
 *
 * This component allows users to adjust the patternRecognitionSensitivity setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 */
const PatternRecognitionSensitivity: React.FC<PatternRecognitionSensitivityProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.patternRecognitionSensitivity ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['patternRecognitionSensitivity'];

  useEffect(() => {
    if (debouncedValue !== config.patternRecognitionSensitivity) {
      setConfig({patternRecognitionSensitivity: debouncedValue}, true);
    }
  }, [debouncedValue, config.patternRecognitionSensitivity, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Pattern Recognition Sensitivity</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The pattern recognition sensitivity.</p>
        <p className="text-muted-foreground font-normal text-xs my-1">Higher values mean the model recognizes patterns more quickly.</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[config.patternRecognitionSensitivity ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.patternRecognitionSensitivity}
        </span>
      </div>
    </div>
  );
};

export default PatternRecognitionSensitivity;
