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

export interface MetaphorUsageProps {
}

const MetaphorUsage: React.FC<MetaphorUsageProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['metaphorUsage'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Metaphor Usage</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The use of metaphors in the output.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.metaphorUsage}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No metaphor usage preference'},
          {label: 'None', value: 'none', icon: Icon, description: 'Avoid metaphors entirely'},
          {label: 'Occasional', value: 'light', icon: Icon, description: 'Use metaphors sparingly'},
          {label: 'Figurative language', value: 'heavy', icon: Icon, description: 'Frequent use of figurative language'},
        ]}
        onChange={(value) => {
          setConfig({metaphorUsage: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default MetaphorUsage;
