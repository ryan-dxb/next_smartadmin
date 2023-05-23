import { Response, RequestHandler } from "express";

import asyncHandler from "express-async-handler";
import { RegisterUser } from "@/@types/auth";
import sendError from "@/utils/sendError";
import UserModel from "@/models/UserModel";
import generateToken from "@/utils/generateToken";
import EmailVerificationTokenModel from "@/models/EmailVerificationTokenModel";
import { sendVerificationEmail } from "@/utils/email";

const registerController: RequestHandler = asyncHandler(
  async (req: RegisterUser, res: Response, next) => {
    try {
      const { firstName, lastName, username, email, password } = req.body;

      // Check if all required fields are provided
      if (!username || !email || !password)
        sendError(res, "Please provide all required fields", 400);

      // Check if user with same email exists
      const userExists = await UserModel.findOne({
        email: email.toLowerCase(),
      });

      if (userExists)
        sendError(res, "Account with same email already exists", 400);

      // Create new user
      const user = await UserModel.create({
        firstName,
        lastName,
        username,
        email: email.toLowerCase(),
        password,
      });

      // Send Verification Email
      const token = await generateToken();

      // Save token to database
      await EmailVerificationTokenModel.create({
        token,
        owner: user._id,
      });

      await sendVerificationEmail({ id: user._id, email: user.email }, token);

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

export default registerController;
