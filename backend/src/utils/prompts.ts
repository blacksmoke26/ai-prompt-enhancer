/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import userRoles from '~/constants/user-roles';
import enhancementTypes from '~/constants/enhancement-types';

/**
 * Converts the array of enhancement types into a record mapping each type's ID to its system prompt.
 *
 * This function iterates through the `enhancementTypes` array and creates a key-value pair
 * where the key is the enhancement type's ID and the value is the corresponding system prompt.
 * The resulting record is useful for quick lookups of system prompts by enhancement type ID.
 *
 * @returns {Record<string, string>} An object mapping enhancement type IDs to their system prompts.
 */
export const toEnhancementTypes = (): Record<string, string> => {
  const map: Record<string, string> = {};

  for (const enhancementType of enhancementTypes) {
    map[enhancementType.id] = enhancementType.systemPrompt;
  }

  return map;
}

/**
 * Converts the array of user roles into a record mapping each role's ID to its system prompt.
 *
 * This function processes the `userRoles` array and constructs a map where each user role's
 * ID serves as the key and its system prompt serves as the value. This transformation is
 * beneficial for efficiently accessing system prompts based on role IDs.
 *
 * @returns {Record<string, string>} An object mapping user role IDs to their system prompts.
 */
export const toUserRoles = (): Record<string, string> => {
  const map: Record<string, string> = {};

  for (const userRole of userRoles) {
    map[userRole.id] = userRole.systemPrompt;
  }

  return map;
}
