import express from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateLogin, validateRegister } from "../validations/auth.validation.js";

const userRouter = express.Router();

// Register new user
userRouter.post("/register", validateRegister, register);

// Login existing user
userRouter.post("/login", validateLogin, login);

// Get logged-in user profile
userRouter.get("/me", authMiddleware, getMe);

export default userRouter;
