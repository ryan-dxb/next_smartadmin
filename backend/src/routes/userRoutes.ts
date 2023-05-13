import {
  updatePassword,
  getOwnProfile,
  updateProfile,
} from "@/controller/userControllers/userController";
import isAuthMiddleware from "@/middeware/authMiddleware";
import { validate } from "@/middeware/validator";
import { UpdateUserPasswordSchema } from "@/schema/user.schema";
import { Router } from "express";

const router = Router();

// Profile
router.post(
  "/update-password",
  isAuthMiddleware,
  validate(UpdateUserPasswordSchema),
  updatePassword
);

router.post("/update-profile", isAuthMiddleware, updateProfile);

router.get("/", isAuthMiddleware, getOwnProfile);

export default router;
