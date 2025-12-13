/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents configuration for an AI/ML service provider.
 */
export interface ProviderConfig {
  /** The display name */
  caption: string;
  /** Unique identifier for the provider (e.g., 'openai', 'ollama') */
  name: string;
  /** Base URL for the provider's API endpoints */
  baseUrl: string;
  /** Optional API authentication key */
  apiKey?: string;
  /** Request timeout in milliseconds (provider-specific) */
  timeout?: number;

  /** Additional provider-specific properties */
  [key: string]: any;
}

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
  {caption: 'Ollama', name: 'ollama', baseUrl: 'http://localhost:11434', timeout: 30000},
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

export default providers;
