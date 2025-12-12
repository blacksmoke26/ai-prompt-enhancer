/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React from 'react';

// components
import GenericProviderSettings, {ProviderSettingsProps} from './GenericProviderSettings';

/**
 * Props interface for the OpenAIProviderSettings component.
 *
 * This interface defines the contract for all properties required by the OpenAIProviderSettings
 * component, which manages the UI for configuring OpenApi provider connection settings. Each prop
 * serves a specific role in maintaining the component's state and functionality.
 *
 * @interface OpenAIProviderSettingsProps
 */
export type OpenAIProviderSettingsProps = ProviderSettingsProps;

/**
 * OpenAI provider configuration component with API key management and connection testing.
 *
 * @example
 * <OpenAIProviderSettings
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   testingProvider={testing}
 *   setTestingProvider={setTesting}
 *   testResults={results}
 *   setTestResults={setResults}
 *   showApiKeys={visibleKeys}
 *   setShowApiKeys={setVisibleKeys}
 *   testProvider={testConnection}
 * />
 *
 * @developer_notes This component handles OpenAI-specific settings including API key input with visibility toggle,
 * optional base URL configuration, and connection testing with visual feedback. All state management is handled
 * through props passed from the parent component.
 */
const OpenAIProviderSettings: React.FC<OpenAIProviderSettingsProps> = (props) => {
  return (
    <GenericProviderSettings
      baseUrlInputProps={{placeholder: 'https://api.openai.com/v1'}}
      providerName="openai" configKey="openai" {...props}/>
  );
};

export default OpenAIProviderSettings;
