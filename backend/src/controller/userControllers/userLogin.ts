import { Request, Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";
import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import jwt from "jsonwebtoken";
import { LoginUser } from "@/@types/user";
import {
  ACCESS_JWT_SECRET,
  HTTPONLY_SECURE,
  REFRESH_JWT_SECRET,
} from "@/utils/variables";

const loginController: RequestHandler = asyncHandler(
  async (req: LoginUser, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;
      console.log(req);

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

      let newRefreshTokenArray: string[] = !cookies?.jwt
        ? user.refreshToken
        : user.refreshToken.filter((rt) => rt !== cookies.jwt);

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;

        const userFound = await UserModel.findOne({ refreshToken }).exec();

        if (!userFound) {
          console.log("refresh token not found in database");
          newRefreshTokenArray = [];
        }

        res.clearCookie("jwt", {
          httpOnly: true,
          sameSite: "none",
          secure: HTTPONLY_SECURE === "true" ? true : false,
        });
      }

      // Saving new refresh token to database
      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await user.save();

      // Send refresh token to user
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: HTTPONLY_SECURE === "true" ? true : false,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

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
