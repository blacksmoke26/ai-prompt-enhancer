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

export interface CognitiveLoadProps {
}

const CognitiveLoad: React.FC<CognitiveLoadProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['cognitiveLoad'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Cognitive Load</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The cognitive load required to understand the content.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.cognitiveLoad}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific load'},
          {label: 'Simple concepts', value: 'low', icon: Icon, description: 'Easy to understand'},
          {label: 'Medium', value: 'medium', icon: Icon, description: 'Moderate complexity'},
          {label: 'Complex analysis', value: 'high', icon: Icon, description: 'Deep thinking required'},
        ]}
        onChange={(value) => {
          setConfig({cognitiveLoad: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default CognitiveLoad;
