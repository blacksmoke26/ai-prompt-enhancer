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

export interface DomainSpecificityProps {
}

const DomainSpecificity: React.FC<DomainSpecificityProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['domainSpecificity'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Domain Specificity</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The specific domain or subject area of the content.</p>
      </label>
      <AdvancedInput
        className="mt-2"
        value={config.domainSpecificity}
        suggestions={[
          'Artificial Intelligence',
          'Machine Learning',
          'Data Science',
          'Cybersecurity',
          'Cloud Computing',
          'DevOps',
          'Software Engineering',
          'Web Development',
          'Mobile App Development',
          'Game Development',
          'Blockchain & Crypto',
          'Internet of Things (IoT)',
          'Big Data',
          'Computer Vision',
          'Natural Language Processing',
          'Robotics',
          'Augmented Reality',
          'Virtual Reality',
          'Biotechnology',
          'Healthcare & Medicine',
          'Finance & Fintech',
          'Marketing & Advertising',
          'Education & E-learning',
          'E-commerce & Retail',
          'Legal & Compliance',
          'Real Estate',
          'Manufacturing',
          'Automotive',
          'Aerospace',
          'Energy & Sustainability',
          'Telecommunications',
          'Entertainment & Media',
          'Sports Analytics',
          'Travel & Hospitality',
          'Logistics & Supply Chain',
          'Agriculture',
          'Psychology',
          'Sociology',
          'History',
          'Philosophy',
          'Literature',
          'Physics',
          'Chemistry',
          'Biology',
          'Mathematics',
          'Statistics',
          'Economics',
          'Political Science',
          'Anthropology',
        ]}
        size="sm"
        allowClear
        onClearClick={() => setConfig({domainSpecificity: ''}, true)}
        maxLength={50}
        debounceMs={500}
        onChange={e => setConfig({domainSpecificity: e.target.value}, true)}/>
    </div>
  );
};

export default DomainSpecificity;
