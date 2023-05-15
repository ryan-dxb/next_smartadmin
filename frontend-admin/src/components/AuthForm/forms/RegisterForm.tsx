"use client";

import { NextPage } from "next";
import Input from "../../Inputs/Input";
import Button from "../../Button";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "../SocialLoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/auth.schema";

interface RegisterFormProps {}

const RegisterForm: NextPage<RegisterFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    console.log(data);

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
          <Button disabled={isLoading} fullWidth type="submit">
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
