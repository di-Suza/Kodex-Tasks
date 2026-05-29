import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
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

export const getProductById = catchAsync(async (req, res) => {
  const product = await getProductByIdService(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    data: {
      product,
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

export const updateProduct = catchAsync(async (req, res) => {
  const product = await updateProductService(
    req.params.id,
    req.body,
    req.files,
    req.user,
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: {
      product,
    },
  });
});

export const deleteProduct = catchAsync(async (req, res) => {
  await deleteProductService(req.params.id, req.user);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
