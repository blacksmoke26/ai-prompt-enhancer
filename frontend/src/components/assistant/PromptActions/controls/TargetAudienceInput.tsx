/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {OctagonX} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import SmartSelector, {SmartSelectorOption} from '~/components/ui/SmartSelector';

export interface TargetAudienceInputProps {
}

const TargetAudienceInput: React.FC<TargetAudienceInputProps> = () => {
  const {targetAudiences} = useDataStore();
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['targetAudience'];

  const options: SmartSelectorOption[] = targetAudiences.map(x => ({
    group: x.category,
    description: x.description,
    value: x.key,
    label: x.label,
  }));

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Target Audience</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The target audience for the output content. This influences tone, complexity, and language choices.</p>
      </label>
      <SmartSelector
        visibleItems={10}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.targetAudience}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'Not specified'},
          ...options
        ]}
        onChange={(value) => {
          setConfig({targetAudience: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default TargetAudienceInput;
