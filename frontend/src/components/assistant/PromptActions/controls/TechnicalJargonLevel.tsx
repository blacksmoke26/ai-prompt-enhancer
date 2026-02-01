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

export interface TechnicalJargonLevelProps {
}

const TechnicalJargonLevel: React.FC<TechnicalJargonLevelProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['technicalJargonLevel'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Technical Jargon Level</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of technical jargon to use.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        showSearch={false}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.technicalJargonLevel}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific jargon level set'},
          {label: 'None', value: 'none', icon: Icon, description: 'Avoid technical language entirely'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'Use high-level, abstract concepts'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Explain technical terms in simple language'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Include comprehensive technical details'},
          {label: 'Computer science', value: 'computer-science', icon: Icon, description: 'Use computer science terminology'},
        ]}
        onChange={(value) => {
          setConfig({technicalJargonLevel: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default TechnicalJargonLevel;
