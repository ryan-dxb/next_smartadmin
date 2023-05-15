import { Response, NextFunction, RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "@/models/UserModel";
import EmailVerificationTokenModel from "@/models/EmailVerificationTokenModel";
import sendError from "@/utils/sendError";
import { VerifyEmailRequest } from "@/@types/auth";

const verifyEmailController: RequestHandler = asyncHandler(
  async (req: VerifyEmailRequest, res: Response, next: NextFunction) => {
    try {
      const { userId, token } = req.body;

      // Check if user exists and verified
      const user = await UserModel.findById(userId);
      if (!user) return sendError(res, "User not found", 404);

      if (user.isVerified) return sendError(res, "User already verified", 400);

      // Check if token exists
      const emailVerificationToken = await EmailVerificationTokenModel.findOne({
        owner: userId,
      });

      if (!emailVerificationToken)
        return sendError(
          res,
          "Invalid Activation token, please request for a new link",
          404
        );

      // Compare token from request body with token in database

      const isMatch = await emailVerificationToken.compareToken(token);
      if (!isMatch) return sendError(res, "Invalid Activation token", 400);

      // Check if token is expired
      const now = new Date();
      if (now > emailVerificationToken.expiresAt)
        return sendError(
          res,
          "Token expired, please request for a new link",
          400
        );

      // Verify user
      user.isVerified = true;
      await user.save();

      // Delete token
      await EmailVerificationTokenModel.deleteMany({ owner: user._id });

      res.status(200).json({
        success: true,
        message: "Account has been verified",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default verifyEmailController;
