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

export interface TemporalScopeProps {
}

const TemporalScope: React.FC<TemporalScopeProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['temporalScope'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Temporal Scope</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of temporal specificity.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.temporalScope}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific time scope'},
          {label: 'Eternal', value: 'eternal', icon: Icon, description: 'Timeless and unchanging'},
          {label: 'Historical', value: 'historical', icon: Icon, description: 'Past events and records'},
          {label: 'Contemporary', value: 'contemporary', icon: Icon, description: 'Current and recent times'},
          {label: 'Immediate', value: 'immediate', icon: Icon, description: 'Right now or very recent'},
          {label: 'Future', value: 'future', icon: Icon, description: 'Upcoming or prospective'},
          {label: 'Archived', value: 'archived', icon: Icon, description: 'Stored and no longer active'},
        ]}
        onChange={(value) => {
          setConfig({temporalScope: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default TemporalScope;
