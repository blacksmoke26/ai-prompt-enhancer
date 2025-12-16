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
 * Props interface for the LMStudioProviderSettings component.
 *
 * This interface defines the contract for all properties required by the LMStudioProviderSettings
 * component, which manages the UI for configuring LM Studio provider connection settings. Each prop
 * serves a specific role in maintaining the component's state and functionality.
 *
 * @interface LMStudioProviderSettingsProps
 */
export type LMStudioProviderSettingsProps = ProviderSettingsProps;

/**
 * LM Studio provider settings component for configuring connection parameters.
 *
 * @example
 * ```tsx
 * <LMStudioProviderSettings
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
 * @developer Note: This component handles the UI for LM Studio provider-specific settings including
 * server URL, timeout configuration, and connection testing functionality.
 */
const LMStudioProviderSettings: React.FC<LMStudioProviderSettingsProps> = (props) => {
  return (
    <GenericProviderSettings
      showApiKeyInput={false}
      providerName="lmstudio" configKey="lmstudio" {...props}
      baseUrlInputProps={{placeholder: 'http://localhost:1234'}}>
      <div>
        <div className="text-sm font-medium mb-2">Timeout (ms)</div>
        <Input
          type="number"
          value={props.localConfig.lmstudio?.timeout || 30000}
          onChange={(e) => props.setLocalConfig(localConfig => ({
            ...localConfig,
            lmstudio: {...(localConfig.lmstudio || {}), timeout: parseInt(e.target.value) || 30000},
          }))}
          min="5000"
          max="300000"
          className="w-40"
          disabled={!props.localConfig.lmstudio?.enabled}
        />
      </div>
    </GenericProviderSettings>
  );
};

export default LMStudioProviderSettings;