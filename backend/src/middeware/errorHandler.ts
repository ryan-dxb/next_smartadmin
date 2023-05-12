import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let status = res.statusCode ? res.statusCode : 500; // server error

  if (status === 200) {
    status = 500;
  }

  res.status(status);

  res.json({ error: err.message, isError: true });
};

export default errorHandler;
