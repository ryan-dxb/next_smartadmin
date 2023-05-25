"use client";

import SettingsModal from "@/components/Modal/SettingsModal";
import SettingsDrawer from "@/components/Drawer/SettingsDrawer";
import { Button } from "@/components/ui/Button";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline, IoMoonOutline, IoMailOutline } from "react-icons/io5";

interface DashboardHeaderProps {}

const currentUser = {
  name: "John Doe",
  image: "/avatar.jpg",
};

const DashboardHeader: NextPage<DashboardHeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      /> */}
      <SettingsDrawer
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="flex items-center w-full h-16 bg-white border-b ">
        <div className="flex ml-4 text-xl font-bold">
          <span className=""></span>SMART{" "}
          <span className="font-bold text-indigo-600">ADMIN</span>
        </div>
        <div className="hidden w-full px-4 md:inline-block">
          <div className="flex flex-row items-center justify-end space-x-6 ">
            <div className="flex items-center space-x-4">
              <Button size="lg" variant="outline">
                <IoSearchOutline className="w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline" width="default">
                <IoMdNotificationsOutline className="w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline">
                <IoMailOutline className="w-6 h-6" />
              </Button>
              <Button size="lg" variant="outline">
                <IoMoonOutline className="w-6 h-6" />
              </Button>
            </div>
            <Button
              size="lg"
              variant="outline"
              className="relative overflow-hidden rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Image src="/avatar.jpg" fill alt="Avatar" className="" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
