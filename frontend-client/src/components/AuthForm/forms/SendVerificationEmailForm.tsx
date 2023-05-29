import Button from "@/components/ui/Button";
import Input from "@/components/Inputs/Input";
import { NextPage } from "next";

import { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { ForgotPasswordSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";

import { useSendVerificationEmailMutation } from "@/store/slices/api/authApi";

interface SendVerificationEmailFormProps {}

const SendVerificationEmailForm: NextPage<
  SendVerificationEmailFormProps
> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [sendVerificationEmail, { isError, error, isSuccess }] =
    useSendVerificationEmailMutation();

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
    const response = await sendVerificationEmail({
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
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SendVerificationEmailForm;
