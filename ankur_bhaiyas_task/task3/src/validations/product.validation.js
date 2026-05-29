import { body, param, query } from "express-validator";
import { handleValidationErrors } from "../middlewares/validate.middleware.js";

const productCategories = [
  "electronics",
  "clothing",
  "books",
  "home",
  "beauty",
  "sports",
];

export const validateCreateProduct = [
  // Validate product name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2 })
    .withMessage("Product name must be at least 2 characters"),

  // Validate product price
  body("price")
    .notEmpty()
    .withMessage("Product price is required")
    .isFloat({ gt: 0 })
    .withMessage("Product price must be greater than 0")
    .toFloat(),

  // Validate product category
  body("category")
    .optional({ checkFalsy: true })
    .isIn(productCategories)
    .withMessage("Invalid product category"),

  // Clean optional description
  body("description").optional({ checkFalsy: true }).trim(),

  handleValidationErrors,
];

export const validateGetAllProducts = [
  // Validate category filter
  query("category")
    .optional({ checkFalsy: true })
    .isIn(productCategories)
    .withMessage("Invalid product category"),

  // Validate page number
  query("page")
    .optional({ checkFalsy: true })
    .isInt({ min: 1 })
    .withMessage("Page must be a positive number")
    .toInt(),

  handleValidationErrors,
];

export const validateProductId = [
  // Validate product id param
  param("id")
    .isMongoId()
    .withMessage("Invalid product id"),

  handleValidationErrors,
];
