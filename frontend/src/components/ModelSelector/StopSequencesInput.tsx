/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect } from 'react';

// store
import { useAppStore } from '~/stores/appStore';

// ui components
import { Textarea } from '~/components/ui/Textarea';

// types
import type { PromptRequest } from '~/types';

/**
 * Stop sequences input component for AI configuration
 * @component
 */
const StopSequencesInput: React.FC = () => {
  const { config } = useAppStore();
  const [stopSequences, setStopSequences] = useState<string>(config?.stopSequences?.join('\n') || '');

  useEffect(() => {
    setStopSequences(config?.stopSequences?.join('\n') || '');
  }, [config?.stopSequences]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setStopSequences(value);

    // Split by newlines and filter out empty strings
    const sequences = value.split('\n').filter(seq => seq.trim() !== '');

    // Update the config in store
    useAppStore.getState().setConfig({
      stopSequences: sequences
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Stop Sequences
      </label>
      <Textarea
        value={stopSequences}
        onChange={handleChange}
        placeholder="Enter stop sequences (one per line)"
        className="w-full"
        rows={3}
      />
      <p className="text-xs text-gray-500">Enter one stop sequence per line</p>
    </div>
  );
};

export default StopSequencesInput;
