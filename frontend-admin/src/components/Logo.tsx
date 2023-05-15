import { NextPage } from "next";

interface LogoProps {
  withText?: boolean;
}

const Logo: NextPage<LogoProps> = ({ withText = false }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-md">
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
