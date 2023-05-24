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
      return "text-gray-600 hover:border-indigo-600 hover:text-indigo-600 focus-visible:border-indigo-600 focus-visible:text-indigo-600 ";
  }, [active]);

  const commonClasses =
    "inline-flex text-white items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none transition-all duration-200 ease-in-out border border-[2px] h-10 w-10";

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
