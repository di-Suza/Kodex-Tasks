import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.middleware.js';
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/products", productRouter);

app.use(globalErrorHandler);

export default app;