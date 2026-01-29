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

export interface ArtisticDetailProps {
}

const ArtisticDetail: React.FC<ArtisticDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['artisticDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Artistic Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of artistic detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.artisticDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No artistic detail specified'},
          {label: 'None', value: 'none', icon: Icon, description: 'No specific style applied'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'Focuses on ideas and concepts'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Reduces complexity and detail'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Emphasizes fine details and intricacy'},
          {label: 'Visual', value: 'visual', icon: Icon, description: 'Centers on visual elements and aesthetics'},
          {label: 'Musical', value: 'musical', icon: Icon, description: 'Relates to musical composition or theory'},
          {label: 'Literary', value: 'literary', icon: Icon, description: 'Inspired by literature and storytelling'},
          {label: 'Performing', value: 'performing', icon: Icon, description: 'Associated with performance arts'},
          {label: 'Cinematic', value: 'cinematic', icon: Icon, description: 'Film-like quality and atmosphere'},
          {label: 'Photographic', value: 'photographic', icon: Icon, description: 'Realistic, camera-like imagery'},
          {label: 'Digital', value: 'digital', icon: Icon, description: 'Created using digital tools'},
          {label: 'Traditional', value: 'traditional', icon: Icon, description: 'Classic artistic methods and materials'},
          {label: 'Contemporary', value: 'contemporary', icon: Icon, description: 'Modern current artistic trends'},
          {label: 'Classical', value: 'classical', icon: Icon, description: 'Historic and timeless styles'},
          {label: 'Modern', value: 'modern', icon: Icon, description: 'Early to mid-20th century aesthetics'},
          {label: 'Abstract', value: 'abstract', icon: Icon, description: 'Non-representational forms and shapes'},
          {label: 'Realistic', value: 'realistic', icon: Icon, description: 'Lifelike and true to reality'},
          {label: 'Surreal', value: 'surreal', icon: Icon, description: 'Dreamlike and fantastical imagery'},
          {label: 'Expressionist', value: 'expressionist', icon: Icon, description: 'Conveys emotional experience'},
          {label: 'Impressionist', value: 'impressionist', icon: Icon, description: 'Captures light and fleeting moments'},
          {label: 'Minimalist', value: 'minimalist', icon: Icon, description: 'Simple and stripped-down design'},
          {label: 'Maximalist', value: 'maximalist', icon: Icon, description: 'Bold, complex, and ornate'},
          {label: 'Installation', value: 'installation', icon: Icon, description: 'Three-dimensional space-based art'},
          {label: 'Performance', value: 'performance', icon: Icon, description: 'Live action and time-based art'},
          {label: 'Mixed media', value: 'mixed-media', icon: Icon, description: 'Combines various materials'},
          {label: 'Digital art', value: 'digital-art', icon: Icon, description: 'Art made with digital technology'},
          {label: 'Generative', value: 'generative', icon: Icon, description: 'Created by autonomous systems'},
          {label: 'Algorithmic', value: 'algorithmic', icon: Icon, description: 'Generated using computer algorithms'},
          {label: 'Procedural', value: 'procedural', icon: Icon, description: 'Created via defined rulesets'},
          {label: 'Interactive', value: 'interactive', icon: Icon, description: 'Requires user participation'},
          {label: 'Immersive', value: 'immersive', icon: Icon, description: 'Surrounds and engages the viewer'},
          {label: 'Experiential', value: 'experiential', icon: Icon, description: 'Focuses on the viewer experience'},
        ]}
        onChange={(value) => {
          setConfig({artisticDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ArtisticDetail;
