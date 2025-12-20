/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {EnhancementType} from '~/database/models';

// constants
import {EnhancementType as EnhType} from '~/constants/enhancement-types';

/**
 * Retrieves all available enhancement types for prompts
 * @returns Array of enhancement types
 */
export default async function getEnhancementTypes(): Promise<EnhType[]> {
  try {
    const enhancementTypes = await EnhancementType.findAll({
      attributes: ['id', 'key', 'name', 'description', 'systemPrompt', 'category', 'hidden'],
      order: [['id', 'ASC']],
      raw: true,
    });

    return enhancementTypes.map(enhancementType => ({
      id: enhancementType.key,
      name: enhancementType.name,
      description: enhancementType.description,
      systemPrompt: enhancementType.systemPrompt,
      category: enhancementType.category,
      hidden: enhancementType.hidden,
    }));
  } catch (error: any) {
    throw new Error(`Failed to get enhancement types: ${error.message}`);
  }
}
