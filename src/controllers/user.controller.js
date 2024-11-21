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
  
  module.exports = { getUserDetails };