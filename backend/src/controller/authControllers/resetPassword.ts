import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";
import sendError from "@/utils/sendError";
import { ForgotPasswordRequest, ResetPasswordRequest } from "@/@types/user";
import PasswordResetTokenModel from "@/models/PasswordResetTokenModel";
import generateToken from "@/utils/generateToken";
import {
  sendPasswordChangedEmail,
  sendPasswordResetEmail,
} from "@/utils/email";

const resetPasswordController: RequestHandler = asyncHandler(
  async (req: ResetPasswordRequest, res: Response, next: NextFunction) => {
    try {
      const { userId, token, password } = req.body;

      // Check if user exists
      const userFound = await UserModel.findById(userId);

      if (!userFound) return sendError(res, "User not found", 404);

      // Check if token is valid
      const passwordResetTokenFound = await PasswordResetTokenModel.findOne({
        owner: userId,
      });

      if (!passwordResetTokenFound)
        return sendError(res, "Token not found", 404);

      // Check if token is expired
      if (
        passwordResetTokenFound &&
        passwordResetTokenFound.expiresAt < new Date()
      ) {
        return sendError(res, "Token expired", 400);
      }

      // Compare token
      const matchedToken = await passwordResetTokenFound.compareToken(token);

      if (!matchedToken) return sendError(res, "Token not found", 404);

      // Compare Old and New Password
      const matchedPassword = await userFound.comparePassword(password);

      if (matchedPassword)
        return sendError(
          res,
          "New password cannot be the same as old password",
          400
        );

      // Update password
      userFound.password = password;
      await userFound.save();

      // Delete token
      await passwordResetTokenFound.deleteOne({ owner: userId });

      // Send Email
      await sendPasswordChangedEmail({ email: userFound.email });

      // Send response
      res.status(200).json({
        success: {
          message: "Password changed successfully",
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default resetPasswordController;
