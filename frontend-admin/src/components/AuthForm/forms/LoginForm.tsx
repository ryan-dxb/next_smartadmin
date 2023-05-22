"use client";

import { NextPage } from "next";

import Button from "@/components/ui/Button";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "../SocialLoginForm";
import Input from "@/components/Inputs/Input";
import Link from "next/link";
import { useLoginUserMutation } from "@/store/slices/api/authApi";

interface LoginFormProps {}

const LoginForm: NextPage<LoginFormProps> = ({}) => {
  // const [isLoading, setIsLoading] = useState(false);
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "test@test.com",
      password: "Password1*",
    },
    // resolver: yupResolver(RegisterSchema),
  });

  const isEmail = (str: string) => {
    // Check if input is valid email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const isEmailValid = isEmail(data.username);
    // setIsLoading(true);

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);

    let response;
    if (isEmailValid) {
      // login with email
      response = await loginUser({
        email: data.username,
        password: data.password,
      });
    } else {
      // login with username
      response = await loginUser({
        username: data.username,
        password: data.password,
      });
    }

    if (isError) {
      console.log("error", error);
    }

    if (isSuccess) {
      console.log("success");
    }

    console.log("response", response);

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
          <Button disabled={isLoading} width="fullWidth" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
