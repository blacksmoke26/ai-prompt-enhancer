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

// types
import type {ResponseOutputFormat} from '~/types';

export interface FormatInputProps {
}

const FormatInput: React.FC<FormatInputProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['format'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Detail Level</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of detail in explanations.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        showSearch={false}
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.format}
        options={[
          {label: 'Markdown', value: 'markdown', icon: Icon, description: 'Rich text with formatting'},
          {label: 'HTML', value: 'html', icon: Icon, description: 'Web markup language'},
          {label: 'JSON', value: 'json', icon: Icon, description: 'Structured data format'},
          {label: 'Text', value: 'text', icon: Icon, description: 'Plain text without formatting'},
        ]}
        onChange={(value) => {
          setConfig({format: value as ResponseOutputFormat}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default FormatInput;
