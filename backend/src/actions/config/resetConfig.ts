/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { ConfigManager } from '~/config/ConfigManager';
import {AppConfig} from '~/types';

/**
 * Resets the configuration to default values
 * @param configManager - Instance of ConfigManager
 * @returns The reset configuration object
 */
export default async function resetConfig(configManager: ConfigManager): Promise<AppConfig> {
  try {
    await configManager.resetConfig();
    return await configManager.getConfig();
  } catch (error: any) {
    throw new Error(`Failed to reset config: ${error.message}`);
  }
}
