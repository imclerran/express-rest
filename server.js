require('dotenv').config();

const express = require('express');
const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Mount the auth routes
app.use('/auth', authRoutes);

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
});

module.exports = app;