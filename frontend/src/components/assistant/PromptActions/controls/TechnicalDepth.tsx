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

export interface TechnicalDepthProps {
}

const TechnicalDepth: React.FC<TechnicalDepthProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['technicalDepth'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Technical Depth</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of technical detail in explanations.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.technicalDepth}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific depth set'},
          {label: 'Layman', value: 'layman', icon: Icon, description: 'Simple, non-technical explanations'},
          {label: 'Basic', value: 'basic', icon: Icon, description: 'Fundamental technical concepts'},
          {label: 'Intermediate', value: 'intermediate', icon: Icon, description: 'Moderate level of detail'},
          {label: 'Advanced', value: 'advanced', icon: Icon, description: 'In-depth technical analysis'},
          {label: 'Expert', value: 'expert', icon: Icon, description: 'Professional-grade insights'},
          {label: 'Academic', value: 'academic', icon: Icon, description: 'Scholarly and research-oriented'},
          {label: 'Proprietary', value: 'proprietary', icon: Icon, description: 'Specialized internal knowledge'},
        ]}
        onChange={(value) => {
          setConfig({technicalDepth: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default TechnicalDepth;
