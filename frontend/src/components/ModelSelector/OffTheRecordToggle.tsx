/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState, useEffect } from 'react';

// store
import { useAppStore } from '~/stores/appStore';

// ui components
import { Switch } from '~/components/ui/Switch';

// types
import type { PromptRequest } from '~/types';

/**
 * Off the record toggle component for AI configuration
 * @component
 */
const OffTheRecordToggle: React.FC = () => {
  const { config } = useAppStore();
  const [offTheRecord, setOffTheRecord] = useState<boolean>(config?.offTheRecord || false);

  useEffect(() => {
    setOffTheRecord(config?.offTheRecord || false);
  }, [config?.offTheRecord]);

  const handleChange = (checked: boolean) => {
    setOffTheRecord(checked);
    
    // Update the config in store
    useAppStore.getState().setConfig({
      offTheRecord: checked
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Off-the-Record
      </label>
      <div className="flex items-center space-x-2">
        <Switch 
          checked={offTheRecord} 
          onCheckedChange={handleChange}
          id="off-the-record"
        />
        <label htmlFor="off-the-record" className="text-sm">
          Do not store in history
        </label>
      </div>
    </div>
  );
};

export default OffTheRecordToggle;