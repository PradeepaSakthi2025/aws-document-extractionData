import React, { useState } from "react";
//import Sidebar from "./Sidebar";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex min-h-screen bg-gray-100 top-0 left-0">
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
      <div className={`flex-1 transition-margin duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}