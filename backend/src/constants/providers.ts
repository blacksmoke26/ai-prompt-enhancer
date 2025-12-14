/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// providers
import BaseAIProvider from '~/base/BaseAIProvider';
import OpenAIProvider from '~/providers/OpenAIProvider';
import OpenRouterProvider from '~/providers/OpenRouterProvider';
import DeepSeekProvider from '~/providers/DeepSeekProvider';
import CozeProvider from '~/providers/CozeProvider';
import QianFanProvider from '~/providers/QianFanProvider';
import GeminiProvider from '~/providers/GeminiProvider';
import KimiProvider from '~/providers/KimiProvider';
import GroqProvider from '~/providers/GroqProvider';
import AnthropicProvider from '~/providers/AnthropicProvider';
import MistralProvider from '~/providers/MistralProvider';
import NvidiaProvider from '~/providers/NvidiaProvider';
import CohereProvider from '~/providers/CohereProvider';
import CodyProvider from '~/providers/CodyProvider';
import XAIProvider from '~/providers/XAIProvider';
import HuggingFaceProvider from '~/providers/HuggingFaceProvider';
import SiliconFlowProvider from '~/providers/SiliconFlowProvider';
import ZhipuProvider from '~/providers/ZhipuProvider';
import OllamaProvider from '~/providers/OllamaProvider';

export type ProviderName =
  'ollama'
  | 'openai'
  | 'openrouter'
  | 'deepseek'
  | 'coze'
  | 'qianfan'
  | 'gemini'
  | 'kimi'
  | 'groq'
  | 'anthropic'
  | 'mistral'
  | 'nvidia'
  | 'cohere'
  | 'cody'
  | 'xai'
  | 'huggingface'
  | 'siliconflow'
  | 'zhipu'
  | 'qwen';

/**
 * Represents configuration for an AI/ML service provider.
 */
export interface ProviderConfig {
  /** The display name */
  caption: string;
  /** Unique identifier for the provider (e.g., 'openai', 'ollama') */
  name: ProviderName | string;
  /** Base URL for the provider's API endpoints */
  baseUrl: string;
  /** Optional API authentication key */
  apiKey?: string;
  /** Request timeout in milliseconds (provider-specific) */
  timeout?: number;

  /** Additional provider-specific properties */
  [key: string]: any;
}

export const configKeys: string[] = [
  'baseUrl',
  'apiKey',
  'timeout',
];

/**
 * Configuration for various AI/ML service providers.
 *
 * This module defines a list of supported providers with their base URLs and optional authentication credentials.
 * Each provider can be used to connect to different AI/ML services for model inference and other operations.
 *
 * @example
 * ```typescript
 * import providers from './providers';
 *
 * // Get the OpenAI provider configuration
 * const openai = providers.find(p => p.name === 'openai');
 * console.log(openai.baseUrl); // 'https://api.openai.com/v1'
 * ```
 *
 * @developerNotes
 * - The `apiKey` field should be populated with valid credentials for production use
 * - Some providers (like Ollama) may not require API keys
 * - Additional properties can be added to each provider as needed
 */
const providers: ProviderConfig[] = [
  {caption: 'Ollama', name: 'ollama', baseUrl: 'http://localhost:11434', apiKey: '', timeout: 30000},
  {caption: 'OpenAI', name: 'openai', baseUrl: 'https://api.openai.com/v1', apiKey: ''},
  {caption: 'OpenRouter', name: 'openrouter', baseUrl: 'https://openrouter.ai/api/v1', apiKey: ''},
  {caption: 'Deepseek', name: 'deepseek', baseUrl: 'https://api.deepseek.com', apiKey: ''},
  {caption: 'Coze', name: 'coze', baseUrl: 'https://api.coze.cn', apiKey: ''},
  {caption: 'Qianfan', name: 'qianfan', baseUrl: 'https://aip.baidubce.com', apiKey: ''},
  {caption: 'Gemini', name: 'gemini', baseUrl: 'https://generativelanguage.googleapis.com/v1beta', apiKey: ''},
  {caption: 'Kimi', name: 'kimi', baseUrl: 'https://api.moonshot.cn', apiKey: ''},
  {caption: 'Groq', name: 'groq', baseUrl: 'https://api.groq.com', apiKey: ''},
  {caption: 'Anthropic', name: 'anthropic', baseUrl: 'https://api.anthropic.com', apiKey: ''},
  {caption: 'Mistral', name: 'mistral', baseUrl: 'https://api.mistral.ai', apiKey: ''},
  {caption: 'Nvidia', name: 'nvidia', baseUrl: 'https://api.nvidia.com', apiKey: ''},
  {caption: 'Cohere', name: 'cohere', baseUrl: 'https://api.cohere.ai', apiKey: ''},
  {caption: 'Cody', name: 'cody', baseUrl: 'https://sourcegraph.com', apiKey: ''},
  {caption: 'xAI', name: 'xai', baseUrl: 'https://api.x.ai', apiKey: ''},
  {caption: 'HuggingFace', name: 'huggingface', baseUrl: 'https://api-inference.huggingface.co/models', apiKey: ''},
  {caption: 'SiliconFlow', name: 'siliconflow', baseUrl: 'https://api.siliconflow.cn', apiKey: ''},
  {caption: 'Zhipu', name: 'zhipu', baseUrl: 'https://open.bigmodel.cn', apiKey: ''},
  {caption: 'Qwen', name: 'qwen', baseUrl: 'https://dashscope.aliyuncs.com', apiKey: ''},
];

// provider imports
export const providersClasses: Record<ProviderName | string, new (...args: any[]) => BaseAIProvider> = {
  ollama: OllamaProvider,
  openai: OpenAIProvider,
  openrouter: OpenRouterProvider,
  deepseek: DeepSeekProvider,
  coze: CozeProvider,
  qianfan: QianFanProvider,
  gemini: GeminiProvider,
  kimi: KimiProvider,
  groq: GroqProvider,
  anthropic: AnthropicProvider,
  mistral: MistralProvider,
  nvidia: NvidiaProvider,
  cohere: CohereProvider,
  cody: CodyProvider,
  xai: XAIProvider,
  huggingface: HuggingFaceProvider,
  siliconflow: SiliconFlowProvider,
  zhipu: ZhipuProvider,
};

export default providers;
