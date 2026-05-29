

import {
  getMeService,
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const { user, token } = await registerUserService(req.body);

  // Store token in httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
    },
  });
});

export const login = catchAsync(async (req, res) => {
  const { user, token } = await loginUserService(req.body);

  // Store token in httpOnly cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      user,
    },
  });
});

export const getMe = catchAsync(async (req, res) => {
  const user = getMeService(req.user);

  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    data: {
      user,
    },
  });
});
