import Button from "@/components/ui/Button";
import Input from "@/components/Inputs/Input";
import { NextPage } from "next";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "../SocialLoginForm";
import Link from "next/link";
import { ResetPasswordSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useResetPasswordMutation } from "@/store/slices/api/authApi";

interface ResetPasswordFormProps {
  token?: string;
  id?: string;
}

const ResetPasswordForm: NextPage<ResetPasswordFormProps> = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [resetPassword, { isError, error, isSuccess }] =
    useResetPasswordMutation();

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await resetPassword({
      userId: id,
      token: token,
      password: data.password,
    });

    if (isError) {
      console.log("error", error);
    }

    if (isSuccess) {
      console.log("success");
    }

    console.log("response", response);
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
