/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Represents the format of the response from an AI prompt processing request.
 */
export type ResponseOutputFormat = 'json' | 'markdown' | 'text' | 'html' | 'xml' | 'yaml';

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
   * The AI prompt used for processing
   * @example "Explain quantum computing in simple terms..."
   */
  aiPrompt?: string;
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
 * System prompt components structure
 * Contains the full system prompt and its constituent parts for debugging and analysis
 *
 * @example
 * const components: SystemPromptComponents = {
 *   fullPrompt: 'You are a helpful AI assistant. You are a grammar expert...',
 *   rolePrompt: 'You are a helpful AI assistant',
 *   enhancementPrompt: 'You are a grammar expert...',
 *   source: {
 *     enhancementType: 'enhance',
 *     userRole: 'admin',
 *     fallbackUsed: false
 *   },
 *   metadata: {
 *     createdAt: '2025-01-01T12:00:00Z',
 *     version: '1.0.0'
 *   }
 * };
 */
export interface SystemPromptComponents {
  /** The complete combined system prompt */
  fullPrompt: string;
  /** The role-specific prompt component */
  rolePrompt: string;
  /** The enhancement-specific prompt component */
  enhancementPrompt: string;
  /** Source information for debugging */
  source: {
    /** The enhancement type key used */
    enhancementType: string;
    /** The user role key used */
    userRole: string;
    /** Whether fallback prompts were used */
    fallbackUsed: boolean;
    /** Original request ID if available */
    requestId?: string;
  };
  /** Optional metadata about the prompt */
  metadata?: {
    /** When the prompt was generated */
    createdAt?: string;
    /** Version or hash of the prompt */
    version?: string;
    /** Cache hit/miss information */
    cacheInfo?: {
      cached: boolean;
      cacheKey?: string;
    };
  };
}

/**
 * Validation rule interface for input validation
 */
export interface ValidationRule {
  /** Whether the field is required */
  required?: boolean;
  /** Maximum length for string fields */
  maxLength?: number;
  /** Minimum length for string fields */
  minLength?: number;
  /** Regular expression pattern for validation */
  pattern?: RegExp | null;
  /** Allowed values for enumeration fields */
  allowedValues?: string[];
  /** Minimum numeric value */
  min?: number;
  /** Maximum numeric value */
  max?: number;
  /** Custom error message */
  errorMessage?: string;
}

/**
 * Validation result interface for batch validation
 */
export interface ValidationResult {
  /** Number of valid requests */
  validCount: number;
  /** Number of invalid requests */
  invalidCount: number;
  /** Array of valid requests */
  validRequests: PromptRequest[];
  /** Array of invalid requests with their errors */
  invalidRequests: Array<{ request: PromptRequest; errors: string[] }>;
  /** Whether all requests are valid */
  isValid: boolean;
  /** Combined error messages */
  errors: string[];
}

/**
 * Formatted prompt result interface
 */
export interface FormattedPromptResult {
  /** The formatted prompt string */
  prompt: string;

  /** Metadata about the formatting */
  metadata: {
    /** Provider name */
    provider: string;
    /** Output format used */
    format: ResponseOutputFormat;
    /** Original sanitized text */
    originalText: string;
    /** Timestamp of formatting */
    timestamp: string;
    /** Configuration used */
    config?: Partial<PromptFormatterConfig>;
  };
}

/**
 * Prompt formatter configuration interface
 */
export interface PromptFormatterConfig {
  /** Whether to include metadata headers */
  includeMetadata?: boolean;
  /** Whether to include the original prompt */
  includeOriginalPrompt?: boolean;
  /** Whether to add placeholders */
  addPlaceholders?: boolean;
  /** Whether to perform strict validation */
  strictValidation?: boolean;
  /** Section separator string */
  sectionSeparator?: string;
  /** Maximum length for custom instructions */
  maxCustomInstructionsLength?: number;
}

/**
 * Provider capabilities interface
 * Describes the capabilities of different AI providers for optimization
 *
 * @example
 * const capabilities: ProviderCapabilities = {
 *   provider: 'openai',
 *   maxTokens: 4096,
 *   supportsJsonMode: true,
 *   supportsSystemMessages: true,
 *   supportsFunctions: true,
 *   modelVersions: ['gpt-3.5-turbo', 'gpt-4'],
 *   rateLimits: {
 *     requestsPerMinute: 60,
 *     tokensPerMinute: 100000
 *   }
 * };
 */
export interface ProviderCapabilities {
  /** Provider name identifier */
  provider: string;
  /** Maximum token limit for this provider */
  maxTokens?: number;
  /** Whether the provider supports JSON output mode */
  supportsJsonMode?: boolean;
  /** Whether the provider supports system messages */
  supportsSystemMessages?: boolean;
  /** Whether the provider supports function calling */
  supportsFunctions?: boolean;
  /** Whether the provider supports streaming responses */
  supportsStreaming?: boolean;
  /** Whether the provider supports image inputs */
  supportsImages?: boolean;
  /** Available model versions */
  modelVersions?: string[];
  /** Rate limiting information */
  rateLimits?: {
    /** Requests per minute limit */
    requestsPerMinute?: number;
    /** Tokens per minute limit */
    tokensPerMinute?: number;
    /** Concurrent requests limit */
    concurrentRequests?: number;
  };

  /** Cost information (per token) */
  cost?: {
    /** Input token cost */
    inputCostPerToken?: number;
    /** Output token cost */
    outputCostPerToken?: number;
  };

  /** Special features supported */
  features?: {
    /** Whether the provider supports custom stop sequences */
    customStopSequences?: boolean;
    /** Whether the provider supports log probabilities */
    logProbabilities?: boolean;
    /** Whether the provider supports response caching */
    responseCaching?: boolean;
  };
  /** Provider-specific configuration options */
  config?: Record<string, any>;
  /** Whether the provider supports batch processing */
  supportsBatchProcessing: boolean;
  /** Whether the provider supports function calling */
  supportsFunctionCalling: boolean;
  /** Whether the provider supports conversation history */
  supportsConversationHistory: boolean;
  /** Whether the provider supports image generation */
  supportsImageGeneration: boolean;
  /** Whether the provider supports fine-tuning */
  supportsFineTuning: boolean;
  /** Maximum context length in tokens */
  maxContextLength: number;
  /** Supported output formats */
  supportedFormats: string[];
}

/**
 * Batch prompt request structure
 */
export interface BatchPromptRequest extends Omit<PromptRequest, 'conversationId'> {
  /** Request ID for tracking */
  requestId?: string;
  /** Priority level (1-10) */
  priority?: number;
}

/**
 * Batch prompt response structure
 */
export interface BatchPromptResponse {
  /** Whether the request was successful */
  success: boolean;
  /** Response data if successful */
  response?: PromptResponse;
  /** Error message if failed */
  error?: string;
  /** Original request */
  originalRequest: BatchPromptRequest;
  /** Index in the batch */
  index: number;
}

/**
 * Stream callback interface for real-time responses
 */
export interface StreamCallback {
  (chunk: {
    /** The text chunk received */
    text: string;
    /** Whether this is the final chunk */
    isFinal: boolean;
    /** Additional metadata */
    metadata?: {
      /** Model used */
      model: string;
      /** Token count so far */
      tokenCount: number;
      /** Context length */
      contextLength: number;
      /** Total duration */
      totalDuration?: number;
      /** Evaluation duration */
      evalDuration?: number;
      [key: string]: any;
    };
  }): void | Promise<void>;
}

/**
 * Conversation context structure
 */
export interface ConversationContext {
  /** Role of the message sender */
  role: 'user' | 'assistant' | 'system';
  /** Content of the message */
  content: string;
  /** Timestamp of the message */
  timestamp?: Date;
  /** Message metadata */
  metadata?: {
    [key: string]: any;
    /** Token count */
    tokens?: number;
    /** Model used */
    model?: string;
    /** Whether this was a function call */
    isFunctionCall?: boolean;
  };
}

/**
 * Function definition structure for function calling
 */
export interface FunctionDefinition {
  /** Function name */
  name: string;
  /** Function description */
  description?: string;
  /** Function parameters schema */
  parameters: {
    [key: string]: any;
    /** Parameter type */
    type: string;
    /** Required parameters */
    required?: string[];
    /** Parameter descriptions */
    properties?: {
      [key: string]: {
        type: string;
        description?: string;
        [key: string]: any;
      };
    };
  };
  /** Strict schema validation */
  strict?: boolean;
}

/**
 * Function call result structure
 */
export interface FunctionCallResult {
  /** Function name that was called */
  name: string;
  /** Function arguments */
  arguments: Record<string, any>;
  /** Function result */
  result: any;
  /** Whether the call was successful */
  success: boolean;
  /** Error message if failed */
  error?: string;
  /** Timestamp of the call */
  timestamp: Date;
}

/**
 * Usage metrics structure
 */
export interface UsageMetrics {
  /** Provider name */
  provider: string;
  /** Timestamp of metrics */
  timestamp: number;
  /** Since timestamp (for time ranges) */
  since?: number;
  /** Request statistics */
  requests: {
    /** Total requests */
    total: number;
    /** Successful requests */
    successful: number;
    /** Failed requests */
    failed: number;
  };
  /** Token usage statistics */
  tokens: {
    /** Prompt tokens */
    prompt: number;
    /** Completion tokens */
    completion: number;
    /** Total tokens */
    total: number;
  };
  /** Model usage statistics */
  models: Array<{
    /** Model name */
    name: string;
    /** Usage count */
    usageCount: number;
    /** Last used timestamp */
    lastUsed: number | null;
  }>;
  /** Performance metrics */
  performance: {
    /** Average response time in ms */
    averageResponseTime: number;
    /** 95th percentile response time */
    p95ResponseTime: number;
  };
  /** Storage metrics */
  storage?: {
    /** Total storage size in bytes */
    totalSize: number;
    /** Number of models */
    modelCount: number;
  };
}

/**
 * Health status structure
 */
export interface HealthStatus {
  /** Overall status */
  status: 'healthy' | 'degraded' | 'down';
  /** Provider name */
  provider: string;
  /** Timestamp */
  timestamp: number;
  /** Version information */
  version?: string;
  /** Uptime information */
  uptime?: string;
  /** Service status */
  services: {
    /** API service status */
    api: 'operational' | 'degraded' | 'down' | 'unknown';
    /** Database status */
    database: 'operational' | 'degraded' | 'down' | 'unknown';
    /** Cache status */
    cache: 'operational' | 'degraded' | 'down' | 'unknown';
  };
  /** Resource usage */
  resources: {
    /** CPU usage */
    cpu: string;
    /** Memory usage */
    memory: string;
    /** Disk usage */
    disk: string;
  };
  /** Model statistics */
  models: {
    /** Total models */
    total: number;
    /** Active models */
    active: number;
    /** Loading models */
    loading: number;
  };
  /** Request rate limiting */
  requests: {
    /** Current rate */
    rate: number;
    /** Rate limit */
    limit: string;
    /** Remaining requests */
    remaining: string;
  };
  /** Latency metrics */
  latency: {
    /** 50th percentile latency */
    p50: number;
    /** 95th percentile latency */
    p95: number;
    /** 99th percentile latency */
    p99: number;
  };
  /** Error information */
  error?: string;
}

/**
 * Represents an error response from a stream.
 * @interface
 * @example
 * { error: 'Invalid request', details: { code: 400 } }
 * @note Use this interface to handle errors returned during streaming operations. The `details` field can be used to provide additional context or error codes.
 */
export interface StreamError {
  /**
   * A string describing the error.
   */
  error: string;
  /**
   * Optional additional details about the error.
   */
  details?: any;
}

/**
 * Represents a response from a stream, including message content and metadata.
 * @interface
 * @example
 * { model: 'gpt-3.5', created_at: '2023-09-01T12:34:56Z', message: { role: 'assistant', content: 'Hello!' }, done: true }
 * @note Optional fields may vary depending on the API and stream status. The `done` flag indicates whether the stream has completed.
 */
export interface StreamResponse {
  /**
   * The name of the model used to generate the response.
   */
  model: string;
  /**
   * The timestamp when the response was created.
   */
  created_at: string;
  /**
   * The message content and role.
   */
  message: {
    /**
     * The role of the message sender (e.g., 'user', 'assistant').
     */
    role: string;
    /**
     * The content of the message.
     */
    content: string;
  };
  /**
   * Indicates whether the stream has completed.
   */
  done: boolean;
  /**
   * Total duration of the stream in nanoseconds (if available).
   */
  total_duration?: number;
  /**
   * Duration taken to load the prompt in nanoseconds (if available).
   */
  load_duration?: number;
  /**
   * Number of tokens evaluated in the prompt (if available).
   */
  prompt_eval_count?: number;
  /**
   * Duration taken to evaluate the prompt in nanoseconds (if available).
   */
  prompt_eval_duration?: number;
  /**
   * Number of tokens evaluated in the response (if available).
   */
  eval_count?: number;
  /**
   * Duration taken to evaluate the response in nanoseconds (if available).
   */
  eval_duration?: number;
}
