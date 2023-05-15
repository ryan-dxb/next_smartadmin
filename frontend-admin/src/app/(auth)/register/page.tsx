import Form from "@/components/AuthFormNew/Form";
import FormTitle from "@/components/AuthFormNew/FormTitle";
import { NextPage } from "next";

interface RegisterProps {}

const Register: NextPage<RegisterProps> = () => {
  return (
    <>
      <FormTitle text="Create an account" />
      <Form
        withFooter
        footerText="Already have an account?"
        footerLink="login"
        footerLinkText="Login"
      />
    </>
  );
};

export default Register;
