import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";
import { RequestWithFiles } from "@/utils/fileParser";
import formidable from "formidable";
import cloudinary from "@/utils/cloudinary";

const updateAvatarController: RequestHandler = asyncHandler(
  async (req: RequestWithFiles, res: Response, next: NextFunction) => {
    try {
      const avatar = req.files?.avatar as formidable.File;

      if (!avatar) return sendError(res, "Avatar is required", 400);

      // Get user
      const user = req.user;

      // Check if user exists
      if (!user) return sendError(res, "User not found", 404);

      // Get User Model
      const userFound = await UserModel.findById(user._id);

      if (!userFound) return sendError(res, "User not found", 404);

      // Update avatar // Delete old avatar if exists
      if (userFound.avatar?.publicId)
        await cloudinary.uploader.destroy(userFound.avatar.publicId);

      const { secure_url, public_id } = await cloudinary.uploader.upload(
        avatar.filepath,
        {
          folder: "smart-admin/avatars",
          width: 300,
          height: 300,
          crop: "thumb",
          gravity: "face",
        }
      );

      userFound.avatar = {
        url: secure_url,
        publicId: public_id,
      };

      await userFound.save();

      // Send response
      res.status(200).json({
        success: true,
        message: "Avatar updated successfully",
        user: {
          avatar: userFound.avatar,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default updateAvatarController;
