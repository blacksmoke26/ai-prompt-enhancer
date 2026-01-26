/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {User2} from 'lucide-react';

// hooks
import {useAppStore} from '~/stores/appStore';
import {useDataStore} from '~/stores/dataStore';

// ui components
import {Badge} from '~/components/ui/Badge';
import {SelectAdvanced} from '~/components/ui/SelectAdvanced';

// utils
import {toSelectGroupedOptions} from '~/utils/helpers';

interface UserRoleSelectorProps {
  className?: string;
}

const UserRoleSelector: React.FC<UserRoleSelectorProps> = ({className = ''}) => {
  const {userRoles} = useDataStore();
  const {setConfig, config} = useAppStore();

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
          <div>
            <User2 className="inline-flex" size="16"/> <span className="font-medium">{option.label}</span>
            <p className="text-xs pl-5 mt-1 text-muted-foreground">{option.shortDescription}</p>
            <p className="pl-5 mt-2">
              {option.capabilities.map(x => <Badge key={x} variant="secondary" className="mr-1 mb-1 text-muted-foreground">{x}</Badge>)}
            </p>
          </div>
        )}
        selectedOption={(_, option) => (
          <div>{option?.label ?? 'Select role'}
            {option?.label && (
              <Badge variant="outline" className="text-xs">{option?.category ?? 'N/A'}</Badge>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default UserRoleSelector;
