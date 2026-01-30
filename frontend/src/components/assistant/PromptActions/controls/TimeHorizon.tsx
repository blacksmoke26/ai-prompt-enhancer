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

export interface TimeHorizonProps {
}

const TimeHorizon: React.FC<TimeHorizonProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['timeHorizon'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Time Horizon</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The time horizon for considering long-term consequences and future implications.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.timeHorizon}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific time horizon'},
          {label: 'Short term', value: 'short-term', icon: Icon, description: 'Immediate to near-future focus'},
          {label: 'Medium term', value: 'medium-term', icon: Icon, description: 'Balanced near and mid-range outlook'},
          {label: 'Long term', value: 'long-term', icon: Icon, description: 'Extended future perspective'},
          {label: 'Enterprise', value: 'enterprise', icon: Icon, description: 'Strategic business alignment'},
          {label: 'Centennial', value: 'centennial', icon: Icon, description: 'Multi-generational considerations'},
        ]}
        onChange={(value) => {
          setConfig({timeHorizon: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default TimeHorizon;
