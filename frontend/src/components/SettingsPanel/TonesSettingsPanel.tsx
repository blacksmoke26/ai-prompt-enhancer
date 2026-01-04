/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {Speech} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// ui components
import GenericSettingsPanel, {SettingsItemBase} from '~/components/standalone/GenericSettingsPanel';

// Define your specific data type extending the base
type ToneItem = SettingsItemBase & {
  key: string; // renamed 'id' in the interface, mapped here
  // ... other specific tone fields
};

const TonesSettingsPanel = () => {
  const {config, setConfig, tones, toggleTone} = useAppStore();

  // Map store data to the generic interface
  const mappedItems: ToneItem[] = tones.map(t => ({
    id: t.key,
    name: t.name,
    category: t.category,
    key: t.key,
    hidden: t.hidden,
  }));

  return (
    <GenericSettingsPanel
      title="Tone Configuration"
      subtitle="Select an AI personality or style to guide the conversation."
      items={mappedItems}
      selectedItemId={config.tone as string}
      onSelect={(item) => setConfig({tone: item.id}, true)}
      onToggleVisibility={(id, isHidden) => toggleTone(id, isHidden)}
      searchPlaceholder="Search tones, categories..."
      renderIcon={() => <Speech className="h-4 w-4"/>} // Custom icon for Tones
    />
  );
};

export default TonesSettingsPanel;
