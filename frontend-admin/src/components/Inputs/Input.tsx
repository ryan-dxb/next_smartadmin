"use client";

import { NextPage } from "next";
import clsx from "clsx";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
}

const Input: NextPage<InputProps> = ({
  label,
  id,
  type = "text",
  required = false,
  register,
  errors,
  disabled = false,
  showPassword = false,
  togglePassword,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={showPassword ? "text" : type}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `
          form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
        {errors?.[id] && (
          <div className="flex items-center pt-2 pointer-events-none ">
            <span className="text-xs text-rose-500">
              {errors?.[id]?.message?.toString()}
            </span>
          </div>
        )}
        {/* If Password and then show and hide icon */}
        {type === "password" && (
          <button
            onClick={togglePassword}
            type="button"
            className="absolute top-1.5 right-1"
          >
            {!showPassword ? (
              <AiOutlineEye className="text-2xl text-gray-400" />
            ) : (
              <AiOutlineEyeInvisible className="text-2xl text-gray-400" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
