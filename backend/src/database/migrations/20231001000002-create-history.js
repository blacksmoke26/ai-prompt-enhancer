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
   */
  up: async (queryInterface) => {
    await queryInterface.createTable('history', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      providerId: {
        field: 'provider_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      originalPrompt: {
        field: 'original_prompt',
        type: DataTypes.TEXT,
        allowNull: false,
      },
      enhancedPrompt: {
        field: 'enhanced_prompt',
        type: DataTypes.TEXT,
        allowNull: false,
      },
      model: {
        field: 'model',
        type: DataTypes.TEXT,
        allowNull: false,
      },
      enhancementType: {
        field: 'enhancement_type',
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      userRole: {
        field: 'user_role',
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      systemPrompt: {
        field: 'system_prompt',
        type: DataTypes.TEXT,
        allowNull: false,
      },
      tokensUsed: {
        field: 'tokens_used',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      processingTime: {
        field: 'processing_time',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temperature: {
        field: 'temperature',
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      maxTokens: {
        field: 'max_tokens',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        field: 'rating',
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      notes: {
        field: 'notes',
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      meta: {
        field: 'metadata',
        type: DataTypes.JSON,
        allowNull: true,
      },
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        comment: 'Created at',
        allowNull: true,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        comment: 'Updated at',
        allowNull: true,
      },
    });

    return queryInterface.addConstraint('history', {
      fields: ['provider_id'],
      type: 'foreign key',
      name: 'FK_history_provider_id_providers_id',
      references: {
        table: 'providers',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  /**
   * Reverts the migration by dropping tables or undoing schema changes.
   * This function is executed when the migration is rolled back, typically to remove tables or revert modifications.
   *
   * @param {import('sequelize').QueryInterface} queryInterface - Sequelize's query interface for database operations.
   */
  down: async (queryInterface) => {
    await queryInterface.removeConstraint('history', 'FK_history_provider_id_providers_id');
    await queryInterface.dropTable('history');
  },
};
