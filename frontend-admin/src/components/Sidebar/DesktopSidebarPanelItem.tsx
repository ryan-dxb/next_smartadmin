import { Separator } from "@radix-ui/react-separator";
import { NextPage } from "next";
import Link from "next/link";
import { IconType } from "react-icons";

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
  console.log(route);

  return (
    <>
      <li className="my-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">
        <Link href={route.href}>{route.label}</Link>
      </li>
      {route.subRoutes && (
        <ul>
          {route.subRoutes.map((subRoute) => (
            <li
              className="flex items-center px-4 py-2 space-x-2 "
              key={subRoute.label}
            >
              <subRoute.icon className="w-5 h-5 text-gray-600" />

              <Link className="text-sm text-gray-600" href={subRoute.href}>
                {subRoute.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DesktopSidebarPanelItem;
