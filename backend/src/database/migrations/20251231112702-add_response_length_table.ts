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
      'response_length',
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shortDescription: {
          field: 'short_description',
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
        parameters: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: {},
        },
        tags: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        tone: {
          type: DataTypes.STRING(50),
          allowNull: false,
          defaultValue: 'neutral',
        },
        hidden: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      { transaction },
    );

    await queryInterface.addIndex('response_length', ['key'], {
      type: 'UNIQUE',
      name: 'UNQ_response_length_key',
      transaction,
    });

    await queryInterface.addIndex('response_length', ['hidden'], {
      using: 'HASH',
      name: 'IDX_response_length_hidden',
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
    await queryInterface.dropTable('response_length', { transaction });
    await queryInterface.removeIndex('response_length', 'UNQ_response_length_key', { transaction });
    await queryInterface.removeIndex('response_length', 'IDX_response_length_hidden', {
      transaction,
    });
  });
};
