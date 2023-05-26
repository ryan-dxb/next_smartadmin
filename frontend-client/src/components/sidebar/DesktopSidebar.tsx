"use client";

import useRoutes from "@/routes";
import { NextPage } from "next";
import DesktopSidebarPanelItem from "./DesktopSidebarPanelItem";
import Toggle from "../ui/Toggle";

interface DesktopSidebarPanelProps {}

const DesktopSidebarPanel: NextPage<DesktopSidebarPanelProps> = () => {
  const { dashboardRoutes } = useRoutes();

  return (
    <>
      <div className="flex-col hidden w-56 h-full overflow-hidden bg-white border-r lg:flex">
        <nav className="mx-4 my-3">
          <ul>
            {dashboardRoutes.map((route, i) => (
              <DesktopSidebarPanelItem key={route.label} route={route} />
            ))}
          </ul>
        </nav>
        <div>{/* <SettingsModal /> */}</div>
      </div>
    </>
  );
};

export default DesktopSidebarPanel;
