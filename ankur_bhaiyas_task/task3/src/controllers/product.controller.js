import { createProductService } from "../services/product.service.js";
import { catchAsync } from "../utils/catchAsync.js";

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
