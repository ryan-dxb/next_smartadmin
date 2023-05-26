"use client";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { NextPage } from "next";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface DrawerProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  openRight?: boolean;
  openLeft?: boolean;
  openTop?: boolean;
  openBottom?: boolean;
}

const Drawer: NextPage<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  openRight,
  openLeft,
  openTop,
  openBottom,
}) => {
  // Create Styles for Drawer
  let drawerStyles = "";

  // Right Drawer
  class RightDrawer {
    rightDrawerStyle = () => {
      return "fixed top-0 bottom-0 right-0 z-10 overflow-y-auto";
    };
  }

  if (openRight) {
    const rightDrawer = new RightDrawer();
    drawerStyles = rightDrawer.rightDrawerStyle();
  }

  // Left Drawer
  class LeftDrawer {
    leftDrawerStyle = () => {
      return "fixed top-0 bottom-0 left-0 z-10 overflow-y-auto";
    };

    leftDrawerPanelStyle = () => {
      return "relative w-full min-h-full px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-red-300";
    };
  }

  if (openLeft) {
    const leftDrawer = new LeftDrawer();
    drawerStyles = leftDrawer.leftDrawerStyle();
  }

  // Top Drawer
  // const topDrawer = "fixed top-0 left-0 right-0 z-10 overflow-y-auto";

  // Bottom Drawer
  // const bottomDrawer = "fixed bottom-0 left-0 right-0 z-10 overflow-y-auto";

  // Enter From

  // Enter To

  // Leave From

  // Leave To

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 " />
        </Transition.Child>

        {/* Open Drawer from right */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300 transform transition delay-200"
          enterFrom={clsx(
            openRight && "translate-x-full",
            openLeft && "-translate-x-full",
            openTop && "translate-y-full",
            openBottom && "-translate-y-full"
          )}
          enterTo={clsx(
            openRight && "-translate-x-0",
            openLeft && "translate-x-0",
            openTop && "-translate-y-0",
            openBottom && "translate-y-0"
          )}
          leave="ease-in duration-200 transform transition"
          leaveFrom={clsx(
            openRight && "-translate-x-0",
            openLeft && "translate-x-0",
            openTop && "-translate-y-0",
            openBottom && "translate-y-0"
          )}
          leaveTo={clsx(
            openRight && "translate-x-full",
            openLeft && "-translate-x-full",
            openTop && "translate-y-full",
            openBottom && "-translate-y-full"
          )}
        >
          <div className={drawerStyles}>
            <div className="flex min-h-full p-4 text-center bg-white w-80 ">
              <Dialog.Panel className="relative w-full min-h-full px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-red-300">
                {/* Header with Close */}
                <div className="flex items-center justify-between">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Modal title
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <IoClose className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {children}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Drawer;
