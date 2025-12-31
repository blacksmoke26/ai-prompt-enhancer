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
  | 'componentOrder' // The sorting order of components
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
    description: 'Custom instructions for AI',
    defaultValue: null,
    schema: {
      examples: [''],
    },
  },
  {
    key: 'enhancementParameters',
    type: 'string',
    description: 'Enhancement parameters for AI',
    defaultValue: null,
    schema: {
      examples: [''],
    },
  },
  {
    key: 'format',
    type: 'string',
    description: 'Response format',
    defaultValue: JSON.stringify('markdown'),
    schema: {
      examples: ['markdown'],
      enum: OUTPUT_FORMAT_NAMES,
    },
  },
  {
    key: 'offTheRecord',
    type: 'boolean',
    description: 'Whether to use off-the-record mode',
    defaultValue: JSON.stringify(false),
    schema: {
      examples: [false],
    },
  },
  {
    key: 'topP',
    type: 'number',
    description: 'Top-p',
    defaultValue: null,
    schema: {
      examples: [1],
    },
  },
  {
    key: 'topK',
    type: 'number',
    description: 'Top-k',
    defaultValue: null,
    schema: {
      examples: [1],
    },
  },
  {
    key: 'stopSequences',
    type: 'string',
    description: 'Stop sequences for AI',
    defaultValue: null,
    schema: {
      examples: [''],
    },
  },
  {
    key: 'frequencyPenalty',
    type: 'number',
    description: 'Frequency penalty',
    defaultValue: null,
    schema: {
      examples: [0],
    },
  },
  {
    key: 'presencePenalty',
    type: 'number',
    description: 'Presence penalty',
    defaultValue: null,
    schema: {
      examples: [0],
    },
  },
  {
    key: 'componentOrder',
    type: 'array',
    description: 'The sorting order of components',
    defaultValue: JSON.stringify([
      'provider',
      'model',
      'enhancement',
      'role',
      'temperature',
      'maxTokens',
      'targetAudience',
      'tone',
      'responseLength',
      'customInstructions',
      'enhancementParameters',
      'format',
      'offTheRecord',
      'topP',
      'topK',
      'stopSequences',
      'frequencyPenalty',
      'presencePenalty',
      'status',
    ]),
    schema: {
      items: {
        type: 'string',
      },
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
