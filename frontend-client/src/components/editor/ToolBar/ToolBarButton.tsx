import React, { FC, MouseEventHandler, ReactNode, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ToolBarButton: FC<Props> = ({
  children,
  active,
  disabled,
  onMouseDown,
  onClick,
}): JSX.Element => {
  const getActiveStyle = useCallback((): string => {
    if (active) return "border-indigo-600 text-indigo-600";
    else
      return "border border-input hover:bg-accent hover:text-accent-foreground";
  }, [active]);

  const commonClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 w-10";

  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={cn(commonClasses, getActiveStyle())}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ToolBarButton;
