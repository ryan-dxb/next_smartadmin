import Button from "@/components/ui/Button";
import Input from "@/components/Inputs/Input";
import { NextPage } from "next";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { ForgotPasswordSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForgotPasswordMutation } from "@/store/slices/api/authApi";

interface ForgotPasswordFormProps {}

const ForgotPasswordForm: NextPage<ForgotPasswordFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [forgotPassword, { isError, error, isSuccess }] =
    useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await forgotPassword({
      email: data.email,
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
          label="Email"
          id="email"
          type="text"
          required
          errors={errors}
          register={register}
          disabled={isLoading}
        />

        <div>
          <Button disabled={isLoading} width="fullWidth" type="submit">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
