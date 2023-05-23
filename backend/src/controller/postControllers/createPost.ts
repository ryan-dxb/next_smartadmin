import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction, RequestHandler } from "express";
import { CreatePostRequest } from "@/@types/post";
import formidable from "formidable";
import cloudinary from "@/utils/cloudinary";
import PostModel from "@/models/PostModel";

const createPostController: RequestHandler = asyncHandler(
  async (req: CreatePostRequest, res: Response, next: NextFunction) => {
    try {
      const { content, slug, title, meta, tags } = req.body;
      const thumbnail = req.files?.thumbnail as formidable.File;

      const userId = req.user!._id;

      // Title and content are required
      if (!title || !content || !slug)
        return sendError(res, "Title, content and slug are required", 400);

      // Check if post with same slug exists
      const postExists = await PostModel.findOne({ slug });

      // If post exists
      if (postExists) return sendError(res, "Post with same slug exists", 400);

      // Create new post
      const newPost = await new PostModel({
        author: userId,
        content,
        title,
        slug,
      });

      // If meta is provided
      if (meta) newPost.meta = meta;

      // If tags are provided
      if (tags) newPost.tags = tags;

      // If thumbnail is provided
      if (thumbnail) {
        // Upload thumbnail to cloudinary
        let { secure_url, public_id } = await cloudinary.uploader.upload(
          thumbnail.filepath,
          {
            folder: "smart-admin/posts",
          }
        );

        // Update post
        newPost.thumbnail = {
          url: secure_url,
          public_id: public_id,
        };
      }

      // Save post
      await newPost.save();

      // Send response
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default createPostController;
