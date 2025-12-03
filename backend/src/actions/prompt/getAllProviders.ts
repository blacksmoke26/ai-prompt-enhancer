/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { AIProviderManager } from '~/services/AIProviderManager';

// types
import type {AIProvider} from '~/types';

/**
 * Retrieves all registered AI providers
 * @param providerManager - Instance of AIProviderManager
 * @returns Array of registered providers
 */
export default async function getAllProviders(providerManager: AIProviderManager): Promise<AIProvider[]> {
  try {
    return await providerManager.getAllProviders();
  } catch (error: any) {
    throw new Error(`Failed to get providers: ${error.message}`);
  }
}
