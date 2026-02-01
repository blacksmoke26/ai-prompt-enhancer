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

export interface InformationDensityProps {
}

const InformationDensity: React.FC<InformationDensityProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['informationDensity'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Information Density</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The density of information per concept in the output.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.informationDensity}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific density'},
          {label: 'Brief', value: 'sparse', icon: Icon, description: 'Concise and to the point'},
          {label: 'Balanced', value: 'balanced', icon: Icon, description: 'Moderate detail'},
          {label: 'Detailed', value: 'dense', icon: Icon, description: 'Comprehensive information'},
        ]}
        onChange={(value) => {
          setConfig({informationDensity: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default InformationDensity;
