/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// constants
import { enhancementTypes, EnhancementType } from '~/config/constants';

/**
 * Retrieves all available enhancement types for prompts
 * @returns Array of enhancement types
 */
export default async function getEnhancementTypes(): Promise<EnhancementType[]> {
  try {
    return enhancementTypes;
  } catch (error: any) {
    throw new Error(`Failed to get enhancement types: ${error.message}`);
  }
}
