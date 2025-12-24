/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {ConfigKey} from '~/constants/configuration';
import type {ConfigMeta} from '~/database/models';

/**
 * Defines the structure for an AI model used in prompt processing.
 * @developerNotes Represents available models and their capabilities in the system.
 * @example
 * ```typescript
 * const model: AIModel = {
 *   id: "gpt-4-turbo",
 *   name: "GPT-4 Turbo",
 *   provider: "openai",
 *   description: "Most capable GPT-4 model, optimized for chat",
 *   contextLength: 128000,
 *   maxTokens: 4096
 * };
 * ```
 */
export interface AIModel {
  /**
   * Unique identifier for the AI model
   * @example "gpt-4-turbo"
   */
  id: string;
  /**
   * Human-readable name of the AI model
   * @example "GPT-4 Turbo"
   */
  name: string;
  /** Size of the model (e.g., "7b", "20b", "30b") */
  size?: string;
  /**
   * Provider of the AI model (e.g., "openai", "ollama")
   * @example "openai"
   */
  provider: string;
  /**
   * Optional description of the model's capabilities
   * @example "Most capable GPT-4 model, optimized for chat"
   */
  description?: string;
  /**
   * Maximum context length in tokens
   * @example 128000
   */
  contextLength?: number;
  /**
   * Maximum number of tokens that can be generated
   * @example 4096
   */
  maxTokens?: number;
}

/**
 * Represents an AI provider with its configuration.
 * @developerNotes Manages provider settings and available models for AI services.
 * @example
 * ```typescript
 * const provider: AIProvider = {
 *   name: "OpenAI",
 *   models: [model1, model2],
 *   isConfigured: true,
 *   config: { apiKey: "sk-..." }
 * };
 * ```
 */
export interface AIProvider {
  /**
   * Name of the AI provider (e.g., "OpenAI", "Ollama")
   * @example "OpenAI"
   */
  caption: string;
  /**
   * Name of the AI provider (e.g., "openai", "ollama")
   * @example "OpenAI"
   */
  name: string;
  /**
   * Array of AI models supported by this provider
   * @example [{ id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "openai" }]
   */
  models: AIModel[];
  /**
   * Boolean indicating if the provider is configured and ready to use
   * @example true
   */
  isConfigured: boolean;
  /**
   * Configuration options for the provider
   * @example { apiKey: "sk-...abc", baseUrl: "https://api.openai.com/v1" }
   */
  config?: Record<string, any>;
}

/**
 * Application configuration settings.
 * @developerNotes Central configuration for all app features including AI providers and UI preferences.
 * @example
 * ```typescript
 * const config: AppConfig = {
 *   ollama: { url: "http://localhost:11434", timeout: 30000 },
 *   theme: "dark",
 *   autoSave: true,
 *   maxHistoryItems: 100
 * };
 * ```
 */
export interface AppConfig {
  [key: ConfigKey | string]: any | ConfigMeta;
}

/**
 * Cache options interface
 */
export interface CacheOptions {
  /** Time to live in seconds */
  ttl?: number;
  /** Maximum number of items to store */
  maxSize?: number;
  /** Cleanup interval in milliseconds */
  cleanupInterval?: number;
  /** Whether to enable statistics tracking */
  enableStats?: boolean;
}

/**
 * Cache statistics interface
 */
export interface CacheStats {
  /** Number of cache hits */
  hits: number;
  /** Number of cache misses */
  misses: number;
  /** Number of items set in cache */
  sets: number;
  /** Number of items deleted from cache */
  deletes: number;
  /** Number of items evicted due to size limits */
  evictions: number;
  /** Total number of items currently in cache */
  totalItems: number;
}

