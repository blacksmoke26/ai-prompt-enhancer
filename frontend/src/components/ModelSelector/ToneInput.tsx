/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Speech} from 'lucide-react';

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
  const {config, setConfig, tones} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({tone: value}, true);
  };

  return (
    <div className="space-y-2">
      <Select
        placeholder="Select tone"
        value={config?.tone}
        onChange={v => handleChange(v as string)}
        options={toSelectGroupedOptionsPlain(tones.filter(x => !x.hidden))}
        label={<strong><Speech className="inline-flex display-inline" size="16"/> Tone</strong>}
      />
    </div>
  );
};

export default ToneInput;
