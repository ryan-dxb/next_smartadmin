import express from "express";
import config from "config";
import logger from "./utils/logger";
import cors from "cors";
import "express-async-errors";
import connectDB from "./configuration/db/connectDB";
import cookieParser from "cookie-parser";
import errorHandler from "./middeware/errorHandler";

import dotenv from "dotenv";
import { PORT } from "./utils/variables";
dotenv.config();

import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import corsOptions from "./configuration/cors/corsOptions";

const port: string = PORT || "1255";

const app = express();
connectDB();

app.use(cors(corsOptions));
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/profile", userRoutes);
app.use("/api/posts", postRoutes);

// Error Handler
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server running on port ${PORT}`);
});
