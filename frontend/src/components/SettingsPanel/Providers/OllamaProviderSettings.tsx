/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// ui components
import {Input} from '~/components/ui/Input';

// components
import GenericProviderSettings, {ProviderSettingsProps} from './GenericProviderSettings';

/**
 * Props interface for the OllamaProviderSettings component.
 *
 * This interface defines the contract for all properties required by the OllamaProviderSettings
 * component, which manages the UI for configuring Ollama provider connection settings. Each prop
 * serves a specific role in maintaining the component's state and functionality.
 *
 * @interface OllamaProviderSettingsProps
 */
export type OllamaProviderSettingsProps = ProviderSettingsProps;

/**
 * Ollama provider settings component for configuring connection parameters.
 *
 * @example
 * ```tsx
 * <OllamaProviderSettings
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   testingProvider={testing}
 *   setTestingProvider={setTesting}
 *   testResults={results}
 *   setTestResults={setResults}
 *   testProvider={testConnection}
 * />
 * ```
 *
 * @developer Note: This component handles the UI for Ollama provider-specific settings including
 * server URL, timeout configuration, and connection testing functionality.
 */
const OllamaProviderSettings: React.FC<OllamaProviderSettingsProps> = (props) => {
  return (
    <GenericProviderSettings
      showApiKeyInput={false}
      providerName="ollama" configKey="ollama" {...props}
      baseUrlInputProps={{placeholder: 'http://localhost:11434'}}>
      <div>
        <div className="text-sm font-medium mb-2">Timeout (ms)</div>
        <Input
          type="number"
          value={props.localConfig.ollama?.timeout || 30000}
          onChange={(e) => props.setLocalConfig(localConfig => ({
            ...localConfig,
            ollama: {...(localConfig.ollama || {}), timeout: parseInt(e.target.value) || 30000},
          }))}
          min="5000"
          max="300000"
          className="w-40"
          disabled={!props.localConfig.ollama?.enabled}
        />
      </div>
    </GenericProviderSettings>
  );
};

export default OllamaProviderSettings;
