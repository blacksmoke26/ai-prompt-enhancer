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

export interface NarrativePerspectiveProps {
}

const NarrativePerspective: React.FC<NarrativePerspectiveProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['narrativePerspective'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Narrative Perspective</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The narrative perspective to use.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.narrativePerspective}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific perspective'},
          {label: 'First person', value: 'first-person', icon: Icon, description: 'The narrator is a character in the story'},
          {label: 'Third person', value: 'third-person', icon: Icon, description: 'The narrator is outside the story'},
          {label: 'Second person', value: 'second-person', icon: Icon, description: 'The narrator addresses the reader as "you"'},
          {label: 'Omniscient', value: 'omniscient', icon: Icon, description: 'The narrator knows everything about all characters'},
          {label: 'Limited', value: 'limited', icon: Icon, description: 'The narrator knows only one character\'s thoughts'},
          {label: 'Objective', value: 'objective', icon: Icon, description: 'The narrator reports only observable facts'},
        ]}
        onChange={(value) => {
          setConfig({narrativePerspective: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default NarrativePerspective;
