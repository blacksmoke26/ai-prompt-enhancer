/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('history',   {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      providerId: {
        field: 'provider_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'Provider', key: 'id' },
        onDelete: 'CASCADE',
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
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userRole: {
        field: 'user_role',
        type: DataTypes.TEXT,
        allowNull: false,
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('history');
  },
};
