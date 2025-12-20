/**
 * @author Junaid Atari <mj.atari@gmail.com>
 * @copyright 2025 Junaid Atari
 * @see https://github.com/blacksmoke26
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Adds a 'hidden' boolean column to 'enhancement_types' and 'user_roles' tables.
   * @param {import('sequelize').QueryInterface} queryInterface - Sequelize query interface
   * @param {import('sequelize')} Sequelize - Sequelize constructor
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('enhancement_types', 'hidden', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('user_roles', 'hidden', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  /**
   * Removes the 'hidden' column from 'enhancement_types' and 'user_roles' tables.
   * @param {import('sequelize').QueryInterface} queryInterface - Sequelize query interface
   * @param {import('sequelize')} Sequelize - Sequelize constructor
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('enhancement_types', 'hidden');
    await queryInterface.removeColumn('user_roles', 'hidden');
  }
};
