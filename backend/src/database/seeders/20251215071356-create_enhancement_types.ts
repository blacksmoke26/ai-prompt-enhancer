/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface, QueryTypes } from 'sequelize';

// db
import { Complexity, EnhancementType } from '~/database/models';

// constants
import enhancementTypes from '~/constants/enhancement-types';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      for await (const enhancement of enhancementTypes) {
        const count = await EnhancementType.count({
          where: { key: enhancement.id },
          transaction,
        });

        if (!count) {
          await EnhancementType.create({
            key: enhancement.id,
            name: enhancement.name,
            shortDescription: enhancement.shortDescription,
            longDescription: enhancement.longDescription,
            systemPrompt: enhancement.systemPrompt,
            category: enhancement.category,
            chainingEnabled: enhancement.chainingEnabled,
            templateVariables: enhancement.templateVariables,
            dependencies: enhancement.dependencies,
            metadata: enhancement.metadata,
            tags: enhancement.tags,
            complexity: enhancement.complexity as Complexity,
            experimental: enhancement.experimental,
            exampleUsage: enhancement.exampleUsage,
            performance: enhancement.performance,
            hidden: false,
          }, {
            transaction,
          });
        }
      }
    });
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
