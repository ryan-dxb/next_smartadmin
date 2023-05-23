import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction, Request } from "express";
import { DeletePostRequest } from "@/@types/post";
import PostModel from "@/models/PostModel";

const getAllPostController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await PostModel.find({}).populate("author", [
        "email",
        "username",
        "firstName",
        "lastName",
        "avatar",
      ]);

      res.json({
        success: true,
        posts,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getAllPostController;
