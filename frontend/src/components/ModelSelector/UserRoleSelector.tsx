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
import {Select} from '~/components/ui/Select';
import {Badge} from '~/components/ui/Badge';

// utils
import {toSelectGroupedOptions} from '~/utils/helpers.ts';

interface UserRoleSelectorProps {
  className?: string;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({className = ''}) => {
  const {userRoles, setConfig, config} = useAppStore();

  // Get role data for display
  const selectedRoleData = userRoles.find(role => role.id === config.userRole);

  return (
    <div className={className}>
      <Select
        isSearchable
        value={config.userRole}
        onChange={(e) => setConfig({userRole: e as string}, true)}
        options={toSelectGroupedOptions(userRoles.filter(x => !x.hidden))}
        label={<strong><User2 className="inline-flex display-inline" size="16"/> User Role</strong>}
        formatOptionLabel={(option, context) => {
          return context?.context === 'menu'
            ? <div><User2 className="inline-flex" size="16"/> {option.label}<p
              className="text-xs pl-5 mt-1">{option.description}</p></div>
            : <div>{option.label} <Badge variant="outline" className="text-xs">{option.category}</Badge></div>;
        }}
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
