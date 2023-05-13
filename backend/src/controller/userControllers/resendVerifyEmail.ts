import { Request, Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "@/models/UserModel";
import EmailVerificationTokenModel from "@/models/EmailVerificationTokenModel";
import sendError from "@/utils/sendError";
import { ResendVerifyEmailRequest } from "@/@types/user";
import generateToken from "@/utils/generateToken";
import { sendVerificationEmail } from "@/utils/email";

const resendVerifyEmailController: RequestHandler = asyncHandler(
  async (req: ResendVerifyEmailRequest, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      // Check if user exists
      const userFound = await UserModel.findOne({ email: email.toLowerCase() });

      // Return a fake success message to prevent user enumeration
      if (!userFound) return sendError(res, "Verification email sent", 200);

      // Check if user is already verified
      if (userFound.isVerified) {
        return sendError(res, "User already verified", 400);
      }

      // Check if user has a token
      const tokenFound = await EmailVerificationTokenModel.findOne({
        userId: userFound._id,
      });

      // Check if token is expired
      if (tokenFound && tokenFound.expiresAt < new Date()) {
        await tokenFound.deleteOne();
      } else if (tokenFound) {
        return sendError(
          res,
          "Token already sent, please check your email, You can request for a new activation link after 24 hours",
          400
        );
      }

      // Generate a new token
      const token = await generateToken();

      // Create a new token
      const newToken = new EmailVerificationTokenModel({
        owner: userFound._id,
        token,
      });

      // Save token
      await newToken.save();

      // Send email
      await sendVerificationEmail(
        { id: userFound._id, email: userFound.email },
        token
      );

      // Send response
      res.status(201).json({
        success: true,
        message: "Please check your email to verify your account",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default resendVerifyEmailController;
