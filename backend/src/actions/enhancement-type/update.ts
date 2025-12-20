/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {EnhancementType, EnhancementTypeAttributes} from '~/database/models';

/**
 * Retrieves all available enhancement types for prompts
 * @returns Array of enhancement types
 */
export default async function update(key: string, updated: Partial<EnhancementTypeAttributes>): Promise<boolean> {
  const record = await EnhancementType.findOne({
    where: {key},
  });

  if (!record) {
    throw new Error(`Enhancement type ${key} not found`);
  }

  record.hidden = updated.hidden;
  await record.save();

  return true;
}
