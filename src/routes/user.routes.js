const express = require('express');
const { getUserDetails, updateUserDetails } = require('../controllers/user.controller');
const authenticateJWT = require('../middleware/auth.middleware');

const router = express.Router();

// Add the protected route
router.route('/profile')
    .get(authenticateJWT, getUserDetails)
    .patch(authenticateJWT, updateUserDetails);

//router.get('/profile', authenticateJWT, getUserDetails);

module.exports = router;