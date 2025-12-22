/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

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
}

/**
 * Enumerates all valid configuration keys available in the system.
 * Each key corresponds to a specific configuration option.
 */
export type ConfigKey =
  'theme' |          // UI theme (e.g., 'light', 'dark', 'system')
  'autoSave' |       // Boolean flag for automatic saving of data
  'maxHistoryItems' | // Maximum number of conversation history items to store
  'defaultModel' |   // Default language model to use
  'defaultSystemPrompt' | // Default system prompt for AI interactions
  'maxTokens' |      // Maximum token limit for model responses
  'temperature' |    // Creativity control parameter for responses (0-1)
  'enhancementType' | // Type of enhancement to apply (e.g., 'none', 'summarize')
  'userRole' |       // Role of the user in the conversation context
  'provider' |       // AI service provider (e.g., 'openai', 'anthropic')
  'model' |           // Specific model version to use
  'wordFrequency';   // Specific model version to use

/**
 * Configuration keys for the application
 */
export const configuration: Config[] = [{
  key: 'theme',
  type: 'string',
  description: 'Theme preference',
  defaultValue: JSON.stringify('system'),
}, {
  key: 'autoSave',
  type: 'boolean',
  description: 'Auto-save prompts',
  defaultValue: JSON.stringify(true),
}, {
  key: 'maxHistoryItems',
  type: 'number',
  description: 'Maximum number of history items to keep',
  defaultValue: JSON.stringify(1000),
}, {
  key: 'defaultModel',
  type: 'string',
  description: 'Default model to use',
  defaultValue: null,
}, {
  key: 'defaultSystemPrompt',
  type: 'string',
  description: 'Default system prompt to use',
  defaultValue: JSON.stringify('You are a helpful AI assistant specialized in enhancing and improving prompts.'),
}, {
  key: 'maxTokens',
  type: 'number',
  description: 'Number of max tokens',
  defaultValue: JSON.stringify(256),
}, {
  key: 'temperature',
  type: 'number',
  description: 'Default template value',
  defaultValue: JSON.stringify(0.7),
}, {
  key: 'enhancementType',
  type: 'string',
  description: 'Default enhancement type',
  defaultValue: JSON.stringify('correct'),
}, {
  key: 'userRole',
  type: 'string',
  description: 'Default user role',
  defaultValue: JSON.stringify('general'),
}, {
  key: 'provider',
  type: 'string',
  description: 'Default provider',
  defaultValue: null,
}, {
  key: 'model',
  type: 'string',
  description: 'Default model',
  defaultValue: null,
}, {
  key: 'wordFrequency',
  type: 'string',
  description: 'Default Intelligent Word Analysis frequency',
  defaultValue: JSON.stringify('all'),
}];

export const getConfigKeys = (): string[] => configuration.map(c => c.key);

export const getConfigJsonSchema = (): JSONSchema7 => {
  return {
    type: 'object',
    properties: Object.fromEntries(configuration.map(c => [c.key, {
      type: c.type,
      description: c.description,
      default: c?.defaultValue?.replaceAll?.('"', '') ?? null,
    }])),
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
  return configuration.reduce((acc: Record<string, any>, cur): Record<ConfigKey, any> => {
    acc[cur.key] = cur.defaultValue;
    return acc;
  }, {});
};

export default configuration;
