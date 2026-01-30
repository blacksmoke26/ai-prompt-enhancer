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

export interface HistoricalDepthProps {
}

const HistoricalDepth: React.FC<HistoricalDepthProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['historicalDepth'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Historical Depth</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The depth of historical knowledge to draw upon.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.historicalDepth}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No historical depth set'},
          {label: 'None', value: 'none', icon: Icon, description: 'No historical context'},
          {label: 'Brief', value: 'brief', icon: Icon, description: 'Minimal historical details'},
          {label: 'Thorough', value: 'thorough', icon: Icon, description: 'Comprehensive historical analysis'},
          {label: 'Historical', value: 'historical', icon: Icon, description: 'Historically accurate information'},
          {label: 'Mythological', value: 'mythological', icon: Icon, description: 'Myths and legends'},
          {label: 'Shallow', value: 'shallow', icon: Icon, description: 'Surface-level historical knowledge'},
          {label: 'Moderate', value: 'moderate', icon: Icon, description: 'Balanced historical depth'},
          {label: 'Deep', value: 'deep', icon: Icon, description: 'Extensive historical knowledge'},
          {label: 'Encyclopedic', value: 'encyclopedic', icon: Icon, description: 'Complete historical reference'},
          {label: 'Archival', value: 'archival', icon: Icon, description: 'Archival historical records'},
        ]}
        onChange={(value) => {
          setConfig({historicalDepth: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default HistoricalDepth;
