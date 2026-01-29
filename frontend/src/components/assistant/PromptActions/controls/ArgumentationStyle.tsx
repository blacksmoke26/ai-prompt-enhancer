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

export interface ArgumentationStyleProps {
}

const ArgumentationStyle: React.FC<ArgumentationStyleProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['argumentationStyle'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Argumentation Style</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The style of argumentation.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.argumentationStyle}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific style selected'},
          {label: 'Deductive', value: 'deductive', icon: Icon, description: 'Reasoning from general to specific'},
          {label: 'Inductive', value: 'inductive', icon: Icon, description: 'Reasoning from specific to general'},
          {label: 'Abductive', value: 'abductive', icon: Icon, description: 'Inference to the best explanation'},
          {label: 'Rhetorical', value: 'rhetorical', icon: Icon, description: 'Persuasive language and techniques'},
          {label: 'Dialectical', value: 'dialectical', icon: Icon, description: 'Dialogue-based reasoning'},
          {label: 'Heuristic', value: 'heuristic', icon: Icon, description: 'Practical problem-solving approach'},
          {label: 'Heuristic dialectical', value: 'heuristic_dialectical', icon: Icon, description: 'Combining practical and dialogue-based reasoning'},
        ]}
        onChange={(value) => {
          setConfig({argumentationStyle: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ArgumentationStyle;
