const { DataTypes } = require('sequelize');
const sequelize = require('../config/app_database');

const OAuthProvider = sequelize.define('OAuthProvider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // refers to the 'users' table
      key: 'id',
    },
    onDelete: 'CASCADE', // When a user is deleted, delete their OAuth providers as well
  },
  provider: {
    type: DataTypes.STRING(50), // VARCHAR(50)
    allowNull: false,
  },
  providerId: {
    type: DataTypes.STRING(255), // VARCHAR(255)
    allowNull: false,
    unique: true, // Ensure the provider_id is unique
  },
  accessToken: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional field
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true, // Optional field
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Default to current timestamp
  },
}, {
  tableName: 'oauth_providers',
  timestamps: false, // We're managing the created_at column manually
});

module.exports = OAuthProvider;