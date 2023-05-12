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
dotenv.config();

const PORT = config.get<number>("port");

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

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
