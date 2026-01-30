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

export interface SocialDetailProps {
}

const SocialDetail: React.FC<SocialDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['socialDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Social Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of social detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.socialDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No value set'},
          {label: 'None', value: 'none', icon: Icon, description: 'No social detail'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'Abstract ideas'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Basic overview'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'In-depth info'},
          {label: 'Demographic', value: 'demographic', icon: Icon, description: 'Population stats'},
          {label: 'Social structures', value: 'social-structures', icon: Icon, description: 'Societal hierarchy'},
          {label: 'Social interaction', value: 'social-interaction', icon: Icon, description: 'Communication patterns'},
          {label: 'Social identity', value: 'social-identity', icon: Icon, description: 'Group belonging'},
          {label: 'Social dynamics', value: 'social-dynamics', icon: Icon, description: 'Behavior changes'},
          {label: 'Social network', value: 'social-network', icon: Icon, description: 'Connections graph'},
          {label: 'Social change', value: 'social-change', icon: Icon, description: 'Evolution over time'},
          {label: 'Social problem', value: 'social-problem', icon: Icon, description: 'Societal issues'},
          {label: 'Social policy', value: 'social-policy', icon: Icon, description: 'Rules and laws'},
          {label: 'Social movement', value: 'social-movement', icon: Icon, description: 'Collective action'},
          {label: 'Social media', value: 'social-media', icon: Icon, description: 'Online platforms'},
          {label: 'Digital culture', value: 'digital-culture', icon: Icon, description: 'Tech lifestyle'},
          {label: 'Subculture', value: 'subculture', icon: Icon, description: 'Niche group'},
          {label: 'Counter culture', value: 'counter-culture', icon: Icon, description: 'Opposing norms'},
          {label: 'Culture', value: 'culture', icon: Icon, description: 'Shared values'},
          {label: 'Cultural studies', value: 'cultural-studies', icon: Icon, description: 'Academic analysis'},
          {label: 'Anthropology', value: 'anthropology', icon: Icon, description: 'Human origins'},
          {label: 'Sociology', value: 'sociology', icon: Icon, description: 'Society study'},
          {label: 'Psychology', value: 'psychology', icon: Icon, description: 'Mind behavior'},
          {label: 'Neuroscience', value: 'neuroscience', icon: Icon, description: 'Brain science'},
          {label: 'Cognitive', value: 'cognitive', icon: Icon, description: 'Mental processes'},
          {label: 'Behavioral', value: 'behavioral', icon: Icon, description: 'Actions'},
          {label: 'Psychological', value: 'psychological', icon: Icon, description: 'Mental state'},
          {label: 'Emotional', value: 'emotional', icon: Icon, description: 'Feelings'},
          {label: 'Emotional intelligence', value: 'emotional-intelligence', icon: Icon, description: 'Empathy skills'},
          {label: 'Emotional regulation', value: 'emotional-regulation', icon: Icon, description: 'Control feelings'},
          {label: 'Emotional expression', value: 'emotional-expression', icon: Icon, description: 'Show feelings'},
          {label: 'Emotional awareness', value: 'emotional-awareness', icon: Icon, description: 'Recognize emotions'},
          {label: 'Emotional integrity', value: 'emotional-integrity', icon: Icon, description: 'Honest feelings'},
          {label: 'Emotional stability', value: 'emotional-stability', icon: Icon, description: 'Calm demeanor'},
          {label: 'Emotional harmony', value: 'emotional-harmony', icon: Icon, description: 'Inner peace'},
          {label: 'Emotional balance', value: 'emotional-balance', icon: Icon, description: 'Equilibrium'},
          {label: 'Emotional resilience', value: 'emotional-resilience', icon: Icon, description: 'Recover from stress'},
        ]}
        onChange={(value) => {
          setConfig({socialDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default SocialDetail;
