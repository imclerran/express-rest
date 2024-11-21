const { check } = require('express-validator');

// Registration validation rules
const validateRegistration = [
  check('email', 'Email is required and must be valid.')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password is required and must be at least 6 characters.')
    .isLength({ min: 8 }),
  check('name', 'Name is required and must be between 2 and 50 characters.')
    .isLength({ min: 2, max: 50 }),
];

// Login validation rules
const validateLogin = [
  check('email', 'Email is required and must be valid.')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password is required.').notEmpty(),
];

const validateRefreshToken = [
  check('refreshToken', 'Refresh token is required.').notEmpty(),
];

module.exports = { validateRegistration, validateLogin, validateRefreshToken };