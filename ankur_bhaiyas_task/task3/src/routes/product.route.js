import express from "express";
import { createProduct } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validateCreateProduct } from "../validations/product.validation.js";

const productRouter = express.Router();

// Create new product
productRouter.post(
  "/",
  authMiddleware,
  upload.array("images"),
  validateCreateProduct,
  createProduct,
);

export default productRouter;
