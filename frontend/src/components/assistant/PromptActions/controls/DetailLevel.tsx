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

export interface DetailLevelProps {
}

const DetailLevel: React.FC<DetailLevelProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['detailLevel'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Detail Level</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of detail in explanations.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.detailLevel}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No detail level specified'},
          {label: 'Aggregated', value: 'aggregated', icon: Icon, description: 'Combined high-level overview'},
          {label: 'Summary', value: 'summary', icon: Icon, description: 'Brief key points'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'In-depth explanations'},
          {label: 'Comprehensive', value: 'comprehensive', icon: Icon, description: 'Thorough coverage with examples'},
          {label: 'Raw', value: 'raw', icon: Icon, description: 'Unprocessed, complete data'},
        ]}
        onChange={(value) => {
          setConfig({detailLevel: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default DetailLevel;
