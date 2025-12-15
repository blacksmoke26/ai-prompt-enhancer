/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents an AI model with basic metadata and configuration.
 * @example
 * const model: AIModel = {
 *   id: "gpt-4",
 *   name: "GPT-4",
 *   provider: "OpenAI",
 *   description: "Large language model",
 *   contextLength: 8192,
 *   maxTokens: 4096
 * };
 * @developerNote
 * All properties except `id`, `name`, and `provider` are optional to allow flexibility.
 */
export interface AIModel {
  /** Unique identifier for the model */
  id: string;
  /** Display name of the model */
  name: string;
  /** Name of the AI service provider */
  provider: string;
  /** Brief description of the model's capabilities */
  description?: string;
  /** Maximum context window size in tokens */
  contextLength?: number;
  /** Maximum number of tokens for output */
  maxTokens?: number;
}

/**
 * Defines the structure for a prompt enhancement request.
 * @example
 * const request: PromptRequest = {
 *   text: "Rewrite this email",
 *   model: "gpt-4",
 *   enhancementType: "enhance",
 *   tone: "professional"
 * };
 * @developerNote
 * `enhancementType` uses a literal union type for better type safety and autocomplete support.
 */
export interface PromptRequest {
  /** The original prompt text to enhance */
  text: string;
  /** The AI model provider name */
  provider: string;
  /** The AI model to use for enhancement */
  model: string;
  /** Optional system prompt to guide the AI */
  systemPrompt?: string;
  /** Temperature setting for randomness in output (0-1) */
  temperature?: number;
  /** Maximum tokens allowed in the response */
  maxTokens?: number;
  /** Type of enhancement to apply */
  enhancementType?: string;
  /** Role the AI should adopt when responding */
  userRole?: string;
  /** Target audience for the enhanced prompt */
  targetAudience?: string;
  /** Desired tone for the output */
  tone?: string;
  /** Preferred length of the response */
  responseLength?: 'short' | 'medium' | 'long' | 'custom';
  /** Additional custom instructions for the AI */
  customInstructions?: string;
}

/**
 * Response structure containing the enhanced prompt and metadata.
 * @example
 * const response: PromptResponse = {
 *   enhancedPrompt: "Rewrite this email in a professional tone",
 *   originalPrompt: "Rewrite this email",
 *   model: "gpt-4",
 *   timestamp: "2023-12-01T10:00:00Z",
 *   processingTime: 1.5
 * };
 * @developerNote
 * `tokensUsed` is optional as not all providers return this information.
 */
export interface PromptResponse {
  /** Optional metadata returned by the service. */
  [key: string]: any;

  /** The enhanced version of the prompt */
  enhancedPrompt: string;
  /** The original prompt text */
  originalPrompt: string;
  /** The AI model used for enhancement */
  model: string;
  /** Timestamp of when the enhancement was created */
  timestamp: string;
  /** Number of tokens used in the response */
  tokensUsed?: number;
  /** Time taken to process the request in seconds */
  processingTime: number;
}

/**
 * Represents a single entry in the prompt enhancement history.
 * @example
 * const history: PromptHistory = {
 *   id: "123",
 *   originalPrompt: "Rewrite this email",
 *   enhancedPrompt: "Rewrite this email professionally",
 *   model: "gpt-4",
 *   enhancementType: "enhance",
 *   userRole: "professional",
 *   timestamp: "2023-12-01T10:00:00Z",
 *   processingTime: 1.5
 * };
 * @developerNote
 * Includes additional metadata like `rating` and `notes` for user feedback.
 */
export interface PromptHistory {
  /** Unique identifier for the history entry */
  id: string;
  /** The original prompt text */
  originalPrompt: string;
  /** The enhanced version of the prompt */
  enhancedPrompt: string;
  /** The AI model used for enhancement */
  model: string;
  /** The AI provider used for enhancement */
  provider: string;
  /** Type of enhancement applied */
  enhancementType: string;
  /** Role used during enhancement */
  userRole: string;
  /** System prompt used for the enhancement */
  systemPrompt?: string;
  /** Timestamp of when the enhancement was created */
  timestamp: string;
  /** Number of tokens used in the response */
  tokensUsed?: number;
  /** Time taken to process the request in seconds */
  processingTime: number;
  /** Temperature setting for randomness in output (0-1) */
  temperature?: number;
  /** Maximum tokens allowed in the response */
  maxTokens?: number;
  /** User rating for the enhancement (1-5) */
  rating?: number;
  /** User notes about the enhancement */
  notes?: string;
}

/**
 * Configuration for an AI service provider and its available models.
 * @example
 * const provider: AIProvider = {
 *   name: "OpenAI",
 *   models: [gpt4Model],
 *   isConfigured: true,
 *   config: { apiKey: "sk-..." }
 * };
 * @developerNote
 * `config` is intentionally generic to support various provider-specific settings.
 */
export interface AIProvider {
  /** Name of the AI service provider */
  name: string;
  /** List of available models from this provider */
  models: AIModel[];
  /** Whether the provider is properly configured */
  isConfigured?: boolean;
  /** Provider-specific configuration settings */
  config?: {
    [key: string]: any;
    enabled?: boolean;
    apiKey?: string;
    baseUrl?: string;
    timeout?: number;
  };
}

/**
 * Application configuration settings including provider credentials and UI preferences.
 * @example
 * const config: AppConfig = {
 *   ollama: { url: "http://localhost:11434", timeout: 30000 },
 *   theme: "system",
 *   autoSave: true,
 *   maxHistoryItems: 100,
 *   defaultModel: "llama2"
 * };
 * @developerNote
 * Provider configs are optional to allow selective configuration.
 */
export interface AppConfig {
  /** Theme preference for the UI */
  theme: 'light' | 'dark' | 'system';
  /** Whether to automatically save history */
  autoSave: boolean;
  /** Maximum number of history items to keep */
  maxHistoryItems: number;
  /** Default model to use for enhancements */
  defaultModel: string;
  /** Default system prompt to use */
  defaultSystemPrompt: string;
  /** Temperature setting for randomness in output (0-1) */
  temperature?: number;
  /** Maximum tokens allowed in the response */
  maxTokens?: number;
  /** Selected enhancement type to use */
  enhancementType?: string;
  /** Selected user role to use */
  userRole?: string;
  /** Selected AI provider to use */
  provider?: string;
  /** Selected AI model to use */
  model?: string;
  // Provider specific configuration objects
  ollama?: {
    url?: string;
    timeout?: number;
  };
  openai?: {
    apiKey?: string;
    baseUrl?: string;
  };
  openrouter?: {
    apiKey?: string;
    baseUrl?: string;
  };
  deepseek?: {
    apiKey?: string;
    baseUrl?: string;
  };
  coze?: {
    apiKey?: string;
    baseUrl?: string;
  };
  qianfan?: {
    apiKey?: string;
    baseUrl?: string;
  };
  gemini?: {
    apiKey?: string;
    baseUrl?: string;
  };
  kimi?: {
    apiKey?: string;
    baseUrl?: string;
  };
  groq?: {
    apiKey?: string;
    baseUrl?: string;
  };
  anthropic?: {
    apiKey?: string;
    baseUrl?: string;
  };
  mistral?: {
    apiKey?: string;
    baseUrl?: string;
  };
  nvidia?: {
    apiKey?: string;
    baseUrl?: string;
  };
  cohere?: {
    apiKey?: string;
    baseUrl?: string;
  };
  cody?: {
    apiKey?: string;
    baseUrl?: string;
  };
  xai?: {
    apiKey?: string;
    baseUrl?: string;
  };
  huggingface?: {
    apiKey?: string;
    baseUrl?: string;
  };
  siliconflow?: {
    apiKey?: string;
    baseUrl?: string;
  };
  glm?: {
    apiKey?: string;
    baseUrl?: string;
  };
}

/**
 * Defines a type of prompt enhancement with associated metadata.
 * @example
 * const type: EnhancementType = {
 *   id: "enhance",
 *   category: "general",
 *   name: "Enhance",
 *   description: "Improves the prompt",
 *   systemPrompt: "Make this prompt better"
 * };
 * @developerNote
 * `category` allows for grouping similar enhancement types in the UI.
 */
export interface EnhancementType {
  /** Unique identifier for the enhancement type */
  id: string;
  /** Category for grouping similar types */
  category: string;
  /** Display name for the enhancement type */
  name: string;
  /** Brief description of what this enhancement does */
  description: string;
  /** System prompt to use for this enhancement type */
  systemPrompt: string;
}

/**
 * Represents a user role that affects prompt enhancement behavior.
 * @example
 * const role: UserRole = {
 *   id: "professional",
 *   category: "business",
 *   name: "Professional",
 *   description: "Business context",
 *   systemPrompt: "Adopt professional tone"
 * };
 * @developerNote
 * Similar to EnhancementType but focused on persona-based modifications.
 */
export interface UserRole {
  /** Unique identifier for the user role */
  id: string;
  /** Category for grouping similar roles */
  category: string;
  /** Display name for the role */
  name: string;
  /** Brief description of the role's context */
  description: string;
  /** System prompt to apply for this role */
  systemPrompt: string;
}

/**
 * Aggregated statistics about prompt enhancement history.
 * @example
 * const stats: HistoryStats = {
 *   totalItems: 150,
 *   totalTokensUsed: 45000,
 *   averageProcessingTime: 1.2,
 *   mostUsedModel: "gpt-4",
 *   mostUsedEnhancementType: "enhance"
 * };
 * @developerNote
 * Useful for analytics and tracking usage patterns.
 */
export interface HistoryStats {
  /** Total number of history items */
  totalItems: number;
  /** Total tokens used across all enhancements */
  totalTokensUsed: number;
  /** Average processing time per enhancement */
  averageProcessingTime: number;
  /** Most frequently used model */
  mostUsedModel: string;
  /** Most frequently used enhancement type */
  mostUsedEnhancementType: string;
}

/**
 * Provider configuration settings for a specific AI service provider.
 */
export interface ProviderConfig {
  [key: string]: any;

  /** Whether the provider is enabled */
  enabled?: boolean;
  /** Base URL for the provider */
  baseUrl?: string;
  /** The API key for the provider */
  apiKey?: string;
  /** The timeout for requests to the provider */
  timeout?: number;
}
