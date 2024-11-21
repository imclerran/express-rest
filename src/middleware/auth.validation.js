const { check } = require('express-validator');
const handleValidation = require('./validation.middleware');

// Registration validation rules
const validateRegistration = [
  check('email', 'Email is required and must be valid.')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password is required and must be at least 6 characters.')
    .isLength({ min: 8 }),
  check('name', 'Name is required and must be between 2 and 50 characters.')
    .isLength({ min: 2, max: 50 }),
  handleValidation,
];

// Login validation rules
const validateLogin = [
  check('email', 'Email is required and must be valid.')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password is required.').notEmpty(),
  handleValidation,
];

const validateRefreshToken = [
  check('refreshToken', 'Refresh token is required.').notEmpty(),
  handleValidation,
];

module.exports = { validateRegistration, validateLogin, validateRefreshToken };