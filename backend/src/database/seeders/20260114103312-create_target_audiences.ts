/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface } from 'sequelize';

// db
import { TargetAudience } from '~/database/models';

// constants
import targetAudiences from '~/constants/target-audience';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      for await (const targetAudience of targetAudiences) {
        const exists = await TargetAudience.count({where: {key: targetAudience.key}});

        if (!exists) {
          await TargetAudience.create(
            {
              key: targetAudience.key,
              label: targetAudience.label,
              summary: targetAudience.summary,
              description: targetAudience.description,
              tags: targetAudience.tags,
              category: targetAudience.category,
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
