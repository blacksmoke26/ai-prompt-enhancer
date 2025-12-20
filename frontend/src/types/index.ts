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
 * Represents the configuration object for an AI provider, containing optional settings like API key, base URL, and timeout.
 * Example: `{ enabled: true, apiKey: 'your-api-key', baseUrl: 'https://api.example.com/v1', timeout: 30000 }`.
 *
 * @interface AIProviderConfig
 *
 * Developer Notes:
 * - The `[key: string]: any` index signature allows dynamic property handling for extended configurations.
 * - All properties are optional; developers can include only the settings they need.
 * - `enabled` acts as a toggle to activate or deactivate the provider.
 */
export interface AIProviderConfig {
  [key: string]: any;
  /** Whether the AI provider is enabled or disabled */
  enabled?: boolean;
  /** The API key for authenticating requests to the AI provider */
  apiKey?: string;
  /** The base URL of the AI provider's API endpoint */
  baseUrl?: string;
  /** The timeout duration (in milliseconds) for API requests */
  timeout?: number;
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
  /** Provider title */
  caption: string;
  /** Name of the AI service provider */
  name: string;
  /** List of available models from this provider */
  models: AIModel[];
  /** Whether the provider is properly configured */
  isConfigured?: boolean;
  /** Provider-specific configuration settings */
  config?: AIProviderConfig;
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
  /** Selected intelligent word analysis frequency */
  wordFrequency?: 'all' | 'high' | 'medium' | 'low' | 'complex';
  // Provider specific configuration objects
  ollama?: AIProviderConfig;
  openai?: AIProviderConfig;
  openrouter?: AIProviderConfig;
  deepseek?: AIProviderConfig;
  coze?: AIProviderConfig;
  qianfan?: AIProviderConfig;
  gemini?: AIProviderConfig;
  kimi?: AIProviderConfig;
  groq?: AIProviderConfig;
  anthropic?: AIProviderConfig;
  mistral?: AIProviderConfig;
  nvidia?: AIProviderConfig;
  cohere?: AIProviderConfig;
  cody?: AIProviderConfig;
  xai?: AIProviderConfig;
  huggingface?: AIProviderConfig;
  siliconflow?: AIProviderConfig;
  glm?: AIProviderConfig;
  lmstudio?: AIProviderConfig;
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
  /** Whether this enhancement type is hidden from the UI */
  hidden: boolean;
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
  /** Whether this user role is hidden from the UI */
  hidden: boolean;
}

/**
 * Aggregated statistics about prompt enhancement history.
 * @example
 * const stats: HistoryStats = {
 *   totalItems: 150,
 *   totalTokensUsed: 45000,
 *   averageProcessingTime: 1.2,
 *   mostUsedModel: "gpt-4",
 *   mostUsedEnhancementType: "enhance",
 *   providerUsage: [
 *     { provider: "OpenAI", model: "gpt-4", count: 50 },
 *     { provider: "Anthropic", model: "claude-3", count: 30 }
 *   ],
 *   mostUsedRoles: [
 *     { role: "professional", count: 45 },
 *     { role: "creative", count: 35 }
 *   ],
 *   totalWords: 12000,
 *   totalLines: 800,
 *   totalChars: 65000,
 *   averageTokensUsed: 300,
 *   maxTokensUsed: 1200,
 *   averageRating: 4.2,
 *   topRatedEntries: 25,
 *   averageTemperature: 0.7,
 *   temperatureDistribution: [
 *     { range: "0.0-0.3", count: 20 },
 *     { range: "0.4-0.7", count: 50 },
 *     { range: "0.8-1.0", count: 30 }
 *   ],
 *   enhancementFrequency: [
 *     { type: "enhance", count: 60, percentage: 40 },
 *     { type: "summarize", count: 45, percentage: 30 }
 *   ],
 *   modelPerformance: [
 *     { model: "gpt-4", avgProcessingTime: 1.2, totalUsage: 50 },
 *     { model: "claude-3", avgProcessingTime: 1.5, totalUsage: 30 }
 *   ],
 *   roleModelDistribution: [
 *     { role: "professional", model: "gpt-4", count: 25 },
 *     { role: "creative", model: "gpt-4", count: 15 }
 *   ],
 *   dateRange: {
 *     earliest: new Date("2023-01-01"),
 *     latest: new Date("2023-12-31")
 *   },
 *   peakUsageHour: { hour: 14, count: 35 },
 *   monthlyUsage: [
 *     { month: "January", count: 10 },
 *     { month: "February", count: 15 }
 *   ],
 *   averageMaxTokens: 400,
 *   minTokensUsed: 50,
 *   promptEnhancementRatio: 0.75,
 *   systemPromptUsage: {
 *     used: 110,
 *     notUsed: 40,
 *     percentage: 73.3
 *   },
 *   ratingDistribution: [
 *     { rating: 5, count: 30, percentage: 20 },
 *     { rating: 4, count: 40, percentage: 26.7 },
 *     { rating: 3, count: 35, percentage: 23.3 },
 *     { rating: 2, count: 15, percentage: 10 },
 *     { rating: 1, count: 10, percentage: 6.7 }
 *   ],
 *   costAnalysis: {
 *     totalEstimatedCost: 125.5,
 *     avgCostPerRequest: 0.83
 *   },
 *   weeklyUsage: [
 *     { week: "Week 1", count: 15 },
 *     { week: "Week 2", count: 20 }
 *   ],
 *   longestPrompt: {
 *     originalLength: 500,
 *     enhancedLength: 750,
 *     ratio: 1.5
 *   },
 *   shortestPrompt: {
 *     originalLength: 20,
 *     enhancedLength: 30,
 *     ratio: 1.5
 *   },
 *   averagePromptLength: {
 *     original: 80,
 *     enhanced: 120
 *   },
 *   mostEfficientModel: {
 *     model: "gpt-4",
 *     avgProcessingTime: 1.2,
 *     avgTokensPerMs: 0.25
 *   },
 *   preferredTimeSlots: [
 *     { hour: 9, count: 15, percentage: 10 },
 *     { hour: 14, count: 35, percentage: 23.3 }
 *   ],
 *   enhancementTypeEfficiency: [
 *     { type: "enhance", avgProcessingTime: 1.2, avgTokensUsed: 300, successRate: 0.95 },
 *     { type: "summarize", avgProcessingTime: 0.8, avgTokensUsed: 200, successRate: 0.9 }
 *   ],
 *   metaFieldUsage: {
 *     withMeta: 80,
 *     withoutMeta: 70,
 *     percentage: 53.3
 *   }
 * };
 * @developerNote
 * Useful for analytics and tracking usage patterns.
 */
export interface HistoryStats {
  /** Total number of history items */
  totalItems: number;
  /** Total tokens used across all history items */
  totalTokensUsed: number;
  /** Average processing time in seconds */
  averageProcessingTime: number;
  /** Most frequently used model */
  mostUsedModel: string;
  /** Most frequently used enhancement type */
  mostUsedEnhancementType: string;
  /** Usage statistics by provider and model */
  providerUsage: { provider: string; model: string; count: number }[];
  /** Most frequently used user roles */
  mostUsedRoles: { role: string; count: number }[];
  /** Total number of words in all prompts */
  totalWords: number;
  /** Total number of lines in all prompts */
  totalLines: number;
  /** Total number of characters in all prompts */
  totalChars: number;
  /** Average tokens used per request */
  averageTokensUsed: number;
  /** Maximum tokens used in a single request */
  maxTokensUsed: number;
  /** Average rating given to enhancements */
  averageRating: number;
  /** Number of top-rated entries (e.g., 5-star ratings) */
  topRatedEntries: number;
  /** Average temperature setting used */
  averageTemperature: number;
  /** Distribution of temperature settings used */
  temperatureDistribution: { range: string; count: number }[];
  /** Frequency of enhancement types used */
  enhancementFrequency: { type: string; count: number; percentage: number }[];
  /** Performance metrics for each model */
  modelPerformance: { model: string; avgProcessingTime: number; totalUsage: number }[];
  /** Distribution of roles used with models */
  roleModelDistribution: { role: string; model: string; count: number }[];
  /** Date range of history items */
  dateRange: { earliest: Date; latest: Date };
  /** Hour with peak usage */
  peakUsageHour: { hour: number; count: number };
  /** Usage statistics by month */
  monthlyUsage: { month: string; count: number }[];
  /** Average maximum tokens allowed */
  averageMaxTokens: number;
  /** Minimum tokens used in a request */
  minTokensUsed: number;
  /** Ratio of enhanced prompts to original prompts */
  promptEnhancementRatio: number;
  /** Usage statistics for system prompts */
  systemPromptUsage: { used: number; notUsed: number; percentage: number };
  /** Distribution of ratings given */
  ratingDistribution: { rating: number; count: number; percentage: number }[];
  /** Cost analysis data */
  costAnalysis: { totalEstimatedCost: number; avgCostPerRequest: number };
  /** Usage statistics by week */
  weeklyUsage: { week: string; count: number }[];
  /** Longest prompt in history */
  longestPrompt: { originalLength: number; enhancedLength: number; ratio: number };
  /** Shortest prompt in history */
  shortestPrompt: { originalLength: number; enhancedLength: number; ratio: number };
  /** Average length of prompts */
  averagePromptLength: { original: number; enhanced: number };
  /** Most efficient model based on processing time and tokens */
  mostEfficientModel: { model: string; avgProcessingTime: number; avgTokensPerMs: number };
  /** Preferred time slots for usage */
  preferredTimeSlots: { hour: number; count: number; percentage: number }[];
  /** Efficiency metrics for each enhancement type */
  enhancementTypeEfficiency: {
    type: string;
    avgProcessingTime: number;
    avgTokensUsed: number;
    successRate: number
  }[];
  /** Usage statistics for meta fields */
  metaFieldUsage: { withMeta: number; withoutMeta: number; percentage: number };
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
