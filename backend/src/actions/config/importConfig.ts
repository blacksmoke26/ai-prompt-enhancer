/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { ConfigManager } from '~/config/ConfigManager';

/**
 * Imports configuration from a JSON string
 * @param configManager - Instance of ConfigManager
 * @param configJson - JSON string containing configuration
 * @returns Boolean indicating success or failure
 */
export default async function importConfig(configManager: ConfigManager, configJson: string): Promise<boolean> {
  try {
    if (!configJson) {
      throw new Error('configJson is required');
    }

    const success = await configManager.importConfig(configJson);

    if (!success) {
      throw new Error('Invalid config JSON');
    }

    return success;
  } catch (error: any) {
    throw new Error(`Failed to import config: ${error.message}`);
  }
}
