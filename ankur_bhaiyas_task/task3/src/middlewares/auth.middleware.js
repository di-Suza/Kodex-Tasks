import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { verifyToken } from "../utils/token.js";
import redisClient from "../configs/cache.js";

const getTokenFromRequest = (req) => {
  // Read token from cookies only
  return req.cookies?.token || req.cookies?.JWT_TOKEN;
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

  const decodedToken = await verifyToken(token);
  const decoded = decodedToken.data;

  // Attach logged-in user data to request
  req.user = decoded.user || decoded;

  next();
});

export default authMiddleware;
