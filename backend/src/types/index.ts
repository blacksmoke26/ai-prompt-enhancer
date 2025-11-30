/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * This interface defines the structure for an AI model
 * that can be used for prompt processing. It includes essential information
 * such as model identifier, name, provider, and optional metadata like
 * context length and maximum tokens. This interface is used to represent
 * available models in the system and their capabilities.
 *
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
 * @developerNotes This interface defines the structure for a prompt request
 * that can be sent to an AI model for processing.
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
  enhancementType?: 'correct' | 'enhance' | 'proofread' | 'optimize' | 'creative' | 'technical' | 'concise' | 'structured' | 'audience' | 'tone' | 'length' | 'simplify' | 'expand' | 'format';
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
}

/**
 * @developerNotes Response from an AI prompt processing request
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
 * @developerNotes Represents a message in a chat conversation
 */
export interface ChatMessage {
  /**
   * Role of the message sender (system, user, or assistant)
   * @example "user"
   */
  role: 'system' | 'user' | 'assistant';
  /**
   * Content of the message
   * @example "Hello, how can I help you today?"
   */
  content: string;
  /**
   * Timestamp when the message was created
   * @example new Date('2023-05-15T10:30:00Z')
   */
  timestamp: Date;
}

/**
 * @developerNotes Stores a history of prompt processing operations
 */
export interface PromptHistory {
  /**
   * Unique identifier for the history entry
   * @example "prompt-12345"
   */
  id: string;
  /**
   * Original prompt before processing
   * @example "Explain quantum computing"
   */
  originalPrompt: string;
  /**
   * Enhanced version of the prompt after processing
   * @example "Explain quantum computing in simple terms, focusing on basic principles and applications"
   */
  enhancedPrompt: string;
  /**
   * Identifier of the AI model used
   * @example "gpt-4-turbo"
   */
  model: string;
  /**
   * Type of enhancement applied to the prompt
   * @example "enhance"
   */
  enhancementType: string;
  /**
   * User role context
   * @example "developer"
   */
  userRole: string;
  /**
   * System prompt used during processing
   * @example "You are a helpful assistant that explains complex topics simply"
   */
  systemPrompt?: string;
  /**
   * Timestamp of when the prompt was processed
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
  /**
   * User rating of the prompt processing (1-5 stars)
   * @example 5
   */
  rating?: number;
  /**
   * Additional notes about the prompt processing
   * @example "The enhanced prompt was very helpful for my project"
   */
  notes?: string;
}

/**
 * @developerNotes Represents an AI provider with its configuration
 */
export interface AIProvider {
  /**
   * Name of the AI provider (e.g., "OpenAI", "Ollama")
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
 * @developerNotes Application configuration settings
 */
export interface AppConfig {
  /**
   * Configuration for Ollama provider
   * @example { url: "http://localhost:11434", timeout: 30000 }
   */
  ollama: {
    /**
     * URL of the Ollama server
     * @example "http://localhost:11434"
     */
    url: string;
    /**
     * Request timeout in milliseconds
     * @example 30000
     */
    timeout: number;
  };
  /**
   * Configuration for OpenAI provider (optional)
   * @example { apiKey: "sk-...abc", baseUrl: "https://api.openai.com/v1" }
   */
  openai?: {
    /**
     * API key for OpenAI
     * @example "sk-...abc"
     */
    apiKey: string;
    /**
     * Base URL for OpenAI API (optional, for custom endpoints)
     * @example "https://api.openai.com/v1"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for OpenRouter provider (optional)
   * @example { apiKey: "sk-...abc" }
   */
  openrouter?: {
    /**
     * API key for OpenRouter
     * @example "sk-...abc"
     */
    apiKey: string;
  };
  /**
   * Configuration for DeepSeek provider (optional)
   * @example { apiKey: "sk-...abc" }
   */
  deepseek?: {
    /**
     * API key for DeepSeek
     * @example "sk-...abc"
     */
    apiKey: string;
  };
  /**
   * Configuration for Qwen provider (optional)
   * @example { apiKey: "sk-...abc" }
   */
  qwen?: {
    /**
     * API key for Qwen
     * @example "sk-...abc"
     */
    apiKey: string;
  };
  /**
   * UI theme preference
   * @example "dark"
   */
  theme: 'light' | 'dark' | 'system';
  /**
   * Whether to auto-save prompt history
   * @example true
   */
  autoSave: boolean;
  /**
   * Maximum number of history items to keep
   * @example 100
   */
  maxHistoryItems: number;
  /**
   * Default AI model to use
   * @example "gpt-4-turbo"
   */
  defaultModel: string;
  /**
   * Default system prompt to use
   * @example "You are a helpful assistant that explains complex topics simply"
   */
  defaultSystemPrompt: string;
}

/**
 * @developerNotes Represents a type of enhancement that can be applied to prompts
 */
export interface EnhancementType {
  /**
   * Unique identifier for the enhancement type
   * @example "enhance"
   */
  id: string;
  /**
   * Human-readable name of the enhancement type
   * @example "Enhance"
   */
  name: string;
  /**
   * Detailed description of what the enhancement does
   * @example "Improve the clarity and structure of the prompt"
   */
  description: string;
  /**
   * System prompt that guides the AI for this enhancement type
   * @example "You are a helpful assistant that enhances prompts for better clarity and structure."
   */
  systemPrompt: string;
}

/**
 * @developerNotes Represents a user role that can be assigned to prompts
 */
export interface UserRole {
  /**
   * Unique identifier for the user role
   * @example "developer"
   */
  id: string;
  /**
   * Human-readable name of the user role
   * @example "Developer"
   */
  name: string;
  /**
   * Description of the user role's purpose and responsibilities
   * @example "Technical expert who understands code and systems"
   */
  description: string;
  /**
   * System prompt that guides the AI based on this user role
   * @example "You are a helpful assistant that understands technical concepts and programming."
   */
  systemPrompt: string;
}
