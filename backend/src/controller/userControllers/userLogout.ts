import { RequestHandler, Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "@/models/UserModel";

const logoutController: RequestHandler = asyncHandler(async (req:Request, res:Response,next:NextFunction) => {
    try {
        const { refreshToken } = req.cookies;
        const token: string = req.body.token || req.query.token || req.headers["authorization"];

        const user = await UserModel.findById(req.user.id)

        // Check if refresh token exists

    } catch (error) {
            next(error);
    }
}

export const logOut: RequestHandler = async (req, res) => {
  const { fromAll } = req.query;

  const token = req.token;
  const user = await User.findById(req.user.id);
  if (!user) throw new Error("something went wrong, user not found!");

  // logout from all
  if (fromAll === "yes") user.tokens = [];
  else user.tokens = user.tokens.filter((t) => t !== token);

  await user.save();
  res.json({ success: true });
};

const logoutController = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  // Check if refresh token exists
  if (!refreshToken) return sendError(res, "Unauthorized", 403);

  // Check if refresh token is in database
  const userFound = await User.findOne({
    refreshToken: { $in: [refreshToken] },
  });

  // Delete refresh token from database
  if (userFound) {
    userFound.refreshToken = userFound.refreshToken.filter(
      (token) => token !== refreshToken
    );

    await userFound.save();
  }

  // Clear refresh token
  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    })
    .status(204)
    .send("Logged out");
});

module.exports = logoutController;
