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

export interface PersuasionTechniqueProps {
}

const PersuasionTechnique: React.FC<PersuasionTechniqueProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['persuasionTechnique'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Persuasion Technique</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The persuasion technique to use.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.persuasionTechnique}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No technique selected'},
          {label: 'Credibility', value: 'ethos', icon: Icon, description: 'Establish trust and authority'},
          {label: 'Emotion', value: 'pathos', icon: Icon, description: 'Appeal to feelings and values'},
          {label: 'Logic', value: 'logos', icon: Icon, description: 'Use reasoning and evidence'},
          {label: 'Timing', value: 'kairos', icon: Icon, description: 'Consider the opportune moment'},
        ]}
        onChange={(value) => {
          setConfig({persuasionTechnique: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default PersuasionTechnique;
