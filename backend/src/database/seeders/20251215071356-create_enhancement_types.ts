'use strict';

import {QueryInterface, QueryTypes} from 'sequelize';

// constants
import enhancementTypes from '~/constants/enhancement-types';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface) {
    for await (const enhancement of enhancementTypes) {
      const [result] = await queryInterface.sequelize.query(`SELECT COUNT(*) as total FROM enhancement_types WHERE key = '${enhancement.id}'`, {
        type: QueryTypes.SELECT,
        raw: true,
      }) as Awaited<[{ total: number }]>;

      const bulkRecords: object[] = [];

      if (!result.total) {
        bulkRecords.push({
          key: enhancement.id,
          name: enhancement.name,
          description: enhancement.description,
          system_prompt: enhancement.systemPrompt,
          category: enhancement.category,
        });
      }

      if (bulkRecords.length) {
        await queryInterface.bulkInsert('enhancement_types', bulkRecords);
      }
    }
  },

  async down(queryInterface: QueryInterface) {
    // do nothing
  }
};
