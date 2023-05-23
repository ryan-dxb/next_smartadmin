import dotenv from "dotenv";
dotenv.config();

const { env } = process as { env: { [key: string]: string } };

export const {
  PORT,
  MAILTRAP_HOST,
  MAILTRAP_USER,
  MAILTRAP_PASSWORD,
  EMAIL_FROM,
  CLIENT_URL,
  MONGODB_URI,
  REFRESH_JWT_SECRET,
  ACCESS_JWT_SECRET,
  HTTPONLY_SECURE,
  CLOUD_KEY,
  CLOUD_NAME,
  CLOUD_SECRET,
  HTTPONLY_SAMESITE,
} = env;
