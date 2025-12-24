/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {JSONSchema7} from 'json-schema';
import type {ProviderConfig} from '~/types/providers';
import {providersClasses} from '~/providers';

/**
 * Default configuration settings for a provider, used as a baseline for initializing provider instances.
 * This object defines the default values for configuration properties such as `baseUrl` and `timeout`.
 * @example
 * const customConfig = {
 *   ...DEFAULT_PROVIDER_CONFIG,
 *   baseUrl: 'https://api.example.com',
 *   timeout: 5000,
 * };
 * @developer Note: The `timeout` value is specified in milliseconds and is critical for API request handling.
 * The `apiKey` is optional but recommended for secure API communication.
 */
const DEFAULT_PROVIDER_CONFIG = {
  caption: '',
  name: '',
  baseUrl: '',
  apiKey: '',
  timeout: 30000,
};

/**
 * An array of configuration keys from `BaseAIProvider.ProviderConfig`, excluding 'caption' and 'name'.
 * This is useful for iterating over relevant configuration properties without the excluded fields.
 * @example
 * // Example usage:
 * configKeys.forEach(key => console.log(key)); // Logs all keys except 'caption' and 'name'
 */
export const configKeys: string[] = Object
  .keys(DEFAULT_PROVIDER_CONFIG)
  .filter(x => !['caption', 'name'].includes(x));

/**
 * Configuration for various AI/ML service providers.
 *
 * This module defines a list of supported providers with their base URLs and optional authentication credentials.
 * Each provider can be used to connect to different AI/ML services for model inference and other operations.
 *
 * @example
 * ```typescript
 * import providers from './providers';
 *
 * // Get the OpenAI provider configuration
 * const openai = providers.find(p => p.name === 'openai');
 * console.log(openai.baseUrl); // 'https://api.openai.com/v1'
 * ```
 *
 * @developerNotes
 * - The `apiKey` field should be populated with valid credentials for production use
 * - Some providers (like Ollama) may not require API keys
 * - Additional properties can be added to each provider as needed
 */
export const getProviders = (): ProviderConfig[] => {
  return Object.values(providersClasses).map(x => {
    return {...(x as Record<string, any>).ProviderConfig};
  });
};

/**
 * Retrieves an array of provider names from the providers list.
 * @returns {string[]} An array of provider names.
 * @example
 * const providers = [{ name: 'ollama' }, { name: 'groq' }];
 * getProvidersName(); // returns ['ollama', 'groq']
 * @developerNotes Assumes `providers` is an array of objects with a `name` property.
 */
export const getProvidersName = (): string[] => getProviders()
  .map(p => p.name);

/**
 * Generates a JSON Schema 7 compliant array of objects representing provider configurations.
 * Each object includes fields like enabled, apiKey, baseUrl, and timeout.
 * @returns {JSONSchema7[]} Array of JSON schema objects for provider configurations.
 * @example
 * // Returns schema for a provider like 'ollama'
 * [
 *   {
 *     type: 'object',
 *     properties: {
 *       enabled: { type: 'boolean' },
 *       apiKey: { type: 'string' },
 *       baseUrl: { type: 'string' },
 *       timeout: { type: 'integer' },
 *     },
 *     required: ['enabled', 'apiKey', 'baseUrl', 'timeout'],
 *   }
 * ]
 * @developerNotes Assumes `providers` is an array of provider objects. All generated schemas have the same structure.
 */
export const getProvidersJsonSchema = (): JSONSchema7 => {
  const schema: JSONSchema7 = {
    type: 'object',
    properties: {} as Record<string, any>,
  };

  getProviders().forEach(p => {
    if (schema.properties) {
      schema.properties[p.name] = {
        type: 'object',
        properties: {
          enabled: {
            type: 'boolean',
            description: 'Whether the provider is enabled or not',
            examples: [true],
          },
          apiKey: {
            type: 'string',
            description: 'API key for the AI model provider',
            examples: ['sk-1234567890'],
          },
          timeout: {
            type: 'integer',
            description: 'Timeout for the AI model provider',
            examples: [30000],
          },
          baseUrl: {
            type: 'string',
            description: 'Base URL for the AI model provider',
            examples: ['https://api.example.com/v1'],
          },
        },
      };
    }
  });

  return schema;
};

