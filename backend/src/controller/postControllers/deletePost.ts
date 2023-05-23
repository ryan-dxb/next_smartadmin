import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction } from "express";
import { DeletePostRequest } from "@/@types/post";
import PostModel from "@/models/PostModel";

const deletePostController = asyncHandler(
  async (req: DeletePostRequest, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const userId = req.user!._id;

      // Check if post exists
      const postExists = await PostModel.findById(postId);

      // If post not found
      if (!postExists) return sendError(res, "Post not found", 404);

      // Check if current user is author of post
      if (postExists.author.toString() !== userId.toString())
        return sendError(res, "You are not author of this post", 403);

      // Delete post
      await postExists.deleteOne();

      // Send response
      res.json({
        success: true,
        message: "Post deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default deletePostController;
