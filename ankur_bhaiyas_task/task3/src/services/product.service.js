import Products from "../models/product.model.js";
import { AppError } from "../utils/appError.js";
import {
  deleteImageFromImageKit,
  uploadImageToImageKit,
} from "../utils/uploadImage.js";

const PRODUCTS_PER_PAGE = 20;

export const createProductService = async (productData, files, user) => {
  const product = new Products({
    user: user._id,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    category: productData.category,
  });

  const folder = `/${user._id}/${product._id}`;

  // Upload all images in parallel
  const uploadPromises = (files || []).map((file) => {
    return uploadImageToImageKit(file, folder);
  });

  const images = await Promise.all(uploadPromises);

  product.images = images;

  await product.save();

  return product;
};

export const getAllProductsService = async (queryData) => {
  const page = Number(queryData.page) || 1;
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const filter = {};

  // Apply category filter only if query has category
  if (queryData.category) {
    filter.category = queryData.category;
  }

  // Get products and total count in parallel
  const [products, totalProducts] = await Promise.all([
    Products.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(PRODUCTS_PER_PAGE),
    Products.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page,
      limit: PRODUCTS_PER_PAGE,
      totalProducts,
      totalPages: Math.ceil(totalProducts / PRODUCTS_PER_PAGE),
    },
  };
};

export const getProductByIdService = async (productId) => {
  const product = await Products.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return product;
};

export const updateProductService = async (productId, productData, files, user) => {
  const product = await Products.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (product.user.toString() !== user._id.toString()) {
    throw new AppError(403, "You are not allowed to update this product");
  }

  const hasTextFields = ["name", "description", "price", "category"].some((field) => {
    return productData[field] !== undefined && productData[field] !== "";
  });
  const hasImages = files && files.length > 0;

  if (!hasTextFields && !hasImages) {
    throw new AppError(400, "Please provide product data to update");
  }

  // Update text fields only if provided
  if (productData.name !== undefined && productData.name !== "") product.name = productData.name;
  if (productData.description !== undefined) product.description = productData.description;
  if (productData.price !== undefined && productData.price !== "") product.price = productData.price;
  if (productData.category !== undefined && productData.category !== "") {
    product.category = productData.category;
  }

  if (hasImages) {
    const folder = `/${user._id}/${product._id}`;

    // Upload new images in parallel
    const uploadPromises = files.map((file) => {
      return uploadImageToImageKit(file, folder);
    });

    const newImages = await Promise.all(uploadPromises);

    // Delete old images after new upload succeeds
    const deletePromises = product.images.map((image) => {
      return deleteImageFromImageKit(image.fileId);
    });

    await Promise.all(deletePromises);

    product.images = newImages;
  }

  await product.save();

  return product;
};

export const deleteProductService = async (productId, user) => {
  const product = await Products.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (product.user.toString() !== user._id.toString()) {
    throw new AppError(403, "You are not allowed to delete this product");
  }

  // Delete all product images from ImageKit
  const deletePromises = product.images.map((image) => {
    return deleteImageFromImageKit(image.fileId);
  });

  await Promise.all(deletePromises);

  await product.deleteOne();
};
