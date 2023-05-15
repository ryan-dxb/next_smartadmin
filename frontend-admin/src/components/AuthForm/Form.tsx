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

interface FormProps {
  footerText?: string;
  footerLink?: string;
  footerLinkText?: string;
  withFooter?: boolean;
}

const Form: NextPage<FormProps> = ({
  footerText = "",
  footerLink = "",
  withFooter = false,
  footerLinkText = "",
}) => {
  // const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const formVariant = () => {
    switch (pathname) {
      case "/login":
        return "Login";
      case "/register":
        return "Register";
      case "/forgot-password":
        return "ForgotPassword";
      case "/reset-password":
        return "ResetPassword";
      case "/send-verification-email":
        return "SendVerificationEmail";
      case "/verify-email":
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
        {formVariant() === "ResetPassword" && <ResetPasswordForm />}
        {formVariant() === "SendVerificationEmail" && (
          <SendVerificationEmailForm />
        )}
        {formVariant() === "VerifyEmail" && (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-base font-semibold text-gray-900">
              Your email has been verified!
            </h1>
          </div>
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
