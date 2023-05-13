import {
  updatePassword,
  getOwnProfile,
  updateProfile,
  updateAvatar,
} from "@/controller/userControllers/userController";
import isAuthMiddleware from "@/middeware/authMiddleware";
import { validate } from "@/middeware/validator";
import { UpdateUserPasswordSchema } from "@/schema/user.schema";
import fileParser from "@/utils/fileParser";
import { Router } from "express";

const router = Router();

// Profile
router.get("/", isAuthMiddleware, getOwnProfile);

router.post(
  "/update-password",
  isAuthMiddleware,
  validate(UpdateUserPasswordSchema),
  updatePassword
);
router.post("/update-profile", isAuthMiddleware, updateProfile);
router.post("/update-avatar", isAuthMiddleware, fileParser, updateAvatar);

export default router;
