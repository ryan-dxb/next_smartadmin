import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        email: string;
        username: string;
        isVerified: boolean;
        firstName?: string;
        lastName?: string;
        avatar?: string;
        refreshToken: string[];
      };
      token?: string;
    }
  }
}

export interface UpdatePasswordRequest extends Request {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface UpdateProfileRequest extends Request {
  body: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
  };
}
