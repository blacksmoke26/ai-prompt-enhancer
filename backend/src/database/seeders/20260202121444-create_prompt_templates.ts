/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface, Op } from 'sequelize';

// db
import {
  PromptTemplate,
  PromptTemplateCategory,
} from '~/database/models';

// constants
import templatesList01 from '~/constants/prompt-templates/templates-01';
import templatesList02 from '~/constants/prompt-templates/templates-02';
import templatesList03 from '~/constants/prompt-templates/templates-03';
import templatesList04 from '~/constants/prompt-templates/templates-04';
import templatesList05 from '~/constants/prompt-templates/templates-05';
import templatesList06 from '~/constants/prompt-templates/templates-06';
import templatesList07 from '~/constants/prompt-templates/templates-07';
import templatesList08 from '~/constants/prompt-templates/templates-08';
import templatesList09 from '~/constants/prompt-templates/templates-09';
import templatesList10 from '~/constants/prompt-templates/templates-10';
import templatesList11 from '~/constants/prompt-templates/templates-11';
import templatesList12 from '~/constants/prompt-templates/templates-12';
import templatesList13 from '~/constants/prompt-templates/templates-13';
import templatesList14 from '~/constants/prompt-templates/templates-14';
import templatesList15 from '~/constants/prompt-templates/templates-15';
import templatesList16 from '~/constants/prompt-templates/templates-16';
import templatesList17 from '~/constants/prompt-templates/templates-17';
import templatesList18 from '~/constants/prompt-templates/templates-18';
import templatesList19 from '~/constants/prompt-templates/templates-19';
import templatesList20 from '~/constants/prompt-templates/templates-20';
import templatesList21 from '~/constants/prompt-templates/templates-21';
import templatesList22 from '~/constants/prompt-templates/templates-22';
import templatesList23 from '~/constants/prompt-templates/templates-23';
import templatesList24 from '~/constants/prompt-templates/templates-24';
import templatesList25 from '~/constants/prompt-templates/templates-25';
import templatesList26 from '~/constants/prompt-templates/templates-26';
import templatesList27 from '~/constants/prompt-templates/templates-27';
import templatesList28 from '~/constants/prompt-templates/templates-28';

const fullList = [
  ...templatesList01,
  ...templatesList02,
  ...templatesList03,
  ...templatesList04,
  ...templatesList05,
  ...templatesList06,
  ...templatesList07,
  ...templatesList08,
  ...templatesList09,
  ...templatesList10,
  ...templatesList11,
  ...templatesList12,
  ...templatesList13,
  ...templatesList14,
  ...templatesList15,
  ...templatesList16,
  ...templatesList17,
  ...templatesList18,
  ...templatesList19,
  ...templatesList20,
  ...templatesList21,
  ...templatesList22,
  ...templatesList23,
  ...templatesList24,
  ...templatesList25,
  ...templatesList26,
  ...templatesList27,
  ...templatesList28,
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
              where: {
                [Op.or]: [
                  { key: template.category },
                  { label: template.category },
                ],
              },
              raw: true,
            });

            if (!category) {
              throw new Error(`Category '${template.category}' does not exist`);
            }

            categoryIds[template.category] = +category.id;
          }

          await PromptTemplate.create({
            title: template.title,
            categoryId: categoryIds[template.category],
            tools: template?.tools ?? [],
            // @ts-ignore
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
