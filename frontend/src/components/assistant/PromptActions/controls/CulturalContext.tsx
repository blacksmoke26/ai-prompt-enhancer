/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {Fragment} from 'react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import {AdvancedInput} from '~/components/ui/AdvancedInput';

export interface CulturalContextProps {
}

const CulturalContext: React.FC<CulturalContextProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['culturalContext'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Cultural Context</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">
          The cultural context to consider when generating the content.
        </p>
      </label>
      <AdvancedInput
        className="mt-2"
        value={config.culturalContext}
        suggestions={[
          'US-West',
          'US-East',
          'US-South',
          'US-Midwest',
          'UK',
          'Europe-West',
          'Europe-Central',
          'Asia-Pacific',
          'East-Asia',
          'South-Asia',
          'Southeast-Asia',
          'Middle-East',
          'Africa-North',
          'Africa-South',
          'Latin-America',
          'South-America',
          'Australia',
          'Canada',
          'India',
          'Japan',
          'China',
          'Korea',
          'Germany',
          'France',
          'Spain',
          'Italy',
          'Brazil',
          'Mexico',
          'Russia',
          'Nordic',
          'Scandinavian',
          'Islamic',
          'Jewish',
          'Christian',
          'Buddhist',
          'Hindu',
          'Secular',
          'Global',
          'International',
          'Western',
          'Eastern',
          'Northern-European',
          'Southern-European',
          'Central-European',
        ]}
        size="sm"
        allowClear
        onClearClick={() => setConfig({culturalContext: ''}, true)}
        maxLength={50}
        debounceMs={500}
        onChange={e => setConfig({culturalContext: e.target.value}, true)}/>
    </div>
  );
};

export default CulturalContext;
