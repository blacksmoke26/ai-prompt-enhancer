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

export interface BiologicalDetailProps {
}

const BiologicalDetail: React.FC<BiologicalDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['biologicalDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Biological Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of biological detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.biologicalDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific biological detail level'},
          {label: 'None', value: 'none', icon: Icon, description: 'No biological detail included'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'High-level biological concepts'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Basic biological information'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Comprehensive biological details'},
          {label: 'Cellular', value: 'cellular', icon: Icon, description: 'Cellular level information'},
          {label: 'Molecular', value: 'molecular', icon: Icon, description: 'Molecular level details'},
          {label: 'Genetic', value: 'genetic', icon: Icon, description: 'Genetic information and inheritance'},
          {label: 'Epigenetic', value: 'epigenetic', icon: Icon, description: 'Gene expression modifications'},
          {label: 'Systems biology', value: 'systems-biology', icon: Icon, description: 'Biological systems interactions'},
          {label: 'Neuro biological', value: 'neuro-biological', icon: Icon, description: 'Nervous system functions'},
          {label: 'Immunological', value: 'immunological', icon: Icon, description: 'Immune system responses'},
          {label: 'Ecological', value: 'ecological', icon: Icon, description: 'Organism-environment interactions'},
          {label: 'Evolutionary', value: 'evolutionary', icon: Icon, description: 'Evolutionary processes and adaptations'},
          {label: 'Developmental', value: 'developmental', icon: Icon, description: 'Growth and development processes'},
          {label: 'Physiological', value: 'physiological', icon: Icon, description: 'Normal body functions'},
          {label: 'Pathological', value: 'pathological', icon: Icon, description: 'Disease mechanisms and conditions'},
          {label: 'Pharmacological', value: 'pharmacological', icon: Icon, description: 'Drug interactions and effects'},
          {label: 'Biotechnological', value: 'biotechnological', icon: Icon, description: 'Biotechnology applications'},
        ]}
        onChange={(value) => {
          setConfig({biologicalDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default BiologicalDetail;
