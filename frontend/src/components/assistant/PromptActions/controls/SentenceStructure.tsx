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

export interface SentenceStructureProps {
}

const SentenceStructure: React.FC<SentenceStructureProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['sentenceStructure'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Sentence Structure</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The complexity of sentence structures in the output.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.sentenceStructure}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific structure preference'},
          {label: 'Simple', value: 'simple', icon: Icon, description: 'Basic, straightforward sentences'},
          {label: 'Compound', value: 'compound', icon: Icon, description: 'Two independent clauses joined together'},
          {label: 'Complex', value: 'complex', icon: Icon, description: 'One independent clause and one or more dependent clauses'},
          {label: 'Varied', value: 'varied', icon: Icon, description: 'Mix of different sentence structures'},
        ]}
        onChange={(value) => {
          setConfig({sentenceStructure: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default SentenceStructure;
