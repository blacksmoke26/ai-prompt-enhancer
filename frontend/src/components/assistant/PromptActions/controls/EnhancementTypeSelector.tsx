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

export interface EnhancementTypeSelectorProps {
}

const EnhancementTypeSelector: React.FC<EnhancementTypeSelectorProps> = () => {
  const {enhancementTypes} = useDataStore();
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['enhancementType'];

  const options: SmartSelectorOption[] = enhancementTypes.map(x => ({
    group: x.category,
    description: x.shortDescription,
    value: x.key,
    label: x.name,
  }));

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Enhancement Type</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The type of enhancement or transformation to apply to the input text.</p>
        <p className="text-muted-foreground font-normal text-xs my-1">This could include summarization, translation, formatting, etc.</p>
      </label>
      <SmartSelector
        visibleItems={10}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.enhancementType}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'Not specified'},
          ...options
        ]}
        onChange={(value) => {
          setConfig({enhancementType: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default EnhancementTypeSelector;
