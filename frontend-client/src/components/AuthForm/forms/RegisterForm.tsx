"use client";

import { NextPage } from "next";
import Input from "../../Inputs/Input";
import Button from "@/components/ui/Button";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "../SocialLoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/auth.schema";
import { useRegisterUserMutation } from "@/store/slices/api/authApi";

interface RegisterFormProps {}

const RegisterForm: NextPage<RegisterFormProps> = ({}) => {
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password, username } = data;

    const response = await registerUser({
      email: email,
      password: password,
      username: username,
    });

    if (isError) {
      console.log("error", error);
    }

    if (isSuccess) {
      console.log("success");
    }

    console.log("register form response", response);
  };

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          id="username"
          type="text"
          required
          errors={errors}
          register={register}
          disabled={isLoading}
        />

        <Input
          label="Email"
          id="email"
          type="email"
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

        <SocialLoginForm />

        <div>
          <Button disabled={isLoading} width="fullWidth" type="submit">
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
