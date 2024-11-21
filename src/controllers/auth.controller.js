const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;
const RefreshToken = db.RefreshToken;
const { hashPassword, verifyPassword } = require('../utils/password');
const { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_EXPIRATION } = process.env;

/**
 * Handles user registration.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - Returns a JSON response with the registered user's details or an error message.
 */
const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check for missing fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields (email, password, username) are required.' });
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Create the user
    const newUser = await User.create({
      email,
      passwordHash,
      name,
    });

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    // Handle unique constraint error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email is already in use.' });
    }

    // General error handling
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
};

/**
 * Handles user login.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - Returns a JSON response with access and refresh tokens or an error message.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user.id },
      JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    // Save refresh token to the database
    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
    });

    // Respond with tokens
    res.status(200).json({
      message: 'Login successful.',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};

/**
 * Refreshes the access token using a valid refresh token, and issue a new refresh token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON response with a new access and refresh token or an error message.
 */
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    console.log('Refresh token is required');
    return res.status(400).json({ error: 'Refresh token is required' });
  }

  try {
    // Verify the refresh token
    console.log("Verifying token...")
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    console.log('Decoded:', decoded);

    // Check if the refresh token exists in the database and is valid
    const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (!storedToken) {
      console.log('Refresh token not found');
      return res.status(403).json({ error: 'Invalid refresh token' });
    }

    console.log("generating new access token...")
    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '15m' } // Short-lived access token
    );

    console.log("generating new refresh token...")
    // Generate a new refresh token with a reset expiration
    const newRefreshToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } // Extend the sliding expiration
    );

    console.log("saving new refresh token...")
    // Save the new refresh token in the database and remove the old one
    await RefreshToken.create({
      token: newRefreshToken,
      userId: decoded.id,
    });

    console.log("removing old refresh token...")
    await storedToken.destroy(); // Remove the old token

    console.log("returning new tokens...")
    // Return the new tokens to the client
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired refresh token' });
  }
};


/**
 * Handles revocation of a refresh token.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} - Returns a JSON response with a success message or an error message.
 */
const revokeToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required.' });
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const tokenEntry = await RefreshToken.findOne({ where: { token: refreshToken } });

    if (!tokenEntry) {
      return res.status(404).json({ error: 'Refresh token not found.' });
    }

    // Delete the token from the database
    await tokenEntry.destroy();

    res.status(200).json({ message: 'Refresh token revoked successfully.' });
  } catch (error) {
    console.error(error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid refresh token.' });
    }

    res.status(500).json({ error: 'An error occurred during token revocation.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  revokeToken,
};