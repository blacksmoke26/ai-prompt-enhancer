/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect } from 'react';

// hooks
import useDebounce from '~/hooks/useDebounce';
import { useAppStore } from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import { Textarea } from '~/components/ui/Textarea';

/**
 * Stop sequences input component for AI configuration
 * @component
 */
const StopSequencesInput: React.FC = () => {
  const { config } = useAppStore();
  const [stopSequences, setStopSequences] = useState<string>(config?.stopSequences?.join?.('\n') || '');
  const Icon = providerIcons['stopSequences'];

  useEffect(() => {
    setStopSequences(config?.stopSequences?.join?.('\n') || '');
  }, [config?.stopSequences]);

  const debouncedSetConfig = useDebounce((sequences: string[]) => {
    useAppStore.getState().setConfig({
      stopSequences: sequences
    }, true);
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setStopSequences(value);

    // Split by newlines and filter out empty strings
    const sequences = value.split('\n').filter(seq => seq.trim() !== '');

    // Update the config in store with debounced function
    debouncedSetConfig(sequences);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Stop Sequences</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">Sequences to stop token generation at.</p>
      </label>
      <Textarea
        value={stopSequences}
        onChange={handleChange}
        placeholder="Enter stop sequences (one per line)"
        className="w-full"
        rows={3}
      />
      <p className="text-xs text-gray-500">e.g., for starting, use <code>{'<START>'}</code>. For stopping <code>{'<END>'}</code> per line</p>
    </div>
  );
};

export default StopSequencesInput;
