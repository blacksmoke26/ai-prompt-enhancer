/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {User2} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';

// ui components
import {Badge} from '~/components/ui/Badge';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

// utils
import {toSelectGroupedOptions} from '~/utils/helpers';

interface UserRoleSelectorProps {
  className?: string;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({className = ''}) => {
  const {userRoles, setConfig, config} = useAppStore();

  // Get role data for display
  const selectedRoleData = userRoles.find(role => role.id === config.userRole);

  return (
    <div className={`space-y-2 ${className || ''}`}>
      <label
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground">
        <strong><User2 className="inline-flex display-inline" size="16"/> User Role</strong>
      </label>
      <SelectAdvanced
        searchable
        clearable={false}
        triggerWidth="w-full"
        value={config.userRole as string}
        onChange={(e) => setConfig({userRole: e as string}, true)}
        options={toSelectGroupedOptions(userRoles.filter(x => !x.hidden))}
        formatLabel={option => (
          <div><User2 className="inline-flex" size="16"/> {option.label}<p
            className="text-xs pl-5 mt-1">{option.description}</p>
          </div>
        )}
        selectedOption={(_, option) => (
          <div>{option?.label ?? 'N/A'} <Badge variant="outline" className="text-xs">{option?.category ?? 'N/A'}</Badge></div>
        )}
      />
      {selectedRoleData && (
        <p className="mt-1 text-xs text-muted-foreground">
          {selectedRoleData.description}
        </p>
      )}
    </div>
  );
};

export default UserRoleSelector;
