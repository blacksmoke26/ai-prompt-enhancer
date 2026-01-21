/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Speech} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// utils
import {toSelectGroupedOptionsPlain} from '~/utils/helpers';

// ui components
import {Badge} from '~/components/ui/Badge';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

/**
 * Tone input component for AI configuration
 * @component
 */
const ToneInput: React.FC = () => {
  const {config, setConfig} = useAppStore();
  const {tones} = useDataStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({tone: value}, true);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><Speech className="inline-flex display-inline" size="16"/> Tone</strong>
      </label>
      <SelectAdvanced
        placeholder="Select tone"
        searchable
        triggerWidth="w-full"
        value={config?.tone as string}
        onChange={v => handleChange(v as string)}
        options={toSelectGroupedOptionsPlain(tones.filter(x => !x.hidden))}
        formatLabel={option => (
          <div><Speech className="inline-flex" size="16"/> {option.label}<p
            className="text-xs pl-5 mt-1">{option.summary}</p>
          </div>
        )}
        selectedOption={(_, option) => (
          <div>{option?.name ?? 'Select tone'}
            {' '}
            {option?.name &&
              <Badge variant="outline"
                     className="text-xs">{option?.category ?? 'N/A'}</Badge>}</div>
        )}
      />
    </div>
  );
};

export default ToneInput;
