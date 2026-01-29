/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {OctagonX} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import SmartSelector from '~/components/ui/SmartSelector';

export interface AmbiguityToleranceProps {
}

const AmbiguityTolerance: React.FC<AmbiguityToleranceProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['ambiguityTolerance'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Ambiguity Tolerance</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of economic detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.ambiguityTolerance}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific preference set'},
          {label: 'Precise', value: 'low', icon: Icon, description: 'Strict adherence to defined parameters'},
          {label: 'Medium', value: 'medium', icon: Icon, description: 'Balanced approach to flexibility'},
          {label: 'Open-ended', value: 'high', icon: Icon, description: 'Maximum flexibility in interpretation'},
        ]}
        onChange={(value) => {
          setConfig({ambiguityTolerance: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default AmbiguityTolerance;
