import Logo from "@/components/Logo";

import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-100">
      <div className="flex items-center gap-2">
        <Logo large />
      </div>
      {children}
    </div>
  );
};

export default Layout;