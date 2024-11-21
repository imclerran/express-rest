// src/models/refresh_token.model.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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