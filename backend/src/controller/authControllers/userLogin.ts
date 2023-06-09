import { Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";
import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import jwt from "jsonwebtoken";
import { LoginUser } from "@/@types/auth";
import {
  ACCESS_JWT_SECRET,
  HTTPONLY_SECURE,
  REFRESH_JWT_SECRET,
  HTTPONLY_SAMESITE,
} from "@/utils/variables";

const loginController: RequestHandler = asyncHandler(
  async (req: LoginUser, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;

      const { email, password } = req.body;

      // Check if user exists
      const user = await UserModel.findOne({ email: email.toLowerCase() });

      if (!user) return sendError(res, "Invalid Credentials", 400);

      // Check if password matches
      const passwordMatches = await user.comparePassword(password);

      if (!passwordMatches) return sendError(res, "Invalid Credentials", 400);

      // Check if user is verified
      if (!user.isVerified)
        return sendError(res, "Please verify your email to continue", 400);

      /// Create Access token
      const accessToken = jwt.sign(
        { id: user._id, email: user.email },
        ACCESS_JWT_SECRET as string,
        {
          expiresIn: "5min",
        }
      );

      // Refresh Token Reuse Detection

      const newRefreshToken = jwt.sign(
        { id: user._id, email: user.email },
        REFRESH_JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      let newRefreshTokenArray: string[] = !cookies?.refreshToken
        ? user.refreshToken
        : user.refreshToken.filter((rt: any) => rt !== cookies.refreshToken);

      if (cookies?.refreshToken) {
        const refreshToken = cookies.refreshToken;

        console.log("refresh token found in cookies", refreshToken);

        const userFound = await UserModel.findOne({ refreshToken }).exec();

        if (!userFound) {
          console.log("refresh token not found in database");
          newRefreshTokenArray = [];
        }

        res.clearCookie("refreshToken", {
          httpOnly: true,
          sameSite: "none",
          secure: HTTPONLY_SECURE === "true" ? true : false,
        });
      }

      // Saving new refresh token to database
      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await user.save();

      // Send refresh token to user
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: HTTPONLY_SECURE === "true" ? true : false,
        sameSite: HTTPONLY_SAMESITE as "none" | "lax" | "strict" | undefined,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.header("Access-Control-Allow-Credentials", "true");

      // Send access token and user details
      res.json({
        success: true,
        user,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default loginController;
