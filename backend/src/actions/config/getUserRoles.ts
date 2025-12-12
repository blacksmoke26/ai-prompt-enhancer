/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

// constants
import userRoles, {UserRole} from '~/constants/user-roles';

/**
 * Retrieves all defined user roles in the system
 * @returns Array of user roles
 */
export default async function getUserRoles(): Promise<UserRole[]> {
  try {
    return userRoles;
  } catch (error: any) {
    throw new Error(`Failed to get user roles: ${error.message}`);
  }
}
