/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * A type alias representing the valid names of AI providers.
 * Used to ensure consistency when referencing providers across the application.
 * @example
 * type ExampleProviderName = 'openai' | 'anthropic' | 'groq';
 */
export type ProviderName =
  | 'ollama'
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
  | 'qwen'
  | 'lmstudio';

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
  /** Provider-specific options */
  options?: {
    [key: string]: any;
    /** Whether to use SSL/TLS */
    secure?: boolean;
    /** Proxy configuration */
    proxy?: string;
    /** Custom headers */
    headers?: Record<string, string>;
    /** Retry configuration */
    retry?: {
      /** Maximum number of retries */
      maxAttempts?: number;
      /** Initial delay between retries in milliseconds */
      delay?: number;
      /** Backoff factor for retry delays */
      backoffFactor?: number;
    };
  };
  /** Additional provider-specific properties */
  [key: string]: any; /** Additional configuration options */
}
