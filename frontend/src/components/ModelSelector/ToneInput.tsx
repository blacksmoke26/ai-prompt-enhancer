/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState, useEffect} from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Select} from '~/components/ui/Select';

/**
 * Tone input component for AI configuration
 * @component
 */
const ToneInput: React.FC = () => {
  const {config} = useAppStore();
  const [tone, setTone] = useState<string>(config?.tone || '');

  useEffect(() => {
    setTone(config?.tone || '');
  }, [config?.tone]);

  const handleChange = (value: string) => {
    setTone(value);

    // Update the config in store
    useAppStore.getState().setConfig({
      tone: value,
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Tone
      </label>
      <Select
        placeholder="Select tone"
        value={tone}
        onValueChange={v => handleChange(v as string)}
        options={[
          {key: 'professional', label: 'Professional'},
          {key: 'friendly', label: 'Friendly'},
          {key: 'casual', label: 'Casual'},
          {key: 'technical', label: 'Technical'},
          {key: 'humorous', label: 'Humorous'},
          {key: 'formal', label: 'Formal'},
          {key: 'informal', label: 'Informal'},
          {key: 'concise', label: 'Concise'},
        ]}
      />
    </div>
  );
};

export default ToneInput;
