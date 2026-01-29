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

export interface AbstractionLevelProps {
}

const AbstractionLevel: React.FC<AbstractionLevelProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['abstractionLevel'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Abstraction Level</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of abstraction in the content.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.abstractionLevel}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: ''},
          {label: 'Concrete', value: 'concrete', icon: Icon, description: ''},
          {label: 'Abstract', value: 'abstract', icon: Icon, description: ''},
          {label: 'Mixed', value: 'mixed', icon: Icon, description: ''},
        ]}
        onChange={(value) => {
          setConfig({abstractionLevel: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default AbstractionLevel;
