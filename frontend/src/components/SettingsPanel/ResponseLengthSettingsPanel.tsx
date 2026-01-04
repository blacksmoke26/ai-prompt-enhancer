/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {AudioLines} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// ui components
import GenericSettingsPanel, {SettingsItemBase} from '~/components/standalone/GenericSettingsPanel';

// Define your specific data type extending the base
type ResponseLengthItem = SettingsItemBase & {
  key: string; // renamed 'id' in the interface, mapped here
  // ... other specific tone fields
};

const ResponseLengthSettingsPanel = () => {
  const {config, setConfig, responseLengths, toggleResponseLength} = useAppStore();

  // Map store data to the generic interface
  const mappedItems: ResponseLengthItem[] = responseLengths.map(t => ({
    key: t.key,
    name: t.name,
    category: t.category,
    hidden: t.hidden,
    id: t.key,
  }));

  return (
    <GenericSettingsPanel
      title="Response length Configuration"
      subtitle="Select a response length matches your taste..."
      items={mappedItems}
      selectedItemId={config.responseLength as string}
      onSelect={(item) => setConfig({responseLength: item.id}, true)}
      onToggleVisibility={(id, isHidden) => toggleResponseLength(id, isHidden)}
      searchPlaceholder="Search response lengths, categories..."
      renderIcon={() => <AudioLines className="h-4 w-4"/>} // Custom icon for Tones
    />
  );
};

export default ResponseLengthSettingsPanel;
