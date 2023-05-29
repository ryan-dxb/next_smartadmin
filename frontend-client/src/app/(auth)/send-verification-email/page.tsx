import Form from "@/components/AuthForm/Form";
import FormTitle from "@/components/AuthForm/FormTitle";
import { NextPage } from "next";

interface SendVerificationEmailProps {}

const SendVerificationEmail: NextPage<SendVerificationEmailProps> = () => {
  return (
    <>
      <FormTitle text="Verification email" />
      <Form
        withFooter
        footerLink="/login"
        footerText="Remembered your password?"
        footerLinkText="Login"
      />
    </>
  );
};

export default SendVerificationEmail;
