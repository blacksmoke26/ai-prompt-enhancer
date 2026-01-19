/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// hooks
import {useDataStore} from '~/stores/dataStore.ts';

// ui components
import {Badge} from '~/components/ui/Badge';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/Card';

export interface ProviderStatusProps {
  className?: string;
}

const ProviderStatus: React.FC<ProviderStatusProps> = ({className = ''}) => {
  const {providers} = useDataStore();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg">Provider Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {providers.filter(x => x.isConfigured).map((provider) => (
            <div key={provider.name} className="flex items-center justify-between">
              <span className="text-sm capitalize">{provider.name}</span>
              <Badge
                variant={provider.isConfigured ? 'default' : 'destructive'}
                className="text-xs"
              >
                {provider.isConfigured ? 'Connected' : 'Not Connected'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderStatus;
