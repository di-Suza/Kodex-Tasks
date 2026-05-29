import express from "express";
import { createProduct, getAllProducts } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  validateCreateProduct,
  validateGetAllProducts,
} from "../validations/product.validation.js";

const productRouter = express.Router();

// Get all products with pagination and category filter
productRouter.get("/", validateGetAllProducts, getAllProducts);

// Create new product
productRouter.post(
  "/",
  authMiddleware,
  upload.array("images"),
  validateCreateProduct,
  createProduct,
);

export default productRouter;
