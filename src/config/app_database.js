const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DEV_DB_NAME,
    process.env.DEV_DB_USER,
    process.env.DEV_DB_PASS,
    {
        host: 'localhost',
        dialect: 'postgres',
    }
);

module.exports = sequelize;