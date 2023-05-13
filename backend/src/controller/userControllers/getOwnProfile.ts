import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";

const getOwnProfileController: RequestHandler = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user._id;

      const userFound = await UserModel.findById(userId);

      if (!userFound) return sendError(res, "User not found", 404);

      res.status(200).json({
        success: true,
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default getOwnProfileController;
