import asyncHandler from "express-async-handler";
import { Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";
import sendError from "@/utils/sendError";
import { ForgotPasswordRequest } from "@/@types/auth";
import PasswordResetTokenModel from "@/models/PasswordResetTokenModel";
import generateToken from "@/utils/generateToken";
import { sendPasswordResetEmail } from "@/utils/email";

const forgotPasswordEmailController: RequestHandler = asyncHandler(
  async (req: ForgotPasswordRequest, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      // Check if user exists
      const userFound = await UserModel.findOne({ email: email.toLowerCase() });

      // Return a fake success message to prevent user enumeration
      if (!userFound) return sendError(res, "Password reset email sent", 200);

      // Check if user has a token
      const tokenFound = await PasswordResetTokenModel.findOne({
        owner: userFound._id,
      });

      // Check if token is expired
      if (tokenFound && tokenFound.expiresAt < new Date()) {
        await tokenFound.deleteOne();
      } else if (tokenFound) {
        return sendError(
          res,
          "Token already sent, please check your email, You can request for a new password reset link after 24 hours",
          400
        );
      }

      // Generate a new token
      const token = await generateToken();

      // Create a new token
      const newToken = new PasswordResetTokenModel({
        owner: userFound._id,
        token,
      });

      // Save token
      await newToken.save();

      // Send email
      await sendPasswordResetEmail(
        { id: userFound._id, email: userFound.email },
        token
      );

      // Send response
      res.status(201).json({
        success: true,
        message: "Please check your email to reset your password",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default forgotPasswordEmailController;
