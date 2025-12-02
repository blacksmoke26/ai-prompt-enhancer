import React from 'react';
import GenericProviderSettings from './GenericProviderSettings';
import type { AppConfig } from '~/types';

export interface GroqProviderSettingsProps {
  localConfig: AppConfig;
  setLocalConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  testingProvider: string | null;
  setTestingProvider: React.Dispatch<React.SetStateAction<string | null>>;
  testResults: Record<string, boolean>;
  setTestResults: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  showApiKeys: Record<string, boolean>;
  setShowApiKeys: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  testProvider(providerName: string): void;
}

/**
 * Groq provider settings component that wraps GenericProviderSettings with provider-specific configuration.
 *
 * Example usage:
 * ```tsx
 * <GroqProviderSettings
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
 * @developer-note This component serves as a specialized wrapper for Groq provider configuration,
 * leveraging the GenericProviderSettings component with pre-configured provider-specific props.
 */
const GroqProviderSettings: React.FC<GroqProviderSettingsProps> = (props) => {
  return (
    <GenericProviderSettings providerName="groq" configKey="groq" {...props} />
  );
};

export default GroqProviderSettings;
