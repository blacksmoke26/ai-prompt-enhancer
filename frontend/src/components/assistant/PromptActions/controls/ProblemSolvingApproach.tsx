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

export interface ProblemSolvingApproachProps {
}

const ProblemSolvingApproach: React.FC<ProblemSolvingApproachProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['problemSolvingApproach'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Problem Solving Approach</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The problem-solving approach preference.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.problemSolvingApproach}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific approach selected'},
          {label: 'Analytical', value: 'analytical', icon: Icon, description: 'Logical, step-by-step reasoning'},
          {label: 'Intuitive', value: 'intuitive', icon: Icon, description: 'Relies on gut feeling and insight'},
          {label: 'Empirical', value: 'empirical', icon: Icon, description: 'Based on observation and experience'},
          {label: 'Theoretical', value: 'theoretical', icon: Icon, description: 'Focuses on abstract principles and models'},
          {label: 'Heuristic', value: 'heuristic', icon: Icon, description: 'Uses practical shortcuts and rules of thumb'},
          {label: 'Algorithmic', value: 'algorithmic', icon: Icon, description: 'Follows a defined, rigid procedure'},
          {label: 'Adaptive', value: 'adaptive', icon: Icon, description: 'Adjusts dynamically to changing conditions'},
        ]}
        onChange={(value) => {
          setConfig({problemSolvingApproach: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ProblemSolvingApproach;
