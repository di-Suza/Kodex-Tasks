import mongoose from "mongoose";

// schema for ecommerce products
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["electronics", "clothing", "books", "home", "beauty", "sports"],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

const Products = mongoose.model("Product", productSchema);

export default Products;
