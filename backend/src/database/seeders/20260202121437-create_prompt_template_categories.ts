/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface } from 'sequelize';

// db
import { PromptTemplateCategory } from '~/database/models';

// constants
import promptCategories from '~/constants/prompt-templates/template-categories';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async () => {
      for await (const category of promptCategories) {
        const exists = await PromptTemplateCategory.count({
          where: { key: category.key },
        });

        if (!exists) {
          await PromptTemplateCategory.create({
            key: category.key,
            label: category.label,
            description: category.description,
          });
        }
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
