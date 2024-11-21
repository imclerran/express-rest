'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oauth_providers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // refers to the 'users' table
          key: 'id',
        },
        onDelete: 'CASCADE', // When a user is deleted, delete their OAuth providers as well
      },
      provider: {
        type: Sequelize.STRING(50), // VARCHAR(50)
        allowNull: false,
      },
      providerId: {
        type: Sequelize.STRING(255), // VARCHAR(255)
        allowNull: false,
        unique: true, // Ensure the provider_id is unique
      },
      accessToken: {
        type: Sequelize.TEXT,
        allowNull: true, // Optional field
      },
      refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true, // Optional field
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW, // Default to current timestamp
      },
    });

    // Add indexes for performance optimization
    await queryInterface.addIndex('oauth_providers', ['userId', 'provider']);
    await queryInterface.addIndex('oauth_providers', ['providerId']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('oauth_providers');
  },
};
