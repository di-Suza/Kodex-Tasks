import {
  createProductService,
  getAllProductsService,
} from "../services/product.service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getAllProducts = catchAsync(async (req, res) => {
  const { products, pagination } = await getAllProductsService(req.query);

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: {
      products,
      pagination,
    },
  });
});

export const createProduct = catchAsync(async (req, res) => {
  const product = await createProductService(req.body, req.files, req.user);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: {
      product,
    },
  });
});
