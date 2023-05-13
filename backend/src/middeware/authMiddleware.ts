import asyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/models/UserModel";
import { RequestHandler, Request, Response, NextFunction } from "express";
import sendError from "@/utils/sendError";
import { ACCESS_JWT_SECRET } from "@/utils/variables";

const isAuthMiddleware: RequestHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string =
      req.body.token || req.query.token || req.headers["authorization"];

    if (!token) return sendError(res, "Not authorized", 401);

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    try {
      const decoded = jwt.verify(token, ACCESS_JWT_SECRET) as JwtPayload;

      const user = await UserModel.findById(decoded.id);

      if (!user) return sendError(res, "Not authorized", 401);

      req.user = user;
      next();
    } catch (error) {
      return sendError(res, "Not authorized", 401);
    }
  }
);

export default isAuthMiddleware;
