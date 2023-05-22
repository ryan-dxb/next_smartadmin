import { Request } from "express";

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

export interface RefreshTokenRequest extends Request {
  cookies: {
    refreshToken: string;
  };
}
