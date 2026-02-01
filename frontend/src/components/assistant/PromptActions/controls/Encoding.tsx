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

export interface EncodingProps {
}

const Encoding: React.FC<EncodingProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['encoding'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Encoding</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The character encoding to use for the output.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.encoding}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific encoding'},
          {label: 'UTF-8', value: 'utf-8', icon: Icon, description: 'Universal character encoding'},
          {label: 'Ascii', value: 'ascii', icon: Icon, description: 'Standard ASCII character set'},
        ]}
        onChange={(value) => {
          setConfig({encoding: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default Encoding;
