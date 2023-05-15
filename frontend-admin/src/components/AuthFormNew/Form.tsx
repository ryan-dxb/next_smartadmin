"use client";

import { NextPage } from "next";
import { usePathname } from "next/navigation";
import { useState } from "react";
import RegisterForm from "../AuthForm/RegisterForm";
import Formfooter from "./FormFooter";
import LoginForm from "../AuthForm/LoginForm";

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
  const [isLoading, setIsLoading] = useState(false);

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
      default:
        return "Login";
    }
  };

  return (
    <div className="w-full px-4 mt-8 sm:px-0 sm:mx-auto sm:max-w-md">
      <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
        {formVariant() === "Login" && <LoginForm />}
        {formVariant() === "Register" && <RegisterForm />}

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
