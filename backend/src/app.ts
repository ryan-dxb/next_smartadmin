import express from "express";
import config from "config";
import logger from "./utils/logger";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import "express-async-errors";
import connectDB from "./configuration/db/connectDB";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import errorHandler from "./middeware/errorHandler";
import { PORT } from "./utils/variables";
dotenv.config();

const port: string = PORT || "1255";

const app = express();
connectDB();

app.use(cors());
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server running on port ${PORT}`);
});
