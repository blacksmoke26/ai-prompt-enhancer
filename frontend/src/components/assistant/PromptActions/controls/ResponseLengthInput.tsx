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

export interface ResponseLengthInputProps {
}

const ResponseLengthInput: React.FC<ResponseLengthInputProps> = () => {
  const {responseLengths} = useDataStore();
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['responseLength'];

  const options: SmartSelectorOption[] = responseLengths.map(x => ({
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
          <strong><Icon className="inline-flex display-inline" size="16"/> Response Length</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The desired length of the output response.</p>
      </label>
      <SmartSelector
        visibleItems={10}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.responseLength}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'Not specified'},
          ...options
        ]}
        onChange={(value) => {
          setConfig({responseLength: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ResponseLengthInput;
