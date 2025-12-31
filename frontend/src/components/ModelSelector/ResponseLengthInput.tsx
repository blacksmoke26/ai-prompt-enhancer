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
import {Select} from '~/components/ui/Select';

/**
 * Tone input component for AI configuration
 * @component
 */
const ToneInput: React.FC = () => {
  const {config, setConfig, responseLengths} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({responseLength: value}, true);
  };

  return (
    <div className="space-y-2">
      <Select
        placeholder="Select Response Length"
        value={config?.responseLength}
        onChange={v => handleChange(v as string)}
        options={toSelectGroupedOptionsPlain(responseLengths.filter(x => !x.hidden))}
        label={<strong><AudioLines className="inline-flex display-inline" size="16"/> Response Length</strong>}
      />
    </div>
  );
};

export default ToneInput;
