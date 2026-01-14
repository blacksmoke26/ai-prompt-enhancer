/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { DataTypes, QueryInterface } from 'sequelize';

/**
 * Applies the migration logic to add new columns to enhancement_types table.
 * This function adds advanced columns for enhanced functionality.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable(
      'target_audiences',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        key: {
          type: DataTypes.STRING(50),
          primaryKey: false,
          allowNull: false,
        },
        label: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        summary: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tags: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        hidden: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      { transaction },
    );

    await queryInterface.addIndex('target_audiences', ['key'], {
      type: 'UNIQUE',
      name: 'UNQ_target_audiences_key',
      transaction,
    });

    await queryInterface.addIndex('target_audiences', ['hidden'], {
      using: 'HASH',
      name: 'IDX_target_audiences_hidden',
      transaction,
    });
  });
};

/**
 * Reverts the migration by removing the added columns.
 * This function is executed when the migration is rolled back.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('target_audiences', { transaction });
    await queryInterface.removeIndex('target_audiences', 'UNQ_target_audiences_key', { transaction });
    await queryInterface.removeIndex('target_audiences', 'IDX_target_audiences_hidden', {
      transaction,
    });
  });
};
