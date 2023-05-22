import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  logout,
  resendVerifyEmail,
  forgotPasswordEmail,
  resetPassword,
  refreshToken,
} from "../controller/authControllers/authController";
import { validate } from "../middeware/validator";
import {
  LoginUserSchema,
  ForgotPasswordSchema,
  RegisterUserSchema,
  ResendVerifyEmailSchema,
  ResetPasswordSchema,
  VerifyEmailSchema,
} from "../schema/auth.schema";
import isAuthMiddleware from "@/middeware/authMiddleware";

const router = Router();

// Auth
router.post("/register", validate(RegisterUserSchema), register);
router.post("/login", validate(LoginUserSchema), login);
router.post("/logout", isAuthMiddleware, logout);
router.post("/refresh-token", refreshToken);

// Verification Email
router.post("/verify-email", validate(VerifyEmailSchema), verifyEmail);
router.post(
  "/resend-verify-email",
  validate(ResendVerifyEmailSchema),
  resendVerifyEmail
);

// Password
router.post(
  "/forgot-password",
  validate(ForgotPasswordSchema),
  forgotPasswordEmail
);
router.post("/reset-password", validate(ResetPasswordSchema), resetPassword);

export default router;
