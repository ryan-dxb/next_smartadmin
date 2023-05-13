import asyncHandler from "express-async-handler";
import sendError from "@/utils/sendError";
import { Response, NextFunction, RequestHandler } from "express";
import UserModel from "@/models/UserModel";
import { UpdateProfileRequest } from "@/@types/user";

const updateProfileController: RequestHandler = asyncHandler(
  async (req: UpdateProfileRequest, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, username, email } = req.body;

      // Check if any field is present
      if (!firstName && !lastName && !username && !email)
        return sendError(res, "No field to update", 400);

      const user = req.user;

      if (!user) return sendError(res, "User not found", 404);

      const userFound = await UserModel.findById(user._id);

      if (!userFound) return sendError(res, "User not found", 404);

      // Update User if there is a change
      if (firstName) userFound.firstName = firstName;
      if (lastName) userFound.lastName = lastName;
      if (username) userFound.username = username;
      if (email) userFound.email = email;

      await userFound.save();

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default updateProfileController;
