"use state";

import { Button } from "@/components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import CollapsibleContainer from "@/components/ui/CollapsibleContainer";
import { Input } from "@/components/ui/Input";
import { Transition } from "@headlessui/react";
import { ChevronsUpDown } from "lucide-react";
import { NextPage } from "next";
import { useState } from "react";

interface SeoContainerProps {}

const SeoContainer: NextPage<SeoContainerProps> = ({}) => {
  const [isSEOContainerOpen, setIsSEOContainerOpen] = useState(true);

  return (
    <CollapsibleContainer
      ContainerHeader={
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold tracking-tight text-gray-500 uppercase">
            SEO Fields
          </h4>
          <div>
            <ChevronsUpDown className="w-4 h-4" />
            <span className="sr-only">Toggle</span>
          </div>
        </div>
      }
    >
      <div className="flex flex-col m-2 space-y-2">
        <Input placeholder="Slug" />
        <Input placeholder="Meta Description" />
      </div>
    </CollapsibleContainer>
  );
};

export default SeoContainer;
