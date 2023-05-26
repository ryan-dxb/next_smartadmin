"use client";

import { cn } from "@/lib/utils";
import { Dialog, Transition } from "@headlessui/react";
import { NextPage } from "next";
import { Fragment } from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalTitle?: string;
  large?: boolean;
}

const Modal: NextPage<ModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
  large,
  children,
}) => {
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

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={cn(
                  large ? "lg:max-w-4xl max-w-2xl" : "max-w-lg",
                  "relative w-full p-4 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl lg:my-8  lg:p-6"
                )}
              >
                <div className="z-10 flex flex-row items-center justify-between px-4">
                  <Dialog.Title
                    as="h3"
                    className="font-medium leading-6 text-gray-900 "
                  >
                    {modalTitle ? modalTitle : "Modal Title"}
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
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
