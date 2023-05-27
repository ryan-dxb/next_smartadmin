import { FC, useEffect, useState } from "react";
import { BsYoutube } from "react-icons/bs";
import ToolBarButton from "./ToolBarButton";
import { Popover, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

import { NextPage } from "next";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "lucide-react";

interface EmbedYoutubeProps {
  onSubmit(link: string): void;
}

const solutions = [
  {
    name: "Insights",
    description: "Measure actions your users take",
    href: "##",
  },
  {
    name: "Automations",
    description: "Create your own targeted content",
    href: "##",
  },
  {
    name: "Reports",
    description: "Keep track of your growth",
    href: "##",
  },
];

const EmbedYoutube: NextPage<EmbedYoutubeProps> = ({ onSubmit }) => {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = () => {
    onSubmit(url);
    // closeModal();
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            as="div"
            className="inline-flex items-center justify-center w-10 h-10 text-sm font-medium transition-colors border rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border-input hover:bg-accent hover:text-accent-foreground"
          >
            <BsYoutube size={20} />
          </Popover.Button>
          <Transition
            afterLeave={() => setUrl("")}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 flex items-center w-auto px-4 py-2 mt-3 bg-white rounded-md top-full">
              <div className="flex flex-row items-center w-auto space-x-2">
                <Input
                  className="w-auto"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter Youtube URL"
                />

                <Button
                  onClick={handleSubmit}
                  width="fullWidth"
                  variant="outline"
                  className="w-auto px-2"
                >
                  Embed
                </Button>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default EmbedYoutube;
