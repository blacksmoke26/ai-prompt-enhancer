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
      'history_responses',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        historyId: {
          field: 'history_id',
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        response: {
          field: 'response',
          type: DataTypes.TEXT,
          allowNull: false,
        },
        createdAt: {
          field: 'created_at',
          type: DataTypes.DATE,
          comment: 'Created at',
          allowNull: true,
        },
        updatedAt: {
          field: 'updated_at',
          type: DataTypes.DATE,
          comment: 'Updated at',
          allowNull: true,
        },
      },
      { transaction },
    );

    await queryInterface.addConstraint('history_responses', {
      fields: ['history_id'],
      type: 'foreign key',
      name: 'FK_history_responses_id_history_id',
      references: {
        table: 'history',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
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
    await queryInterface.removeConstraint(
      'history_responses',
      'FK_history_responses_id_history_id',
      { transaction },
    );
    await queryInterface.dropTable('history_responses', { transaction });
  });
};
