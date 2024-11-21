// src/models/user.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  /**
   * Sequelize User model representing a user in the database.
   * @typedef {import('sequelize').Model} User
   * @property {number} id - The unique identifier for the user (auto-incrementing).
   * @property {string} name - The unique username of the user.
   * @property {string} email - The unique email address of the user.
   * @property {string} passwordHash - The hashed password of the user.
   * @property {Date} createdAt - The timestamp when the user was created.
   * @property {Date} updatedAt - The timestamp when the user was last updated.
   */
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  return User;
};