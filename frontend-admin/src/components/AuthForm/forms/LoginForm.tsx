"use client";

import { NextPage } from "next";

import Button from "../../Button";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "../SocialLoginForm";
import Input from "@/components/Inputs/Input";
import Link from "next/link";

interface LoginFormProps {}

const LoginForm: NextPage<LoginFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
    },
    // resolver: yupResolver(RegisterSchema),
  });

  const isEmail = (str: string) => {
    // Check if input is valid email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const isEmailValid = isEmail(data.username);
    setIsLoading(true);
    console.log(isEmailValid);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    //     // register
    //     await axios
    //       .post("/api/register", data)
    //       .then(() => signIn("credentials", { ...data, redirect: false }))
    //       .catch((error) => {
    //         console.log(error);
    //         toast.error("Something went wrong! Please try again.");
    //       });
    //   }
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username or Email"
          id="username"
          type="text"
          required
          errors={errors}
          register={register}
          disabled={isLoading}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          required
          errors={errors}
          register={register}
          disabled={isLoading}
        />
        <Link
          href="/forgot-password"
          className="flex justify-end text-sm font-semibold text-gray-400"
        >
          Forgot password?
        </Link>

        <SocialLoginForm />

        <div>
          <Button disabled={isLoading} fullWidth type="submit">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
