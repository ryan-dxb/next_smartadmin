import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string(),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Required"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .required("Required"),

  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});
