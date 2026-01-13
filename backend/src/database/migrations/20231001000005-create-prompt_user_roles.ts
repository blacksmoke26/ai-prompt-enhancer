/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */
import { QueryInterface } from 'sequelize';

const { DataTypes } = require('sequelize');

/**
 * Applies the migration logic to create or modify database schema.
 * This function is executed when the migration is run, typically to create tables or update schema.
 *
 * @param {import('sequelize').QueryInterface} queryInterface - Sequelize's query interface for database operations.
 *
 * @example
 * // Example: Creating a 'Users' table
 * queryInterface.createTable('Users', {
 *   id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
 *   name: { type: Sequelize.STRING, allowNull: false }
 * });
 *
 * @developerNotes
 * - Use `queryInterface` for database operations (e.g., createTable, alterTable).
 * - Ensure compatibility with Sequelize version by using its utility methods.
 * - Avoid direct SQL queries; use Sequelize's abstraction for portability.
 */
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('prompt_user_roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'The primary key of the role. Auto-incremented by the database',
    },
    key: {
      type: DataTypes.STRING,
      primaryKey: false,
      allowNull: false,
      comment: 'A unique identifier for the role',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'The human-readable name of the role',
    },
    systemPrompt: {
      field: 'system_prompt',
      type: DataTypes.TEXT,
      allowNull: false,
      comment: `A detailed and comprehensive system-specific prompt or instruction associated with the role`,
    },
    systemPromptShort: {
      field: 'system_prompt_short',
      type: DataTypes.TEXT,
      allowNull: false,
      comment: `A concise, one-line summary of the role's primary function`,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      field: 'short_description',
      allowNull: false,
      comment: `A concise, one-line summary of the role's primary function`,
    },
    longDescription: {
      type: DataTypes.TEXT,
      field: 'long_description',
      allowNull: false,
      comment: `A more detailed description of the role's responsibilities`,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: ` A category grouping similar roles`,
    },
    expertiseLevel: {
      type: DataTypes.STRING(25),
      field: 'expertise_level',
      allowNull: false,
      defaultValue: 'Mid',
      comment: 'The expertise level of the person',
    },
    tone: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      comment: 'The tone or style the model should use in its responses',
    },
    capabilities: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      comment: 'The capabilities the model should prioritize or utilize',
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
      comment: `Tags or labels associated with the model's output or purpose`,
    },
    temperature: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0.7,
      comment: `The temperature parameter controlling the model's randomness and creativity.`,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: `A flag indicating whether the user role is hidden from the user interface.`,
    },
  });

  await queryInterface.addIndex('prompt_user_roles', ['key'], {
    type: 'UNIQUE',
  });
};

/**
 * Reverts the migration by dropping tables or undoing schema changes.
 * This function is executed when the migration is rolled back, typically to remove tables or revert modifications.
 *
 * @param {import('sequelize').QueryInterface} queryInterface - Sequelize's query interface for database operations.   *
 *
 * @example
 * // Example: Dropping the 'Users' table
 * queryInterface.dropTable('Users');
 *
 * @developerNotes
 * - Use `queryInterface` for reversing operations (e.g., dropTable, alterTable).
 * - Ensure compatibility with Sequelize version by using its utility methods.
 * - Avoid direct SQL queries; use Sequelize's abstraction for portability.
 */
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeIndex('prompt_user_roles', ['key']);
  await queryInterface.dropTable('prompt_user_roles');
};
