/**
 * Migration: Add prompt column to history_responses table
 *
 * This migration adds a `prompt` text column to the `history_responses` table to store
 * the original prompt text associated with history entries.
 * 
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { DataTypes, QueryInterface } from 'sequelize';

/**
 * Applies the migration logic to add a new column to history_responses table.
 * This function adds a prompt column for enhanced functionality.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.addColumn('history_responses', 'prompt', {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
    comment: 'Original prompt text associated with this history response',
  });
};

/**
 * Reverts the migration by removing the prompt column from history_responses table.
 * This function is executed when the migration is rolled back.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeColumn('history_responses', 'prompt');
};