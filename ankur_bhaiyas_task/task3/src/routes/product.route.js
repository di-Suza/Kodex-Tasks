import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  validateCreateProduct,
  validateGetAllProducts,
  validateProductId,
  validateUpdateProduct,
} from "../validations/product.validation.js";

const productRouter = express.Router();

// Get all products with pagination and category filter
productRouter.get("/", validateGetAllProducts, getAllProducts);

// Get product by id
productRouter.get("/:id", validateProductId, getProductById);

// Create new product
productRouter.post(
  "/",
  authMiddleware,
  upload.array("images"),
  validateCreateProduct,
  createProduct,
);

// Update product by id
productRouter.put(
  "/:id",
  authMiddleware,
  upload.array("images"),
  validateUpdateProduct,
  updateProduct,
);

export default productRouter;
