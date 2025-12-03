/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { AIProviderManager } from '~/services/AIProviderManager';

// types
import type {AIModel} from '~/types';

/**
 * Retrieves all available models from all providers
 * @param providerManager - Instance of AIProviderManager
 * @returns Array of available models from all providers
 */
export default async function getAllModels(providerManager: AIProviderManager): Promise<AIModel[]> {
  try {
    return await providerManager.getAllModels();
  } catch (error: any) {
    throw new Error(`Failed to get models: ${error.message}`);
  }
}
