"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { validateUrl } from "@/lib/EditorUtils";
import { Popover, Transition } from "@headlessui/react";
import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";

export type dropDownOptions = {
  label: string;
  onClick: () => void;
}[];

interface HeadingDropDownProps {
  options: dropDownOptions;
  header: React.ReactNode;
}

const HeadingDropDown: NextPage<HeadingDropDownProps> = ({
  options,
  header,
}) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="div"
            className="inline-flex items-center justify-center w-full h-10 px-2 text-sm font-medium transition-colors border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border-input hover:bg-accent hover:text-accent-foreground"
          >
            {header}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 flex items-center w-auto px-2 py-2 mt-3 bg-white rounded-md top-full">
              <div className="flex flex-col space-y-2">
                {options.map((option) => (
                  <Button
                    key={option.label}
                    onClick={option.onClick}
                    className="w-full px-4 "
                    variant="ghost"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default HeadingDropDown;
