import express from "express";
import { register } from "../controllers/auth.controller.js";
import { validateRegister } from "../validations/auth.validation.js";

const userRouter = express.Router();

// Register new user
userRouter.post("/register", validateRegister, register);

export default userRouter;
