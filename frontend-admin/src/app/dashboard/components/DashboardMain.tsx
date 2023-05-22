import DesktopSidebarPanel from "@/components/Sidebar/DesktopSidebarPanel";
import { NextPage } from "next";
import DashboardUserTable from "./DashboardUserTable";

interface DashboardMainProps {}

const DashboardMain: NextPage<DashboardMainProps> = () => {
  return (
    <div className="relative flex flex-1 h-full overflow-hidden">
      <DesktopSidebarPanel />
      <div className="flex flex-1 m-4">
        <DashboardUserTable />
      </div>
    </div>
  );
};

export default DashboardMain;
