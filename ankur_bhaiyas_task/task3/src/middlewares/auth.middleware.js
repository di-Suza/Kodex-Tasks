import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { verifyToken } from "../utils/token.js";
import redisClient from "../configs/cache.js";
import Users from "../models/user.model.js";

const getTokenFromRequest = (req) => {
  // Read token from cookies only
  return req.cookies?.token;
};

const isTokenBlacklisted = async (req, token) => {
  if (!redisClient) {
    return false;
  }

  const blacklistKey = `blacklist:${token}`;

  // Check token in Redis blacklist
  if (typeof redisClient.get === "function") {
    const blacklistedToken = await redisClient.get(blacklistKey);
    return Boolean(blacklistedToken);
  }

  if (typeof redisClient.exists === "function") {
    const exists = await redisClient.exists(blacklistKey);
    return Boolean(exists);
  }

  return false;
};

export const authMiddleware = catchAsync(async (req, res, next) => {
  const token = getTokenFromRequest(req);

  // Stop request if token is missing
  if (!token) {
    throw new AppError(401, "Unauthorized user");
  }

  const tokenBlacklisted = await isTokenBlacklisted(req, token);

  if (tokenBlacklisted) {
    throw new AppError(401, "Token has been blacklisted");
  }

  let decodedToken;

  try {
    // Verify token and handle JWT errors safely
    decodedToken = await verifyToken(token);
  } catch (error) {
    throw new AppError(401, "Invalid or expired token");
  }

  const decoded = decodedToken.data;

  const user = await Users.findById(decoded.id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Attach logged-in user data from database
  req.user = user;

  next();
});

export default authMiddleware;
