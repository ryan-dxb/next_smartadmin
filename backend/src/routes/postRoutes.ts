import { Router } from "express";
import { validate } from "../middeware/validator";
import isAuthMiddleware from "@/middeware/authMiddleware";
import { PostSchema } from "@/schema/post.schema";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost,
} from "@/controller/postControllers/postController";
import { get } from "config";
import fileParser from "@/utils/fileParser";

const router = Router();

router.post(
  "/create",
  isAuthMiddleware,
  fileParser,
  validate(PostSchema),
  createPost
);

router.post(
  "/update/:postId",
  isAuthMiddleware,
  fileParser,
  validate(PostSchema),
  updatePost
);

router.post("/delete/:postId", isAuthMiddleware, deletePost);

router.post("/", getAllPost);

router.post("/:postId", getPostById);

export default router;
