/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface } from 'sequelize';

// db
import {
  PromptTemplate,
  PromptTemplateCategory,
  TargetAudience,
} from '~/database/models';

// constants
import templatesList1 from '~/constants/prompt-templates/templates-01';
import templatesList2 from '~/constants/prompt-templates/templates-02';
import templatesList3 from '~/constants/prompt-templates/templates-03';
import templatesList4 from '~/constants/prompt-templates/templates-04';

const fullList = [
  ...templatesList1,
  ...templatesList2,
  ...templatesList3,
  ...templatesList4,
];

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async () => {
      const categoryIds: Record<string, number> = {};

      for await (const template of fullList) {
        const exists = await PromptTemplate.count({
          where: { title: template.title },
        });

        if (!exists) {
          if (!(template.category in categoryIds)) {
            const category = await PromptTemplateCategory.findOne({
              attributes: ['id'],
              where: { key: template.category },
              raw: true,
            });

            if (!category) {
              throw new Error('Category does not exist');
            }

            categoryIds[template.category] = +category.id;
          }

          await PromptTemplate.create({
            title: template.title,
            categoryId: categoryIds[template.category],
            tools: template?.tools ?? [],
            variables: template?.variables ?? [],
            description: template.description,
            tags: template.tags,
            content: template.content,
          });
        }
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
