import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction, Request } from "express";
import { DeletePostRequest, GetPostByIdRequest } from "@/@types/post";
import PostModel from "@/models/PostModel";

const getPostByIdController = asyncHandler(
  async (req: GetPostByIdRequest, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;

      // Check if post id is valid

      // Check if post exists and populate author field
      const post = await PostModel.findById(postId).populate("author", [
        "email",
        "username",
        "firstName",
        "lastName",
        "avatar",
      ]);

      if (!post) return sendError(res, "Post not found", 404);

      res.json({
        success: true,
        post,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getPostByIdController;
