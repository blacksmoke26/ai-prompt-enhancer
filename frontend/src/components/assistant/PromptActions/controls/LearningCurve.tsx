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

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import Slider from '~/components/ui/Slider';

/**
 * Props for the LearningCurve component.
 *
 * @interface LearningCurveProps
 */
export interface LearningCurveProps {
  /** Optional CSS class name to apply custom styles. */
  className?: string;
}

/**
 * A React component that renders a learningCurve control slider.
 *
 * This component allows users to adjust the learningCurve setting with a slider,
 * displaying the current value and updating the app store with debounced changes.
 */
const LearningCurve: React.FC<LearningCurveProps> = ({className = ''}) => {
  const {config, setConfig} = useAppStore();

  const [localValue, setLocalValue] = useState(config.learningCurve ?? 0.7);
  const debouncedValue = useDebounce(localValue, 300);
  const Icon = providerIcons['learningCurve'];

  useEffect(() => {
    if (debouncedValue !== config.learningCurve) {
      setConfig({learningCurve: debouncedValue}, true);
    }
  }, [debouncedValue, config.learningCurve, setConfig]);

  return (
    <div className={className}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Learning Curve</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The learning curve adjustment. Higher values mean the model learns new concepts faster.</p>
      </label>
      <div className="flex items-center justify-between space-x-3 pt-1">
        <Slider
          min={0}
          max={1}
          step={0.01}
          value={[config.learningCurve ?? 0]}
          onValueChange={([value]) => setLocalValue(value)}
          aria-label="slider"
          className="w-full"
        />
        <span className="text-sm w-10">
          {config.learningCurve}
        </span>
      </div>
    </div>
  );
};

export default LearningCurve;
