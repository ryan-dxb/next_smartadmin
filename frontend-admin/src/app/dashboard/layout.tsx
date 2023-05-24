import Sidebar from "@/components/Sidebar/Sidebar";
import { FC, ReactNode } from "react";
import DashboardHeader from "./components/DashboardHeader";
import DesktopSidebarPanel from "@/components/Sidebar/DesktopSidebarPanel";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex flex-col w-full bg-gray-100">
        <div className="w-full h-16">
          <DashboardHeader />
        </div>
        <main className="flex-1 overflow-hidden">
          <div className="relative flex flex-1 h-full ">
            <DesktopSidebarPanel />
            <div className="flex flex-1 m-4 overflow-y-auto scrollbar scrollbar-w-1 scrollbar-thumb-indigo-600 scrollbar-track-gray-200 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
