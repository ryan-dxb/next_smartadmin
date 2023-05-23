"use client";

import Form from "@/components/AuthForm/Form";
import FormTitle from "@/components/AuthForm/FormTitle";
import { NextPage } from "next";
import { usePathname } from "next/navigation";

interface ResetPasswordProps {}

const ResetPassword: NextPage<ResetPasswordProps> = () => {
  const pathname = usePathname();
  const pathNameArray = pathname.split("/");

  const id = pathNameArray[2];
  const token = pathNameArray[3];

  return (
    <>
      <FormTitle text="Reset your password" />
      <Form id={id} token={token} />;
    </>
  );
};

export default ResetPassword;
