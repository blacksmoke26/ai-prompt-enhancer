/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/**
 * Extended Prompt Parameters with Advanced Cognitive/Structural Controls
 * Required: text, systemPrompt, format, userRole, enhancementType
 * Optional: Everything else
 */
/**
 * Interface defining the parameters for configuring a prompt in an AI/LLM system.
 * This interface allows fine-grained control over the input text, output format,
 * user role, enhancement type, and advanced semantic/structural constraints.
 */
export interface PromptParams {
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
}

/**
 * Extended prompt parameters that include all standard prompt configurations
 * plus advanced narrative and structural control options.
 * This interface extends `PromptParams` and adds additional customization
 * for narrative style and structural complexity.
 */
export interface AdvancedPromptParams extends PromptParams {
  /**
   * The narrative voice or perspective to use in the output.
   * Options: "first-person", "third-person", "neutral", or custom text.
   * @example "third-person"
   */
  narrativeVoice?: string;

  /**
   * The structural complexity of the output content.
   * Options: "simple", "moderate", "complex", or custom text.
   * @example "moderate"
   */
  structuralComplexity?: string;
}

/**
 * A simplified prompt configuration interface with core parameters for
 * text generation, including required fields like provider and model.
 * This interface focuses on essential content and behavior parameters
 * while omitting some advanced controls from `PromptParams`.
 */
export interface BasicPromptParams {
  /**
   * The main input text to be processed or enhanced.
   * @example "Analyze this dataset"
   */
  text: string;

  /**
   * The AI provider to use (e.g., 'OpenAI', 'Anthropic', 'Google').
   * @example 'Anthropic'
   */
  provider: string;

  /**
   * The specific model name or identifier to use.
   * @example 'claude-3-5-sonnet'
   */
  model: string;

  /**
   * Optional: The system message that sets the context or rules for the model's behavior.
   * @example "You are a data analyst specializing in financial trends."
   */
  systemPrompt?: string;

  /**
   * Optional: The role the user is playing in the interaction.
   * @example 'data scientist'
   */
  userRole?: string;

  /**
   * Optional: The target audience for the output content.
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
   * @example 'Include a table of key findings'
   */
  customInstructions?: string;

  /**
   * Optional: The desired format of the output. Supported formats include JSON, Markdown,
   * plain text, HTML, XML, YAML, and CSV.
   * @example 'markdown'
   */
  format?: 'json' | 'markdown' | 'text' | 'html' | 'xml' | 'yaml';

  /**
   * Optional: Custom parameters for the enhancement process.
   * This allows passing arbitrary metadata or configuration.
   * @example { 'theme': 'dark', 'version': '2.1' }
   */
  enhancementParameters?: Record<string, any>;

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
}

export type CustomLabel =
  | 'identity'
  | 'cognitive'
  | 'examples'
  | 'constraints'
  | 'structure'
  | 'operations'
  | 'special'
  | 'payload'
  | 'metadata';

/**
 * Configuration options for controlling the **generation and structure** of the prompt.
 * This combines presentation settings with advanced prompt engineering strategies.
 */
export interface PromptGeneratorOptions {
  // ==========================================
  // PRESENTATION CONTROLS
  // ==========================================

  /**
   * Controls the verbosity of the instructional text within the prompt.
   * - 'terse': Minimalist, direct commands. (e.g., "Role: Dev")
   * - 'standard': Balanced instructional text. (e.g., "You are acting in the capacity of: Dev")
   * - 'explanatory': Detailed instructions explaining the 'why' behind constraints.
   */
  verbosity?: 'terse' | 'standard' | 'explanatory';

  /**
   * Defines the structural wrapping of the prompt sections.
   * - 'markdown': Uses ### Headers (Default).
   * - 'xml': Uses XML tags (e.g., <role>...</role>). Preferred by some models for strict parsing.
   * - 'plain': Plain text with delimiters.
   */
  formatStyle?: 'markdown' | 'xml' | 'plain';

  /**
   * Allows overriding the default section headers.
   * Example: { identity: 'SYSTEM CONFIG', cognitive: 'THOUGHT SETTINGS' }
   */
  customLabels?: Partial<Record<CustomLabel, string>>;

  /**
   * If true, includes internal developer comments in the prompt for debugging the template.
   */
  debugMode?: boolean;

  // ==========================================
  // PROMPT ENGINEERING CONTROLS (Advanced)
  // ==========================================

  /**
   * Defines the reasoning strategy the model should employ.
   * - 'step-by-step': Linear logical progression.
   * - 'first-principles': Deconstructing to fundamental truths.
   * - 'tree-of-thoughts': Exploring multiple branches of logic.
   * - 'compare-contrast': Evaluating opposing viewpoints.
   */
  reasoningStyle?:
    | 'step-by-step'
    | 'compare-contrast'
    | 'first-principles'
    | 'tree-of-thoughts';

  /**
   * A JSON Schema object to enforce strict output structure.
   * If provided, the prompt will instruct the model to adhere strictly to these types.
   */
  outputSchema?: Record<string, any>;

  /**
   * Few-Shot examples to provide context to the model.
   * The model will mimic the pattern of inputs and outputs provided here.
   */
  fewShotExamples?: Array<{ input: string; output: string }>;

  /**
   * Explicit list of behaviors to avoid.
   * Example: ["Do not use jargon", "Do not apologize"]
   */
  negativeConstraints?: string[];

  /**
   * Controls how the reasoning steps are presented.
   * - 'visible': Included in the final output.
   * - 'hidden': Encapsulated in tags (e.g., <thought>) for parsing separation.
   */
  reasoningVisibility?: 'hidden' | 'visible';

  /**
   * A specific phrase to trigger the reasoning process.
   * Example: "Let's think step by step."
   */
  chainOfThoughtPrefix?: string;

  /**
   * Specifies the primary modality of the task.
   * Helps the model select the right neural pathways.
   */
  modality?: 'text' | 'code' | 'math' | 'multimodal';
}
