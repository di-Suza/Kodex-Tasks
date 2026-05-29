import { body } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

export const validateRegister = [
  // Validate user name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),

  // Validate user email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  // Validate user password
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  handleValidationErrors,
];

export const validateLogin = [
  // Validate login email
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

  // Validate login password
  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  handleValidationErrors,
];
