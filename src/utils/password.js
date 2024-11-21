const bcrypt = require('bcrypt');

// Number of salt rounds (higher means more secure but slower)
const SALT_ROUNDS = 10;

/**
 * Hashes a plaintext password.
 * @param {string} password - The plaintext password.
 * @returns {Promise<string>} The hashed password.
 */
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

/**
 * Verifies a plaintext password against a hashed password.
 * @param {string} password - The plaintext password.
 * @param {string} hashedPassword - The hashed password from the database.
 * @returns {Promise<boolean>} True if the password matches, false otherwise.
 */
const verifyPassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error('Error verifying password', error);
        throw new Error('Error verifying password');
    }
};

module.exports = { hashPassword, verifyPassword };

