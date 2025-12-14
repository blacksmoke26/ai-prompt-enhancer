'use strict';

import {QueryInterface, QueryTypes} from 'sequelize';
import configuration from '~/constants/configuration';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
for await (const config of configuration) {
      const [result] = await queryInterface.sequelize.query(`SELECT COUNT(*) as total FROM settings WHERE key = '${config.key}'`, {
        type: QueryTypes.SELECT,
        raw: true,
      }) as Awaited<[{ total: number }]>;

      const bulkRecords: object[] = [];

      if (!result.total) {
        bulkRecords.push({
          key: config.key,
          value: config.defaultValue,
          description: config.description,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      if (bulkRecords.length) {
        await queryInterface.bulkInsert('settings', bulkRecords);
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  }
};
