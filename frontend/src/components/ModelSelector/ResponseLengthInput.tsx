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

// types
import type {PromptRequest} from '~/types';

/**
 * Response length input component for AI configuration
 * @component
 */
const ResponseLengthInput: React.FC = () => {
  const {config} = useAppStore();
  const [responseLength, setResponseLength] = useState<string>(config?.responseLength || '');

  useEffect(() => {
    setResponseLength(config?.responseLength || '');
  }, [config?.responseLength]);

  const handleChange = (value: string) => {
    setResponseLength(value);

    // Update the config in store
    useAppStore.getState().setConfig({
      responseLength: value,
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Response Length
      </label>
      <Select
        placeholder="Select response length"
        value={responseLength}
        onChange={v => handleChange(v as string)}
        options={[
          {key: 'short', label: 'Short'},
          {key: 'medium', label: 'Medium'},
          {key: 'long', label: 'Long'},
          {key: 'detailed', label: 'Detailed'},
          {key: 'concise', label: 'Concise'},
        ]}/>
    </div>
  );
};

export default ResponseLengthInput;
