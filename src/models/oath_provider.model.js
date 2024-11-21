const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  /**
   * Sequelize model representing refresh tokens used in authentication.
   * @typedef {import('sequelize').Model} RefreshToken
   * @property {number} id - The primary key for the refresh token.
   * @property {string} token - The unique refresh token string.
   * @property {number} userId - Foreign key referencing the user who owns this refresh token.
   * @property {Date} createdAt - Timestamp of when the refresh token was created.
   * @property {Date} updatedAt - Timestamp of when the refresh token was last updated.
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