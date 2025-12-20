/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {UserRole, UserRoleAttributes} from '~/database/models';

/**
 * Retrieves all available enhancement types for prompts
 * @returns Array of enhancement types
 */
export default async function update(key: string, updated: Partial<UserRoleAttributes>): Promise<boolean> {
  const record = await UserRole.findOne({
    where: {key},
  });

  if (!record) {
    throw new Error(`User role ${key} not found`);
  }

  record.hidden = updated.hidden;
  await record.save();

  return true;
}
