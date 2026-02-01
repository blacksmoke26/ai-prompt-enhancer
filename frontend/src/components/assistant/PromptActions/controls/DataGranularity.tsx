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

export interface DataGranularityProps {
}

const DataGranularity: React.FC<DataGranularityProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['dataGranularity'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Data Granularity</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of detail in data presentations.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.dataGranularity}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No granularity selected'},
          {label: 'Aggregated', value: 'aggregated', icon: Icon, description: 'Combined data points'},
          {label: 'Summary', value: 'summary', icon: Icon, description: 'High-level overview'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Fine-grained information'},
          {label: 'Comprehensive', value: 'comprehensive', icon: Icon, description: 'Complete and thorough data'},
          {label: 'Raw', value: 'raw', icon: Icon, description: 'Unprocessed original data'},
        ]}
        onChange={(value) => {
          setConfig({dataGranularity: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default DataGranularity;
