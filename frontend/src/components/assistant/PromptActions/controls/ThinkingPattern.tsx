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

export interface ThinkingPatternProps {
}

const ThinkingPattern: React.FC<ThinkingPatternProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['thinkingPattern'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Thinking Pattern</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The type of thinking patterns the persona employs.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.thinkingPattern}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific pattern selected'},
          {label: 'Linear', value: 'linear', icon: Icon, description: 'Sequential reasoning'},
          {label: 'Synthetic', value: 'synthetic', icon: Icon, description: 'Combining elements'},
          {label: 'Hierarchical', value: 'hierarchical', icon: Icon, description: 'Structured levels'},
          {label: 'Network', value: 'network', icon: Icon, description: 'Interconnected concepts'},
          {label: 'Holistic', value: 'holistic', icon: Icon, description: 'Complete system view'},
          {label: 'Combinatorial', value: 'combinatorial', icon: Icon, description: 'Arranging possibilities'},
          {label: 'Differential', value: 'differential', icon: Icon, description: 'Analyzing differences'},
          {label: 'Evolutionary', value: 'evolutionary', icon: Icon, description: 'Iterative development'},
        ]}
        onChange={(value) => {
          setConfig({thinkingPattern: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ThinkingPattern;
