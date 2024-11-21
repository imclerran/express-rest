const { body } = require('express-validator');
const handleValidation = require('./handleValidation');

const validateUpdateProfile = [
  body('email').optional().isEmail().withMessage('Must be a valid email'),
  body('name').optional().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  handleValidation,
];

module.exports = { validateUpdateProfile };