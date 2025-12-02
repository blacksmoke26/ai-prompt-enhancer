/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import { RefreshCw, TestTube, Eye, EyeOff } from 'lucide-react';

// ui components
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Badge } from '~/components/ui/Badge';

// types
import type { AppConfig } from '~/types';

interface GenericProviderSettingsProps {
  /** Name of the provider (used for display and test calls) */
  providerName: string;
  /** Key in AppConfig where this provider's settings are stored */
  configKey: keyof AppConfig;
  /** Current configuration values */
  localConfig: AppConfig;
  /** Function to update local configuration */
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  /** Name of provider currently being tested, or null if none */
  testingProvider: string | null;
  /** Function to set the provider currently being tested */
  setTestingProvider: React.Dispatch<React.SetStateAction<string | null>>;
  /** Test results for each provider */
  testResults: Record<string, boolean>;
  /** Function to update test results */
  setTestResults: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  /** Visibility state for API key inputs */
  showApiKeys: Record<string, boolean>;
  /** Function to update API key visibility */
  setShowApiKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  /** Function to test a provider connection */
  testProvider: (providerName: string) => void;
}

/**
 * Generic component that renders a simple API‑key configuration form
 * and connection test UI for any provider.
 *
 * The component reads/writes the provider’s sub‑object from `localConfig`
 * using the supplied `configKey`.  All actions (state updates, test calls,
 * visibility toggling) are delegated to the callbacks passed in props.
 */
const GenericProviderSettings: React.FC<GenericProviderSettingsProps> = ({
  providerName,
  configKey,
  localConfig,
  setLocalConfig,
  testingProvider,
  setTestingProvider,
  testResults,
  setTestResults,
  showApiKeys,
  setShowApiKeys,
  testProvider,
}) => {
  const providerConfig = localConfig[configKey] as any || {};

  const toggleVisibility = () => {
    setShowApiKeys((prev) => ({ ...prev, [configKey]: !prev[configKey] }));
  };

  const handleApiKeyChange = (value: string) => {
    setLocalConfig((prev) => ({
      ...prev,
      [configKey]: { ...(prev[configKey] || {}) as AppConfig, apiKey: value },
    }));
  };

  const handleTest = () => {
    testProvider(providerName);
  };

  const isTesting = testingProvider === providerName;
  const isConnected = testResults[providerName];

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">API Key</label>
        <div className="flex space-x-2">
          <Input
            type={showApiKeys[configKey] ? 'text' : 'password'}
            value={providerConfig.apiKey || ''}
            onChange={(e) => handleApiKeyChange(e.target.value || '')}
            placeholder="sk-..."
            className="flex-1 w-96"
          />
          <Button variant="outline" size="icon" onClick={toggleVisibility}>
            {showApiKeys[configKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={handleTest}
          disabled={isTesting || !providerConfig.apiKey}
          variant="outline"
        >
          {isTesting ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <TestTube className="h-4 w-4 mr-2" />
          )}
          Test Connection
        </Button>

        {isConnected !== undefined && (
          <Badge variant={isConnected ? 'default' : 'destructive'}>
            {isConnected ? 'Connected' : 'Failed'}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default GenericProviderSettings;
