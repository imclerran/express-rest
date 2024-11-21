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
  const userId = req.user.id;
  const { currentPassword, newPassword, name, email } = req.body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Handle password update only if newPassword is provided
    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ error: 'Current password is required to update password' });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      const saltRounds = 10;
      user.passwordHash = await bcrypt.hash(newPassword, saltRounds);
    }

    // Handle other updates (name and email)
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while updating profile' });
  }
};

module.exports = { getUserDetails, updateUserDetails };