const rateLimit = require('express-rate-limit');

const maxReqs = process.env.NODE_ENV !== 'production' ? 500 : 5;

// Define rate-limiting settings for login endpoint
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: maxReqs, // Limit each IP to 5 login requests per window, 500 in development
  message: 'Too many login attempts. Please try again later.',
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
});

module.exports = { loginRateLimiter };