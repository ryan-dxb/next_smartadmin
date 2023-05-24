import { cn } from "@/lib/utils";
import { NextPage } from "next";
import Link from "next/link";
import { IconType } from "react-icons";
import { Separator } from "../ui/seperator";

interface DesktopSidebarPanelItemProps {
  route: {
    label: string;
    href: string;
    active: boolean;
    subRoutes?: {
      label: string;
      href: string;
      active: boolean;
      icon: IconType;
    }[];
  };
}

const DesktopSidebarPanelItem: NextPage<DesktopSidebarPanelItemProps> = ({
  route,
}) => {
  return (
    <div key={route.label}>
      <li className="my-2 text-xs font-semibold tracking-tight text-gray-500 uppercase ">
        <p className="cursor-text">{route.label}</p>
      </li>
      {route.subRoutes && (
        <>
          <ul>
            {route.subRoutes.map((subRoute) => (
              <li
                className={cn(
                  "rounded-md group  hover:bg-gray-100",
                  subRoute.active && "bg-gray-100 "
                )}
                key={subRoute.label}
              >
                <Link
                  className="flex items-center px-4 py-2 space-x-2 rounded-md cursor-pointer"
                  href="/"
                >
                  <subRoute.icon className="w-5 h-5 text-gray-600" />
                  <p className="text-sm text-gray-600">{subRoute.label}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Separator className="my-2 " orientation="horizontal" />
        </>
      )}
    </div>
  );
};

export default DesktopSidebarPanelItem;
