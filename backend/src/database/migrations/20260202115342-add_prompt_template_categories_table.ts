/**
 * Migration: Create prompt_template_categories table
 *
 * This migration creates a `prompt_template_categories` table with columns to store prompt category
 * information. The `key` field is set as unique to ensure category uniqueness.
 *
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

import { DataTypes, QueryInterface } from 'sequelize';

/**
 * Applies the migration logic to create the prompt_template_categories table.
 * This function creates a new table with columns for category management.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable('prompt_template_categories', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: 'Unique identifier for the category',
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Unique identifier for the category',
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Display name of the category',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'Description of the category',
    },
  });

  await queryInterface.addIndex('prompt_template_categories', ['key'], {
    unique: true,
    name: 'UNQ_key',
  });
};

/**
 * Reverts the migration by dropping the prompt_template_categories table.
 * This function is executed when the migration is rolled back.
 *
 * @param queryInterface - Sequelize's query interface for database operations.
 */
export const down = async (queryInterface: QueryInterface) => {
  await queryInterface.removeIndex('prompt_template_categories', ['key']);
  await queryInterface.dropTable('prompt_template_categories');
};
