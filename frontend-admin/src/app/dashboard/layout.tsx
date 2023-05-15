import Sidebar from "@/components/Sidebar/Sidebar";
import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
