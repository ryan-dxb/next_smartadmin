import Sidebar from "@/components/sidebar/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import DashboardHeader from "@/components/header/Header";
import CommandPalette from "@/components/ui/CommandPalette";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smart Admin",
  description: "All in one admin dashboard template for React",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row w-full h-screen overflow-hidden">
          <CommandPalette />
          <Sidebar />
          <main className="flex flex-col w-full h-full bg-gray-50">
            <DashboardHeader />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
