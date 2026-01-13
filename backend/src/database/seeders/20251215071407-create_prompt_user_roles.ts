/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface, QueryTypes } from 'sequelize';

// db
import { ExpertiseLevel, PromptUserRole } from '~/database/models';

// constants
import promptUserRoles from '~/constants/prompt-user-roles';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      for await (const role of promptUserRoles) {
        const [result] = (await queryInterface.sequelize.query(
          `SELECT COUNT(*) as total FROM prompt_user_roles WHERE key = '${role.id}'`,
          {
            type: QueryTypes.SELECT,
            raw: true,
          },
        )) as Awaited<[{ total: number }]>;

        if (!result.total) {
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
              hidden: false
            },
            { transaction },
          );
        }
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
