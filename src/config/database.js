require('dotenv').config();

const config = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT,
}

module.exports = {
  "development": config,
  "test": config,
  "production": config
};
