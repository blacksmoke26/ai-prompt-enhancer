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
    // Add new columns to history table
    await queryInterface.addColumn(
      'history',
      'target_audience',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Target audience for the response',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'tone',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Desired tone for the AI response',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'response_length',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Preferred length of the response',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'custom_instructions',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Additional user instructions for the AI',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'enhancement_parameters',
      {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
        comment: 'Parameters for the enhancement type',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'format',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Output format for the enhanced response',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'timestamp',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Timestamp when the request was made',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'top_p',
      {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null,
        comment: 'Top-p sampling parameter',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'top_k',
      {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null,
        comment: 'Top-k sampling parameter',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'stop_sequences',
      {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: null,
        comment: 'Stop sequences for generation',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'frequency_penalty',
      {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null,
        comment: 'Frequency penalty parameter',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'presence_penalty',
      {
        type: DataTypes.NUMBER,
        allowNull: true,
        defaultValue: null,
        comment: 'Presence penalty parameter',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'history',
      'conversation_id',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        comment: 'Conversation ID for context',
      },
      { transaction },
    );
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
    // Remove the added columns
    await queryInterface.removeColumn('history', 'target_audience', {
      transaction,
    });
    await queryInterface.removeColumn('history', 'tone', { transaction });
    await queryInterface.removeColumn('history', 'response_length', {
      transaction,
    });
    await queryInterface.removeColumn('history', 'custom_instructions', {
      transaction,
    });
    await queryInterface.removeColumn('history', 'enhancement_parameters', {
      transaction,
    });
    await queryInterface.removeColumn('history', 'format', { transaction });
    await queryInterface.removeColumn('history', 'timestamp', { transaction });
    await queryInterface.removeColumn('history', 'top_p', { transaction });
    await queryInterface.removeColumn('history', 'top_k', { transaction });
    await queryInterface.removeColumn('history', 'stop_sequences', {
      transaction,
    });
    await queryInterface.removeColumn('history', 'frequency_penalty', {
      transaction,
    });
    await queryInterface.removeColumn('history', 'presence_penalty', {
      transaction,
    });
    await queryInterface.removeColumn('history', 'conversation_id', {
      transaction,
    });
  });
};
