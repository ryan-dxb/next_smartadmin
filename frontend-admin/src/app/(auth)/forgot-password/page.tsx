import Form from "@/components/AuthForm/Form";
import FormTitle from "@/components/AuthForm/FormTitle";
import { NextPage } from "next";

interface ForgotPasswordProps {}

const ForgotPassword: NextPage<ForgotPasswordProps> = () => {
  return (
    <>
      <FormTitle text="Forgot your password" />
      <Form
        withFooter
        footerText="Remember your password?"
        footerLink="login"
        footerLinkText="Login"
      />
    </>
  );
};

export default ForgotPassword;
