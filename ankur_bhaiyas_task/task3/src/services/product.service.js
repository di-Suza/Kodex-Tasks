import Products from "../models/product.model.js";
import { uploadImageToImageKit } from "../utils/uploadImage.js";

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

  const imageUrls = await Promise.all(uploadPromises);

  product.images = imageUrls;

  await product.save();

  return product;
};
