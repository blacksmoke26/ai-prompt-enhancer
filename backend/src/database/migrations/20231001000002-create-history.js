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
      prompt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      response: {
        type: DataTypes.TEXT,
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
