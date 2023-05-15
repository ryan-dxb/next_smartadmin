import clsx from "clsx";
import { NextPage } from "next";

interface LogoProps {
  withText?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

const Logo: NextPage<LogoProps> = ({
  withText = false,
  small,
  medium,
  large,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          `flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-md`,
          small && "w-9 h-9",
          medium && "w-10 h-10",
          large && "w-12 h-12"
        )}
      >
        <p className="text-lg font-bold text-white">SA</p>
      </div>
      {withText && (
        <h3 className="text-3xl font-semibold tracking-tighter text-indigo-600">
          smartadmin
        </h3>
      )}
    </div>
  );
};

export default Logo;
