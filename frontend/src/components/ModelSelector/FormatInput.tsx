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

// types
import type {ResponseOutputFormat} from '~/types';

/**
 * Format input component for AI configuration
 * @component
 */
const FormatInput: React.FC = () => {
  const {config, setConfig} = useAppStore();

  const handleChange = (value: ResponseOutputFormat) => {
    // Update the config in store
    setConfig({format: value}, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Output Format
      </label>
      <Select
        placeholder="Select output format"
        value={config?.format ?? 'markdown'}
        onChange={v => handleChange(v as ResponseOutputFormat)}
        options={[
          {value: 'markdown', label: 'Markdown'},
          {value: 'html', label: 'HTML'},
          {value: 'json', label: 'JSON'},
          {value: 'text', label: 'Text'},
        ]}
      />
    </div>
  );
};

export default FormatInput;
