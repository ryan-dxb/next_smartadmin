"use client";

import { NextPage } from "next";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

interface DropDownProps {}

const DropDown: NextPage<DropDownProps> = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <Fragment>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm ">
            Options
          </Menu.Button>
          <Transition
            show={open}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="px-1 py-1 ">
                <Menu.Item disabled>
                  {({ active, disabled }) => (
                    <a
                      href="#account-settings"
                      className={cn(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        disabled ? "opacity-50 cursor-not-allowed" : "",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Account settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#support"
                      className={cn(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Support
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#license"
                      className={cn(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      License
                    </a>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#sign-out"
                      className={cn(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Sign out
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Fragment>
      )}
    </Menu>
  );
};

export default DropDown;
