import * as yup from "yup";
import { isValidObjectId } from "mongoose";

export const UpdateUserPasswordSchema = yup.object().shape({
  oldPassword: yup.string().trim().required("Old password is required"),

  newPassword: yup
    .string()
    .trim()
    .required("New password is required")
    .min(6, "New password must be at least 6 characters")
    .max(20, "New password must be at most 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "New password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});
