/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// db
import {UserRole} from '~/database/models';

// constants
import {UserRole as UsrRole} from '~/constants/user-roles';

/**
 * Retrieves all available enhancement types for prompts
 * @returns Array of enhancement types
 */
export default async function getUserRoles(): Promise<UsrRole[]> {
  try {
    const userRoles = await UserRole.findAll({
      attributes: ['key', 'name', 'description', 'systemPrompt', 'category', 'hidden'],
      order: [['id', 'ASC']],
      raw: true,
    });

    return userRoles.map(userRole => ({
      id: userRole.key,
      name: userRole.name,
      description: userRole.description,
      systemPrompt: userRole.systemPrompt,
      category: userRole.category,
      hidden: userRole.hidden,
    }));
  } catch (error: any) {
    throw new Error(`Failed to get user roles: ${error.message}`);
  }
}
