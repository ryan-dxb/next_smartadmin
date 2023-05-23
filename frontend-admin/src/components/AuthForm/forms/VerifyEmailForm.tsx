import { NextPage } from "next";
import { useVerifyUserMutation } from "@/store/slices/api/authApi";
import { useEffect } from "react";
import Link from "next/link";

interface VerifyEmailFormProps {
  id?: string;
  token?: string;
}

const VerifyEmailForm: NextPage<VerifyEmailFormProps> = ({
  id = "",
  token = "",
}) => {
  const [verifyUser, { isLoading, isError, error, isSuccess }] =
    useVerifyUserMutation();

  useEffect(() => {
    const verifyUserHandler = async () => {
      const response = await verifyUser({
        userId: id,
        token: token,
      });
    };

    verifyUserHandler();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-base font-semibold text-center text-gray-900">
          {isSuccess
            ? "Your email has been verified!"
            : "Something went wrong. Please request a new verification email."}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center gap-2 px-2 mt-6 text-sm text-gray-500 md:flex-row">
        <p className="text-center">
          {isSuccess
            ? "You can now login with your credentials"
            : "You can request a new verification email "}
        </p>
        <Link
          href={isSuccess ? "/login" : "/send-verification-email"}
          className="underline cursor-pointer"
        >
          {isSuccess ? "Login" : "Click here"}
        </Link>
      </div>
    </>
  );
};

export default VerifyEmailForm;
