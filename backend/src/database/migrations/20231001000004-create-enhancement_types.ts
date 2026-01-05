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
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable(
      'enhancement_types',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        key: {
          type: DataTypes.STRING,
          primaryKey: false,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shortDescription: {
          field: 'short_description',
          type: DataTypes.TEXT,
          allowNull: false,
        },
        longDescription: {
          field: 'long_description',
          type: DataTypes.TEXT,
          allowNull: false,
        },
        systemPrompt: {
          field: 'system_prompt',
          type: DataTypes.TEXT,
          allowNull: false,
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
        parameters: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: {},
        },
        chainingEnabled: {
          field: 'chaining_enabled',
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        templateVariables: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: [],
        },
        dependencies: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: [],
        },
        metadata: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: {},
        },
        tags: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: [],
        },
        complexity: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'basic',
        },
        experimental: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        exampleUsage: {
          field: 'example_usage',
          type: DataTypes.TEXT,
          allowNull: true,
          defaultValue: null,
        },
        performance: {
          type: DataTypes.JSON,
          allowNull: true,
          defaultValue: {},
        },
      },
      { transaction },
    );

    await queryInterface.addIndex('enhancement_types', ['key'], {
      type: 'UNIQUE',
      transaction,
    });
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
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.removeIndex('enhancement_types', ['key'], {
      transaction,
    });
    await queryInterface.dropTable('enhancement_types', { transaction });
  });
};
