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
  description: string;
  /** Maximum context window size in tokens */
  contextLength: number;
  /** Maximum number of tokens for output */
  maxTokens: number;
  size: string;
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
   * The main input text to be processed or enhanced.
   * This is the core content that the model will work with.
   * @example "Analyze the dataset and generate a summary"
   */
  text: string;

  /**
   * The system message that sets the context or rules for the model's behavior.
   * This is typically used to define the model's role or constraints.
   * @example "You are a data analyst specializing in financial trends."
   */
  systemPrompt: string;

  /**
   * The desired format of the output. Supported formats include JSON, Markdown,
   * plain text, HTML, XML, YAML, and CSV.
   * @example 'markdown'
   */
  format:
    | 'json'
    | 'markdown'
    | 'text'
    | 'html'
    | 'xml'
    | 'yaml'
    | 'csv'
    | string;

  /**
   * The role the user is playing in the interaction. This defines the context
   * for how the model should interpret and respond to the input.
   * @example 'data scientist'
   */
  userRole?: string;

  /**
   * The type of enhancement or transformation to apply to the input text.
   * This could include summarization, translation, formatting, etc.
   * @example 'summarize'
   */
  enhancementType?: string;

  /**
   * Optional: The AI provider to use (e.g., 'OpenAI', 'Anthropic', 'Google').
   * @example 'Anthropic'
   */
  provider?: string;

  /**
   * Optional: The specific model name or identifier to use.
   * @example 'claude-3-5-sonnet'
   */
  model?: string;

  /**
   * Optional: The target audience for the output content.
   * This influences tone, complexity, and language choices.
   * @example 'technical audience'
   */
  targetAudience?: string;

  /**
   * Optional: The tone of the output (e.g., formal, casual, professional).
   * @example 'professional'
   */
  tone?: string;

  /**
   * Optional: The desired length of the output response.
   * Common values: 'short', 'medium', 'long', 'extensive'.
   * @example 'medium'
   */
  responseLength?: string;

  /**
   * Optional: Custom instructions to supplement the main prompt.
   * These are additional guidelines for the model to follow.
   * @example 'Include a table of key findings'
   */
  customInstructions?: string;

  /**
   * Optional: Controls the randomness of the output.
   * Lower values make the output more deterministic.
   * @default 0.7
   * @example 0.5
   */
  temperature?: number;

  /**
   * Optional: Maximum number of tokens (words) to generate in the output.
   * @example 1024
   */
  maxTokens?: number;

  /**
   * Optional: Controls the diversity of the generated text.
   * Higher values allow for more diverse outputs.
   * @example 0.95
   */
  topP?: number;

  /**
   * Optional: Controls the diversity of the generated text based on token probabilities.
   * @example 50
   */
  topK?: number;

  /**
   * Optional: Penalizes frequent token usage to reduce repetition.
   * @example 0.2
   */
  frequencyPenalty?: number;

  /**
   * Optional: Penalizes new topic introduction to keep the response focused.
   * @example 0.1
   */
  presencePenalty?: number;

  /**
   * Optional: Sequences to stop token generation at.
   * @example ['<END>', '<STOP>']
   */
  stopSequences?: string[];

  /**
   * Optional: Timestamp for tracking when the prompt was created.
   * @example '2023-10-05T14:30:00Z'
   */
  timestamp?: string;

  /**
   * Optional: Unique identifier for the conversation or session.
   * @example 'chat_12345'
   */
  conversationId?: string;

  /**
   * Optional: If true, the response will not be tied to previous interactions.
   * @example true
   */
  offTheRecord?: boolean;

  /**
   * Optional: Custom parameters for the enhancement process.
   * This allows passing arbitrary metadata or configuration.
   * @example { 'theme': 'dark', 'version': '2.1' }
   */
  enhancementParameters?: Record<string, any>;

  /**
   * --- ADVANCED OPTIONAL PARAMETERS ---
   * These parameters allow fine-grained control over the model's output structure,
   * semantic processing, and contextual behavior.
   */

  /**
   * Cognitive & Semantic Control
   * Parameters that influence how the model processes and structures information.
   */

  /**
   * The cognitive load required to understand the content.
   * Options: 'low' (simple concepts), 'medium', 'high' (complex analysis).
   * @example 'medium'
   */
  cognitiveLoad?: 'low' | 'medium' | 'high';

  /**
   * The density of information per concept in the output.
   * Options: 'sparse' (brief), 'balanced', 'dense' (detailed).
   * @example 'balanced'
   */
  informationDensity?: 'sparse' | 'balanced' | 'dense';

  /**
   * The level of abstraction in the content.
   * Options: 'concrete' (specific examples), 'abstract', 'mixed'.
   * @example 'mixed'
   */
  abstractionLevel?: 'concrete' | 'abstract' | 'mixed';

  /**
   * The use of metaphors in the output.
   * Options: 'none', 'light' (occasional), 'heavy' (figurative language).
   * @example 'light'
   */
  metaphorUsage?: 'none' | 'light' | 'heavy';

  /**
   * The tolerance for ambiguity in the content.
   * Options: 'low' (precise), 'medium', 'high' (open-ended).
   * @example 'medium'
   */
  ambiguityTolerance?: 'low' | 'medium' | 'high';

  /**
   * Structural & Syntactic Control
   * Parameters that define the output's structure and language patterns.
   */

  /**
   * The complexity of sentence structures in the output.
   * Options: 'simple', 'compound', 'complex', 'varied'.
   * @example 'varied'
   */
  sentenceStructure?: 'simple' | 'compound' | 'complex' | 'varied';

  /**
   * The flow pattern of paragraphs in the output.
   * Options: 'linear' (sequential), 'circular' (repetitive), 'pyramidal'.
   * @example 'linear'
   */
  paragraphFlow?: 'linear' | 'circular' | 'pyramidal';

  /**
   * The style of lists used in the output.
   * Options: 'bulleted', 'numbered', 'inline', 'none'.
   * @example 'bulleted'
   */
  listStyle?: 'bulleted' | 'numbered' | 'inline' | 'none';

  /**
   * Whether to include a hierarchical structure of headings in the output.
   * @example true
   */
  headingHierarchy?: boolean;

  /**
   * Domain & Context Control
   * Parameters that define the cultural, technical, and regulatory context.
   */

  /**
   * The cultural context to consider when generating the content.
   * @example 'US-West'
   */
  culturalContext?: string;

  /**
   * The specific domain or subject area of the content.
   * @example 'Quantum Physics'
   */
  domainSpecificity?: string;

  /**
   * The level of technical jargon to use.
   * Options: 'none', 'layman', 'professional', 'academic'.
   * @example 'professional'
   */
  technicalJargonLevel?: 'none' | 'layman' | 'professional' | 'academic';

  /**
   * Regulatory compliance requirements for the output.
   * @example ['GDPR', 'HIPAA']
   */
  regulatoryCompliance?: string[];

  /**
   * Emotional & Persuasive Control
   * Parameters that influence the emotional tone and persuasive techniques.
   */

  /**
   * The intensity of emotional expression in the output.
   * Range: 1 (flat) to 10 (passionate).
   * @example 7
   */
  emotionalIntensity?: number;

  /**
   * The persuasion technique to use.
   * Options: 'ethos' (credibility), 'pathos' (emotion), 'logos' (logic), 'kairos' (timing).
   * @example 'logos'
   */
  persuasionTechnique?: 'ethos' | 'pathos' | 'logos' | 'kairos';

  /**
   * The level of empathy to express in the output.
   * Range: 1 (neutral) to 10 (deep empathy).
   * @example 5
   */
  empathyLevel?: number;

  /**
   * Output Constraint Control
   * Parameters that define output formatting and metadata preferences.
   */

  /**
   * The strictness of output formatting constraints.
   * Range: 1 (loose) to 10 (rigid).
   * @example 6
   */
  strictness?: number;

  /**
   * If true, removes all conversational filler and focuses on core content.
   * @example true
   */
  minimalOutput?: boolean;

  /**
   * If true, appends metadata about the reasoning process to the output.
   * @example false
   */
  includeMetadata?: boolean;

  /**
   * The language code for the output (ISO 639-1 standard).
   * @example 'en'
   */
  language?: string;

  /**
   * The character encoding to use for the output.
   * @example 'utf-8'
   */
  encoding?: 'utf-8' | 'ascii';

  /**
   * --- EXPERIENCE PARAMETERS ---
   * Advanced temporal and skill-based parameters that influence the model's
   * reasoning depth, knowledge application, and contextual relevance.
   */

  /**
   * The amount of practical experience the persona should demonstrate.
   * Options: '1 day', '1 week', '1 month', '3 months', '6 months', '1 year', '3 years', '5 years', '10 years', '30 years', '50 years', '100 years', 'expert', 'master', 'nexus'.
   * @example '1 year'
   */
  experience?: '1 day' | '1 week' | '1 month' | '3 months' | '6 months' | '1 year' | '3 years' | '5 years' | '10 years' | '30 years' | '50 years' | '100 years' | 'expert' | 'master' | 'nexus';

  /**
   * The current experience level as a number (for more granular control).
   * Combined with experience, this determines the depth of knowledge and reasoning patterns.
   * @example 5.7
   */
  experienceLevel?: number;

  /**
   * The time horizon for considering long-term consequences and future implications.
   * @example 'short-term'
   */
  timeHorizon?: 'short-term' | 'medium-term' | 'long-term' | 'enterprise' | 'centennial';

  /**
   * The type of domain expertise to focus on.
   * @example 'quantum_computing'
   */
  domainExpertise?: string;

  /**
   * Specific skills or capabilities that define the persona's expertise.
   * @example ['data_analysis', 'machine_learning', 'statistics']
   */
  skills?: string[];

  /**
   * The proficiency level for each skill (0-10 scale).
   * @example { 'data_analysis': 9, 'machine_learning': 8.5 }
   */
  skillProficiency?: Record<string, number>;

  /**
   * The learning curve adjustment (0.0-1.0).
   * Higher values mean the model learns new concepts faster.
   * @example 0.7
   */
  learningCurve?: number;

  /**
   * The retention rate for knowledge (0.0-1.0).
   * Higher values mean information sticks better.
   * @example 0.85
   */
  retentionRate?: number;

  /**
   * The speed of knowledge acquisition (1-100).
   * @example 45
   */
  acquisitionSpeed?: number;

  /**
   * The depth of knowledge (1-10).
   * Determines how thoroughly the model understands concepts.
   * @example 8
   */
  knowledgeDepth?: number;

  /**
   * The breadth of knowledge (1-10).
   * Determines how many related topics the model is familiar with.
   * @example 7
   */
  knowledgeBreadth?: number;

  /**
   * The experience-based reasoning depth (1-10).
   * Higher values indicate more sophisticated reasoning patterns.
   * @example 6
   */
  reasoningDepth?: number;

  /**
   * The type of thinking patterns the persona employs.
   * @example 'synthetic'
   */
  thinkingPattern?: 'linear' | 'synthetic' | 'hierarchical' | 'network' | 'holistic' | 'combinatorial' | 'differential' | 'evolutionary';

  /**
   * The problem-solving approach preference.
   * @example 'analytical'
   */
  problemSolvingApproach?: 'analytical' | 'intuitive' | 'empirical' | 'theoretical' | 'heuristic' | 'algorithmic' | 'adaptive';

  /**
   * The pattern recognition sensitivity (0.0-1.0).
   * Higher values mean the model recognizes patterns more quickly.
   * @example 0.8
   */
  patternRecognitionSensitivity?: number;

  /**
   * The experience-based context sensitivity (0.0-1.0).
   * Higher values mean the model adapts better to context.
   * @example 0.75
   */
  contextSensitivity?: number;

  /**
   * The adaptability to new information (0.0-1.0).
   * Higher values mean the model updates knowledge better.
   * @example 0.9
   */
  adaptability?: number;

  /**
   * The cross-domain knowledge transfer capability (0.0-1.0).
   * Higher values mean the model can apply knowledge across domains.
   * @example 0.65
   */
  crossDomainTransfer?: number;

  /**
   * The focus of expertise (specific domain vs generalist).
   * @example 'specialist'
   */
  expertiseFocus?: 'generalist' | 'specialist' | 'expertise_dominant' | 'comprehensive';

  /**
   * The level of domain specialization (0-10).
   * Higher values mean deeper specialization.
   * @example 9
   */
  domainSpecialization?: number;

  /**
   * The level of lateral thinking capability (0.0-1.0).
   * Higher values mean the model can think outside conventional patterns.
   * @example 0.85
   */
  lateralThinking?: number;

  /**
   * The level of systems thinking capability (0.0-1.0).
   * Higher values mean the model can see interconnected systems.
   * @example 0.8
   */
  systemsThinking?: number;

  /**
   * The level of critical thinking capability (0.0-1.0).
   * Higher values mean the model can critically evaluate information.
   * @example 0.9
   */
  criticalThinking?: number;

  /**
   * The level of creative thinking capability (0.0-1.0).
   * Higher values mean the model can generate novel ideas.
   * @example 0.75
   */
  creativeThinking?: number;

  /**
   * The level of analytical thinking capability (0.0-1.0).
   * Higher values mean the model can break down complex problems.
   * @example 0.85
   */
  analyticalThinking?: number;

  /**
   * The level of experiential learning capability (0.0-1.0).
   * Higher values mean the model learns from experience effectively.
   * @example 0.9
   */
  experientialLearning?: number;

  /**
   * The level of theoretical understanding (0.0-1.0).
   * Higher values mean the model has deeper theoretical knowledge.
   * @example 0.8
   */
  theoreticalUnderstanding?: number;

  /**
   * The level of practical application skill (0.0-1.0).
   * Higher values mean the model applies knowledge effectively.
   * @example 0.85
   */
  practicalApplication?: number;

  /**
   * The level of synthesis capability (0.0-1.0).
   * Higher values mean the model can combine ideas effectively.
   * @example 0.8
   */
  synthesisCapability?: number;

  /**
   * The level of evaluation capability (0.0-1.0).
   * Higher values mean the model can assess information effectively.
   * @example 0.85
   */
  evaluationCapability?: number;
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
  /** Indicates whether this history entry is pinned for quick access */
  pinned?: boolean;
  /** Statistics about the history */
  stats: {
    /** Text data statistics */
    textData: { name: string; value: number }[];
    /** Token data statistics */
    tokenStats: { name: string; value: number; fill: string }[];
  };
}

export interface PromptHistoryByRole extends PromptHistory {
  /** The responses related to the prompt */
  variants?: string[];
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
  /** The duration of experience */
  experience?: string;
  /** The level of economic detail. */
  economicDetail?: string;
  language?: string;
  encoding?: string;
  strictness?: number;
  minimalOutput?: boolean;
  includeMetadata?: boolean;
  cognitiveLoad?: string;
  informationDensity?: string;
  abstractionLevel?: string;
  metaphorUsage?: string;
  sentenceStructure?: string;
  paragraphFlow?: string;
  listStyle?: string;
  headingHierarchy?: boolean;
  emotionalIntensity?: number;
  persuasionTechnique?: string;
  empathyLevel?: number;
  culturalContext?: string;
  domainSpecificity?: string;
  technicalJargonLevel?: string;
  regulatoryCompliance?: string[];
  knowledgeDepth?: number;
  knowledgeBreadth?: number;
  reasoningDepth?: number;
  thinkingPattern?: string;
  problemSolvingApproach?: string;
  systemsThinking?: number;
  criticalThinking?: number;
  crossDomainTransfer?: number;
  lateralThinking?: number;
  experienceLevel?: number;
  argumentationStyle?: string;
  artisticDetail?: string;
  mathematicalDetail?: string;
  narrativePerspective?: string;
  technicalDepth?: string;
  timeHorizon?: string;
  domainExpertise?: string;
  skills?: string[];
  skillProficiency?: Record<string, number>;
  expertiseFocus?: string;
  domainSpecialization?: number;
  learningCurve?: number;
  retentionRate?: number;
  acquisitionSpeed?: number;
  patternRecognitionSensitivity?: number;
  contextSensitivity?: number;
  adaptability?: number;
  ambiguityTolerance?: string;
  creativeThinking?: number;
  analyticalThinking?: number;
  experientialLearning?: number;
  theoreticalUnderstanding?: number;
  practicalApplication?: number;
  synthesisCapability?: number;
  evaluationCapability?: number;
  dataGranularity?: string;
  detailLevel?: string;
  environmentalDetail?: string;
  exampleSpecificity?: string;
  geographicScope?: string;
  historicalDepth?: string;
  temporalScope?: string;
  visualComplexity?: string;
  technologicalDetail?: string;
  biologicalDetail?: string;
  chemicalDetail?: string;
  physicsDetail?: string;
  writingStyle?: string;
  philosophicalDetail: string;
  psychologicalDetail: string;
  socialDetail: string;

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
  temperature: boolean;
  maxTokens: boolean;
  targetAudience: boolean;
  tone: boolean;
  responseLength: boolean;
  customInstructions: boolean;
  enhancementParameters: boolean;
  format: boolean;
  offTheRecord: boolean;
  topP: boolean;
  topK: boolean;
  stopSequences: boolean;
  frequencyPenalty: boolean;
  presencePenalty: boolean;
  status: boolean;
  experience: boolean;
  enhancementType: boolean;
  language: boolean;
  encoding: boolean;
  strictness: boolean;
  minimalOutput: boolean;
  includeMetadata: boolean;
  cognitiveLoad: boolean;
  informationDensity: boolean;
  abstractionLevel: boolean;
  metaphorUsage: boolean;
  sentenceStructure: boolean;
  paragraphFlow: boolean;
  listStyle: boolean;
  headingHierarchy: boolean;
  emotionalIntensity: boolean;
  persuasionTechnique: boolean;
  empathyLevel: boolean;
  culturalContext: boolean;
  domainSpecificity: boolean;
  technicalJargonLevel: boolean;
  regulatoryCompliance: boolean;
  knowledgeDepth: boolean;
  knowledgeBreadth: boolean;
  reasoningDepth: boolean;
  thinkingPattern: boolean;
  problemSolvingApproach: boolean;
  systemsThinking: boolean;
  criticalThinking: boolean;
  crossDomainTransfer: boolean;
  lateralThinking: boolean;
  experienceLevel: boolean;
  timeHorizon: boolean;
  domainExpertise: boolean;
  skills: boolean;
  skillProficiency: boolean;
  expertiseFocus: boolean;
  domainSpecialization: boolean;
  learningCurve: boolean;
  retentionRate: boolean;
  acquisitionSpeed: boolean;
  patternRecognitionSensitivity: boolean;
  contextSensitivity: boolean;
  adaptability: boolean;
  ambiguityTolerance: boolean;
  creativeThinking: boolean;
  analyticalThinking: boolean;
  experientialLearning: boolean;
  theoreticalUnderstanding: boolean;
  practicalApplication: boolean;
  synthesisCapability: boolean;
  evaluationCapability: boolean;
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
