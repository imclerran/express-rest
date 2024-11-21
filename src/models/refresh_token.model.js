// src/models/refresh_token.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  /**
   * Represents a RefreshToken model in the database.
   * @typedef {import('sequelize').Model} RefreshToken
   * @property {number} id - The unique identifier for the refresh token.
   * @property {string} token - The refresh token string value.
   * @property {number} userId - The ID of the user this refresh token belongs to.
   * @property {Date} createdAt - Timestamp when the refresh token was created.
   * @property {Date} updatedAt - Timestamp when the refresh token was last updated.
   */
  const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // refers to the 'users' table
        key: 'id',
      },
      onDelete: 'CASCADE', // When a user is deleted, delete their refresh tokens as well
    },
  }, {
    tableName: 'refresh_tokens',
    timestamps: true,
  });

  return RefreshToken;
}