/**
 * Migration: Add prompt column to prompt_user_roles table
 *
 * This migration adds a `prompt` text column to the `prompt_user_roles` table to store
 * the original prompt text associated with history entries.
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { DataTypes, QueryInterface } from 'sequelize';

/**
 * Applies the migration logic to add a new column to prompt_user_roles table.
 * This function adds a prompt column for enhanced functionality.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.addColumn('prompt_user_roles', 'constraints', {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    comment: `Strict negative constraints or rules the persona must obey`,
  });

  await queryInterface.addColumn('prompt_user_roles', 'tools', {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    comment: `Specific external tools or APIs the persona is assumed to have access to`,
  });
};

/**
 * Reverts the migration by removing the prompt column from prompt_user_roles table.
 * This function is executed when the migration is rolled back.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeColumn('prompt_user_roles', 'constraints');
  await queryInterface.removeColumn('prompt_user_roles', 'tools');
};
