import { NextPage } from "next";
import Input from "../Inputs/Input";
import Button from "../Button";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import SocialLoginForm from "./SocialLoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "@/schema/auth.schema";

interface LoginFormProps {}

const LoginForm: NextPage<LoginFormProps> = ({}) => {
  const [showPasswordToggle, setShowPasswordToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const showPasswordToggleHandler = useCallback(() => {
    setShowPasswordToggle((prev) => (prev == false ? true : false));
  }, []);

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
          showPassword={showPasswordToggle}
          togglePassword={showPasswordToggleHandler}
        />
        <span className="flex justify-end text-sm font-semibold text-gray-400">
          Forgot password?
        </span>

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

export default LoginForm;
