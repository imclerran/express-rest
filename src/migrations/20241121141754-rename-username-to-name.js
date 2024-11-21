'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Rename the column 'username' to 'name' in the 'users' table
    await queryInterface.renameColumn('users', 'username', 'name');
  },

  async down (queryInterface, Sequelize) {
    // Revert the column name change
    await queryInterface.renameColumn('users', 'name', 'username');
  }
};
