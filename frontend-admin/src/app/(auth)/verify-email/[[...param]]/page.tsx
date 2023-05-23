"use client";

import Form from "@/components/AuthForm/Form";
import { NextPage } from "next";
import { usePathname } from "next/navigation";

interface VerifyEmailProps {
  id?: string;
  token?: string;
}

const VerifyEmail: NextPage<VerifyEmailProps> = () => {
  const pathname = usePathname();
  const pathNameArray = pathname.split("/");

  const id = pathNameArray[2];
  const token = pathNameArray[3];
  return <Form id={id} token={token} />;
};

export default VerifyEmail;
