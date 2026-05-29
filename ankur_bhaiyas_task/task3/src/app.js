import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler.middleware.js';

const app = express();
app.use(express.json());


app.use(globalErrorHandler);

export default app;