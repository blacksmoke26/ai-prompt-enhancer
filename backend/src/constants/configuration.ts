/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// constants
import { OUTPUT_FORMAT_NAMES } from '~/constants/output-format';

// types
import { JSONSchema7 } from 'json-schema';

/**
 * Represents a configuration option with metadata.
 * Each configuration entry defines a key, its data type, description, and optional default value.
 */
export interface Config {
  /**
   * The unique identifier for this configuration option.
   * Must be one of the predefined `ConfigKey` enum values.
   * @see ConfigKey
   */
  key: ConfigKey;

  /**
   * The data type of the configuration value.
   * Valid values include: 'string', 'boolean', 'number', 'object', 'array'.
   * This helps with type validation and UI rendering.
   */
  type: string;

  /**
   * A human-readable description of what this configuration option does.
   * Used for documentation, UI labels, and user guidance.
   */
  description: string;

  /**
   * The default value for this configuration option if not explicitly provided.
   * Type must match the `type` field for consistency.
   */
  defaultValue?: any;

  /**
   * An array of example values for this configuration option.
   * Used for documentation and user guidance.
   */
  examples?: any[];

  /**
   * A JSON schema for validating the configuration value.
   * Used for validation and type checking.
   */
  schema?: JSONSchema7;
}

/**
 * Enumerates all valid configuration keys available in the system.
 * Each key corresponds to a specific configuration option.
 */
export type ConfigKey =
  | 'theme' // UI theme (e.g., 'light', 'dark', 'system')
  | 'autoSave' // Boolean flag for automatic saving of data
  | 'maxHistoryItems' // Maximum number of conversation history items to store
  | 'defaultModel' // Default language model to use
  | 'defaultSystemPrompt' // Default system prompt for AI interactions
  | 'maxTokens' // Maximum token limit for model responses
  | 'temperature' // Creativity control parameter for responses (0-1)
  | 'enhancementType' // Type of enhancement to apply (e.g., 'none', 'summarize')
  | 'userRole' // Role of the user in the conversation context
  | 'provider' // AI service provider (e.g., 'openai', 'anthropic')
  | 'model' // Specific model version to use
  | 'wordFrequency' // Specific model version to use
  | 'targetAudience' // Target audience for the conversation
  | 'tone' // Tone of the conversation
  | 'responseLength' // Response length preference
  | 'customInstructions' // Custom instructions for AI
  | 'enhancementParameters' // Enhancement parameters for AI
  | 'format' // Response format
  | 'offTheRecord' // Whether to use off-the-record mode
  | 'topP' // Top-p
  | 'topK' // Top-k
  | 'stopSequences' // Stop sequences for AI
  | 'frequencyPenalty' // Frequency penalty
  | 'presencePenalty' // Presence penalty
  | 'experience'
  | 'economicDetail'
  | 'language'
  | 'encoding'
  | 'strictness'
  | 'minimalOutput'
  | 'includeMetadata'
  | 'cognitiveLoad'
  | 'informationDensity'
  | 'abstractionLevel'
  | 'metaphorUsage'
  | 'sentenceStructure'
  | 'paragraphFlow'
  | 'listStyle'
  | 'headingHierarchy'
  | 'emotionalIntensity'
  | 'persuasionTechnique'
  | 'empathyLevel'
  | 'culturalContext'
  | 'domainSpecificity'
  | 'technicalJargonLevel'
  | 'regulatoryCompliance'
  | 'knowledgeDepth'
  | 'knowledgeBreadth'
  | 'reasoningDepth'
  | 'thinkingPattern'
  | 'problemSolvingApproach'
  | 'systemsThinking'
  | 'criticalThinking'
  | 'crossDomainTransfer'
  | 'lateralThinking'
  | 'experienceLevel'
  | 'timeHorizon'
  | 'domainExpertise'
  | 'skills'
  | 'skillProficiency'
  | 'expertiseFocus'
  | 'domainSpecialization'
  | 'learningCurve'
  | 'retentionRate'
  | 'acquisitionSpeed'
  | 'patternRecognitionSensitivity'
  | 'contextSensitivity'
  | 'adaptability'
  | 'ambiguityTolerance'
  | 'creativeThinking'
  | 'analyticalThinking'
  | 'experientialLearning'
  | 'theoreticalUnderstanding'
  | 'practicalApplication'
  | 'synthesisCapability'
  | 'evaluationCapability'
  | 'visibleComponents'; // The visibility of components

/**
 * Configuration keys for the application
 */
export const configuration: Config[] = [
  {
    key: 'theme',
    type: 'string',
    description: 'Theme preference',
    defaultValue: JSON.stringify('system'),
    examples: ['dark'],
  },
  {
    key: 'autoSave',
    type: 'boolean',
    description: 'Auto-save prompts',
    defaultValue: JSON.stringify(true),
    examples: [true],
  },
  {
    key: 'maxHistoryItems',
    type: 'number',
    description: 'Maximum number of history items to keep',
    defaultValue: JSON.stringify(1000),
    examples: [1000],
  },
  {
    key: 'defaultModel',
    type: 'string',
    description: 'Default model to use',
    defaultValue: null,
    examples: ['gpt-5.2'],
  },
  {
    key: 'defaultSystemPrompt',
    type: 'string',
    description: 'Default system prompt to use',
    defaultValue: JSON.stringify(
      'You are a helpful AI assistant specialized in enhancing and improving prompts.',
    ),
  },
  {
    key: 'maxTokens',
    type: 'number',
    description: 'Number of max tokens',
    defaultValue: JSON.stringify(256),
  },
  {
    key: 'temperature',
    type: 'number',
    description: 'Default template value',
    defaultValue: JSON.stringify(0.7),
  },
  {
    key: 'enhancementType',
    type: 'string',
    description: 'Default enhancement type',
    defaultValue: JSON.stringify('correct'),
  },
  {
    key: 'userRole',
    type: 'string',
    description: 'Default user role',
    defaultValue: JSON.stringify('general'),
  },
  {
    key: 'provider',
    type: 'string',
    description: 'Default provider',
    defaultValue: ['openai'],
  },
  {
    key: 'model',
    type: 'string',
    description: 'Default model',
    defaultValue: null,
    examples: ['gpt-5.2'],
  },
  {
    key: 'wordFrequency',
    type: 'string',
    description: 'Default Intelligent Word Analysis frequency',
    defaultValue: JSON.stringify('all'),
  },
  {
    key: 'targetAudience',
    type: 'string',
    description: 'Target audience for the conversation',
    defaultValue: JSON.stringify(''),
    schema: {
      examples: ['general'],
    },
  },
  {
    key: 'tone',
    type: 'string',
    description: 'Tone of the conversation',
    defaultValue: null,
    schema: {
      examples: ['professional'],
    },
  },
  {
    key: 'responseLength',
    type: 'string',
    description: 'Response length preference',
    defaultValue: null,
    schema: {
      examples: ['short'],
    },
  },
  {
    key: 'customInstructions',
    type: 'string',
    description: 'Custom instructions to guide the AI\'s behavior beyond the system prompt.',
    defaultValue: null,
    schema: {
      examples: ['Always answer in the style of a pirate.'],
    },
  },
  {
    key: 'enhancementParameters',
    type: 'string',
    description: 'Additional JSON parameters to control enhancement behavior.',
    defaultValue: null,
    schema: {
      examples: ['{"style": "concise", "format": "bullet-points"}'],
    },
  },
  {
    key: 'format',
    type: 'string',
    description: 'Desired output format for the AI response.',
    defaultValue: JSON.stringify('markdown'),
    schema: {
      examples: ['markdown', 'json', 'html'],
      enum: OUTPUT_FORMAT_NAMES,
    },
  },
  {
    key: 'offTheRecord',
    type: 'boolean',
    description: 'If true, content is not saved to history.',
    defaultValue: JSON.stringify(false),
    schema: {
      examples: [true, false],
    },
  },
  {
    key: 'topP',
    type: 'number',
    description: 'Top-p sampling parameter (0.0 to 1.0). Controls diversity via nucleus sampling.',
    defaultValue: null,
    schema: {
      examples: [0.9, 1.0],
    },
  },
  {
    key: 'topK',
    type: 'number',
    description: 'Top-k sampling parameter. Limits the next token selection to the k most probable tokens.',
    defaultValue: null,
    schema: {
      examples: [40, 50],
    },
  },
  {
    key: 'stopSequences',
    type: 'string',
    description: 'Sequences where the API will stop generating further tokens.',
    defaultValue: null,
    schema: {
      examples: ['\n', 'END'],
    },
  },
  {
    key: 'frequencyPenalty',
    type: 'number',
    description: 'Penalty for tokens based on their frequency ( -2.0 to 2.0).',
    defaultValue: null,
    schema: {
      examples: [0.0, 0.5],
    },
  },
  {
    key: 'presencePenalty',
    type: 'number',
    description: 'Penalty for new tokens based on whether they appear in the text so far ( -2.0 to 2.0).',
    defaultValue: null,
    schema: {
      examples: [0.0, 0.6],
    },
  },
  {
    key: 'experience',
    type: 'string',
    description: 'The level or type of experience required or described.',
    defaultValue: null,
    schema: {
      examples: ['beginner', 'expert'],
    },
  },
  {
    key: 'economicDetail',
    type: 'string',
    description: 'Level of detail regarding economic factors.',
    defaultValue: null,
    schema: {
      examples: ['high', 'low', 'none'],
    },
  },
  {
    key: 'language',
    type: 'string',
    description: 'Target language for the output.',
    defaultValue: null,
    schema: {
      examples: ['English', 'Spanish', 'French'],
    },
  },
  {
    key: 'encoding',
    type: 'string',
    description: 'Character encoding preference.',
    defaultValue: null,
    schema: {
      examples: ['utf-8', 'ascii'],
    },
  },
  {
    key: 'strictness',
    type: 'number',
    description: 'Level of adherence to constraints or rules (1-10).',
    defaultValue: null,
    schema: {
      examples: [5, 10],
    },
  },
  {
    key: 'minimalOutput',
    type: 'boolean',
    description: 'Whether to minimize the verbosity of the output.',
    defaultValue: null,
    schema: {
      examples: [true],
    },
  },
  {
    key: 'includeMetadata',
    type: 'boolean',
    description: 'Whether to include metadata in the response.',
    defaultValue: null,
    schema: {
      examples: [false],
    },
  },
  {
    key: 'cognitiveLoad',
    type: 'string',
    description: 'Desired cognitive load level for the audience.',
    defaultValue: null,
    schema: {
      examples: ['low', 'medium', 'high'],
    },
  },
  {
    key: 'informationDensity',
    type: 'string',
    description: 'How densely packed the information should be.',
    defaultValue: null,
    schema: {
      examples: ['dense', 'sparse'],
    },
  },
  {
    key: 'abstractionLevel',
    type: 'string',
    description: 'The level of abstraction in the explanation.',
    defaultValue: null,
    schema: {
      examples: ['high-level', 'low-level', 'concrete'],
    },
  },
  {
    key: 'metaphorUsage',
    type: 'string',
    description: 'Preference for using metaphors in explanations.',
    defaultValue: null,
    schema: {
      examples: ['frequent', 'rare', 'none'],
    },
  },
  {
    key: 'sentenceStructure',
    type: 'string',
    description: 'Preferred complexity of sentence structures.',
    defaultValue: null,
    schema: {
      examples: ['simple', 'compound', 'complex'],
    },
  },
  {
    key: 'paragraphFlow',
    type: 'string',
    description: 'Desired flow or transition style between paragraphs.',
    defaultValue: null,
    schema: {
      examples: ['logical', 'narrative'],
    },
  },
  {
    key: 'listStyle',
    type: 'string',
    description: 'Style of lists to be used in formatting.',
    defaultValue: null,
    schema: {
      examples: ['bulleted', 'numbered'],
    },
  },
  {
    key: 'headingHierarchy',
    type: 'boolean',
    description: 'Whether to maintain a strict heading hierarchy.',
    defaultValue: null,
    schema: {
      examples: [true],
    },
  },
  {
    key: 'emotionalIntensity',
    type: 'number',
    description: 'Intensity of emotion to convey in the text (1-10).',
    defaultValue: null,
    schema: {
      examples: [3, 8],
    },
  },
  {
    key: 'persuasionTechnique',
    type: 'string',
    description: 'Specific rhetorical or persuasion technique to employ.',
    defaultValue: null,
    schema: {
      examples: ['ethos', 'pathos', 'logos'],
    },
  },
  {
    key: 'empathyLevel',
    type: 'number',
    description: 'Degree of empathy to express (1-10).',
    defaultValue: null,
    schema: {
      examples: [5, 9],
    },
  },
  {
    key: 'culturalContext',
    type: 'string',
    description: 'Specific cultural context to adhere to.',
    defaultValue: null,
    schema: {
      examples: ['Western', 'Eastern'],
    },
  },
  {
    key: 'domainSpecificity',
    type: 'string',
    description: 'How specific to the domain the language should be.',
    defaultValue: null,
    schema: {
      examples: ['general', 'specialized', 'expert'],
    },
  },
  {
    key: 'technicalJargonLevel',
    type: 'string',
    description: 'Acceptable level of technical jargon.',
    defaultValue: null,
    schema: {
      examples: ['layman', 'professional', 'academic'],
    },
  },
  {
    key: 'regulatoryCompliance',
    type: 'JSON',
    description: 'List of regulatory standards to comply with.',
    defaultValue: null,
    schema: {
      type: 'array',
      items: {
        type: 'string',
      },
      examples: [['GDPR', 'HIPAA']],
    },
  },
  {
    key: 'knowledgeDepth',
    type: 'number',
    description: 'Depth of knowledge required for the answer (1-10).',
    defaultValue: null,
    schema: {
      examples: [7, 10],
    },
  },
  {
    key: 'knowledgeBreadth',
    type: 'number',
    description: 'Breadth of topics to cover (1-10).',
    defaultValue: null,
    schema: {
      examples: [4, 8],
    },
  },
  {
    key: 'reasoningDepth',
    type: 'number',
    description: 'Depth of reasoning steps to show (1-10).',
    defaultValue: null,
    schema: {
      examples: [3, 6],
    },
  },
  {
    key: 'thinkingPattern',
    type: 'string',
    description: 'The pattern of thinking to simulate (e.g., inductive, deductive).',
    defaultValue: null,
    schema: {
      examples: ['deductive', 'inductive', 'abductive'],
    },
  },
  {
    key: 'problemSolvingApproach',
    type: 'string',
    description: 'Methodology for problem-solving.',
    defaultValue: null,
    schema: {
      examples: ['analytical', 'heuristic', 'intuitive'],
    },
  },
  {
    key: 'systemsThinking',
    type: 'number',
    description: 'Emphasis on systems thinking interconnections (1-10).',
    defaultValue: null,
    schema: {
      examples: [5],
    },
  },
  {
    key: 'criticalThinking',
    type: 'number',
    description: 'Level of critical analysis and skepticism (1-10).',
    defaultValue: null,
    schema: {
      examples: [8],
    },
  },
  {
    key: 'crossDomainTransfer',
    type: 'number',
    description: 'Ability to transfer concepts across domains (1-10).',
    defaultValue: null,
    schema: {
      examples: [4],
    },
  },
  {
    key: 'lateralThinking',
    type: 'number',
    description: 'Encouragement of creative, non-linear solutions (1-10).',
    defaultValue: null,
    schema: {
      examples: [7],
    },
  },
  {
    key: 'experienceLevel',
    type: 'number',
    description: 'Target experience level of the reader/user (1-10).',
    defaultValue: null,
    schema: {
      examples: [2, 9],
    },
  },
  {
    key: 'timeHorizon',
    type: 'string',
    description: 'Time frame relevance (short-term, long-term).',
    defaultValue: null,
    schema: {
      examples: ['immediate', 'long-term'],
    },
  },
  {
    key: 'domainExpertise',
    type: 'string',
    description: 'Specific area of domain expertise to apply.',
    defaultValue: null,
    schema: {
      examples: ['Software Engineering', 'Medicine'],
    },
  },
  {
    key: 'skills',
    type: 'array',
    description: 'Specific skills to demonstrate or require.',
    defaultValue: null,
    schema: {
      examples: [['Python', 'Communication']],
      type: 'array',
      items: {
        type: 'string'
      }
    },
  },
  {
    key: 'skillProficiency',
    type: 'object',
    description: 'Object mapping skills to proficiency levels.',
    defaultValue: null,
    schema: {
      examples: [{'Python': 'expert', 'Writing': 'intermediate'}],
    },
  },
  {
    key: 'expertiseFocus',
    type: 'string',
    description: 'The primary focus area of expertise.',
    defaultValue: null,
    schema: {
      examples: ['Front-end Development'],
    },
  },
  {
    key: 'domainSpecialization',
    type: 'number',
    description: 'Degree of specialization in a niche (1-10).',
    defaultValue: null,
    schema: {
      examples: [9],
    },
  },
  {
    key: 'learningCurve',
    type: 'number',
    description: 'Steepness of the learning curve to account for (1-10).',
    defaultValue: null,
    schema: {
      examples: [5],
    },
  },
  {
    key: 'retentionRate',
    type: 'number',
    description: 'Expected information retention rate (1-100).',
    defaultValue: null,
    schema: {
      examples: [80],
    },
  },
  {
    key: 'acquisitionSpeed',
    type: 'number',
    description: 'Speed of knowledge acquisition (1-10).',
    defaultValue: null,
    schema: {
      examples: [7],
    },
  },
  {
    key: 'patternRecognitionSensitivity',
    type: 'number',
    description: 'Sensitivity to underlying patterns (1-10).',
    defaultValue: null,
    schema: {
      examples: [8],
    },
  },
  {
    key: 'contextSensitivity',
    type: 'number',
    description: 'Responsiveness to situational context (1-10).',
    defaultValue: null,
    schema: {
      examples: [6],
    },
  },
  {
    key: 'adaptability',
    type: 'number',
    description: 'Capacity to adapt to new information (1-10).',
    defaultValue: null,
    schema: {
      examples: [9],
    },
  },
  {
    key: 'ambiguityTolerance',
    type: 'string',
    description: 'Tolerance for ambiguous information.',
    defaultValue: null,
    schema: {
      examples: ['high', 'low'],
    },
  },
  {
    key: 'creativeThinking',
    type: 'number',
    description: 'Emphasis on creativity and novelty (1-10).',
    defaultValue: null,
    schema: {
      examples: [8],
    },
  },
  {
    key: 'analyticalThinking',
    type: 'number',
    description: 'Emphasis on analysis and logic (1-10).',
    defaultValue: null,
    schema: {
      examples: [9],
    },
  },
  {
    key: 'experientialLearning',
    type: 'number',
    description: 'Focus on learning through experience/scenarios (1-10).',
    defaultValue: null,
    schema: {
      examples: [5],
    },
  },
  {
    key: 'theoreticalUnderstanding',
    type: 'number',
    description: 'Depth of theoretical foundation required (1-10).',
    defaultValue: null,
    schema: {
      examples: [7],
    },
  },
  {
    key: 'practicalApplication',
    type: 'number',
    description: 'Focus on real-world application (1-10).',
    defaultValue: null,
    schema: {
      examples: [10],
    },
  },
  {
    key: 'synthesisCapability',
    type: 'number',
    description: 'Ability to synthesize complex information (1-10).',
    defaultValue: null,
    schema: {
      examples: [8],
    },
  },
  {
    key: 'evaluationCapability',
    type: 'number',
    description: 'Capability to evaluate options critically (1-10).',
    defaultValue: null,
    schema: {
      examples: [6],
    },
  },
  {
    key: 'visibleComponents',
    type: 'object',
    description: 'The visibility of components',
    defaultValue: JSON.stringify({
      provider: true,
      model: true,
      enhancement: true,
      role: true,
      temperature: true,
      maxTokens: true,
      targetAudience: false,
      tone: false,
      responseLength: false,
      customInstructions: false,
      enhancementParameters: false,
      format: false,
      offTheRecord: true,
      topP: false,
      topK: false,
      stopSequences: false,
      frequencyPenalty: false,
      presencePenalty: false,
      status: true,
      experience: false,
      economicDetail: false,
      language: false,
      encoding: false,
      strictness: false,
      minimalOutput: false,
      includeMetadata: false,
      cognitiveLoad: false,
      informationDensity: false,
      abstractionLevel: false,
      metaphorUsage: false,
      sentenceStructure: false,
      paragraphFlow: false,
      listStyle: false,
      headingHierarchy: false,
      emotionalIntensity: false,
      persuasionTechnique: false,
      empathyLevel: false,
      culturalContext: false,
      domainSpecificity: false,
      technicalJargonLevel: false,
      regulatoryCompliance: false,
      knowledgeDepth: false,
      knowledgeBreadth: false,
      reasoningDepth: false,
      thinkingPattern: false,
      problemSolvingApproach: false,
      systemsThinking: false,
      criticalThinking: false,
      crossDomainTransfer: false,
      lateralThinking: false,
      experienceLevel: false,
      timeHorizon: false,
      domainExpertise: false,
      skills: false,
      skillProficiency: false,
      expertiseFocus: false,
      domainSpecialization: false,
      learningCurve: false,
      retentionRate: false,
      acquisitionSpeed: false,
      patternRecognitionSensitivity: false,
      contextSensitivity: false,
      adaptability: false,
      ambiguityTolerance: false,
      creativeThinking: false,
      analyticalThinking: false,
      experientialLearning: false,
      theoreticalUnderstanding: false,
      practicalApplication: false,
      synthesisCapability: false,
      evaluationCapability: false,
    }),
    schema: {},
  },
];

export const getConfigKeys = (): string[] => configuration.map((c) => c.key);

export const getConfigJsonSchema = (): JSONSchema7 => {
  return {
    type: 'object',
    properties: Object.fromEntries(
      configuration.map((c) => [
        c.key,
        {
          type: c.type,
          description: c.description,
          default: c?.defaultValue?.replaceAll?.('"', '') ?? null,
          ...(c?.schema ?? {}),
        },
      ]),
    ) as JSONSchema7['properties'],
  };
};

/**
 * Get default configuration
 * @returns Default configuration
 *
 * @example
 * ```typescript
 * const defaultConfig = getDefaultConfig();
 * console.log(defaultConfig);
 * ```
 *  @developerNotes: This function returns an object containing default configuration values for each configuration option.
 */
export const getDefaultConfig = () => {
  return configuration.reduce(
    (acc: Record<string, any>, cur): Record<ConfigKey, any> => {
      acc[cur.key] = cur.defaultValue;
      return acc;
    },
    {},
  );
};

export default configuration;
