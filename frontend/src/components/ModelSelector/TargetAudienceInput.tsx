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
 * Target audience input component for AI configuration
 * @component
 */
const TargetAudienceInput: React.FC = () => {
  const {config} = useAppStore();
  const [targetAudience, setTargetAudience] = useState<string>(config?.targetAudience || '');

  useEffect(() => {
    setTargetAudience(config?.targetAudience || '');
  }, [config?.targetAudience]);

  const handleChange = (value: string) => {
    setTargetAudience(value);

    // Update the config in store
    useAppStore.getState().setConfig({
      targetAudience: value,
    }, true);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Target Audience
      </label>
      <Select
        placeholder="Select target audience"
        value={targetAudience}
        onValueChange={value => handleChange(value as string)}
        options={[
          {key: 'general', label: 'General'},
          {key: 'technical-experts', label: 'Technical Experts'},
          {key: 'developers', label: 'Developers'},
          {key: 'students', label: 'Students'},
          {key: 'executives', label: 'Executives'},
          {key: 'beginners', label: 'Beginners'},
          {key: 'researchers', label: 'Researchers'},
        ]}
      />
    </div>
  );
};

export default TargetAudienceInput;
