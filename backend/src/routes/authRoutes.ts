import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
  logout,
  resendVerifyEmail,
} from "../controller/userControllers/userController";
import { validate } from "../middeware/validator";
import {
  RegisterUserSchema,
  ResendVerifyEmailSchema,
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
export default router;
