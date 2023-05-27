import Editor from "@/components/editor/Editor";
import DesktopSidebarPanel from "@/components/sidebar/DesktopSidebar";

import { NextPage } from "next";

interface DashbardProps {}

const Dashbard: NextPage<DashbardProps> = () => {
  return (
    <div className="relative flex flex-1 h-screen overflow-hidden">
      <DesktopSidebarPanel />
      <div className="w-full mx-auto max-w-7xl">
        <Editor />
      </div>
    </div>
  );
};

export default Dashbard;
