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

export interface ListStyleProps {
}

const ListStyle: React.FC<ListStyleProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['listStyle'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> List Style</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The style of lists used in the output.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.listStyle}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No value set'},
          {label: 'None', value: 'none', icon: Icon, description: ''},
          {label: 'Bulleted', value: 'bulleted', icon: Icon, description: ''},
          {label: 'Numbered', value: 'numbered', icon: Icon, description: ''},
          {label: 'Inline', value: 'inline', icon: Icon, description: ''},
        ]}
        onChange={(value) => {
          setConfig({listStyle: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ListStyle;
