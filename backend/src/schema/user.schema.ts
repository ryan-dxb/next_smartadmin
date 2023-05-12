import * as yup from "yup";
import { isValidObjectId } from "mongoose";

export const RegisterUserSchema = yup.object().shape({
  firstName: yup.string(),

  lastName: yup.string(),

  username: yup
    .string()
    .trim()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Email must be a valid email address"),

  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export const LoginUserSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Email must be a valid email address"),

  password: yup.string().trim().required("Password is required"),
});