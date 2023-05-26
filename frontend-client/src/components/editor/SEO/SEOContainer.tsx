"use state";

import { Button } from "@/components/ui/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import { Input } from "@/components/ui/Input";
import { ChevronsUpDown } from "lucide-react";
import { NextPage } from "next";
import { useState } from "react";

interface SEOContainerProps {}

const SEOContainer: NextPage<SEOContainerProps> = ({}) => {
  const [isSEOContainerOpen, setIsSEOContainerOpen] = useState(true);

  return (
    <Collapsible
      className="flex flex-col border-2"
      open={isSEOContainerOpen}
      onOpenChange={setIsSEOContainerOpen}
    >
      <div className="flex items-center justify-between px-4 ">
        <h4 className="text-xs font-semibold tracking-tight text-gray-500 uppercase">
          SEO Fields
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-0 w-9">
            <ChevronsUpDown className="w-4 h-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="flex flex-col m-2 space-y-2">
          <Input placeholder="Slug" />
          <Input placeholder="Meta Description" />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SEOContainer;
