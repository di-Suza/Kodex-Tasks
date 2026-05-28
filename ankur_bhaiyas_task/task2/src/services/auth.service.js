const Users = require("../models/user.model");
const AppError = require("../utils/appError");
const { generateJwtToken } = require("../utils/token");

// validate user and create a new user in database and generate jwt for user
const registerUserService = async ({ name, email }) => {
  // validation
  if (!name || name.trim() === "" || !email || email.trim() === "") {
    throw new AppError(400, "Name and email are required");
  }

  // Create a new user in database
  const user = await Users.create({
    name,
    email,
  });

  // Generate JWT token using newly created user's id
  const token = generateJwtToken(user._id);

  return { token, user };
};

module.exports = { registerUserService };
