/**
 * Migration: Add pinned column to history table
 *
 * This migration adds a `pinned` boolean column to the `history` table to enable
 * users to pin specific history entries for quick access.
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { DataTypes, QueryInterface } from 'sequelize';

/**
 * Applies the migration logic to add new columns to history table.
 * This function adds a pinned column for enhanced functionality.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.addColumn('history', 'pinned', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Indicates whether this history entry is pinned for quick access',
  });
};

/**
 * Reverts the migration by removing the added columns.
 * This function is executed when the migration is rolled back.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeColumn('history', 'pinned');
};
