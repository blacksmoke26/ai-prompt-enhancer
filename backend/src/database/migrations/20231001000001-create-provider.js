/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('providers',   {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      apiKey: {
        field: 'api_key',
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      config: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
    await queryInterface.dropTable('providers');
  },
};
