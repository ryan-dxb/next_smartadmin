import { Response } from "express";

const sendError = (res: Response, error: string, statusCode = 401) => {
  res.status(statusCode).json({ error });
};

export default sendError;
