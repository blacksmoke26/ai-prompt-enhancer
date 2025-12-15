'use strict';

import {QueryInterface, QueryTypes} from 'sequelize';

// constants
import userRoles from '~/constants/user-roles';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    for await (const role of userRoles) {
      const [result] = await queryInterface.sequelize.query(`SELECT COUNT(*) as total FROM user_roles WHERE key = '${role.id}'`, {
        type: QueryTypes.SELECT,
        raw: true,
      }) as Awaited<[{ total: number }]>;

      const bulkRecords: object[] = [];

      if (!result.total) {
        bulkRecords.push({
          key: role.id,
          name: role.name,
          description: role.description,
          system_prompt: role.systemPrompt,
          category: role.category,
        });
      }

      if (bulkRecords.length) {
        await queryInterface.bulkInsert('user_roles', bulkRecords);
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  }
};
