"use client";

import { NextPage } from "next";
import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button: NextPage<ButtonProps> = ({
  type = "button",
  fullWidth = false,
  children,
  onClick,
  secondary,
  danger = false,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `
            flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
        `,
        fullWidth && "w-full",
        disabled && "opacity-50 cursor-not-allowed",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-indigo-500 hover:bg-indigo-600 focus-visible:outline-indigo-600"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
