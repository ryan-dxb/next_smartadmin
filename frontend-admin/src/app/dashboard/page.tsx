import { NextPage } from "next";
import DashboardHeader from "./components/DashboardHeader";
import DashboardMain from "./components/DashboardMain";
import DesktopSidebarPanel from "@/components/Sidebar/DesktopSidebarPanel";

interface DashboardProps {}

const Dashboard: NextPage<DashboardProps> = () => {
  return (
    <>
      <DashboardHeader />
      <DashboardMain />
    </>
  );
};

export default Dashboard;
