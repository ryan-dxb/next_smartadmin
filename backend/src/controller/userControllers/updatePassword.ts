import { UpdatePasswordRequest } from "@/@types/user";
import UserModel from "@/models/UserModel";
import sendError from "@/utils/sendError";
import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";

const updatePasswordController: RequestHandler = asyncHandler(
  async (req: UpdatePasswordRequest, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body;

      // Get user
      const user = req.user;

      // Check if user exists
      if (!user) return sendError(res, "User not found", 404);

      // Get User Model
      const userFound = await UserModel.findById(user._id);

      if (!userFound) return sendError(res, "User not found", 404);

      // Compare old password
      const matchedPassword = await userFound.comparePassword(oldPassword);

      if (!matchedPassword)
        return sendError(res, "Old password is incorrect", 400);

      // Compare Old and New Password
      const matchedNewPassword = await userFound.comparePassword(newPassword);

      if (matchedNewPassword)
        return sendError(
          res,
          "New password cannot be the same as old password",
          400
        );

      // Update password
      userFound.password = newPassword;
      await userFound.save();

      // Send response
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default updatePasswordController;
