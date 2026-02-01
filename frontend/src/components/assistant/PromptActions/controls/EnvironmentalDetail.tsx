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

export interface environmentalDetailProps {
}

const EnvironmentalDetail: React.FC<environmentalDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['environmentalDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Environmental Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of environmental detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.environmentalDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'Default system value'},
          {label: 'None', value: 'none', icon: Icon, description: 'No environmental details'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'Basic conceptual outlines'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Minimal environmental elements'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Rich environmental features'},
          {label: 'Ecosystem', value: 'ecosystem', icon: Icon, description: 'Complete environmental system'},

        ]}
        onChange={(value) => {
          setConfig({environmentalDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default EnvironmentalDetail;
