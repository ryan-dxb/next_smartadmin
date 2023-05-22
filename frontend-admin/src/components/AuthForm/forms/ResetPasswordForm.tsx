import Button from "@/components/ui/Button";
import Input from "@/components/Inputs/Input";
import { NextPage } from "next";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "../SocialLoginForm";
import Link from "next/link";
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface ResetPasswordFormProps {}

const ResetPasswordForm: NextPage<ResetPasswordFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(ResetPasswordSchema),
  });

  console.log(errors);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    console.log(errors);

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
          label="New Password"
          id="password"
          type="password"
          required
          errors={errors}
          register={register}
          disabled={isLoading}
        />

        <Input
          label="Confirm Password"
          id="confirmPassword"
          type="password"
          required
          errors={errors}
          register={register}
          disabled={isLoading}
        />

        <div>
          <Button disabled={isLoading} width="fullWidth" type="submit">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
