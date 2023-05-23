import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction, RequestHandler } from "express";
import { UpdatePostRequest } from "@/@types/post";
import formidable from "formidable";
import cloudinary from "@/utils/cloudinary";
import PostModel from "@/models/PostModel";

const updatePostController = asyncHandler(
  async (req: UpdatePostRequest, res: Response, next: NextFunction) => {
    try {
      const { content, slug, title, meta, tags } = req.body;
      const { postId } = req.params;
      const thumbnail = req.files?.thumbnail as formidable.File;

      const userId = req.user!._id;

      // Title and content are required
      if (!title || !content)
        return sendError(res, "Title and content are required", 400);

      // Check if post exists
      const postFound = await PostModel.findById(postId);

      // If post not found
      if (!postFound) return sendError(res, "Post not found", 404);

      // Check if post with same slug exists other than this post
      const postExists = await PostModel.findOne({
        slug,
        _id: { $ne: postId },
      });

      // If post exists
      if (postExists) return sendError(res, "Post with same slug exists", 400);

      // Check if current user is author of post
      if (postFound.author.toString() !== userId.toString())
        return sendError(res, "You are not author of this post", 403);

      // Update post
      postFound.title = title;
      postFound.content = content;
      postFound.slug = slug;

      // If meta is provided
      if (meta) postFound.meta = meta;

      // If tags are provided
      if (tags) postFound.tags = tags;

      // If thumbnail is provided and thumbnail is not same as previous thumbnail
      // Delete previous thumbnail from cloudinary
      // Upload new thumbnail to cloudinary
      if (thumbnail) {
        if (postFound.thumbnail?.public_id) {
          await cloudinary.uploader.destroy(postFound.thumbnail.public_id);
        }

        // Upload thumbnail to cloudinary
        let { secure_url, public_id } = await cloudinary.uploader.upload(
          thumbnail.filepath,
          {
            folder: "smart-admin/posts",
          }
        );

        // Update post
        postFound.thumbnail = {
          url: secure_url,
          public_id,
        };
      }

      // Save post
      await postFound.save();

      // Send response
      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        post: postFound,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default updatePostController;
