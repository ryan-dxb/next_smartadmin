import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import Image from "next/image";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMoonOutline, IoMailOutline } from "react-icons/io5";

interface DashboardHeaderProps {}

const DashboardHeader: NextPage<DashboardHeaderProps> = () => {
  return (
    <div className="flex items-center w-full h-16 bg-white border-b ">
      <div className="w-full px-4">
        <div className="flex flex-row items-center justify-end space-x-6 ">
          <div className="flex items-center space-x-4">
            <Button size="lg" variant="outline">
              <IoMdNotificationsOutline className="w-6 h-6 text-gray-600" />
            </Button>
            <Button size="lg" variant="outline">
              <IoMailOutline className="w-6 h-6 text-gray-600" />
            </Button>
            <Button size="lg" variant="outline">
              <IoMoonOutline className="w-6 h-6 text-gray-600" />
            </Button>
          </div>
          <Button size="lg" variant="outline">
            <div className="relative w-10 h-10 bg-auto rounded-md">
              <Image
                src="/avatar.jpg"
                fill
                alt="Avatar"
                className="overflow-hidden rounded-md"
              />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
