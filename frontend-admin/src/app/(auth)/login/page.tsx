import FormHeader from "@/components/AuthForm/FormTitle";
import { NextPage } from "next";
import Form from "@/components/AuthForm/Form";

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
  return (
    <>
      <FormHeader text="Sign in to your account" />
      <Form
        withFooter
        footerText="Don't have an account"
        footerLink="register"
        footerLinkText="Create an account"
      />
    </>
  );
};

export default Login;
