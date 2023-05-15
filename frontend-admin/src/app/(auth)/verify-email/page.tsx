import Form from "@/components/AuthForm/Form";
import { NextPage } from "next";

interface VerifyEmailProps {}

const VerifyEmail: NextPage<VerifyEmailProps> = () => {
  return (
    <>
      <Form
        withFooter
        footerText="You can now login with your credentials"
        footerLink="login"
        footerLinkText="Login"
      />
    </>
  );
};

export default VerifyEmail;
