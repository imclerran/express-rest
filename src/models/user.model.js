// src/models/user.model.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/app_database');

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
  tableName: 'users', // Sequelize will automatically use the plural form unless specified
  timestamps: true,
});

module.exports = User;