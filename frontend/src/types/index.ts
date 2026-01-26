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
 * Represents the format of the response from an AI prompt processing request.
 */
export type ResponseOutputFormat = 'json' | 'markdown' | 'text' | 'html' | 'xml' | 'yaml';

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
  responseLength?: string;
  /**
   * Additional user instructions for the AI
   * @developerNotes Allows for specific formatting or content requirements beyond standard options
   * @example "Include code examples"
   */
  customInstructions?: string;
  /**
   * Parameters for the enhancement type
   * @example { "complexity": 5, "focus": "performance" }
   */
  enhancementParameters?: Record<string, string>;
  /**
   * Output format for the enhanced response
   * @example 'markdown'
   */
  format?: ResponseOutputFormat;
  /**
   * Timestamp when the request was made
   * @example "2023-05-15T10:30:00Z"
   */
  timestamp?: string;
  /**
   * Additional metadata for the request
   * @example { requestId: "req_123", userId: "user_abc" }
   */
  metadata?: {
    requestId?: string;
    userId?: string;
    timestamp?: string;
  };
  /**
   * Whether the request is off-the-record (not stored in the history)
   * @example false
   */
  offTheRecord?: boolean;
  /** Top-p sampling parameter */
  topP?: number;
  /** Top-k sampling parameter */
  topK?: number;
  /** Stop sequences for generation */
  stopSequences?: string[];
  /** Frequency penalty parameter */
  frequencyPenalty?: number;
  /** Presence penalty parameter */
  presencePenalty?: number;
  /** Conversation ID for context */
  conversationId?: string;
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
  /** Additional metadata */
  metadata?: {
    [key: string]: any;
    /** Model-specific details */
    modelDetails?: any;
    /** Total generation duration */
    totalDuration?: number;
    /** Evaluation duration */
    evalDuration?: number;
    /** Context length used */
    contextLength?: number;
    /** Streaming flag */
    streaming?: boolean;
  };
}

/**
 * Represents the possible output format names as keys of the `OutputFormat` enum.
 * @example
 * type Example = OutputFormatName; // 'JSON', 'HTML', 'XML', etc.
 * @developerNotes This type is automatically generated from the `OutputFormat` enum and ensures type safety when working with format keys.
 */
export type OutputFormatName =
  | 'json'
  | 'markdown'
  | 'text'
  | 'html'
  | 'xml'
  | 'yaml'
  | string;

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
  /** Unique identifier for the history entry, auto-generated */
  id: string;
  /** The AI prompt used to generate the response */
  aiPrompt: string;
  /** The original, unmodified prompt text provided by the user */
  originalPrompt: string;
  /** The AI-enhanced or processed version of the prompt */
  enhancedPrompt: string;
  /** The AI model name/identifier used for enhancement (e.g., "gpt-4", "claude-3") */
  model: string;
  /** The type of enhancement applied (e.g., "grammar", "style", "expansion") */
  enhancementType: string;
  /** The role or category of the user making the request (e.g., "developer", "content-writer") */
  userRole: string;
  /** The system prompt used for the request */
  systemPrompt?: string;
  /** Optional AI service provider name (e.g., "OpenAI", "Anthropic", "Google") */
  provider?: string;
  /** Exact date and time when the prompt was processed */
  timestamp: Date;
  /** Number of tokens consumed during processing, if available */
  tokensUsed?: number;
  /** Time taken to process the prompt in milliseconds */
  processingTime: number;
  /** Temperature setting for randomness in output (0-1) */
  temperature?: number;
  /** Maximum tokens allowed in the response */
  maxTokens?: number;
  /** Rating given to the response (1-5) */
  rating: number;
  /** Any additional notes about the response */
  notes: string | null;
  /** The target audience for the response (e.g., "beginner", "intermediate", "expert") */
  targetAudience?: string | null;
  /** The tone of the response (e.g., "formal", "informal", "neutral") */
  tone?: string | null;
  /** The length of the response (e.g., "short", "medium", "long") */
  responseLength?: string | null;
  /** The style of the response (e.g., "formal", "informal", "neutral") */
  customInstructions?: string | null;
  /** The output format of the response (e.g., "text", "markdown", "html") */
  format?: OutputFormatName | null;
  /** Additional metadata about the request */
  metadata?: Record<string, any> | null;
  /** Parameters used for AI enhancement */
  enhancementParameters?: Record<string, any> | null;
  /** Parameters for controlling the AI model's behavior */
  topP?: number | null;
  /** The top-k parameter for AI model */
  topK?: number | null;
  /** The logit bias parameter for AI model */
  logitBias?: Record<string, number> | null;
  /** The stop sequences for AI model */
  stopSequences?: string[] | null;
  /** The penalty for repetition in AI model's output */
  frequencyPenalty?: number | null;
  /** The penalty for non-repetition in AI model's output */
  presencePenalty?: number | null;
  /** Unique conversation identifier */
  conversationId?: string | null;
  /** Statistics about the history */
  stats: {
    /** Text data statistics */
    textData: { name: string; value: number }[];
    /** Token data statistics */
    tokenStats: { name: string; value: number; fill: string }[];
  };
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
  /** Array specifying the order in which UI components should be rendered. */
  componentOrder?: string[];
  /** The visibility state of UI components in a configuration panel. */
  visibleComponents?: VisibleComponents;
  /** The target audience for the AI-generated content */
  targetAudience?: string;
  /** The desired tone of the AI response */
  tone?: string;
  /** @example "Long" * @developerNotes Set to control the verbosity of the output */
  responseLength?: string;
  /** Custom instructions for the AI model to follow */
  customInstructions?: string;
  /** Additional parameters to enhance the AI model's output */
  enhancementParameters?: Record<string, string>;
  /** The output format preference for the AI response */
  format?: ResponseOutputFormat;
  /** Whether the AI response should be marked as "off-the-record" */
  offTheRecord?: boolean;
  /** The top-p parameter for controlling response diversity */
  topP?: number;
  /** The top-k parameter for limiting token selection */
  topK?: number;
  /** Sequences that the AI should stop generating output after */
  stopSequences?: string[];
  /** The frequency penalty parameter to reduce repetition */
  frequencyPenalty?: number;
  /** The presence penalty parameter to influence token selection */
  presencePenalty?: number;
  /** Whether to show deep text analysis in the UI */
  showDeepTextAnalysis: boolean;
  /** Whether to show prompt statistics in the UI */
  showPromptStats: boolean;
  // Provider specific configuration objects
  /** Configuration for the Ollama AI provider */
  ollama?: AIProviderConfig;
  /** Configuration for the OpenAI AI provider */
  openai?: AIProviderConfig;
  /** Configuration for the OpenRouter AI provider */
  openrouter?: AIProviderConfig;
  /** Configuration for the DeepSeek AI provider */
  deepseek?: AIProviderConfig;
  /** Configuration for the Coze AI provider */
  coze?: AIProviderConfig;
  /** Configuration for the Qianfan AI provider */
  qianfan?: AIProviderConfig;
  /** Configuration for the Gemini AI provider */
  gemini?: AIProviderConfig;
  /** Configuration for the Kimi AI provider */
  kimi?: AIProviderConfig;
  /** Configuration for the Groq AI provider */
  groq?: AIProviderConfig;
  /** Configuration for the Anthropic AI provider */
  anthropic?: AIProviderConfig;
  /** Configuration for the Mistral AI provider */
  mistral?: AIProviderConfig;
  /** Configuration for the NVIDIA AI provider */
  nvidia?: AIProviderConfig;
  /** Configuration for the Cohere AI provider */
  cohere?: AIProviderConfig;
  /** Configuration for the Cody AI provider */
  cody?: AIProviderConfig;
  /** Configuration for the XAI AI provider */
  xai?: AIProviderConfig;
  /** Configuration for the Hugging Face AI provider */
  huggingface?: AIProviderConfig;
  /** Configuration for the SiliconFlow AI provider */
  siliconflow?: AIProviderConfig;
  /** Configuration for the GLM AI provider */
  glm?: AIProviderConfig;
  /** Configuration for the LM Studio AI provider */
  lmstudio?: AIProviderConfig;
  /** Sidebar is expanded or not */
  sidebarOpen?: boolean;
}

/**
 * Represents a type of enhancement with its properties, metadata, and performance metrics.
 * @example
 * const exampleEnhancement: EnhancementType = {
 *   id: 'enhance-001',
 *   key: 'summarize',
 *   name: 'Text Summarization',
 *   shortDescription: 'Summarizes long texts into concise summaries.',
 *   longDescription: 'This enhancement uses advanced NLP techniques to generate accurate and concise summaries of long documents.',
 *   systemPrompt: 'Please summarize the following text:',
 *   category: 'Text Processing',
 *   parameters: { summaryLength: 150 },
 *   chainingEnabled: true,
 *   templateVariables: ['{{text}}'],
 *   dependencies: ['enhance-002'],
 *   metadata: { version: '1.0.0', author: 'Jane Doe', updated: '2023-10-05T14:48:00Z' },
 *   tags: ['summarize', 'nlp'],
 *   complexity: 'medium',
 *   experimental: false,
 *   exampleUsage: 'Used to generate summaries for articles and reports.',
 *   performance: { estimatedProcessingTime: 200, tokenUsage: 500, complexityScore: 7 },
 *   hidden: false,
 * };
 * @developerNotes This interface is used across the system to manage and categorize enhancements. All properties are required unless noted otherwise.
 */
export interface EnhancementType {
  /** Unique identifier for the enhancement type */
  id: string;
  /** A unique key used as a reference for the enhancement type */
  key: string;
  /** Display name for the enhancement type */
  name: string;
  /** A brief description of the enhancement's purpose or functionality */
  shortDescription: string;
  /** A detailed description of the enhancement's purpose, functionality, and use cases */
  longDescription: string;
  /** A system-level instruction or prompt used to guide the enhancement's execution */
  systemPrompt: string;
  /** Category for grouping similar types of enhancements */
  category: string;
  /** A dynamic set of parameters that can be configured for the enhancement */
  parameters: Record<string, unknown>;
  /** Whether this enhancement can be chained with other enhancements */
  chainingEnabled: boolean;
  /** Variables used in templates for dynamic content generation */
  templateVariables: string[];
  /** A list of other enhancement types this enhancement depends on */
  dependencies: string[];
  /** Metadata associated with the enhancement type */
  metadata: {
    /** Version of the enhancement type */
    version: string;
    /** Author of the enhancement type */
    author: string;
    /** Last updated date in ISO 8601 format */
    updated: string; // ISO date string
  };
  /** Keywords or tags for categorization and search purposes */
  tags: string[];
  /** A string indicating the complexity level of the enhancement */
  complexity: string;
  /** Whether this enhancement is marked as experimental and may be unstable */
  experimental: boolean;
  /** A brief example of how the enhancement can be used in practice */
  exampleUsage: string;
  /** Performance metrics for the enhancement */
  performance: {
    /** Estimated processing time in milliseconds */
    estimatedProcessingTime: number;
    /** Estimated token usage for the enhancement */
    tokenUsage: number;
    /** A numerical score representing the complexity of the enhancement */
    complexityScore: number;
  };
  /** Whether this enhancement is hidden from the user interface or listings */
  hidden: boolean;
}

/**
 * Represents a tone style or voice that can be applied to text generation.
 * @example
 * const exampleTone: Tone = {
 *   id: 1,
 *   key: 'professional',
 *   name: 'Professional',
 *   category: 'Tone',
 *   shortDescription: 'Formal and objective tone for business contexts.',
 *   summary: 'Used for reports, proposals, and professional communication.',
 *   description: 'Emphasizes clarity, precision, and formal structure.',
 *   parameters: { grammar: 'strict', contractions: false, vocabulary: 'formal' },
 *   tags: ['business', 'formal'],
 *   formality: 'high',
 *   hidden: false,
 * };
 * @developerNotes All properties are required. The `parameters` object defines how the tone is applied (e.g., grammar rules, vocabulary).
 */
export interface Tone {
  /** Unique numeric identifier for the tone */
  id: number;
  /** A unique key used as a reference for the tone */
  key: string;
  /** Display name for the tone */
  name: string;
  /** Category for grouping similar tones */
  category: string;
  /** A brief description of the tone's purpose or style */
  shortDescription: string;
  /** A summary of the tone's primary use cases or context */
  summary: string;
  /** A detailed description of the tone's characteristics and applications */
  description: string;
  /** Configuration options for how the tone is applied (e.g., grammar, vocabulary) */
  parameters: {
    /** Grammar rules to apply (e.g., 'strict', 'relaxed') */
    grammar: string;
    /** Whether contractions (e.g., "don't") are allowed */
    contractions: boolean;
    /** Vocabulary style (e.g., 'formal', 'colloquial') */
    vocabulary: string;
  };
  /** Keywords or tags for categorization and search purposes */
  tags: string[];
  /** Indicates the level of formality (e.g., 'high', 'medium', 'low') */
  formality: string;
  /** Whether the tone is hidden from the user interface or listings */
  hidden: boolean;
}

/**
 * Represents a response length configuration for text generation.
 * @example
 * const exampleResponseLength: ResponseLength = {
 *   id: 2,
 *   key: 'concise',
 *   name: 'Concise',
 *   category: 'Length',
 *   shortDescription: 'Short and to-the-point responses.',
 *   summary: 'Ideal for summaries or quick answers.',
 *   description: 'Limits response length to ensure clarity and brevity.',
 *   parameters: { maxLength: 150, style: 'direct' },
 *   tags: ['summary', 'brief'],
 *   tone: 'professional',
 *   hidden: false,
 * };
 * @developerNotes The `tone` field references a `Tone` interface's `key` value. All properties are required.
 */
export interface ResponseLength {
  /** Unique numeric identifier for the response length */
  id: number;
  /** A unique key used as a reference for the response length */
  key: string;
  /** Display name for the response length */
  name: string;
  /** Category for grouping similar response lengths */
  category: string;
  /** A brief description of the response length's purpose or style */
  shortDescription: string;
  /** A summary of the response length's primary use cases or context */
  summary: string;
  /** A detailed description of the response length's characteristics and applications */
  description: string;
  /** Configuration options for how the response length is applied (e.g., max character count) */
  parameters: {
    /** Maximum length of the response in characters or tokens */
    maxLength: number;
    /** Style of the response (e.g., 'direct', 'detailed') */
    style: string;
  };
  /** Keywords or tags for categorization and search purposes */
  tags: string[];
  /** References a `Tone` interface's `key` value to apply a specific tone */
  tone: string;
  /** Whether the response length is hidden from the user interface or listings */
  hidden: boolean;
}

export interface TargetAudience {
  key: string;
  /** The display name or title of this value */
  label: string;
  /** A more detailed summary than `shortDescription`, but less than `description` */
  summary: string;
  /** A full explanation or detailed description of this value */
  description: string;
  /** An array of strings representing relevant tags or keywords for this value */
  tags: string[];
  /** The category or group belongs to */
  category: string;
  /** Whether the response length is hidden from the user interface or listings */
  hidden: boolean;
}

/**
 * Represents a user role with specific capabilities, constraints, and behavior.
 * @example
 * const exampleUserRole: UserRole = {
 *   id: 'role-001',
 *   name: 'Legal Analyst',
 *   shortDescription: 'Analyzes legal documents and provides summaries.',
 *   longDescription: 'A role designed to review and summarize legal texts with high accuracy.',
 *   systemPrompt: 'Analyze the provided legal document and summarize key points.',
 *   category: 'Legal',
 *   hidden: false,
 *   expertiseLevel: 'Senior',
 *   tone: ['professional', 'formal'],
 *   capabilities: ['summarize', 'analyze', 'highlight'],
 *   tags: ['legal', 'analysis'],
 *   constraints: ['must not generate opinions', 'must use formal language'],
 *   tools: ['documentParser', 'legalDatabase'],
 *   temperature: 0.7,
 *   version: '1.0.0',
 * };
 * @developerNotes The `expertiseLevel` is typically one of "Junior", "Mid", or "Senior". The `temperature` should be a float between 0 and 1.
 */
export interface UserRole {
  /** Unique string identifier for the user role */
  id: string;
  key: string;
  /** Display name for the user role */
  name: string;
  /** A brief description of the role's purpose or responsibilities */
  shortDescription: string;
  /** A detailed description of the role's capabilities and use cases */
  longDescription: string;
  /** A system-level instruction or prompt used to guide the role's behavior */
  systemPrompt: string;
  /** Category for grouping similar roles */
  category: string;
  /** Whether the role is hidden from the user interface or listings */
  hidden: boolean;
  /** Indicates the expertise level of the role (e.g., "Junior", "Mid", "Senior */
  expertiseLevel: string;
  /** Array of tone keys (from `Tone`) to apply to the role's output */
  tone: string[];
  /** List of capabilities or functions the role can perform */
  capabilities: string[];
  /** Keywords or tags for categorization and search purposes */
  tags: string[];
  /** Constraints or rules the role must follow */
  constraints: string[];
  /** Tools or systems the role can access or use */
  tools: string[];
  /** Temperature parameter for controlling output randomness (0 to 1 */
  temperature: number;
  /** Version of the user role configuration */
  version: string;
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

/**
 * Interface representing the visibility state of UI components in a configuration panel.
 * Controls which settings or controls are shown to the user based on their role or needs.
 * @example { provider: true, model: true, temperature: false, maxTokens: true }
 * @developerNotes Use this interface to conditionally render UI elements based on user permissions or feature flags.
 * @interface VisibleComponents
 */
export interface VisibleComponents {
  /** Whether the enhancement options component is visible */
  enhancement: boolean;
  /** Whether the temperature parameter component is visible */
  temperature: boolean;
  /** Whether the maximum tokens parameter component is visible */
  maxTokens: boolean;
  /** Whether the target audience selection component is visible */
  targetAudience: boolean;
  /** Whether the tone selection component is visible */
  tone: boolean;
  /** Whether the response length parameter component is visible */
  responseLength: boolean;
  /** Whether the custom instructions input component is visible */
  customInstructions: boolean;
  /** Whether the enhancement parameters component is visible */
  enhancementParameters: boolean;
  /** Whether the output format selection component is visible */
  format: boolean;
  /** Whether the 'off-the-record' privacy toggle is visible */
  offTheRecord: boolean;
  /** Whether the top-p parameter component is visible */
  topP: boolean;
  /** Whether the top-k parameter component is visible */
  topK: boolean;
  /** Whether the stop sequences input component is visible */
  stopSequences: boolean;
  /** Whether the frequency penalty parameter component is visible */
  frequencyPenalty: boolean;
  /** Whether the presence penalty parameter component is visible */
  presencePenalty: boolean;
  /** Whether the status indicator component is visible */
  status: boolean;
}

/**
 * Minimal statistics for a history entry.
 * @developerNotes The `avgRating` and `avgTime` properties are optional and can be omitted if not applicable.
 */
export interface HistoryMinimalStats {
  stats: {
    /**
     * Total number of prompts processed within the tracked timeframe.
     * This represents a raw count of all user interactions with the AI model.
     *
     * Example: 150 prompts processed in the last 24 hours
     */
    totalPrompts: number;

    /**
     * Total number of tokens consumed by all prompts during the tracked period.
     * Tokens represent the number of words or subwords processed by the model.
     *
     * Example: 50,000 tokens used in the last week
     */
    totalTokens: number;

    /**
     * Average rating given to prompts by users, calculated as a weighted average.
     * Ratings are typically on a scale from 1 to 5, with higher values indicating better performance.
     *
     * Example: 4.2 average rating (out of 5) for the last 100 prompts
     */
    avgRating: number;

    /**
     * Average time taken to process a prompt, measured in milliseconds.
     * This metric helps identify performance bottlenecks in the system.
     *
     * Example: 250ms average processing time for the last 500 prompts
     */
    avgProcessingTime: number;

    /**
     * The AI model that was most frequently used during the tracked period.
     * This helps identify the dominant model in the system's workload.
     *
     * Example: "gpt-3.5-turbo" as the top model used 75% of the time
     */
    topModel: string;

    /**
     * Number of active conversations currently being processed by the system.
     * This metric is useful for monitoring real-time system load.
     *
     * Example: 12 active conversations in progress
     */
    activeConvos: number;
  };

  charts: {
    /**
     * Trend data for time-series visualizations (e.g., line charts).
     * Each entry represents a specific date and associated metrics.
     *
     * Example Usage:
     * [
     *   { date: "2023-10-01", tokens: 15000, count: 200 },
     *   { date: "2023-10-02", tokens: 18000, count: 250 }
     * ]
     */
    trendData: {
      /**
       * Date string in ISO 8601 format (YYYY-MM-DD).
       * Represents the timeframe for the associated metrics.
       */
      date: string;

      /**
       * Total number of tokens processed on the given date.
       * This is a cumulative value for the day.
       */
      tokens: number;

      /**
       * Number of prompts processed on the given date.
       * This represents a raw count of interactions.
       */
      count: number;
    }[];

    /**
     * Bar chart data for comparing different models or categories.
     * Each entry represents a model and its associated metric.
     *
     * Example Usage:
     * [
     *   { model: "gpt-3.5-turbo", count: 75 },
     *   { model: "gpt-4", count: 25 }
     * ]
     */
    barData: {
      /**
       * Name of the AI model or category being compared.
       * This should match the model identifiers used in the system.
       */
      model: string;

      /**
       * Numeric value representing the metric being compared.
       * This could be a count, percentage, or any quantitative measure.
       */
      count: number;
    }[];

    /**
     * Pie chart data for showing proportions of different categories.
     * Each entry represents a category and its corresponding value.
     *
     * Example Usage:
     * [
     *   { name: "High Priority", value: 45 },
     *   { name: "Medium Priority", value: 35 },
     *   { name: "Low Priority", value: 20 }
     * ]
     */
    pieData: {
      /**
       * Name of the category or segment being represented.
       * This should be a human-readable label for the pie chart.
       */
      name: string;

      /**
       * Numeric value representing the size of the segment.
       * This value is typically a percentage or proportional value.
       */
      value: number;
    }[];
  };
}
