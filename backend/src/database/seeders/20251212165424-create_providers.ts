/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

'use strict';

import {QueryInterface, QueryTypes, Sequelize} from 'sequelize';

// constants
import providers from '~/constants/providers';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    for await (const provider of providers) {
      const {caption, name, apiKey, ...config} = provider;

      const [result] = await queryInterface.sequelize.query(`SELECT COUNT(*) as total FROM providers WHERE name = '${name}'`, {
        type: QueryTypes.SELECT,
        raw: true,
      }) as Awaited<[{ total: number }]>;

      const bulkRecords: object[] = [];

      if (!result.total) {
        bulkRecords.push({
          caption,
          name,
          config: JSON.stringify(config),
          enabled: false,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      if (bulkRecords.length) {
        await queryInterface.bulkInsert('providers', bulkRecords);
      }
    }
  },

  async down(queryInterface: QueryInterface, sequelize: Sequelize) {
    // do nothing
  },
};
