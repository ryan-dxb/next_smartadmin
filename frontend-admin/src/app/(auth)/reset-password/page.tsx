import Form from "@/components/AuthForm/Form";
import FormTitle from "@/components/AuthForm/FormTitle";
import { NextPage } from "next";

interface ResetPasswordProps {}

const ResetPassword: NextPage<ResetPasswordProps> = () => {
  return (
    <>
      <FormTitle text="Reset your password" />
      <Form />
    </>
  );
};

export default ResetPassword;
