const { body } = require('express-validator');
const handleValidation = require('./validation.middleware');

const validateUpdateProfile = [
  body('name')
    .optional()
    .isString()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Must be a valid email'),
  body('newPassword')
    .optional()
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long'),
  body('currentPassword')
    .optional()
    .custom((value, { req }) => {
      if (req.body.newPassword && !value) {
        throw new Error('Current password is required when updating password');
      }
      return true;
    }),
  handleValidation,
];

module.exports = { validateUpdateProfile };