"use client";

import { NextPage } from "next";
import { usePathname } from "next/navigation";
import { useState } from "react";
import RegisterForm from "./forms/RegisterForm";
import Formfooter from "./FormFooter";
import LoginForm from "./forms/LoginForm";
import ForgotPasswordForm from "./forms/ForgotPasswordForm";
import ResetPasswordForm from "./forms/ResetPasswordForm";
import SendVerificationEmailForm from "./forms/SendVerificationEmailForm";
import { useVerifyUserMutation } from "@/store/slices/api/authApi";
import VerifyEmailForm from "./forms/VerifyEmailForm";

interface FormProps {
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
  withFooter?: boolean;
  id?: string;
  token?: string;
}

const Form: NextPage<FormProps> = ({
  footerText = "",
  footerLink = "",
  withFooter = false,
  footerLinkText = "",
  id = "",
  token = "",
}) => {
  // const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  console.log("pathname", pathname);
  console.log("id", id);
  console.log("token", token);

  const formVariant = () => {
    switch (pathname) {
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      case "/forgot-password":
        return "ForgotPassword";
      case `/reset-password/${id}/${token}`:
        return "ResetPassword";
      case "/send-verification-email":
        return "SendVerificationEmail";
      case `/verify-email/${id}/${token}`:
        return "VerifyEmail";
      default:
        return "Login";
    }
  };

  return (
    <div className="w-full px-4 mt-8 sm:px-0 sm:mx-auto sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        {formVariant() === "Login" && <LoginForm />}
        {formVariant() === "Register" && <RegisterForm />}
        {formVariant() === "ForgotPassword" && <ForgotPasswordForm />}
        {formVariant() === "ResetPassword" && (
          <ResetPasswordForm id={id} token={token} />
        )}
        {formVariant() === "SendVerificationEmail" && (
          <SendVerificationEmailForm />
        )}
        {formVariant() === "VerifyEmail" && (
          <VerifyEmailForm id={id} token={token} />
        )}

        {withFooter && (
          <Formfooter
            footerText={footerText}
            footerLink={footerLink}
            footerLinkText={footerLinkText}
          />
        )}
      </div>
    </div>
  );
};

export default Form;
