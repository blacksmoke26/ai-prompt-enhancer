/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';

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
  const { config } = useAppStore();
  const [format, setFormat] = useState<ResponseOutputFormat>(config?.format || 'markdown');

  useEffect(() => {
    setFormat(config?.format || 'markdown');
  }, [config?.format]);

  const handleChange = (value: ResponseOutputFormat) => {
    setFormat(value);

    // Update the config in store
    useAppStore.getState().setConfig({
      format: value
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Output Format
      </label>
      <Select
        placeholder="Select output format"
        value={format}
        onChange={v => handleChange(v as ResponseOutputFormat)}
        options={[
          {key: 'markdown', label: 'Markdown'},
          {key: 'html', label: 'HTML'},
          {key: 'json', label: 'JSON'},
          {key: 'text', label: 'Text'},
        ]}
      />
    </div>
  );
};

export default FormatInput;
