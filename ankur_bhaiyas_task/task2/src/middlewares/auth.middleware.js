const Users = require("../models/user.model");
const AppError = require("../utils/appError");
const { verifyToken } = require("../utils/token");

// verify user using jwt stored in cookies and attach user data to request
const authMiddleware = async (req, res, next) => {
  try {
    // get jwt from cookies
    const token = req.cookies?.JWT_TOKEN;

    // if no token found in cookies, user is not authorized
    if (!token) {
      throw new AppError(401, "Unauthorized user");
    }

    // verify JWT token and decode user data
    const decoded = verifyToken(token);

    // if token is expired
    if (!decoded) {
      throw new AppError(401, "Invalid or expired token");
    }

    // find user from db using id stored inside token
    const user = await Users.findById(decoded.id);

    // if no user exist in database
    if (!user) {
      throw new AppError(404, "User not found");
    }

    // attach user data to request
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
