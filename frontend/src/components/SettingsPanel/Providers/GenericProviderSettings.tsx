/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';
import {RefreshCw, TestTube, Eye, EyeOff} from 'lucide-react';

// ui components
import {Button} from '~/components/ui/Button';
import {Input, InputProps} from '~/components/ui/Input';
import {Badge} from '~/components/ui/Badge';
import {Switch} from '~/components/ui/Switch';

// types
import type {AppConfig} from '~/types';

export interface GenericProviderSettingsProps extends React.PropsWithChildren {
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
  /** Optional props to customize the base URL input field */
  baseUrlInputProps?: Partial<InputProps>;
  /** Whether to show the API key input field */
  showApiKeyInput?: boolean;

  /** Function to test a provider connection */
  testProvider(providerName: string): void;
}

/**
 * Props for provider-specific settings components.
 * Extends GenericProviderSettingsProps but excludes configKey and providerName
 * as these are typically handled by parent components or wrappers.
 */
export type ProviderSettingsProps = Omit<GenericProviderSettingsProps, 'configKey' | 'providerName'>;

/**
 * Generic component that renders a simple API‑key configuration form
 * and connection test UI for any provider.
 *
 * The component reads/writes the provider's sub‑object from `localConfig`
 * using the supplied `configKey`.  All actions (state updates, test calls,
 * visibility toggling) are delegated to the callbacks passed in props.
 *
 * @component
 * @example
 * // Basic usage with initial configuration
 * <GenericProviderSettings
 *   providerId="my-provider"
 *   configuration={{ apiKey: "123", timeout: 3000 }}
 *   onSettingsChange={(newConfig) => console.log("Settings updated:", newConfig)}
 * />
 *
 * @example
 * // Advanced usage with custom UI and validation
 * <GenericProviderSettings
 *   providerId="my-provider"
 *   configuration={{ apiKey: "123", timeout: 3000 }}
 *   onSettingsChange={(newConfig) => updateProviderConfig(newConfig)}
 *   isReadOnly={false}
 *   theme="dark"
 * />
 *
 * @returns {JSX.Element} A React component that renders a configurable UI for provider settings.
 */
const GenericProviderSettings: React.FC<GenericProviderSettingsProps> = (props) => {
  const {
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
    children = null,
    baseUrlInputProps = {},
    testProvider,
    showApiKeyInput = true,
  } = props;

  const providerConfig = localConfig[configKey] as any || {
    enabled: false,
    baseUrl: '',
    apiKey: '',
  };

  console.log('providerConfig:', providerConfig);

  const toggleVisibility = () => {
    setShowApiKeys((prev) => ({...prev, [configKey]: !prev[configKey]}));
  };

  const handleApiKeyChange = (value: string) => {
    setLocalConfig((prev) => ({
      ...prev,
      [configKey]: {...(prev[configKey] || {}) as AppConfig, apiKey: value},
    }));
  };

  const handleBaseUrlChange = (value: string) => {
    setLocalConfig((prev) => ({
      ...prev,
      [configKey]: {...(prev[configKey] || {}) as AppConfig, baseUrl: value},
    }));
  };

  const handleEnabledChange = (enabled: boolean) => {
    setLocalConfig((prev) => ({
      ...prev,
      [configKey]: {...(prev[configKey] || {}) as AppConfig, enabled},
    }));
  };

  const handleTest = () => {
    testProvider(providerName);
  };

  const isTesting = testingProvider === providerName;
  const isConnected = testResults[providerName];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          checked={providerConfig.enabled !== undefined ? providerConfig.enabled : true}
          onCheckedChange={handleEnabledChange}
        />
        <span className="text-sm font-medium">Enable {providerName}</span>
      </div>

      {showApiKeyInput && (
        <div>
          <div className="text-sm font-medium mb-2">API Key</div>
          <div className="flex space-x-2">
            <Input
              type={showApiKeys[configKey] ? 'text' : 'password'}
              value={providerConfig.apiKey || ''}
              onChange={(e) => handleApiKeyChange(e.target.value || '')}
              placeholder="sk-..."
              className="flex-1 w-96"
              disabled={!providerConfig.enabled}
            />
            <Button variant="outline" size="icon" onClick={toggleVisibility}>
              {showApiKeys[configKey] ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
            </Button>
          </div>
        </div>
      )}

      <div>
        <div className="text-sm font-medium mb-2">Base URL (optional)</div>
        <Input
          className="w-1/2"
          value={providerConfig.baseUrl || ''}
          onChange={(e) => handleBaseUrlChange(e.target.value || '')}
          placeholder="https://api.example.com/v1"
          disabled={!providerConfig.enabled}
          {...baseUrlInputProps}
        />
      </div>
      {children}

      <div className="pb-3"></div>

      <div className="flex items-center space-x-2">
        <Button
          onClick={handleTest}
          disabled={isTesting || !providerConfig.enabled}
          variant="secondary"
        >
          {isTesting ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin"/>
          ) : (
            <TestTube className="h-4 w-4 mr-2"/>
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
