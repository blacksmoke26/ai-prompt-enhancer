/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { Type } from 'lucide-react';

// hooks
import { useAppStore } from '~/stores/appStore';

// ui components
import { Select } from '~/components/ui/Select';
import { Badge } from '~/components/ui/Badge';

// utils
import { toSelectGroupedOptions } from '~/utils/helpers.ts';

export interface EnhancementTypeSelectorProps {
  className?: string;
}

const EnhancementTypeSelector: React.FC<EnhancementTypeSelectorProps> = ({ className = '' }) => {
  const {
    enhancementTypes,
    selectedEnhancementType,
    setSelectedEnhancementType,
  } = useAppStore();

  // Get enhancement data for display
  const selectedEnhancementData = enhancementTypes.find(type => type.id === selectedEnhancementType);

  return (
    <div className={className}>
      <Select
        isSearchable={true}
        value={selectedEnhancementType}
        onChange={(e) => setSelectedEnhancementType(e as string)}
        options={toSelectGroupedOptions(enhancementTypes)}
        label={<strong><Type className="inline-flex display-inline" size="16"/> Enhancement Type</strong>}
        formatOptionLabel={(option, context) => {
          return context?.context === 'menu'
            ? <div><Type className="inline-flex" size="16"/> {option.label}<p
              className="text-xs pl-5 mt-1">{option.description}</p></div>
            : <div>{option.label} <Badge variant="outline" className="text-xs">{option.category}</Badge></div>;
        }}
      />
      {selectedEnhancementData && (
        <p className="mt-1 text-xs text-muted-foreground">
          {selectedEnhancementData.description}
        </p>
      )}
    </div>
  );
};

export default EnhancementTypeSelector;
