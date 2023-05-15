import AuthForm from "@/components/AuthForm/AuthForm";
import Logo from "@/components/Logo";
import { NextPage } from "next";

interface ForgotPasswordProps {}

const ForgotPassword: NextPage<ForgotPasswordProps> = () => {
  return <AuthForm />;
};

export default ForgotPassword;
