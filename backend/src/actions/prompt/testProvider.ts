/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// classes
import { AIProviderManager } from '~/services/AIProviderManager';

/**
 * Tests if a specific provider is available
 * @param providerManager - Instance of AIProviderManager
 * @param providerName - Name of the provider to test
 * @returns Boolean indicating if provider is available
 */
export default async function testProvider(providerManager: AIProviderManager, providerName: string): Promise<boolean> {
  try {
    return await providerManager.testProvider(providerName);
  } catch (error: any) {
    throw new Error(`Provider test failed: ${error.message}`);
  }
}
