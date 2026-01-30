/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {SaveOff} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import {Switch} from '~/components/ui/Switch';

/**
 * Off the record toggle component for AI configuration
 * @component
 */
const MinimalOutput: React.FC = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['minimalOutput'];

  const handleChange = (checked: boolean) => {
    // Update the config in store
    setConfig({minimalOutput: checked}, true);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Minimal Output</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">If true, removes all conversational filler and focuses on core content.</p>
      </label>
      <div className="flex items-center space-x-2 pt-2">
        <Switch label="Removes all conversational filler"
          checked={config.minimalOutput}
          onCheckedChange={handleChange}
          id="minimal-output"
        />
      </div>
    </div>
  );
};

export default MinimalOutput;
