"use client";

import { NextPage } from "next";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

interface SocialLoginFormProps {}

const SocialLoginForm: NextPage<SocialLoginFormProps> = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 text-gray-500 bg-white ">Or continue with</span>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <AuthSocialButton icon={BsGithub} onClick={() => {}} />
        <AuthSocialButton icon={BsGoogle} onClick={() => {}} />
      </div>
    </div>
  );
};

export default SocialLoginForm;
