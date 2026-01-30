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

export interface VisualComplexityProps {
}

const VisualComplexity: React.FC<VisualComplexityProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['visualComplexity'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Visual Complexity</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of visual complexity in explanations.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.visualComplexity}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No visual complexity preference set'},
          {label: 'Minimal', value: 'minimal', icon: Icon, description: 'Simple and clean visual elements'},
          {label: 'Moderate', value: 'moderate', icon: Icon, description: 'Balanced visual details'},
          {label: 'Complex', value: 'complex', icon: Icon, description: 'Intricate visual presentations'},
          {label: 'Elaborate', value: 'elaborate', icon: Icon, description: 'Highly detailed and rich visuals'},
          {label: 'Schematic', value: 'schematic', icon: Icon, description: 'Simplified technical diagrams'},
          {label: 'Diagrammatic', value: 'diagrammatic', icon: Icon, description: 'Focus on diagrams and charts'},
          {label: 'Graphical', value: 'graphical', icon: Icon, description: 'Emphasis on graphical elements'},
          {label: 'Charted', value: 'charted', icon: Icon, description: 'Information presented as charts'},
          {label: 'Map based', value: 'map-based', icon: Icon, description: 'Visuals organized as maps'},
          {label: 'Flow based', value: 'flow-based', icon: Icon, description: 'Process and workflow visuals'},
          {label: 'Tree based', value: 'tree-based', icon: Icon, description: 'Hierarchical tree structures'},
          {label: 'Network based', value: 'network-based', icon: Icon, description: ' interconnected network diagrams'},
          {label: 'Grid based', value: 'grid-based', icon: Icon, description: 'Structured grid layouts'},
          {label: 'Spatial', value: 'spatial', icon: Icon, description: 'Focus on spatial relationships'},
          {label: '3D', value: '3d', icon: Icon, description: 'Three-dimensional representations'},
          {label: 'Multidimensional', value: 'multidimensional', icon: Icon, description: 'Multiple dimensions of data'},
          {label: 'Holographic', value: 'holographic', icon: Icon, description: 'Holographic-style displays'},
          {label: 'Augmented', value: 'augmented', icon: Icon, description: 'Augmented reality elements'},
        ]}
        onChange={(value) => {
          setConfig({visualComplexity: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default VisualComplexity;
