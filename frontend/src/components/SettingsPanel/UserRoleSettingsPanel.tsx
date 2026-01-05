/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {User2} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore.ts';

// components
import AdvancedConfigPanel, {GenericConfigItem} from '~/components/standalone/AdvancedConfigPanel';

/**
 * Original UserRoleSettingsPanel Props
 */
export interface UserRoleSettingsPanelProps {
  // Future extensibility props can go here
}

/**
 * Redesigned UserRoleSettingsPanel
 * Now acts as a configuration wrapper for the generic AdvancedConfigPanel
 *
 * @example
 * ```tsx
 * <UserRoleSettingsPanel />
 * ```
 */
const UserRoleSettingsPanel: React.FC<UserRoleSettingsPanelProps> = () => {
  const {config, setConfig, userRoles, toggleUserRole} = useAppStore();

  const handleSelect = (roleId: string) => {
    setConfig({userRole: roleId}, true);
  };

  const handleToggle = (roleId: string, isVisible: boolean) => {
    toggleUserRole(roleId, !isVisible);
  };

  const items: GenericConfigItem[] = userRoles.map(x => ({
    ...x,
    description: x.shortDescription,
  }));

  return (
    <AdvancedConfigPanel
      title="User Role Management" titleIcon={<User2 size={20}/>}
      searchPlaceholder="Search roles, description, or categories..."
      items={items} selectedId={config.userRole} onSelect={handleSelect} onToggleVisibility={handleToggle}
      enableChart={true} enableLayoutToggle={true}  enablePinning={true} enableTiltEffect={true}
      allowBulkActions={true}
      density="compact" cardVariant="glass" cardBorderRadius="md" primaryColor="blue" categorySort="count-desc"
    />
  );
};

export default UserRoleSettingsPanel;
