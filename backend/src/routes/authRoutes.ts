import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  logout,
  resendVerifyEmail,
  forgotPasswordEmail,
  resetPassword,
} from "../controller/userControllers/userController";
import { validate } from "../middeware/validator";
import {
  ForgotPasswordSchema,
  RegisterUserSchema,
  ResendVerifyEmailSchema,
  ResetPasswordSchema,
  VerifyEmailSchema,
} from "../schema/user.schema";
import { LoginUserSchema } from "../schema/user.schema";
import isAuthMiddleware from "@/middeware/authMiddleware";

const router = Router();

router.post("/register", validate(RegisterUserSchema), register);
router.post("/login", validate(LoginUserSchema), login);
router.post("/logout", isAuthMiddleware, logout);

router.post("/verify-email", validate(VerifyEmailSchema), verifyEmail);
router.post(
  "/resend-verify-email",
  validate(ResendVerifyEmailSchema),
  resendVerifyEmail
);

router.post(
  "/forgot-password",
  validate(ForgotPasswordSchema),
  forgotPasswordEmail
);
router.post("/reset-password", validate(ResetPasswordSchema), resetPassword);
export default router;
