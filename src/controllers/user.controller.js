const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

const getUserDetails = async (req, res) => {
  try {
    // The authenticated user's ID is attached to req.user by the JWT middleware
    const userId = req.user.id;
    console.log("User ID: ", userId);

    // Fetch user details from the database
    const user = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'name', 'email', 'createdAt'], // Only return necessary fields
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching user details' });
  }
};

const updateUserDetails = async (req, res) => {
  const userId = req.user.id; // Provided by authenticateJWT middleware
  const { email, name, password } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields only if provided
    if (email) user.email = email;
    if (name) user.name = name;
    if (password) {
      const saltRounds = 10;
      user.passwordHash = await bcrypt.hash(password, saltRounds);
    }

    await user.save();

    return res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while updating profile' });
  }
};


module.exports = { getUserDetails, updateUserDetails };