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

export interface RegisterUser extends Request {
  body: {
    firstName?: string;
    lastName?: string;
    username: string;
    email: string;
    password: string;
  };
}

export interface LoginUser extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface VerifyEmailRequest extends Request {
  body: {
    userId: string;
    token: string;
  };
}

export interface ResendVerifyEmailRequest extends Request {
  body: {
    email: string;
  };
}

export interface ForgotPasswordRequest extends Request {
  body: {
    email: string;
  };
}

export interface ResetPasswordRequest extends Request {
  body: {
    userId: string;
    token: string;
    password: string;
  };
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
