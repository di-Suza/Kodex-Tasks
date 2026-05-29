import { validationResult } from "express-validator";
import { AppError } from "../utils/appError.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  // Send first validation error to global error handler
  if (!errors.isEmpty()) {
    return next(new AppError(400, errors.array()[0].msg));
  }

  next();
};
