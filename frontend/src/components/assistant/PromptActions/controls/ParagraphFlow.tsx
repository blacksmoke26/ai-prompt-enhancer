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

export interface ParagraphFlowProps {
}

const ParagraphFlow: React.FC<ParagraphFlowProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['paragraphFlow'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Paragraph Flow</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The flow pattern of paragraphs in the output.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.paragraphFlow}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific flow pattern'},
          {label: 'Linear', value: 'linear', icon: Icon, description: 'Straight line progression'},
          {label: 'Circular', value: 'circular', icon: Icon, description: 'Circular structure'},
          {label: 'Pyramidal', value: 'pyramidal', icon: Icon, description: 'Pyramid-style buildup'},
        ]}
        onChange={(value) => {
          setConfig({paragraphFlow: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ParagraphFlow;
