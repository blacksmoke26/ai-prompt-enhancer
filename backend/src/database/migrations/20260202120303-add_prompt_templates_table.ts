/**
 * Migration: Create prompt_categories table
 *
 * This migration creates a `prompt_categories` table with columns to store prompt category
 * information. The `key` field is set as unique to ensure category uniqueness.
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { DataTypes, QueryInterface } from 'sequelize';

/**
 * Applies the migration logic to create the prompt_categories table.
 * This function creates a new table with columns for category management.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('prompt_templates',   {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier for the category',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Category for the prompt',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Title of the prompt',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Description of the prompt',
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Tags for the prompt',
      defaultValue: [],
    },
    tools: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: 'Tools associated with the prompt',
      defaultValue: [],
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: 'Content of the prompt',
    },
    variables: {
      type: DataTypes.JSON,
      allowNull: false,
      comment: 'Variables for the prompt',
      defaultValue: [],
    },
  });
};

/**
 * Reverts the migration by dropping the prompt_categories table.
 * This function is executed when the migration is rolled back.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const down = async (queryInterface: QueryInterface) => {
  //await queryInterface.removeIndex('prompt_templates', ['key']);
  await queryInterface.dropTable('prompt_templates');
};
