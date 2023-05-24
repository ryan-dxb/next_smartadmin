"use client";

import useRoutes from "@/routes";
import { NextPage } from "next";
import DesktopSidebarPanelItem from "./DesktopSidebarPanelItem";
import { Separator } from "../ui/seperator";

interface DesktopSidebarPanelProps {}

const DesktopSidebarPanel: NextPage<DesktopSidebarPanelProps> = () => {
  const { dashboardRoutes } = useRoutes();

  return (
    <div className="hidden w-56 h-full overflow-hidden bg-white border-r lg:block">
      <nav className="mx-4 my-3">
        <ul>
          {dashboardRoutes.map((route, i) => (
            <DesktopSidebarPanelItem key={route.label} route={route} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopSidebarPanel;
