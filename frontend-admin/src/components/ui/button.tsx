import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex text-white items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none ",
  {
    variants: {
      variant: {
        default: "bg-indigo-500  hover:bg-indigo-600",
        destructive: "bg-rose-500  hover:bg-rose-600",
        outline: "border border-[1px] ",
        // hover:ring-indigo-600 hover:ring-2 hover:ring-offset-2 hover:border-transparent text-indigo-500 hover:text-indigo-600
        // secondary:
        //   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 w-10",
        sm: "h-9  w-9",
        lg: "h-11 w-11  ",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
