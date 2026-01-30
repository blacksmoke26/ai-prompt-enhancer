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

export interface ChemicalDetailProps {
}

const ChemicalDetail: React.FC<ChemicalDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['chemicalDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Chemical Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of chemical detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.chemicalDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific level set'},
          {label: 'None', value: 'none', icon: Icon, description: 'No chemical detail'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'General concepts and ideas'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Basic overview'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Comprehensive information'},
          {label: 'Elemental', value: 'elemental', icon: Icon, description: 'Focus on elements'},
          {label: 'Molecular', value: 'molecular', icon: Icon, description: 'Molecular structure and behavior'},
          {label: 'Organic', value: 'organic', icon: Icon, description: 'Carbon-based compounds'},
          {label: 'Inorganic', value: 'inorganic', icon: Icon, description: 'Non-carbon compounds'},
          {label: 'Biochemical', value: 'biochemical', icon: Icon, description: 'Chemical processes in living organisms'},
          {label: 'Pharmaceutical', value: 'pharmaceutical', icon: Icon, description: 'Drug-related chemistry'},
          {label: 'Industrial', value: 'industrial', icon: Icon, description: 'Large-scale chemical processes'},
          {label: 'Environmental', value: 'environmental', icon: Icon, description: 'Environmental impact and chemistry'},
          {label: 'Nanotechnology', value: 'nanotechnology', icon: Icon, description: 'Nanoscale chemical applications'},
          {label: 'Molecular chemistry', value: 'molecular-chemistry', icon: Icon, description: 'Advanced molecular interactions'},
          {label: 'Spectroscopy', value: 'spectroscopy', icon: Icon, description: 'Spectrum analysis techniques'},
          {label: 'Thermodynamics', value: 'thermodynamics', icon: Icon, description: 'Energy and heat relationships'},
          {label: 'Kinetics', value: 'kinetics', icon: Icon, description: 'Reaction rates and mechanisms'},
          {label: 'Catalysis', value: 'catalysis', icon: Icon, description: 'Reaction acceleration'},
        ]}
        onChange={(value) => {
          setConfig({chemicalDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default ChemicalDetail;
