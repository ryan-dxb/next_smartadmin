import { RequestHandler, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "@/models/UserModel";
import sendError from "@/utils/sendError";
import { HTTPONLY_SECURE } from "@/utils/variables";

const logoutController: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;

      const refreshToken = cookies?.jwt;

      // Bad Request if not req.user
      if (!req.user) return sendError(res, "Bad Request", 400);

      // Search User by Refresh Token
      const user = await UserModel.findOne({
        refreshToken: { $in: [refreshToken] },
      });
      if (!user) return sendError(res, "Bad Request", 400);

      // Check if refresh token is in user database and delete it
      // If logout from all devices
      if (req.query.fromAll === "yes") {
        user.refreshToken = [];
      } else {
        // If logout from current device
        user.refreshToken = user.refreshToken.filter(
          (token) => token !== refreshToken
        );
      }

      await user.save();

      // Clear refresh token
      res.clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "none",
        secure: HTTPONLY_SECURE === "true" ? true : false,
      });

      res.status(200).json({
        success: true,
        message: "Logged out",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default logoutController;
