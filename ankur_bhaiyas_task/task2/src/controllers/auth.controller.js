const User = require("../models/user.model");
const { registerUserService } = require("../services/auth.service");
const ApiError = require("../utils/apiError");
const generateJwtToken = require("../utils/token");

// register user
const register = async (req, res, next) => {
  // create the user in database using register service
  let { token, user } = await registerUserService(req.body);

  // store JWT in cookie
  res.cookie("JWT_TOKEN", token, {
    httpOnly: true,
  });

  return res.status(201).json({
    message: "User registered successfully",
    user,
  });
};

module.exports = { register };

