/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// components
import GenericProviderSettings from './GenericProviderSettings';

// types
import type { AppConfig } from '~/types';

export interface CozeProviderSettingsProps {
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
  testProvider(providerName: string): void;
}

/**
 * Coze provider settings component that wraps GenericProviderSettings with provider-specific configuration.
 *
 * Example usage:
 * ```tsx
 * <CozeProviderSettings
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   testingProvider={testing}
 *   setTestingProvider={setTesting}
 *   testResults={results}
 *   setTestResults={setResults}
 *   showApiKeys={showKeys}
 *   setShowApiKeys={setShowKeys}
 *   testProvider={testConnection}
 * />
 * ```
 *
 * @developer-note This component serves as a specialized wrapper for Coze provider configuration,
 * leveraging the GenericProviderSettings component with pre-configured provider-specific props.
 */
const CozeProviderSettings: React.FC<CozeProviderSettingsProps> = (props) => {
  return <GenericProviderSettings providerName="coze" configKey="coze" {...props} />;
};

export default CozeProviderSettings;
