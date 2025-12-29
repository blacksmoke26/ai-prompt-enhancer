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
    // Add new columns for advanced enhancement features
    await queryInterface.addColumn(
      'enhancement_types',
      'parameters',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Configuration parameters for the enhancement type',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'chaining_enabled',
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Whether chaining of enhancement types is enabled',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'template_variables',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Template variables that can be replaced in system prompts',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'dependencies',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Dependencies on other enhancement types',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'metadata',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Additional metadata for the enhancement type',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'tags',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Tags for categorization and filtering',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'complexity',
      {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'basic',
        comment: 'Complexity level of the enhancement type',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'experimental',
      {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'Whether this enhancement type is experimental',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'example_usage',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Example usage for this enhancement type',
      },
      { transaction },
    );

    await queryInterface.addColumn(
      'enhancement_types',
      'performance',
      {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
        comment: 'Performance characteristics',
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
    await queryInterface.removeColumn('enhancement_types', 'parameters', {
      transaction,
    });
    await queryInterface.removeColumn('enhancement_types', 'chaining_enabled', {
      transaction,
    });
    await queryInterface.removeColumn(
      'enhancement_types',
      'template_variables',
      { transaction },
    );
    await queryInterface.removeColumn('enhancement_types', 'dependencies', {
      transaction,
    });
    await queryInterface.removeColumn('enhancement_types', 'metadata', {
      transaction,
    });
    await queryInterface.removeColumn('enhancement_types', 'tags', {
      transaction,
    });
    await queryInterface.removeColumn('enhancement_types', 'complexity', {
      transaction,
    });
    await queryInterface.removeColumn('enhancement_types', 'experimental', {
      transaction,
    });
    await queryInterface.removeColumn('enhancement_types', 'example_usage', {
      transaction,
    });
    await queryInterface.removeColumn('enhancement_types', 'performance', {
      transaction,
    });
  });
};
