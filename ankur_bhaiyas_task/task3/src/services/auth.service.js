import Users from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { generateHash } from "../utils/password.js";
import { generateToken } from "../utils/token.js";

export const registerUserService = async (userData) => {
  const { name, email, password } = userData;

  // Check if user already exists
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    throw new AppError(409, "User already exists");
  }

  // Hash password before saving user
  const hashedPassword = await generateHash(password);

  const user = await Users.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate auth token for newly registered user
  const token = await generateToken({
    id: user._id,
    email: user.email,
  });

  return { user: user.toObject(), token };
};
