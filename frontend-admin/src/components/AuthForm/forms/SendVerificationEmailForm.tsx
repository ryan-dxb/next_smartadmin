import Button from "@/components/Button";
import Input from "@/components/Inputs/Input";
import { NextPage } from "next";

import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "../SocialLoginForm";
import Link from "next/link";
import { ForgotPasswordSchema } from "@/schema/auth.schema";
import { yupResolver } from "@hookform/resolvers/yup";

interface SendVerificationEmailFormProps {}

const SendVerificationEmailForm: NextPage<
  SendVerificationEmailFormProps
> = () => {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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
          label="Email"
          id="email"
          type="text"
          required
          errors={errors}
          register={register}
          disabled={isLoading}
        />

        <div>
          <Button disabled={isLoading} fullWidth type="submit">
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SendVerificationEmailForm;
