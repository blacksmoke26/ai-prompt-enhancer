/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {User2, WandSparkles} from 'lucide-react';

// store
import {useAppStore} from '~/stores/appStore.ts';

// ui components
import {Card} from '~/components/ui/Card';

// types
import type {AppConfig} from '~/types';
import {Badge} from '~/components/ui/Badge.tsx';

/**
 * Props for the EnhancementSettingsPanel component
 */
export interface EnhancementSettingsPanelProps {
  /**
   * The current configuration object for the app
   */
  localConfig: AppConfig;
  /**
   * Function to update the local configuration
   */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
}

/**
 * A panel component that displays enhancement types and user roles for configuration
 * @example
 * ```tsx
 * <EnhancementSettingsPanel
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 * />
 * ```
 * @developerNotes This component renders two sections: Enhancement Types and User Roles,
 * each displayed in a grid layout with Card components. The enhancement types provide
 * different approaches to text enhancement, while user roles help tailor the enhancement
 * to specific professional needs.
 */
const EnhancementSettingsPanel: React.FC<EnhancementSettingsPanelProps> = (props) => {
  const {localConfig, setLocalConfig} = props;

  const {enhancementTypes, userRoles} = useAppStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4"><WandSparkles className="inline-flex" size="16"/> Enhancement Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {enhancementTypes.map((type) => (
            <Card key={type.id} className="p-4">
              <h4>{type.name} <Badge variant="outline" className="text-xs">{type.category}</Badge></h4>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4"><User2 className="inline-flex" size="16"/> User Roles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userRoles.map((role) => (
            <Card key={role.id} className="p-4">
              <h4>{role.name} <Badge variant="outline" className="text-xs">{role.category}</Badge></h4>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancementSettingsPanel;
