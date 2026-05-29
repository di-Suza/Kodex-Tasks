import Products from "../models/product.model.js";
import { AppError } from "../utils/appError.js";
import { uploadImageToImageKit } from "../utils/uploadImage.js";

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
