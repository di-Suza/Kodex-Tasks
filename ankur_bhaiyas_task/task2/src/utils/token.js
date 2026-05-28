const jwt = require("jsonwebtoken");

// Create json web token for user authentication
const generateJwtToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
};

// Verify json web token for user authentication
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { generateJwtToken, verifyToken };
