"use client";

import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex text-white items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 ease-in-out",

  {
    variants: {
      variant: {
        default: "bg-indigo-500 hover:bg-indigo-600",
        destructive: "bg-rose-500  hover:bg-rose-600",
        outline:
          "border border-[2px] text-gray-600 hover:border-indigo-600 hover:text-indigo-600 focus-visible:border-indigo-600 focus-visible:text-indigo-600 ",
        disabled: "opacity-50 cursor-not-allowed",
        danger: "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        dangerOutline: "border border-[1px] hover:border-rose-600",
      },
      size: {
        default: "h-10 w-10",
        sm: "h-9  w-9",
        lg: "h-11 w-11  ",
      },
      width: {
        default: "",
        fullWidth: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  active?: boolean;
}

// interface ButtonProps {
//   fullWidth?: boolean;
//   children: React.ReactNode;
//   onClick?: () => void;
//   secondary?: boolean;
//   danger?: boolean;
//   disabled?: boolean;
// }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      type,
      active,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        type={type}
        className={cn(
          buttonVariants({
            variant,
            width,
            size,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

export default Button;
