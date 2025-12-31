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
 * Response length input component for AI configuration
 * @component
 */
const ResponseLengthInput: React.FC = () => {
  const {config, setConfig} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({responseLength: value}, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Response Length
      </label>
      <Select
        placeholder="Select response length"
        value={config.responseLength}
        onChange={v => handleChange(v as string)}
        options={[
          {value: 'short', label: 'Short'},
          {value: 'medium', label: 'Medium'},
          {value: 'long', label: 'Long'},
          {value: 'detailed', label: 'Detailed'},
          {value: 'concise', label: 'Concise'},
        ]}/>
    </div>
  );
};

export default ResponseLengthInput;
