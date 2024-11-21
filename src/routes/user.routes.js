const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/user.controller');
const { validateUpdateProfile } = require('../middleware/user.validation');
const authenticateJWT = require('../middleware/auth.middleware');

const router = express.Router();

// Add the protected route
router.route('/profile')
    .get(authenticateJWT, getUserDetails)
    .patch(authenticateJWT, validateUpdateProfile, updateUserDetails);

module.exports = router;