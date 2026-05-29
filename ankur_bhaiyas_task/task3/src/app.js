import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.middleware.js';
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/users", userRouter);


app.use(globalErrorHandler);

export default app;