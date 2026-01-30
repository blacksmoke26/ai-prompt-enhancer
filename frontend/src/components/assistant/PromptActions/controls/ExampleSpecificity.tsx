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

export interface ExampleSpecificityProps {
}

const ExampleSpecificity: React.FC<ExampleSpecificityProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['exampleSpecificity'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Example Specificity</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of specificity in examples.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.exampleSpecificity}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specificity set'},
          {label: 'None', value: 'none', icon: Icon, description: 'No examples provided'},
          {label: 'General', value: 'general', icon: Icon, description: 'Broad examples'},
          {label: 'Specific', value: 'specific', icon: Icon, description: 'Targeted examples'},
          {label: 'Concrete', value: 'concrete', icon: Icon, description: 'Tangible examples'},
          {label: 'Hypothetical', value: 'hypothetical', icon: Icon, description: 'Theoretical examples'},
          {label: 'Real world', value: 'real-world', icon: Icon, description: 'Practical examples'},
        ]}
        onChange={(value) => {
          setConfig({exampleSpecificity: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ExampleSpecificity;
