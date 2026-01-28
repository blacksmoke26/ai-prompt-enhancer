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
import {
  EnhancementTypeAttributes,
  PromptUserRoleAttributes,
  ResponseLengthAttributes,
  TargetAudienceAttributes,
  ToneAttributes,
} from '~/database/models';

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

export type PromptParamsNormalized = Omit<
  PromptParams,
  'userRole' | 'enhancementType' | 'targetAudience' | 'tone' | 'responseLength'
> & {
  /**
   * The role the user is playing in the interaction. This defines the context
   * for how the model should interpret and respond to the input.
   * @example 'data scientist'
   */
  userRole?: PromptUserRoleAttributes | null;

  /**
   * The type of enhancement or transformation to apply to the input text.
   * This could include summarization, translation, formatting, etc.
   * @example 'summarize'
   */
  enhancementType?: EnhancementTypeAttributes | null;

  /**
   * Optional: The target audience for the output content.
   * This influences tone, complexity, and language choices.
   * @example 'technical audience'
   */
  targetAudience?: TargetAudienceAttributes | null;

  /**
   * Optional: The tone of the output (e.g., formal, casual, professional).
   * @example 'professional'
   */
  tone?: ToneAttributes | null;

  /**
   * Optional: The desired length of the output response.
   * Common values: 'short', 'medium', 'long', 'extensive'.
   * @example 'medium'
   */
  responseLength?: ResponseLengthAttributes | null;
};

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

  // ==================================================================================================
  // ADVANCED OPTIONAL PARAMETERS
  // ==========================================

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
   * The depth of historical knowledge to draw upon.
   * @example 'deep'
   */
  historicalDepth?: 'none' | 'brief'  | 'thorough' | 'historical' | 'mythological' | 'shallow' | 'moderate' | 'deep' | 'encyclopedic' | 'archival';

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

  // ==================================================================================================
  // ADVANCED CONTENT CONTROL PARAMETERS
  // ==========================================

  /**
   * The writing style of the output.
   * Options: 'formal', 'casual', 'academic', 'technical', 'creative', 'diagnostic', 'diplomatic', 'persuasive', 'skeptical', 'optimistic', 'pessimistic', 'humorous', 'sarcastic', 'concise', 'verbose', 'narrative', 'explanatory', 'instructional', 'questioning', 'analytical', 'holistic', 'pragmatic', 'idealistic', 'critical', 'supportive', 'cautious', 'bold', 'conservative', 'experimental', 'traditional', 'contemporary', 'futuristic', 'retrospective', 'global', 'localized', 'standard', 'idiomatic', 'plain', 'elegant', 'powerful', 'soothing', 'urgent', 'relaxed', 'energetic', 'quiet', 'mysterious', 'transparent', 'opaque', 'direct', 'indirect', 'explicit', 'implicit', 'simple', 'complex', 'balanced'.
   * @example 'analytical'
   */
  writingStyle?: string;

  /**
   * The level of detail in explanations.
   * Options: 'ultra-minimal', 'minimal', 'concise', 'moderate', 'detailed', 'comprehensive', 'ultra-detailed'.
   * @example 'detailed'
   */
  detailLevel?: 'ultra-minimal' | 'minimal' | 'concise' | 'moderate' | 'detailed' | 'comprehensive' | 'ultra-detailed';

  /**
   * The narrative perspective to use.
   * Options: 'first-person', 'third-person', 'second-person', 'omniscient', 'limited', 'objective'.
   * @example 'third-person'
   */
  narrativePerspective?: 'first-person' | 'third-person' | 'second-person' | 'omniscient' | 'limited' | 'objective';

  /**
   * The level of specificity in examples.
   * Options: 'none', 'general', 'specific', 'concrete', 'hypothetical', 'real-world'.
   * @example 'concrete'
   */
  exampleSpecificity?: 'none' | 'general' | 'specific' | 'concrete' | 'hypothetical' | 'real-world';

  /**
   * The level of detail in data presentations.
   * Options: 'aggregated', 'summary', 'detailed', 'comprehensive', 'raw'.
   * @example 'detailed'
   */
  dataGranularity?: 'aggregated' | 'summary' | 'detailed' | 'comprehensive' | 'raw';

  /**
   * The level of technical detail in explanations.
   * Options: 'layman', 'basic', 'intermediate', 'advanced', 'expert', 'academic', 'proprietary'.
   * @example 'intermediate'
   */
  technicalDepth?: 'layman' | 'basic' | 'intermediate' | 'advanced' | 'expert' | 'academic' | 'proprietary';

  /**
   * The level of geographic specificity.
   * Options: 'global', 'regional', 'national', 'local', 'hyper-local', 'specific-venue'.
   * @example 'regional'
   */
  geographicScope?: 'global' | 'regional' | 'national' | 'local' | 'hyper-local' | 'specific-venue';

  /**
   * The level of temporal specificity.
   * Options: 'eternal', 'historical', 'contemporary', 'immediate', 'future', 'archived'.
   * @example 'contemporary'
   */
  temporalScope?: 'eternal' | 'historical' | 'contemporary' | 'immediate' | 'future' | 'archived';

  /**
   * The style of argumentation.
   * Options: 'deductive', 'inductive', 'abductive', 'rhetorical', 'dialectical', 'heuristic', 'heuristic_dialectical'.
   * @example 'inductive'
   */
  argumentationStyle?: 'deductive' | 'inductive' | 'abductive' | 'rhetorical' | 'dialectical' | 'heuristic' | 'heuristic_dialectical';

  /**
   * The format of code or structured output.
   * Options: 'code', 'inline_code', 'markdown', 'plaintext', 'json', 'yaml', 'xml', 'csv', 'tsv', 'binary', 'html', 'markdown_code', 'markdown_inline', 'markdown_text', 'markdown_yaml', 'markdown_xml'.
   * @example 'code'
   */
  outputFormat?: 'code' | 'inline_code' | 'markdown' | 'plaintext' | 'json' | 'yaml' | 'xml' | 'csv' | 'tsv' | 'binary' | 'html' | 'markdown_code' | 'markdown_inline' | 'markdown_text' | 'markdown_yaml' | 'markdown_xml';

  /**
   * The level of visual complexity in explanations.
   * Options: 'minimal', 'moderate', 'complex', 'elaborate', 'schematic', 'diagrammatic', 'graphical', 'charted', 'map-based', 'flow-based', 'tree-based', 'network-based', 'grid-based', 'spatial', '3d', 'multidimensional', 'holographic', 'augmented'.
   * @example 'moderate'
   */
  visualComplexity?: 'minimal' | 'moderate' | 'complex' | 'elaborate' | 'schematic' | 'diagrammatic' | 'graphical' | 'charted' | 'map-based' | 'flow-based' | 'tree-based' | 'network-based' | 'grid-based' | 'spatial' | '3d' | 'multidimensional' | 'holographic' | 'augmented';

  /**
   * The level of mathematical detail.
   * Options: 'none', 'conceptual', 'simplified', 'formal', 'detailed', 'step-by-step', 'proof-based', 'derivation-based', 'numerical', 'theoretical', 'computational', 'statistical', 'analytical', 'graph-theoretic', 'logic-based', 'probability-based', 'differential', 'integral', 'matrix', 'tensor', 'linear-algebra', 'dynamical-systems', 'chaos-theory', 'quantum', 'relativistic', 'field-theory'.
   * @example 'detailed'
   */
  mathematicalDetail?: 'none' | 'conceptual' | 'simplified' | 'formal' | 'detailed' | 'step-by-step' | 'proof-based' | 'derivation-based' | 'numerical' | 'theoretical' | 'computational' | 'statistical' | 'analytical' | 'graph-theoretic' | 'logic-based' | 'probability-based' | 'differential' | 'integral' | 'matrix' | 'tensor' | 'linear-algebra' | 'dynamical-systems' | 'chaos-theory' | 'quantum' | 'relativistic' | 'field-theory';

  /**
   * The level of biological detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'cellular', 'molecular', 'genetic', 'epigenetic', 'systems-biology', 'neuro-biological', 'immunological', 'ecological', 'evolutionary', 'developmental', 'physiological', 'pathological', 'pharmacological', 'biotechnological', 'bioethical'.
   * @example 'detailed'
   */
  biologicalDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'cellular' | 'molecular' | 'genetic' | 'epigenetic' | 'systems-biology' | 'neuro-biological' | 'immunological' | 'ecological' | 'evolutionary' | 'developmental' | 'physiological' | 'pathological' | 'pharmacological' | 'biotechnological' | 'bioethical';

  /**
   * The level of chemical detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'elemental', 'molecular', 'organic', 'inorganic', 'biochemical', 'pharmaceutical', 'industrial', 'environmental', 'nanotechnology', 'molecular-chemistry', 'spectroscopy', 'thermodynamics', 'kinetics', 'catalysis', 'materials-science', 'surface-chemistry'.
   * @example 'detailed'
   */
  chemicalDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'elemental' | 'molecular' | 'organic' | 'inorganic' | 'biochemical' | 'pharmaceutical' | 'industrial' | 'environmental' | 'nanotechnology' | 'molecular-chemistry' | 'spectroscopy' | 'thermodynamics' | 'kinetics' | 'catalysis' | 'materials-science' | 'surface-chemistry';

  /**
   * The level of physics detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'classical', 'mechanics', 'electromagnetism', 'thermodynamics', 'quantum', 'relativistic', 'astrophysics', 'cosmology', 'particle', 'nuclear', 'condensed-matter', 'statistical', 'fluid', 'optical', 'acoustic', 'thermal', 'magnetic', 'electronic', 'superconducting', 'nano-physics', 'field-theory', 'string-theory', 'quantum-gravity', 'high-energy'.
   * @example 'detailed'
   */
  physicsDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'classical' | 'mechanics' | 'electromagnetism' | 'thermodynamics' | 'quantum' | 'relativistic' | 'astrophysics' | 'cosmology' | 'particle' | 'nuclear' | 'condensed-matter' | 'statistical' | 'fluid' | 'optical' | 'acoustic' | 'thermal' | 'magnetic' | 'electronic' | 'superconducting' | 'nano-physics' | 'field-theory' | 'string-theory' | 'quantum-gravity' | 'high-energy';

  /**
   * The level of environmental detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'ecosystem', 'biotic', 'abiotic', 'climatic', 'geographic', 'hydrological', 'atmospheric', 'oceanic', 'terrestrial', 'wildlife', 'pollution', 'conservation', 'sustainability', 'climate-change', 'greenhouse', 'carbon-cycle', 'ozone', 'acid-rain', 'deforestation', 'desertification', 'biodiversity', 'ecosystem-services', 'ecosystem-restoration'.
   * @example 'detailed'
   */
  environmentalDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'ecosystem' | 'biotic' | 'abiotic' | 'climatic' | 'geographic' | 'hydrological' | 'atmospheric' | 'oceanic' | 'terrestrial' | 'wildlife' | 'pollution' | 'conservation' | 'sustainability' | 'climate-change' | 'greenhouse' | 'carbon-cycle' | 'ozone' | 'acid-rain' | 'deforestation' | 'desertification' | 'biodiversity' | 'ecosystem-services' | 'ecosystem-restoration';

  /**
   * The level of economic detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'micro', 'macro', 'developmental', 'international', 'monetary', 'fiscal', 'trade', 'industrial', 'financial', 'labor', 'resource', 'environmental', 'public', 'public-works', 'urban', 'rural', 'agricultural', 'market', 'capital', 'entrepreneurship', 'innovation', 'digital', 'knowledge', 'global', 'regional', 'local', 'sectoral', 'financial-institutions', 'central-banking', 'monetary-policy', 'fiscal-policy'.
   * @example 'detailed'
   */
  economicDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'micro' | 'macro' | 'developmental' | 'international' | 'monetary' | 'fiscal' | 'trade' | 'industrial' | 'financial' | 'labor' | 'resource' | 'environmental' | 'public' | 'public-works' | 'urban' | 'rural' | 'agricultural' | 'market' | 'capital' | 'entrepreneurship' | 'innovation' | 'digital' | 'knowledge' | 'global' | 'regional' | 'local' | 'sectoral' | 'financial-institutions' | 'central-banking' | 'monetary-policy' | 'fiscal-policy';

  /**
   * The level of social detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'demographic', 'social-structures', 'social-interaction', 'social-identity', 'social-dynamics', 'social-network', 'social-change', 'social-problem', 'social-policy', 'social-movement', 'social-media', 'digital-culture', 'subculture', 'counter-culture', 'culture', 'cultural-studies', 'anthropology', 'sociology', 'psychology', 'neuroscience', 'cognitive', 'behavioral', 'psychological', 'emotional', 'emotional-intelligence', 'emotional-regulation', 'emotional-expression', 'emotional-awareness', 'emotional-integrity', 'emotional-stability', 'emotional-harmony', 'emotional-balance', 'emotional-resilience', 'emotional-integrity'.
   * @example 'detailed'
   */
  socialDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'demographic' | 'social-structures' | 'social-interaction' | 'social-identity' | 'social-dynamics' | 'social-network' | 'social-change' | 'social-problem' | 'social-policy' | 'social-movement' | 'social-media' | 'digital-culture' | 'subculture' | 'counter-culture' | 'culture' | 'cultural-studies' | 'anthropology' | 'sociology' | 'psychology' | 'neuroscience' | 'cognitive' | 'behavioral' | 'psychological' | 'emotional' | 'emotional-intelligence' | 'emotional-regulation' | 'emotional-expression' | 'emotional-awareness' | 'emotional-integrity' | 'emotional-stability' | 'emotional-harmony' | 'emotional-balance' | 'emotional-resilience';

  /**
   * The level of technological detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'computer-science', 'software', 'hardware', 'ai', 'machine-learning', 'deep-learning', 'neural-network', 'nlp', 'computer-vision', 'robotics', 'cybersecurity', 'network', 'communication', 'storage', 'processing', 'data', 'database', 'algorithm', 'programming', 'coding', 'web', 'mobile', 'iot', 'embedded', 'wearable', 'biotech', 'biomedical', 'nanotech', 'space', 'energy', 'transportation', 'telecommunications', 'information-technology', 'digital', 'smart', 'connected', 'autonomous', 'blockchain', 'distributed', 'cloud', 'edge', 'quantum', 'quantum-computing', 'quantum-simulation', 'quantum-optimization', 'quantum-cryptography', 'quantum-sensing', 'quantum-sensing', 'quantum-analogy', 'quantum-digital', 'quantum-analogy', 'quantum-digital', 'quantum-analogy', 'quantum-digital'.
   * @example 'detailed'
   */
  technologicalDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'computer-science' | 'software' | 'hardware' | 'ai' | 'machine-learning' | 'deep-learning' | 'neural-network' | 'nlp' | 'computer-vision' | 'robotics' | 'cybersecurity' | 'network' | 'communication' | 'storage' | 'processing' | 'data' | 'database' | 'algorithm' | 'programming' | 'coding' | 'web' | 'mobile' | 'iot' | 'embedded' | 'wearable' | 'biotech' | 'biomedical' | 'nanotech' | 'space' | 'energy' | 'transportation' | 'telecommunications' | 'information-technology' | 'digital' | 'smart' | 'connected' | 'autonomous' | 'blockchain' | 'distributed' | 'cloud' | 'edge' | 'quantum' | 'quantum-computing' | 'quantum-simulation' | 'quantum-optimization' | 'quantum-cryptography';

  /**
   * The level of psychological detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'cognitive', 'emotional', 'behavioral', 'social', 'developmental', 'clinical', 'health', 'abnormal', 'personality', 'neuropsychology', 'consciousness', 'awareness', 'attention', 'memory', 'language', 'perception', 'motivation', 'emotion', 'attitude', 'value', 'belief', 'concept', 'attitude', 'behavior', 'cognition', 'learning', 'motivation', 'emotional', 'stress', 'anxiety', 'depression', 'resilience', 'well-being', 'happiness', 'satisfaction', 'fulfillment', 'meaning', 'purpose', 'growth', 'development', 'maturation', 'aging', 'lifespan', 'life-course
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'cognitive', 'emotional', 'behavioral', 'social', 'developmental', 'clinical', 'health', 'abnormal', 'personality', 'neuropsychology', 'consciousness', 'awareness', 'attention', 'memory', 'language', 'perception', 'motivation', 'emotion', 'attitude', 'value', 'belief', 'concept', 'attitude', 'behavior', 'cognition', 'learning', 'motivation', 'emotional', 'stress', 'anxiety', 'depression', 'resilience', 'well-being', 'happiness', 'satisfaction', 'fulfillment', 'meaning', 'purpose', 'growth', 'development', 'maturation', 'aging', 'lifespan', 'life-course', 'adolescence', 'adulthood', 'midlife', 'old-age', 'end-of-life', 'death', 'spirituality', 'religious', 'transpersonal', 'self', 'self-concept', 'self-esteem', 'self-awareness', 'self-determination', 'self-regulation', 'self-efficacy', 'self-actualization', 'self-transcendence', 'self-realization', 'self-actualization', 'self-transcendence', 'self-realization'.
   * @example 'detailed'
   */
  psychologicalDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'cognitive' | 'emotional' | 'behavioral' | 'social' | 'developmental' | 'clinical' | 'health' | 'abnormal' | 'personality' | 'neuropsychology' | 'consciousness' | 'awareness' | 'attention' | 'memory' | 'language' | 'perception' | 'motivation' | 'emotion' | 'value' | 'belief' | 'concept' | 'attitude' | 'behavior' | 'cognition' | 'learning' | 'stress' | 'anxiety' | 'depression' | 'resilience' | 'well-being' | 'happiness' | 'satisfaction' | 'fulfillment' | 'meaning' | 'purpose' | 'growth' | 'development' | 'maturation' | 'aging' | 'lifespan' | 'life-course' | 'adolescence' | 'adulthood' | 'midlife' | 'old-age' | 'end-of-life' | 'death' | 'spirituality' | 'religious' | 'transpersonal' | 'self' | 'self-concept' | 'self-esteem' | 'self-awareness' | 'self-determination' | 'self-regulation' | 'self-efficacy';

  /**
   * The level of artistic detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'visual', 'musical', 'literary', 'performing', 'cinematic', 'photographic', 'digital', 'traditional', 'contemporary', 'classical', 'modern', 'abstract', 'realistic', 'surreal', 'expressionist', 'impressionist', 'minimalist', 'maximalist', 'conceptual', 'installation', 'performance', 'mixed-media', 'digital-art', 'generative', 'algorithmic', 'procedural', 'interactive', 'immersive', 'experiential', 'experiential', 'immersive', 'interactive', 'generative', 'algorithmic', 'procedural', 'digital-art', 'mixed-media', 'installation', 'performance', 'conceptual', 'maximalist', 'minimalist', 'impressionist', 'expressionist', 'surreal', 'realistic', 'abstract', 'modern', 'classical', 'contemporary', 'traditional', 'digital', 'photographic', 'cinematic', 'performing', 'literary', 'musical', 'visual'.
   * @example 'detailed'
   */
  artisticDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'visual' | 'musical' | 'literary' | 'performing' | 'cinematic' | 'photographic' | 'digital' | 'traditional' | 'contemporary' | 'classical' | 'modern' | 'abstract' | 'realistic' | 'surreal' | 'expressionist' | 'impressionist' | 'minimalist' | 'maximalist' | 'installation' | 'performance' | 'mixed-media' | 'digital-art' | 'generative' | 'algorithmic' | 'procedural' | 'interactive' | 'immersive' | 'experiential';

  /**
   * The level of philosophical detail.
   * Options: 'none', 'conceptual', 'simplified', 'detailed', 'metaphysics', 'epistemology', 'ontology', 'ethics', 'aesthetics', 'logic', 'mind', 'philosophy-of-mind', 'philosophy-of-language', 'philosophy-of-science', 'philosophy-of-technology', 'philosophy-of-religion', 'philosophy-of-politics', 'philosophy-of-law', 'philosophy-of-art', 'philosophy-of-culture', 'philosophy-of-history', 'philosophy-of-time', 'philosophy-of-space', 'philosophy-of-cosmos', 'philosophy-of-nature', 'philosophy-of-society', 'philosophy-of-humanity', 'philosophy-of-existence', 'philosophy-of-life', 'philosophy-of-consciousness', 'philosophy-of-wisdom', 'philosophy-of-knowing', 'philosophy-of-understanding', 'philosophy-of-believing', 'philosophy-of-trusting', 'philosophy-of-expecting', 'philosophy-of-hoping', 'philosophy-of-praying', 'philosophy-of-worshiping', 'philosophy-of-sacrificing', 'philosophy-of-suffering', 'philosophy-of-death', 'philosophy-of-spirituality', 'philosophy-of-mysticism', 'philosophy-of-magic', 'philosophy-of-transformation', 'philosophy-of-evolution', 'philosophy-of-creation', 'philosophy-of-destruction', 'philosophy-of-cosmos', 'philosophy-of-the-universe', 'philosophy-of-existence', 'philosophy-of-being', 'philosophy-of-becoming', 'philosophy-of-time', 'philosophy-of-space', 'philosophy-of-cosmos', 'philosophy-of-the-absolute', 'philosophy-of-the-infinite', 'philosophy-of-the-eternal', 'philosophy-of-the-divine', 'philosophy-of-the-divine', 'philosophy-of-the-divine'.
   * @example 'detailed'
   */
  philosophicalDetail?: 'none' | 'conceptual' | 'simplified' | 'detailed' | 'metaphysics' | 'epistemology' | 'ontology' | 'ethics' | 'aesthetics' | 'logic' | 'mind' | 'philosophy-of-mind' | 'philosophy-of-language' | 'philosophy-of-science' | 'philosophy-of-technology' | 'philosophy-of-religion' | 'philosophy-of-politics' | 'philosophy-of-law' | 'philosophy-of-art' | 'philosophy-of-culture' | 'philosophy-of-history' | 'philosophy-of-nature' | 'philosophy-of-society' | 'philosophy-of-humanity' | 'philosophy-of-life' | 'philosophy-of-consciousness' | 'philosophy-of-wisdom' | 'philosophy-of-knowing' | 'philosophy-of-understanding' | 'philosophy-of-believing' | 'philosophy-of-trusting' | 'philosophy-of-expecting' | 'philosophy-of-hoping' | 'philosophy-of-praying' | 'philosophy-of-worshiping' | 'philosophy-of-sacrificing' | 'philosophy-of-suffering' | 'philosophy-of-death' | 'philosophy-of-spirituality' | 'philosophy-of-mysticism' | 'philosophy-of-magic' | 'philosophy-of-transformation' | 'philosophy-of-evolution' | 'philosophy-of-creation' | 'philosophy-of-destruction' | 'philosophy-of-the-universe' | 'philosophy-of-existence' | 'philosophy-of-being' | 'philosophy-of-becoming' | 'philosophy-of-time' | 'philosophy-of-space' | 'philosophy-of-cosmos' | 'philosophy-of-the-absolute' | 'philosophy-of-the-infinite' | 'philosophy-of-the-eternal';
}

export type CustomLabel =
  | 'identity'
  | 'cognitive'
  | 'examples'
  | 'constraints'
  | 'experience'
  | 'structure'
  | 'operations'
  | 'special'
  | 'payload'
  | 'content'
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
   modality?: 'text' | 'code' | 'math' | 'multimodal' | null;

   /**
    * Controls the creativity and randomness of the model's responses.
    * - 'conservative': Safe, predictable outputs.
    * - 'balanced': Mix of creativity and reliability.
    * - 'creative': More innovative and diverse responses.
    */
   creativityLevel?: 'conservative' | 'balanced' | 'creative';

   /**
    * Sets the default response length for the prompt.
    * - 'brief': Concise responses.
    * - 'medium': Moderate length responses.
    * - 'detailed': Comprehensive responses.
    */
   defaultResponseLength?: 'brief' | 'medium' | 'detailed';

   /**
    * Enables progressive refinement of responses through multiple iterations.
    */
   enableProgressiveRefinement?: boolean;

   /**
    * Sets the maximum number of refinement iterations allowed.
    */
   maxRefinementIterations?: number;

   /**
    * Defines the prioritization of prompt elements when space is limited.
    */
   elementPriority?: ('identity' | 'context' | 'constraints' | 'examples')[];

   /**
    * Enables adaptive prompt generation based on the input complexity.
    */
   enableAdaptiveGeneration?: boolean;
 }
