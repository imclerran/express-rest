const express = require('express');
const { getUserDetails } = require('../controllers/user.controller');
const authenticateJWT = require('../middleware/auth.middleware');

const router = express.Router();

// Add the protected route
router.get('/profile', authenticateJWT, getUserDetails);

module.exports = router;