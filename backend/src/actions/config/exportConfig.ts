/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { ConfigManager } from '~/config/ConfigManager';

/**
 * Exports the current configuration as a JSON string
 * @param configManager - Instance of ConfigManager
 * @returns The configuration as JSON string
 */
export default async function exportConfig(configManager: ConfigManager) {
  try {
    return configManager.exportConfig();
  } catch (error: any) {
    throw new Error(`Failed to export config: ${error.message}`);
  }
}
