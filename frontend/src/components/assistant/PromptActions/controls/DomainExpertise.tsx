/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// hooks
import {useAppStore} from '~/stores/appStore';

// utils
import {providerIcons} from '~/components/assistant/utils';

// ui components
import {AdvancedInput} from '~/components/ui/AdvancedInput';

export interface DomainExpertiseProps {
}

const DomainExpertise: React.FC<DomainExpertiseProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['domainExpertise'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Domain Expertise</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The type of domain expertise to focus on.</p>
      </label>
      <AdvancedInput
      className="mt-2"
      value={config.domainExpertise}
      suggestions={[
        'quantum_computing',
        'machine_learning',
        'data_science',
        'cybersecurity',
        'blockchain',
        'cloud_computing',
        'devops',
        'artificial_intelligence',
        'software_architecture',
        'full_stack_development',
        'mobile_development',
        'game_development',
        'embedded_systems',
        'network_engineering',
        'database_management',
        'ui_ux_design',
        'robotics',
        'bioinformatics',
        'computational_linguistics',
        'fintech',
        'healthtech',
        'edtech',
        'agritech',
        'cleantech',
      ]}
        size="sm"
        allowClear
        onClearClick={() => setConfig({domainExpertise: ''}, true)}
        maxLength={50}
        debounceMs={500}
        onChange={e => setConfig({domainExpertise: e.target.value}, true)}/>
    </div>
  );
};

export default DomainExpertise;
