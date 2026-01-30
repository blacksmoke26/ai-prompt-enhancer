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

export interface PhysicsDetailProps {
}

const PhysicsDetail: React.FC<PhysicsDetailProps> = () => {
  const {config, setConfig} = useAppStore();
  const Icon = providerIcons['physicsDetail'];

  return (
    <div className="space-y-2">
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <div className="flex items-center justify-between">
          <strong><Icon className="inline-flex display-inline" size="16"/> Physics Detail</strong>
        </div>
        <p className="text-muted-foreground font-normal text-xs my-1">The level of physics detail.</p>
      </label>
      <SmartSelector
        visibleItems={5}
        size="md"
        iconSize="xs"
        iconGap="xs"
        variant="tiny"
        value={config?.physicsDetail}
        options={[
          {label: '(unset)', value: '', icon: OctagonX, description: 'No specific physics context'},
          {label: 'None', value: 'none', icon: Icon, description: 'No physics applied'},
          {label: 'Conceptual', value: 'conceptual', icon: Icon, description: 'Basic concepts and ideas'},
          {label: 'Simplified', value: 'simplified', icon: Icon, description: 'Reduced complexity models'},
          {label: 'Detailed', value: 'detailed', icon: Icon, description: 'Comprehensive physics details'},
          {label: 'Classical', value: 'classical', icon: Icon, description: 'Traditional mechanics and laws'},
          {label: 'Mechanics', value: 'mechanics', icon: Icon, description: 'Motion and forces'},
          {label: 'Electromagnetism', value: 'electromagnetism', icon: Icon, description: 'Electric and magnetic phenomena'},
          {label: 'Thermodynamics', value: 'thermodynamics', icon: Icon, description: 'Heat and energy transfer'},
          {label: 'Quantum', value: 'quantum', icon: Icon, description: 'Quantum mechanics and behavior'},
          {label: 'Relativistic', value: 'relativistic', icon: Icon, description: 'Relativity and high-speed physics'},
          {label: 'Astrophysics', value: 'astrophysics', icon: Icon, description: 'Celestial and space physics'},
          {label: 'Cosmology', value: 'cosmology', icon: Icon, description: 'Universe origin and structure'},
          {label: 'Particle', value: 'particle', icon: Icon, description: 'Subatomic particle physics'},
          {label: 'Nuclear', value: 'nuclear', icon: Icon, description: 'Atomic nucleus and reactions'},
          {label: 'Condensed matter', value: 'condensed-matter', icon: Icon, description: 'Solid and liquid state physics'},
          {label: 'Statistical', value: 'statistical', icon: Icon, description: 'Statistical mechanics and probability'},
          {label: 'Fluid', value: 'fluid', icon: Icon, description: 'Fluid dynamics and flow'},
          {label: 'Optical', value: 'optical', icon: Icon, description: 'Light and optics'},
          {label: 'Acoustic', value: 'acoustic', icon: Icon, description: 'Sound and vibration'},
          {label: 'Thermal', value: 'thermal', icon: Icon, description: 'Heat and temperature'},
          {label: 'Magnetic', value: 'magnetic', icon: Icon, description: 'Magnetic fields and materials'},
          {label: 'Electronic', value: 'electronic', icon: Icon, description: 'Electron behavior and circuits'},
          {label: 'Superconducting', value: 'superconducting', icon: Icon, description: 'Zero-resistance materials'},
          {label: 'Nano-physics', value: 'nano-physics', icon: Icon, description: 'Nanoscale physics'},
          {label: 'Field theory', value: 'field-theory', icon: Icon, description: 'Physical fields and interactions'},
          {label: 'String theory', value: 'string-theory', icon: Icon, description: 'Theoretical framework of strings'},
          {label: 'Quantum gravity', value: 'quantum-gravity', icon: Icon, description: 'Unifying quantum mechanics and gravity'},
          {label: 'High energy', value: 'high-energy', icon: Icon, description: 'Particle collisions and high-energy physics'},
        ]}
        onChange={(value) => {
          setConfig({physicsDetail: value}, true);
        }}
        showEndingMargin={false}
      />
    </div>
  );
};

export default PhysicsDetail;
