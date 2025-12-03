/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { ConfigManager } from '~/config/ConfigManager';

// utils
import { configUpdateSchema } from '~/utils/validation';
import {AppConfig} from '~/types';

/**
 * Updates the application configuration with validated changes
 * @param configManager - Instance of ConfigManager
 * @param updates - Configuration updates to apply
 * @returns The updated configuration object
 */
export default async function updateConfig(configManager: ConfigManager, updates: Record<string, any>): Promise<AppConfig> {
  try {
    const { error, value } = configUpdateSchema.validate(updates);
    if (error) {
      throw new Error(`Validation failed: ${error.details.map(detail => detail.message).join(', ')}`);
    }

    configManager.updateConfig(value);
    return configManager.getConfig();
  } catch (error: any) {
    throw new Error(`Failed to update config: ${error.message}`);
  }
}
