/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { capitalCase } from 'case-anything';
import { QueryInterface, QueryTypes } from 'sequelize';

// constants
import { RESPONSE_LENGTH_GROUPED } from '~/constants/response-length';

const noConversion: string[] = ['TL;DR'];

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    for await (const { category, values } of RESPONSE_LENGTH_GROUPED) {
      for await (const responseLength of values) {
        const [result] = (await queryInterface.sequelize.query(
          `SELECT COUNT(*) as total FROM response_length WHERE key = '${responseLength}'`,
          {
            type: QueryTypes.SELECT,
            raw: true,
          },
        )) as Awaited<[{ total: number }]>;

        const bulkRecords: object[] = [];

        if (!result.total) {
          bulkRecords.push({
            key: responseLength,
            name: !noConversion.includes(responseLength)
              ? capitalCase(responseLength).replaceAll('-', ' ')
              : responseLength,
            category: category,
            hidden: false,
          });
        }

        if (bulkRecords.length) {
          await queryInterface.bulkInsert('response_length', bulkRecords);
        }
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
