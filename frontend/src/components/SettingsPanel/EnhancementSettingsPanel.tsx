/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Type} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// components
import AdvancedConfigPanel, {GenericConfigItem} from '~/components/standalone/AdvancedConfigPanel';

/**
 * Original EnhancementSettingsPanel Props
 */
export interface EnhancementSettingsPanelProps {
  // Future extensibility props can go here
}

/**
 * Redesigned EnhancementSettingsPanel
 * Now acts as a configuration wrapper for the generic AdvancedConfigPanel
 *
 * @example
 * ```tsx
 * <EnhancementSettingsPanel />
 * ```
 */
const EnhancementSettingsPanel: React.FC<EnhancementSettingsPanelProps> = () => {
  const {config, setConfig} = useAppStore();
  const {enhancementTypes, toggleEnhancementType} = useDataStore();

  const handleSelect = (id: string) => {
    setConfig({enhancementType: id}, true);
  };
  const handleToggle = (id: string, isVisible: boolean) => {
    toggleEnhancementType(id, !isVisible);
  };

  const items: GenericConfigItem[] = enhancementTypes.map(x => ({
    ...x,
    description: x.shortDescription,
  }));

  return (
    <AdvancedConfigPanel
      title="Enhancement Type Management" titleIcon={<Type size={20}/>}
      searchPlaceholder="Search enhancement, description, or categories..."
      items={items} selectedId={config.enhancementType}
      onSelect={handleSelect} onToggleVisibility={handleToggle}
      enableChart={true} enableLayoutToggle={true} enablePinning={true} enableTiltEffect={true}
      allowBulkActions={true}
      density="compact" cardVariant="glass" cardBorderRadius="md"
      primaryColor="blue" categorySort="count-desc"
    />
  );
};

export default EnhancementSettingsPanel;
