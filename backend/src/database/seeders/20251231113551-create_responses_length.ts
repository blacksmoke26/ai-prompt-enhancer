/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { QueryInterface } from 'sequelize';

// db
import { ResponseLength, ResponseLengthTone } from '~/database/models';

// constants
import { RESPONSE_LENGTH_GROUPED } from '~/constants/response-length';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    for await (const { category, values } of RESPONSE_LENGTH_GROUPED) {
      for await (const value of values) {
        const count = await ResponseLength.count({
          where: { key: value.key },
        });

        if (!count) {
          await ResponseLength.create({
            key: value.key,
            name: value.label,
            category: category,
            shortDescription: value.shortDescription,
            summary: value.summary,
            description: value.description,
            parameters: value.parameters,
            tags: value.tags,
            tone: value.tone as ResponseLengthTone,
            hidden: false,
          });
        }
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
