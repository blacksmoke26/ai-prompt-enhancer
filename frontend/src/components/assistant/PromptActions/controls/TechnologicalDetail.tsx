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

export interface TechnologicalDetailProps {
}

const TechnologicalDetail: React.FC<TechnologicalDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['technologicalDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Technological Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of technological detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.technologicalDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific detail level selected'},
          {label: 'None', value: 'none', icon: Icon, description: 'No technological detail'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'High-level concepts without specifics'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Basic explanations with some details'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'In-depth technical explanations'},
          {label: 'Computer science', value: 'computer-science', icon: Icon, description: 'Advanced CS concepts and terminology'},
        ]}
        onChange={(value) => {
          setConfig({technologicalDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default TechnologicalDetail;
