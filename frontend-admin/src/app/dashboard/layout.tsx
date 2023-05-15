import { FC, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full overflow-hidden bg-gray-100">{children}</div>
  );
};

export default Layout;
