/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {UsersRound} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';
import {toSelectGroupedOptions, toSelectGroupedOptionsPlain} from '~/utils/helpers.ts';
import {Badge} from '~/components/ui/Badge.tsx';

/**
 * Target audience input component for AI configuration
 * @component
 */
const TargetAudienceInput: React.FC = () => {
  const {config, setConfig, targetAudiences} = useAppStore();

  const handleChange = (value: string) => {
    // Update the config in store
    setConfig({targetAudience: value}, true);
  };

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><UsersRound className="inline-flex display-inline" size="16"/> Target Audience</strong>
      </label>
      <SelectAdvanced
        placeholder="Select target audience"
        searchable
        triggerWidth="w-full"
        value={config.targetAudience as string}
        onChange={value => handleChange(value as string)}
        formatLabel={option => (
          <div><UsersRound className="inline-flex" size="16"/> {option.label}
            <p className="text-xs pl-5 mt-1">{option.description}</p>
          </div>
        )}
        options={toSelectGroupedOptionsPlain(targetAudiences.filter(x => !x.hidden).map(x => ({
          ...x,
          name: x.label,
        })))}
        selectedOption={(_, option) => (
          <div>{option?.label ?? 'Select audience'}
            {option?.label && (
              <Badge
                variant="outline"
                className="text-xs">{option?.category ?? 'N/A'}</Badge>
            )}</div>
        )}
      />
    </div>
  );
};

export default TargetAudienceInput;
