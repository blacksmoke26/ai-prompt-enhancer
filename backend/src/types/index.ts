/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

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
 * Represents a message in a chat conversation.
 * @developerNotes Used to maintain conversational context between user and AI.
 * @example
 * ```typescript
 * const message: ChatMessage = {
 *   role: "user",
 *   content: "Hello, how can you help me?",
 *   timestamp: new Date()
 * };
 * ```
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
 * Stores a history of prompt processing operations.
 * @developerTracks All prompt enhancements with metadata for analysis and review.
 * @example
 * ```typescript
 * const history: PromptHistory = {
 *   id: "prompt-12345",
 *   originalPrompt: "Explain quantum computing",
 *   enhancedPrompt: "Explain quantum computing in simple terms...",
 *   model: "gpt-4-turbo",
 *   enhancementType: "enhance",
 *   timestamp: new Date()
 * };
 * ```
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
  /**
   * Configuration for Ollama provider
   * @example { url: "http://localhost:11434", timeout: 30000 }
   */
  ollama: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * URL of the Ollama server
     * @example "http://localhost:11434"
     */
    baseUrl?: string;
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
    /** System-wide enable or disable provider  */
    enabled?: boolean;
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
   * @example { apiKey: "sk-...abc", baseUrl: "https://openrouter.ai/api/v1" }
   */
  openrouter?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for OpenRouter
     * @example "sk-...abc"
     */
    apiKey: string;
    /**
     * Base URL for OpenRouter API (optional)
     * @example "https://openrouter.ai/api/v1"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for DeepSeek provider (optional)
   * @example { apiKey: "sk-...abc", baseUrl: "https://api.deepseek.com" }
   */
  deepseek?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for DeepSeek
     * @example "sk-...abc"
     */
    apiKey: string;
    /**
     * Base URL for DeepSeek API (optional)
     * @example "https://api.deepseek.com"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Coze provider (optional)
   * @example { apiKey: "coze-...abc" }
   */
  coze?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Coze
     * @example "coze-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Coze API (optional)
     * @example "https://api.coze.cn"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Qianfan provider (optional)
   * @example { apiKey: "sk-...abc", baseUrl: "https://aip.baidubce.com" }
   */
  qianfan?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Qianfan
     * @example "sk-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Qianfan API (optional)
     * @example "https://aip.baidubce.com"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Gemini provider (optional)
   * @example { apiKey: "AIza...abc" }
   */
  gemini?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Gemini
     * @example "AIza...abc"
     */
    apiKey: string;
    /**
     * Base URL for Gemini API (optional)
     * @example "https://generativelanguage.googleapis.com/v1beta"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Kimi provider (optional)
   * @example { apiKey: "sk-...abc", baseUrl: "https://api.moonshot.cn" }
   */
  kimi?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Kimi
     * @example "sk-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Kimi API (optional)
     * @example "https://api.moonshot.cn"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Groq provider (optional)
   * @example { apiKey: "gsk_...abc" }
   */
  groq?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Groq
     * @example "gsk_...abc"
     */
    apiKey: string;
    /**
     * Base URL for Groq API (optional)
     * @example ""
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Anthropic provider (optional)
   * @example { apiKey: "sk-ant-...abc", baseUrl: "https://api.anthropic.com" }
   */
  anthropic?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Anthropic
     * @example "sk-ant-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Anthropic API (optional)
     * @example "https://api.anthropic.com"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Mistral provider (optional)
   * @example { apiKey: "Ms-...abc", baseUrl: "https://api.mistral.ai" }
   */
  mistral?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Mistral
     * @example "Ms-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Mistral API (optional)
     * @example "https://api.mistral.ai"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for NVIDIA provider (optional)
   * @example { apiKey: "nvapi-...abc", baseUrl: "https://api.nvidia.com" }
   */
  nvidia?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for NVIDIA
     * @example "nvapi-...abc"
     */
    apiKey: string;
    /**
     * Base URL for NVIDIA API (optional)
     * @example "https://api.nvidia.com"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Cohere provider (optional)
   * @example { apiKey: "cohere-...abc", baseUrl: "https://api.cohere.ai" }
   */
  cohere?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Cohere
     * @example "cohere-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Cohere API (optional)
     * @example "https://api.cohere.ai"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Cody provider (optional)
   * @example { apiKey: "sgp-...abc", baseUrl: "https://sourcegraph.com" }
   */
  cody?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Cody
     * @example "sgp-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Cody API (optional)
     * @example "https://sourcegraph.com"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for xAI provider (optional)
   * @example { apiKey: "xai-...abc", baseUrl: "https://api.x.ai" }
   */
  xai?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for xAI
     * @example "xai-...abc"
     */
    apiKey: string;
    /**
     * Base URL for xAI API (optional)
     * @example "https://api.x.ai"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for HuggingFace provider (optional)
   * @example { apiKey: "hf_...abc" }
   */
  huggingface?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for HuggingFace
     * @example "hf_...abc"
     */
    apiKey: string;
    /**
     * Base URL for HuggingFace API (optional)
     * @example "https://api-inference.huggingface.co/models"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for SiliconFlow provider (optional)
   * @example { apiKey: "sk-...abc", baseUrl: "https://api.siliconflow.cn" }
   */
  siliconflow?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for SiliconFlow
     * @example "sk-...abc"
     */
    apiKey: string;
    /**
     * Base URL for SiliconFlow API (optional)
     * @example "https://api.siliconflow.cn"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Zhipu AI provider (optional)
   * @example { apiKey: "glm-...abc", baseUrl: "https://open.bigmodel.cn" }
   */
  zhipu?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Zhipu AI
     * @example "glm-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Zhipu AI API (optional)
     * @example "https://open.bigmodel.cn"
     */
    baseUrl?: string;
  };
  /**
   * Configuration for Qwen provider (optional)
   * @example { apiKey: "sk-...abc", baseUrl: "https://dashscope.aliyuncs.com" }
   */
  qwen?: {
    /** System-wide enable or disable provider  */
    enabled?: boolean;
    /**
     * API key for Qwen
     * @example "sk-...abc"
     */
    apiKey: string;
    /**
     * Base URL for Qwen API (optional)
     * @example "https://dashscope.aliyuncs.com"
     */
    baseUrl?: string;
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
 * Represents a type of enhancement that can be applied to prompts.
 * @developerNotes Defines available enhancement operations with their system prompts.
 * @example
 * ```typescript
 * const enhancement: EnhancementType = {
 *   id: "enhance",
 *   name: "Enhance",
 *   description: "Improve the clarity and structure of the prompt",
 *   systemPrompt: "You are a helpful assistant that enhances prompts..."
 * };
 * ```
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
 * Represents a user role that can be assigned to prompts.
 * @developerNotes Defines user personas that influence AI response context and style.
 * @example
 * ```typescript
 * const role: UserRole = {
 *   id: "developer",
 *   name: "Developer",
 *   description: "Technical expert who understands code and systems",
 *   systemPrompt: "You are a helpful assistant that understands technical concepts..."
 * };
 * ```
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
