"use client";

import { cn } from "@/lib/utils";
import { Switch } from "@headlessui/react";

import { NextPage } from "next";
import { useState } from "react";

interface ToggleProps {}

const Toggle: NextPage<ToggleProps> = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <div className="flex flex-col space-y-2 ">
        <Switch.Label
          as="h2"
          className="text-sm font-medium text-gray-900"
          passive
        >
          Dark Mode
        </Switch.Label>
        <Switch.Description as="p" className="text-sm text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
          impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis
          ratione.
        </Switch.Description>
      </div>

      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={cn(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={cn(
            enabled ? "translate-x-5" : "translate-x-0",
            "inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

export default Toggle;
