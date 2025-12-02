// frontend/src/types.ts

/**
 * Global application configuration interface.
 * Optional provider configurations are represented as separate sub-objects.
 * Each provider accepts optional API keys and base URLs; additional fields can be added as needed.
 */
export interface AppConfig {
  // Existing base configuration
  theme?: 'light' | 'dark' | 'system';
  autoSave?: boolean;
  maxHistoryItems?: number;
  defaultModel?: string;
  defaultSystemPrompt?: string;

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
 * Representation of an AI model available for prompt enhancement.
 */
export interface AIModel {
  id: string;
  name: string;
  provider: string;
}

/**
 * Representation of an AI provider registered in the system.
 */
export interface AIProvider {
  id: string;
  name: string;
}

/**
 * Enumeration of enhancement types that can be applied to a prompt.
 */
export interface EnhancementType {
  id: string;
  name: string;
  category: string;
  description: string;
}

/**
 * User role definitions for access control or context.
 */
export interface UserRole {
  id: string;
  name: string;
  category: string;
  description: string;
}

/**
 * Request payload for enhancing a prompt.
 */
export interface PromptRequest {
  text: string;
  model: string;
  /** Optional additional options for the enhancement operation. */
  [key: string]: any;
}

/**
 * Response payload from the enhancement service.
 */
export interface PromptResponse {
  enhancedPrompt: string;
  /** Optional metadata returned by the service. */
  [key: string]: any;
}
