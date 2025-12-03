/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { ConfigManager } from '~/config/ConfigManager';

/**
 * Gets the current application configuration
 * @param configManager - Instance of ConfigManager
 * @returns The current configuration object
 */
export default async function getConfig(configManager: ConfigManager) {
  try {
    return configManager.getConfig();
  } catch (error: any) {
    throw new Error(`Failed to get config: ${error.message}`);
  }
}
