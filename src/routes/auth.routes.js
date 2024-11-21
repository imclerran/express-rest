const express = require('express');
const handleRequestValidation = require('../middleware/validation.middleware');
const { 
    validateRegistration, 
    validateLogin, 
    validateRefreshToken 
} = require('../middleware/auth.validation');
const { 
    registerUser, 
    loginUser, 
    refreshAccessToken, 
    revokeToken 
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', validateRegistration, registerUser);
router.post('/login', validateLogin, loginUser);
router.post('/refresh-token', validateRefreshToken, refreshAccessToken);
router.post('/revoke-token', validateRefreshToken, revokeToken);

module.exports = router;