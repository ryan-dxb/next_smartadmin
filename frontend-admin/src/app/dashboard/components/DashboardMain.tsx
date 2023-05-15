import DesktopSidebarPanel from "@/components/Sidebar/DesktopSidebarPanel";
import { NextPage } from "next";

interface DashboardMainProps {}

const DashboardMain: NextPage<DashboardMainProps> = () => {
  return (
    <div className="relative flex flex-1 h-full overflow-hidden">
      <DesktopSidebarPanel />
      <div className="flex flex-1 m-4">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
};

export default DashboardMain;
