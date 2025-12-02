import React, { useState } from 'react';

// types
import type { AppConfig } from '~/types';

// components
import ProviderTabNavigation from './Providers/ProviderTabNavigation';

// provider components
import OllamaProviderSettings from './Providers/OllamaProviderSettings';
import OpenAIProviderSettings from './Providers/OpenAIProviderSettings';
import OpenRouterProviderSettings from './Providers/OpenRouterProviderSettings';
import DeepSeekProviderSettings from './Providers/DeepSeekProviderSettings';
import CozeProviderSettings from './Providers/CozeProviderSettings';
import QianFanProviderSettings from './Providers/QianFanProviderSettings';
import GeminiProviderSettings from './Providers/GeminiProviderSettings';
import KimiProviderSettings from './Providers/KimiProviderSettings';
import GroqProviderSettings from './Providers/GroqProviderSettings';
import AnthropicProviderSettings from './Providers/AnthropicProviderSettings';
import MistralProviderSettings from './Providers/MistralProviderSettings';
import NvidiaProviderSettings from './Providers/NvidiaProviderSettings';
import CohereProviderSettings from './Providers/CohereProviderSettings';
import CodyProviderSettings from './Providers/CodyProviderSettings';
import XAIProviderSettings from './Providers/XAIProviderSettings';
import HuggingFaceProviderSettings from './Providers/HuggingFaceProviderSettings';
import SiliconFlowProviderSettings from './Providers/SiliconFlowProviderSettings';
import GLMProviderSettings from './Providers/GLMProviderSettings';

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

      {activeTab === 'coze' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Coze</h3>
          <CozeProviderSettings
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

      {activeTab === 'qianfan' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">QianFan</h3>
          <QianFanProviderSettings
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

      {activeTab === 'gemini' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Gemini</h3>
          <GeminiProviderSettings
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

      {activeTab === 'kimi' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Kimi</h3>
          <KimiProviderSettings
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

      {activeTab === 'groq' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Groq</h3>
          <GroqProviderSettings
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

      {activeTab === 'anthropic' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Anthropic</h3>
          <AnthropicProviderSettings
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

      {activeTab === 'mistral' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Mistral</h3>
          <MistralProviderSettings
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

      {activeTab === 'nvidia' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Nvidia</h3>
          <NvidiaProviderSettings
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

      {activeTab === 'cohere' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Cohere</h3>
          <CohereProviderSettings
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

      {activeTab === 'cody' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Cody</h3>
          <CodyProviderSettings
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

      {activeTab === 'xai' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">xAI</h3>
          <XAIProviderSettings
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

      {activeTab === 'huggingface' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">HuggingFace</h3>
          <HuggingFaceProviderSettings
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

      {activeTab === 'siliconflow' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">SiliconFlow</h3>
          <SiliconFlowProviderSettings
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

      {activeTab === 'glm' && (
        <div>
          <h3 className="text-lg font-semibold mb-4">GLM (Zhipu)</h3>
          <GLMProviderSettings
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
