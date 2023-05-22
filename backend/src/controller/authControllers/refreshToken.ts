import { Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";
import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import jwt from "jsonwebtoken";
import { LoginUser, RefreshTokenRequest } from "@/@types/auth";
import {
  ACCESS_JWT_SECRET,
  HTTPONLY_SECURE,
  REFRESH_JWT_SECRET,
  HTTPONLY_SAMESITE,
} from "@/utils/variables";

const refreshTokenController = asyncHandler(
  async (req: RefreshTokenRequest, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;
      console.log("cookies", cookies);

      if (!cookies.refreshToken) return sendError(res, "Unauthorized", 401);
      const refreshToken = cookies.refreshToken;

      const userFound = await UserModel.findOne({ refreshToken });
      if (!userFound) return sendError(res, "Unauthorized", 401);

      // Evaluate if the refresh token is valid

      jwt.verify(
        refreshToken,
        REFRESH_JWT_SECRET,
        async (err: any, decoded: any) => {
          if (err || userFound.email !== decoded.email) {
            return sendError(res, "Unauthorized", 401);
          }

          // Create new access token
          const accessToken = jwt.sign(
            { id: userFound._id, email: userFound.email },
            ACCESS_JWT_SECRET as string,
            {
              expiresIn: "5min",
            }
          );

          // Shuffling the refresh token array
          // Refresh Token Reuse Detection

          const newRefreshToken = jwt.sign(
            { id: userFound._id, email: userFound.email },
            REFRESH_JWT_SECRET as string,
            {
              expiresIn: "1d",
            }
          );

          // Removing the old refresh token from database
          let newRefreshTokenArray: string[] = !cookies?.refreshToken
            ? userFound.refreshToken
            : userFound.refreshToken.filter(
                (rt) => rt !== cookies.refreshToken
              );

          // Removing the old refresh token from cookies
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
              sameSite: HTTPONLY_SAMESITE,
              secure: HTTPONLY_SECURE === "true" ? true : false,
            });
          }

          // Saving new refresh token to database
          userFound.refreshToken = [...newRefreshTokenArray, newRefreshToken];
          await userFound.save();

          // Send refresh token to user
          res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: HTTPONLY_SECURE === "true" ? true : false,
            sameSite: HTTPONLY_SAMESITE,
            maxAge: 24 * 60 * 60 * 1000,
          });

          // Send new access token
          res.json({ accessToken });
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

export default refreshTokenController;
