/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useEffect, useState} from 'react';

// store
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import {AdvancedTextarea} from '~/components/ui/AdvancedTextarea';

// hooks
import useDebounce from '~/hooks/useDebounce';

const SkillProficiency: React.FC = () => {
  const { config } = useAppStore();
  const [values, setValues] = useState<string>(config?.skillProficiency ? JSON.stringify(config.skillProficiency) : '');
  const Icon = providerIcons['skillProficiency'];

  useEffect(() => {
    setValues(config?.skillProficiency ? JSON.stringify(config.skillProficiency) : '');
  }, [config?.skillProficiency]);

  const debouncedValue = useDebounce(values, 500);

  useEffect(() => {
    if (debouncedValue) {
      try {
        // Try to parse the JSON to validate it
        const parsed = JSON.parse(debouncedValue);

        // Update the config in store
        useAppStore.getState().setConfig({
          skillProficiency: parsed
        }, true);
      } catch (error) {
        // If invalid JSON, don't update the store but still update the input
        console.warn('Invalid JSON for enhancement parameters');
      }
    }
  }, [debouncedValue]);

  const handleChange = (value) => {
    setValues(value);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Skill Proficiency</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The proficiency level for each skill</p>
      </label>
      <AdvancedTextarea jsonMode={true} enableAutoClosing={true}
        value={values}
        onChange={handleChange}
        placeholder="e.g. {&quot;data_analysis&quot;: 9, &quot;machine_learning&quot;: &quot;8.5&quot;}"
        className="w-full"
        rows={3}
      />
      <p className="text-xs text-gray-500">Enter a valid JSON object</p>
    </div>
  );
};

export default SkillProficiency;
