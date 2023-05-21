"use client";

import useRoutes from "@/routes";
import { NextPage } from "next";
import DesktopSidebarPanelItem from "./DesktopSidebarPanelItem";
import { Separator } from "../ui/seperator";

interface DesktopSidebarPanelProps {}

const DesktopSidebarPanel: NextPage<DesktopSidebarPanelProps> = () => {
  const { dashboardRoutes } = useRoutes();

  console.log(dashboardRoutes);

  return (
    <div className="hidden w-56 h-full overflow-hidden bg-white border-r lg:block">
      <nav className="mx-4 my-3">
        <ul>
          {dashboardRoutes.map((route) => (
            <>
              <DesktopSidebarPanelItem key={route.label} route={route} />
              <Separator className="my-2 " orientation="horizontal" />
            </>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default DesktopSidebarPanel;
