const express = require('express');
const handleRequestValidation = require('../middleware/request.validation');
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

router.post('/register', validateRegistration, handleRequestValidation, registerUser);
router.post('/login', validateLogin, handleRequestValidation, loginUser);
router.post('/refresh-token', validateRefreshToken, handleRequestValidation, refreshAccessToken);
router.post('/revoke-token', validateRefreshToken, handleRequestValidation, revokeToken);

module.exports = router;