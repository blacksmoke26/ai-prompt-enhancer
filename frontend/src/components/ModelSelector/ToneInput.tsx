/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {AudioLines} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// utils
import {toSelectGroupedOptionsPlain} from '~/utils/helpers';

// ui components
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

/**
 * Tone input component for AI configuration
 * @component
 */
const ToneInput: React.FC = () => {
  const {config, setConfig, tones} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({tone: value}, true);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><AudioLines className="inline-flex display-inline" size="16"/> Response Length</strong>
      </label>
      <SelectAdvanced
        placeholder="Select tone"
        searchable
        triggerWidth="w-full"
        value={config?.tone as string}
        onChange={v => handleChange(v as string)}
        options={toSelectGroupedOptionsPlain(tones.filter(x => !x.hidden))}
      />
    </div>
  );
};

export default ToneInput;
