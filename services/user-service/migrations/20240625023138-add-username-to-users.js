"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the username column to the Users table
    await queryInterface.addColumn("Users", "username", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    // Remove the username column from the Users table
    await queryInterface.removeColumn("Users", "username");
  },
};
