/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {SaveOff} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {Switch} from '~/components/ui/Switch';

/**
 * Off the record toggle component for AI configuration
 * @component
 */
const OffTheRecordToggle: React.FC = () => {
  const {config, setConfig} = useAppStore();

  const handleChange = (checked: boolean) => {
    // Update the config in store
    setConfig({offTheRecord: checked}, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        <SaveOff className="inline-flex display-inline" size="16"/> Off-the-Record
      </label>
      <div className="flex items-center space-x-2 pt-2">
        <Switch label="Do not store in history"
          checked={config.offTheRecord}
          onCheckedChange={handleChange}
          id="off-the-record"
        />
      </div>
    </div>
  );
};

export default OffTheRecordToggle;
