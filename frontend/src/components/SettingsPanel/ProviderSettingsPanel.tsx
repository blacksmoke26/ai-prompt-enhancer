/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import React, {useState} from 'react';

// types
import type {AppConfig} from '~/types';

// tab navigation component
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
import LMStudioProviderSettings from './Providers/LMStudioProviderSettings';

/**
 * Props interface for the ProviderSettingsPanel component
 * @example
 * const props: ProviderSettingsPanelProps = {
 *   localConfig: appConfig,
 *   setLocalConfig: setConfig,
 *   testingProvider: 'openai',
 *   setTestingProvider: setTesting,
 *   testResults: { openai: true },
 *   setTestResults: setResults,
 *   showApiKeys: { openai: false },
 *   setShowApiKeys: setShowKeys,
 *   testProvider: testConnection
 * };
 * @developerNote This interface manages all state and functions needed for provider configuration
 */
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

/** Type alias for provider component props */
type ProviderComponentProps = ProviderSettingsPanelProps;

/**
 * Type definition for provider information
 * @developerNote This structure maps provider keys to their display names and components
 */
type ProviderInfo = {
  /** Unique identifier for the provider */
  key: string;
  /** Display title for the provider */
  title: string;
  /** React component for provider settings */
  component: React.ComponentType<ProviderComponentProps>;
};

/**
 * Registry of all available AI providers
 * @example
 * const provider = PROVIDER_MAP.find(p => p.key === 'openai');
 * @developerNote This array maintains the order and metadata for all provider tabs
 */
const PROVIDER_MAP: ProviderInfo[] = [
  {key: 'ollama', title: 'Ollama (Local)', component: OllamaProviderSettings},
  {key: 'lmstudio', title: 'LM Studio', component: LMStudioProviderSettings},
  {key: 'openai', title: 'OpenAI', component: OpenAIProviderSettings},
  {key: 'openrouter', title: 'OpenRouter', component: OpenRouterProviderSettings},
  {key: 'deepseek', title: 'DeepSeek', component: DeepSeekProviderSettings},
  {key: 'coze', title: 'Coze', component: CozeProviderSettings},
  {key: 'qianfan', title: 'QianFan', component: QianFanProviderSettings},
  {key: 'gemini', title: 'Gemini', component: GeminiProviderSettings},
  {key: 'kimi', title: 'Kimi', component: KimiProviderSettings},
  {key: 'groq', title: 'Groq', component: GroqProviderSettings},
  {key: 'anthropic', title: 'Anthropic', component: AnthropicProviderSettings},
  {key: 'mistral', title: 'Mistral', component: MistralProviderSettings},
  {key: 'nvidia', title: 'Nvidia', component: NvidiaProviderSettings},
  {key: 'cohere', title: 'Cohere', component: CohereProviderSettings},
  {key: 'cody', title: 'Cody', component: CodyProviderSettings},
  {key: 'xai', title: 'xAI', component: XAIProviderSettings},
  {key: 'huggingface', title: 'HuggingFace', component: HuggingFaceProviderSettings},
  {key: 'siliconflow', title: 'SiliconFlow', component: SiliconFlowProviderSettings},
  {key: 'glm', title: 'GLM (Zhipu)', component: GLMProviderSettings},
];

/**
 * Panel component for managing AI provider settings
 * @example
 * <ProviderSettingsPanel {...providerPanelProps} />
 * @developerNote This component handles tab navigation and renders the appropriate provider settings
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

  const [activeTab, setActiveTab] = useState<string>('ollama');

  const activeProvider = PROVIDER_MAP.find((p) => p.key === activeTab);

  if (!activeProvider) return null;

  const {
    title,
    component: ActiveComponent,
  } = activeProvider;

  return (
    <div className="flex space-x-6">
      <div className="w-64">
        <ProviderTabNavigation activeTab={activeTab} setActiveTab={setActiveTab}/>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <ActiveComponent
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
    </div>
  );
};

export default ProviderSettingsPanel;
