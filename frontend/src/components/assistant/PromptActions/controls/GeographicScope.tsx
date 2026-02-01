/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {OctagonX} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import SmartSelector from '~/components/ui/SmartSelector';

export interface GeographicScopeProps {
}

const GeographicScope: React.FC<GeographicScopeProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['geographicScope'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Geographic Scope</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of geographic specificity.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.geographicScope}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No geographic scope defined'},
          {label: 'Global', value: 'global', icon: Icon, description: 'Worldwide coverage'},
          {label: 'Regional', value: 'regional', icon: Icon, description: 'Specific region or area'},
          {label: 'National', value: 'national', icon: Icon, description: 'Country-wide focus'},
          {label: 'Local', value: 'local', icon: Icon, description: 'City or community level'},
          {label: 'Hyper local', value: 'hyper-local', icon: Icon, description: 'Neighborhood or street level'},
          {label: 'Specific venue', value: 'specific-venue', icon: Icon, description: 'Particular location or place'},
        ]}
        onChange={(value) => {
          setConfig({geographicScope: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default GeographicScope;
