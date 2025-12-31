/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Select} from '~/components/ui/Select';

/**
 * Tone input component for AI configuration
 * @component
 */
const ToneInput: React.FC = () => {
  const {config, setConfig} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({tone: value}, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Tone
      </label>
      <Select
        placeholder="Select tone"
        value={config?.tone}
        onChange={v => handleChange(v as string)}
        options={[
          {value: 'professional', label: 'Professional'},
          {value: 'friendly', label: 'Friendly'},
          {value: 'casual', label: 'Casual'},
          {value: 'technical', label: 'Technical'},
          {value: 'humorous', label: 'Humorous'},
          {value: 'formal', label: 'Formal'},
          {value: 'informal', label: 'Informal'},
          {value: 'concise', label: 'Concise'},
        ]}
      />
    </div>
  );
};

export default ToneInput;
