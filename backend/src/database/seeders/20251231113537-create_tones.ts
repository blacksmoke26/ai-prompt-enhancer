/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { capitalCase } from 'case-anything';

import { QueryInterface, QueryTypes } from 'sequelize';

// constants
import { TONES_GROUPED } from '~/constants/tones';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    for await (const { category, tones } of TONES_GROUPED) {
      for await (const tone of tones) {
        const [result] = (await queryInterface.sequelize.query(
          `SELECT COUNT(*) as total FROM tones WHERE key = '${tone}'`,
          {
            type: QueryTypes.SELECT,
            raw: true,
          },
        )) as Awaited<[{ total: number }]>;

        const bulkRecords: object[] = [];

        if (!result.total) {
          bulkRecords.push({
            key: tone,
            name: capitalCase(tone).replaceAll('-', ' '),
            category: category,
            hidden: false,
          });
        }

        if (bulkRecords.length) {
          await queryInterface.bulkInsert('tones', bulkRecords);
        }
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  },
};
