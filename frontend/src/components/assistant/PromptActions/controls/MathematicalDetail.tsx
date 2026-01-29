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

export interface MathematicalDetailProps {
}

const MathematicalDetail: React.FC<MathematicalDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['mathematicalDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Mathematical Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of mathematical detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.mathematicalDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No mathematical detail preference'},
          {label: 'None', value: 'none', icon: Icon, description: 'Avoids mathematical details'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'Focuses on concepts rather than formulas'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Uses basic or simplified math'},
          {label: 'Formal', value: 'formal', icon: Icon, description: 'Follows formal mathematical notation'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Includes thorough mathematical explanations'},
          {label: 'Step by step', value: 'step-by-step', icon: Icon, description: 'Breaks down calculations sequentially'},
          {label: 'Proof based', value: 'proof-based', icon: Icon, description: 'Emphasizes mathematical proofs'},
          {label: 'Derivation-based', value: 'derivation-based', icon: Icon, description: 'Focuses on deriving formulas'},
          {label: 'Numerical', value: 'numerical', icon: Icon, description: 'Uses specific numerical examples'},
          {label: 'Theoretical', value: 'theoretical', icon: Icon, description: 'Emphasizes abstract theory'},
          {label: 'Computational', value: 'computational', icon: Icon, description: 'Focuses on calculation methods'},
          {label: 'Statistical', value: 'statistical', icon: Icon, description: 'Involves statistical analysis'},
          {label: 'Analytical', value: 'analytical', icon: Icon, description: 'Uses analytical methods'},
          {label: 'Graph-theoretic', value: 'graph-theoretic', icon: Icon, description: 'Involves graph theory concepts'},
          {label: 'Logic based', value: 'logic-based', icon: Icon, description: 'Focuses on logical reasoning'},
          {label: 'Probability based', value: 'probability-based', icon: Icon, description: 'Involves probability concepts'},
          {label: 'Differential', value: 'differential', icon: Icon, description: 'Uses differential calculus'},
          {label: 'Integral', value: 'integral', icon: Icon, description: 'Uses integral calculus'},
          {label: 'Matrix', value: 'matrix', icon: Icon, description: 'Involves matrix operations'},
          {label: 'Tensor', value: 'tensor', icon: Icon, description: 'Involves tensor calculus'},
          {label: 'Linear algebra', value: 'linear-algebra', icon: Icon, description: 'Uses linear algebra techniques'},
          {label: 'Dynamical systems', value: 'dynamical-systems', icon: Icon, description: 'Studies dynamical systems'},
          {label: 'Chaos theory', value: 'chaos-theory', icon: Icon, description: 'Involves chaos theory concepts'},
          {label: 'Quantum', value: 'quantum', icon: Icon, description: 'Quantum mathematical formulations'},
          {label: 'Relativistic', value: 'relativistic', icon: Icon, description: 'Relativistic mathematics'},
          {label: 'Field theory', value: 'field-theory', icon: Icon, description: 'Field theory mathematics'},
        ]}
        onChange={(value) => {
          setConfig({mathematicalDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default MathematicalDetail;
