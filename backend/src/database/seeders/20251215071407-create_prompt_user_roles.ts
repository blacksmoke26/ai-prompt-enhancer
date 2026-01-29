/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface } from 'sequelize';

// db
import { ExpertiseLevel, PromptUserRole } from '~/database/models';

// constants
import promptUserRoles from '~/constants/prompt-user-roles';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async () => {
      for await (const role of promptUserRoles) {
        const exists = await PromptUserRole.count({where: {key: role.id}});

        if (!exists) {
          await PromptUserRole.create(
            {
              key: role.id,
              name: role.name,
              systemPrompt: role.systemPrompt as string,
              systemPromptShort: role.systemPromptShort as string,
              shortDescription: role.shortDescription,
              longDescription: role.longDescription,
              category: role.category,
              expertiseLevel: role.expertiseLevel as ExpertiseLevel,
              tone: role.tone as string[],
              capabilities: role.capabilities as string[],
              tags: role.tags as string[],
              temperature: role.temperature as number,
              constraints: role.constraints as string[],
              tools: role.tools as string[],
              hidden: false
            },
          );
        }
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
