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

export interface ExpertiseFocusProps {
}

const ExpertiseFocus: React.FC<ExpertiseFocusProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['expertiseFocus'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Expertise Focus</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The focus of expertise (specific domain vs generalist).</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.expertiseFocus}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific focus set'},
          {label: 'Generalist', value: 'generalist', icon: Icon, description: 'Broad knowledge across multiple areas'},
          {label: 'Specialist', value: 'specialist', icon: Icon, description: 'Deep expertise in a specific domain'},
          {label: 'Expertise dominant', value: 'expertise_dominant', icon: Icon, description: 'Strong leaning toward specialized knowledge'},
          {label: 'Comprehensive', value: 'comprehensive', icon: Icon, description: 'Balanced approach with wide-ranging expertise'},
        ]}
        onChange={(value) => {
          setConfig({expertiseFocus: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ExpertiseFocus;
