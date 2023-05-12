import { Router } from "express";
import {
  register,
  verifyEmail,
  login,
} from "../controller/userControllers/userController";
import { validate } from "../middeware/validator";
import { RegisterUserSchema } from "../schema/user.schema";
import { TokenAndIDValidation } from "@/schema/token.schema";
import { LoginUserSchema } from "../schema/user.schema";

const router = Router();

router.post("/register", validate(RegisterUserSchema), register);
router.post("/login", validate(LoginUserSchema), login);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);

export default router;
