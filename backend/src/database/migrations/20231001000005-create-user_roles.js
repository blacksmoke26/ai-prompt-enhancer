/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

const { DataTypes } = require('sequelize');

module.exports = {
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
  up: async (queryInterface) => {
    await queryInterface.createTable('user_roles',     {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
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
      description: {
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
    });

    await queryInterface.addIndex('user_roles', ['key'], {
      type: 'UNIQUE'
    });
  },

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
  down: async (queryInterface) => {
    await queryInterface.removeIndex('user_roles', ['key']);
    await queryInterface.dropTable('user_roles');
  },
};
