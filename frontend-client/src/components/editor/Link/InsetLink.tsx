"use client";

import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { validateUrl } from "@/lib/EditorUtils";
import { Popover, Transition } from "@headlessui/react";
import { NextPage } from "next";
import { Fragment, useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";

export type linkOption = {
  url: string;
  openInNewTab: boolean;
};

interface InsertLinkProps {
  onSubmit(link: linkOption): void;
  initialState?: linkOption;
}

const defaultLink = {
  url: "",
  openInNewTab: false,
};

const InsertLink: NextPage<InsertLinkProps> = ({ onSubmit, initialState }) => {
  const [link, setLink] = useState<linkOption>(defaultLink);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit({ ...link, url: validateUrl(link.url) });
  };

  const resetForm = () => {
    setLink({ ...defaultLink });
  };

  const handleCheckboxChange = (e: boolean) => {
    setLink((prev) => ({ ...prev, openInNewTab: e }));
  };

  useEffect(() => {
    if (initialState) setLink({ ...initialState });
  }, [initialState]);

  console.log(link);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="div"
            className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium transition-colors border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border-input hover:bg-accent hover:text-accent-foreground"
          >
            <BsLink45Deg size={20} />
          </Popover.Button>
          <Transition
            afterLeave={resetForm}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 flex items-center w-auto px-4 py-2 mt-3 bg-white rounded-md top-full">
              {({ close }) => (
                <div className="flex flex-row w-auto space-x-2">
                  <div className="flex flex-col space-y-3">
                    <Input
                      className="w-auto"
                      value={link.url}
                      onChange={(e) =>
                        setLink({ ...link, url: e.target.value })
                      }
                      placeholder="https://example.com"
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="tab"
                        onCheckedChange={handleCheckboxChange}
                      />

                      <label
                        htmlFor="tab"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Open in new tab
                      </label>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      handleSubmit();
                      close();
                    }}
                    width="fullWidth"
                    variant="outline"
                    className="justify-start w-auto px-2"
                  >
                    Apply
                  </Button>
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default InsertLink;
