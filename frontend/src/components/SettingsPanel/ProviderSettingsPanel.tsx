/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, { useState } from 'react';

// types
import type {AppConfig} from '~/types';

// components
import ProviderTabNavigation from './Providers/ProviderTabNavigation';

// provider components
import OllamaProviderSettings from './Providers/OllamaProviderSettings';
import OpenAIProviderSettings from './Providers/OpenAIProviderSettings';
import OpenRouterProviderSettings from './Providers/OpenRouterProviderSettings';
import DeepSeekProviderSettings from './Providers/DeepSeekProviderSettings';

export interface ProviderSettingsPanelProps {
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
 * ProviderSettingsPanel component renders configuration settings for various AI providers.
 *
 * This component allows users to configure settings for Ollama, OpenAI, OpenRouter, and DeepSeek.
 * It includes input fields for API keys, server URLs, timeouts, and base URLs.
 * Users can test connections to each provider and toggle API key visibility.
 *
 * Example usage:
 * ```tsx
 * <ProviderSettingsPanel
 *   localConfig={config}
 *   setLocalConfig={setConfig}
 *   testingProvider={testingProvider}
 *   setTestingProvider={setTestingProvider}
 *   testResults={testResults}
 *   setTestResults={setTestResults}
 *   showApiKeys={showApiKeys}
 *   setShowApiKeys={setShowApiKeys}
 *   testProvider={testProvider}
 * />
 * ```
 *
 * Developer notes:
 * - The component handles state for multiple providers with consistent patterns
 * - API key visibility toggling uses a record of boolean values
 * - Test results are displayed using Badge components with appropriate variants
 * - Input validation and default values are handled in onChange handlers
 * - The testProvider function is called with provider names as arguments
 */
const ProviderSettingsPanel: React.FC<ProviderSettingsPanelProps> = (props) => {
  const {
    localConfig,
    setLocalConfig,
    testingProvider,
    setTestingProvider,
    testResults,
    setTestResults,
    showApiKeys,
    setShowApiKeys,
    testProvider,
  } = props;

  const [activeTab, setActiveTab] = useState('ollama');

  return (
    <div className="space-y-6">
      <ProviderTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'ollama' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Ollama (Local)</h3>
          <OllamaProviderSettings
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
            testingProvider={testingProvider}
            setTestingProvider={setTestingProvider}
            testResults={testResults}
            setTestResults={setTestResults}
            testProvider={testProvider}
          />
        </div>
      )}

      {activeTab === 'openai' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">OpenAI</h3>
          <OpenAIProviderSettings
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
            testingProvider={testingProvider}
            setTestingProvider={setTestingProvider}
            testResults={testResults}
            setTestResults={setTestResults}
            showApiKeys={showApiKeys}
            setShowApiKeys={setShowApiKeys}
            testProvider={testProvider}
          />
        </div>
      )}

      {activeTab === 'openrouter' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">OpenRouter</h3>
          <OpenRouterProviderSettings
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
            testingProvider={testingProvider}
            setTestingProvider={setTestingProvider}
            testResults={testResults}
            setTestResults={setTestResults}
            showApiKeys={showApiKeys}
            setShowApiKeys={setShowApiKeys}
            testProvider={testProvider}
          />
        </div>
      )}

      {activeTab === 'deepseek' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">DeepSeek</h3>
          <DeepSeekProviderSettings
            localConfig={localConfig}
            setLocalConfig={setLocalConfig}
            testingProvider={testingProvider}
            setTestingProvider={setTestingProvider}
            testResults={testResults}
            setTestResults={setTestResults}
            showApiKeys={showApiKeys}
            setShowApiKeys={setShowApiKeys}
            testProvider={testProvider}
          />
        </div>
      )}
    </div>
  );
};

export default ProviderSettingsPanel;
