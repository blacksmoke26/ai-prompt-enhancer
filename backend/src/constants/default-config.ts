/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// types
import type {AppConfig} from '~/types';

/**
 * Default application configuration
 * @developer-notes This configuration object defines the default settings for the application,
 * including Ollama API connection details, theme preferences, auto-save behavior,
 * history limits, and default model settings. The configuration can be overridden
 * by user preferences or environment variables.
 */
const defaultConfig: AppConfig = {
  ollama: {
    baseUrl: 'http://localhost:11434',
    timeout: 30000,
  },
  theme: 'system',
  autoSave: true,
  maxHistoryItems: 1000,
  defaultModel: 'llama2',
  defaultSystemPrompt: 'You are a helpful AI assistant specialized in enhancing and improving prompts.',
};

export default defaultConfig;
