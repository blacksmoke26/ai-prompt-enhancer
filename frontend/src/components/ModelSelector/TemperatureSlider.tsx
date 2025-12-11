/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { Thermometer } from 'lucide-react';
import { Slider } from '@radix-ui/themes';

// hooks
import { useAppStore } from '~/stores/appStore';

interface TemperatureSliderProps {
  className?: string;
}

const TemperatureSlider: React.FC<TemperatureSliderProps> = ({ className = '' }) => {
  const {
    config,
    setConfig,
  } = useAppStore();

  return (
    <div className={className}>
      <label className="text-sm font-medium"><Thermometer size="16" className="display-inline"/> Temperature</label>
      <div className="flex items-center space-x-3 pt-1">
        <Slider
          min={0}
          max={1}
          step={0.01}
          defaultValue={[config.temperature ?? 0.7]}
          onValueChange={([value]) => setConfig({temperature: value})}
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
