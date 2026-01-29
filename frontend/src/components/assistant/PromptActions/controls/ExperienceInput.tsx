/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Hourglass, OctagonX} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';

// ui components
import SmartSelector from '~/components/ui/SmartSelector';

/**
 * Tone input component for AI configuration
 * @component
 */
const ExperienceInput: React.FC = () => {
  const {config, setConfig} = useAppStore();

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><Hourglass className="inline-flex display-inline" size="16"/> Experience</strong>
        <p className="text-muted-foreground font-normal text-xs my-1">The amount of practical experience the persona should
          demonstrate.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config.experience}
        options={[
          {label: 'None', value: '', icon: OctagonX, description: 'No specific experience level'},
          {label: '1 day', value: '1 day', icon: Hourglass, description: 'Less than a week of experience'},
          {label: '1 week', value: '1 week', icon: Hourglass, description: 'A few days to a week of experience'},
          {label: '1 month', value: '1 month', icon: Hourglass, description: 'Up to a month of hands-on experience'},
          {label: '3 months', value: '3 months', icon: Hourglass, description: 'A quarter of practical experience'},
          {label: '6 months', value: '6 months', icon: Hourglass, description: 'Half a year of experience'},
          {label: '1 year', value: '1 year', icon: Hourglass, description: 'A full year of experience'},
          {label: '3 years', value: '3 years', icon: Hourglass, description: 'Three years of consistent practice'},
          {label: '5 years', value: '5 years', icon: Hourglass, description: 'Half a decade of experience'},
          {label: '10 years', value: '10 years', icon: Hourglass, description: 'A decade of mastery'},
          {label: '30 years', value: '30 years', icon: Hourglass, description: 'Three decades of deep expertise'},
          {label: '50 years', value: '50 years', icon: Hourglass, description: 'Half a century of wisdom'},
          {label: '100 years', value: '100 years', icon: Hourglass, description: 'A century of unparalleled experience'},
          {label: 'Expert', value: 'expert', icon: Hourglass, description: 'Recognized expert in the field'},
          {label: 'Master', value: 'master', icon: Hourglass, description: 'Highest level of practical mastery'},
          {label: 'Nexus', value: 'nexus', icon: Hourglass, description: 'Transcendent, all-knowing entity'},
        ]}
        onChange={(value) => {
          setConfig({experience: value}, true);
        }}
      />
    </div>
  );
};

export default ExperienceInput;
