/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {AudioLines, User2} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// utils
import {toSelectGroupedOptionsPlain} from '~/utils/helpers';

// ui components
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';
import {Badge} from '~/components/ui/Badge.tsx';

/**
 * Tone input component for AI configuration
 * @component
 */
const ResponseLengthInput: React.FC = () => {
  const {config, setConfig, responseLengths} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({responseLength: value}, true);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><AudioLines className="inline-flex display-inline" size="16"/> Response Length</strong>
      </label>
      <SelectAdvanced
        placeholder="Select output format"
        searchable
        triggerWidth="w-full"
        value={config?.responseLength as string}
        onChange={v => handleChange(v as string)}
        options={toSelectGroupedOptionsPlain(responseLengths.filter(x => !x.hidden))}
        formatLabel={option => (
          <div><User2 className="inline-flex" size="16"/> {option.label}<p
            className="text-xs pl-5 mt-1">{option.summary}</p>
          </div>
        )}
        selectedOption={(_, option) => (
          <div>{option?.name ?? 'N/A'} <Badge variant="outline" className="text-xs">{option?.category ?? 'N/A'}</Badge></div>
        )}
      />
    </div>
  );
};

export default ResponseLengthInput;
