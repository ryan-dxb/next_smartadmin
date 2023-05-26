"use client";

import { NextPage } from "next";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface CommandPaletteProps {}

const CommandPalette: NextPage<CommandPaletteProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  // Using shortcurts to open the command palette
  useEffect(() => {
    // Toggles the command palette when the user presses cmd + ;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === ";" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const handleSearch = (e: any) => {
    setQuery(e.target.value);
  };

  const options = ["Project One", "Project Two", "Project Three"];

  // Use debounce to prevent the search from being triggered too often

  const filteredOptions = query
    ? options.filter((option) =>
        option.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        </Transition.Child>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            onChange={(value) => {
              // value we get from the combobox is the index of the option
              // we can use this to navigate to the page
              console.log(value);
            }}
            as="div"
            className="relative max-w-xl mx-auto bg-white divide-y divide-gray-100 shadow-2xl rounded-xl ring-1 ring-black/5"
          >
            <div className="flex items-center px-4">
              <BiSearch className="w-6 h-6 text-gray-600 " aria-hidden="true" />
              <Combobox.Input
                onChange={handleSearch}
                className="w-full h-12 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-0 focus:ring-0"
                placeholder="Search..."
              />
            </div>

            {filteredOptions.length > 0 && (
              <Combobox.Options
                className="py-4 overflow-y-auto text-sm max-h-96"
                static
              >
                {filteredOptions.map((option, index) => (
                  <Combobox.Option key={index} value={index}>
                    {({ active }) => (
                      <div
                        className={`${
                          active ? "bg-indigo-600 text-white" : "bg-white"
                        } px-4 py-2 `}
                      >
                        {option}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query && filteredOptions.length === 0 && (
              <p className="px-4 py-2 text-sm">
                No results for "{query}". Try something else?
              </p>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandPalette;
