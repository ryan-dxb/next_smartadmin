import { Button } from "@/components/ui/Button";
import { NextPage } from "next";

interface PublishProps {}

const Publish: NextPage<PublishProps> = () => {
  return (
    <div>
      <h4 className="p-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">
        Publish
      </h4>
      <div className="flex items-center justify-between w-full p-2 space-x-16">
        <Button variant="outline" className="w-full">
          <span className="text-sm font-semibold text-gray-500">
            Save as draft
          </span>
        </Button>
        <Button variant="default" className="w-full">
          <span className="text-sm font-semibold text-white">Publish</span>
        </Button>
      </div>
    </div>
  );
};

export default Publish;
