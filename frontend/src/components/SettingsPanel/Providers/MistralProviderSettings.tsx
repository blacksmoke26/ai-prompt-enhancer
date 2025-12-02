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

export interface MistralProviderSettingsProps {
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
 * Mistral provider settings component that wraps GenericProviderSettings with provider-specific configuration.
 *
 * Example usage:
 * ```tsx
 * <MistralProviderSettings
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
 * @developer-note This component serves as a specialized wrapper for Mistral provider configuration,
 * leveraging the GenericProviderSettings component with pre-configured provider-specific props.
 */
const MistralProviderSettings: React.FC<MistralProviderSettingsProps> = (props) => {
  return (
    <GenericProviderSettings
      providerName="mistral"
      configKey="mistral"
      {...props}
    />
  );
};

export default MistralProviderSettings;
