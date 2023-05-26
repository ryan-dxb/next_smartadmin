import { NextPage } from "next";
import Logo from "@/components/common/Logo";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { Button } from "../ui/Button";

interface SidebarProps {}

const Sidebar: NextPage<SidebarProps> = () => {
  return (
    <aside className="h-full border-r shadow-sm border-border">
      <div className="w-16 h-full overflow-hidden bg-white ">
        <div className="h-16 border-b shadow-sm border-border">
          <div className="flex flex-col items-center justify-center h-full">
            <Logo small />
          </div>
        </div>
        <div className="flex flex-col items-center my-3 space-y-3">
          <Button variant="outline">
            <MdOutlineDashboardCustomize className="w-6 h-6 " />
          </Button>
          <Button variant="outline">
            <BsChat className="w-6 h-6 " />
          </Button>
          <Button variant="outline">
            <AiOutlineMail className="w-6 h-6 " />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
