/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Type} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// ui components
import {Badge} from '~/components/ui/Badge';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

// utils
import {toSelectGroupedOptions} from '~/utils/helpers';

export interface EnhancementTypeSelectorProps {
  className?: string;
}

const EnhancementTypeSelector: React.FC<EnhancementTypeSelectorProps> = ({className = ''}) => {
  const {enhancementTypes} = useDataStore();
  const {config, setConfig} = useAppStore();

  return (
    <div className={`space-y-2 ${className || ''}`}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        {<strong><Type className="inline-flex display-inline" size="16"/> Enhancement Type</strong>}
      </label>
      <SelectAdvanced
        searchable
        clearable
        triggerWidth="w-full"
        value={config.enhancementType as string}
        onChange={(e) => setConfig({enhancementType: e as string}, true)}
        options={toSelectGroupedOptions(enhancementTypes.filter(x => !x.hidden))}
        formatLabel={option => (
          <div><Type className="inline-flex" size="16"/> {option.label}
            <p
              className="text-xs pl-5 mt-1">{option.shortDescription}</p>
          </div>
        )}
        selectedOption={(_, option) => (
          <div>{option?.label ?? 'Select enhancement'}
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

export default EnhancementTypeSelector;
