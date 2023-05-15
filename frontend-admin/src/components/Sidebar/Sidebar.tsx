import { NextPage } from "next";
import Logo from "../Logo";
import { Button } from "../ui/button";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { BsChat } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

interface SidebarProps {}

const Sidebar: NextPage<SidebarProps> = () => {
  return (
    <aside className="h-full border-r border-gray-100 shadow-sm">
      <div className="w-16 h-full overflow-hidden bg-white ">
        <div className="h-16 border-b shadow-sm">
          <div className="flex flex-col items-center justify-center h-full">
            <Logo small />
          </div>
        </div>
        <div className="flex flex-col items-center my-3 space-y-3">
          <Button variant="outline">
            <MdOutlineDashboardCustomize className="w-6 h-6 text-gray-600" />
          </Button>
          <Button variant="outline">
            <BsChat className="w-6 h-6 text-gray-600" />
          </Button>
          <Button variant="outline">
            <AiOutlineMail className="w-6 h-6 text-gray-600" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
