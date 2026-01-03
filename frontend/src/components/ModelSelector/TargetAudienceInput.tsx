/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

/**
 * Target audience input component for AI configuration
 * @component
 */
const TargetAudienceInput: React.FC = () => {
  const {config, setConfig} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({targetAudience: value}, true);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong>Target Audience</strong>
      </label>
      <SelectAdvanced
        placeholder="Select target audience"
        searchable
        triggerWidth="w-full"
        value={config.targetAudience as string}
        onChange={value => handleChange(value as string)}
        options={[
          {value: 'general', label: 'General'},
          {value: 'technical-experts', label: 'Technical Experts'},
          {value: 'developers', label: 'Developers'},
          {value: 'students', label: 'Students'},
          {value: 'executives', label: 'Executives'},
          {value: 'beginners', label: 'Beginners'},
          {value: 'researchers', label: 'Researchers'},
        ]}
      />
    </div>
  );
};

export default TargetAudienceInput;
