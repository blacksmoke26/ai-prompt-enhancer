/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import {ConfigKey} from '~/constants/configuration';
import {ConfigMeta} from '~/database/models';

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
 * Defines the structure for a prompt request sent to an AI model.
 * @developerNotes Contains all necessary data for AI processing including context and parameters.
 * @example
 * ```typescript
 * const request: PromptRequest = {
 *   text: "Explain quantum computing",
 *   provider: "openai",
 *   model: "gpt-4-turbo",
 *   enhancementType: "enhance"
 * };
 * ```
 */
export interface PromptRequest {
  /**
   * The text prompt to be processed
   * @example "Explain quantum computing in simple terms"
   */
  text: string;
  /**
   * Identifier of the AI model provider (e.g., "Openai", "Ollama")
   * @example "Openai"
   */
  provider: string;
  /**
   * Identifier of the AI model to use for processing
   * @example "gpt-4-turbo"
   */
  model: string;
  /**
   * System prompt to guide the AI's behavior
   * @example "You are a helpful assistant that explains complex topics simply"
   */
  systemPrompt?: string;
  /**
   * Controls randomness of the output (0.0 to 1.0)
   * @example 0.7
   */
  temperature?: number;
  /**
   * Maximum number of tokens to generate
   * @example 500
   */
  maxTokens?: number;
  /**
   * Type of enhancement to apply to the prompt
   * @example "enhance"
   */
  enhancementType?: string;
  /**
   * User role that determines the context for the AI response
   * @developerNotes Sets the professional context for the AI's response based on user's background
   * @example "developer"
   */
  userRole?: string;
  /**
   * Target audience for the response
   * @developerNotes Helps the AI tailor the content for specific audience understanding
   * @example "technical-experts"
   */
  targetAudience?: string;
  /**
   * Desired tone for the AI response
   * @developerNotes Controls the emotional and stylistic approach of the response
   * @example "professional"
   */
  tone?: string;
  /**
   * Preferred length of the response
   * @developerNotes Determines how detailed or concise the response should be
   * @example "medium"
   */
  responseLength?: 'short' | 'medium' | 'long' | 'custom';
  /**
   * Additional user instructions for the AI
   * @developerNotes Allows for specific formatting or content requirements beyond standard options
   * @example "Include code examples"
   */
  customInstructions?: string;
  /**
   * Timestamp when the request was made
   * @example "2023-05-15T10:30:00Z"
   */
  timestamp?: string;
}

/**
 * Represents the response from an AI prompt processing request.
 * @developerNotes Contains the processed prompt along with metadata about the operation.
 * @example
 * ```typescript
 * const response: PromptResponse = {
 *   enhancedPrompt: "Explain quantum computing in simple terms...",
 *   originalPrompt: "Explain quantum computing",
 *   model: "gpt-4-turbo",
 *   timestamp: new Date(),
 *   processingTime: 1250
 * };
 * ```
 */
export interface PromptResponse {
  /**
   * The enhanced version of the original prompt
   * @example "Explain quantum computing in simple terms, focusing on basic principles and applications"
   */
  enhancedPrompt: string;
  /**
   * The original prompt that was submitted
   * @example "Explain quantum computing"
   */
  originalPrompt: string;
  /**
   * Identifier of the AI model used
   * @example "gpt-4-turbo"
   */
  model: string;
  /**
   * Timestamp when the response was generated
   * @example new Date('2023-05-15T10:30:00Z')
   */
  timestamp: Date;
  /**
   * Number of tokens used in the processing
   * @example 120
   */
  tokensUsed?: number;
  /**
   * Time taken to process the prompt in milliseconds
   * @example 1250
   */
  processingTime: number;
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
