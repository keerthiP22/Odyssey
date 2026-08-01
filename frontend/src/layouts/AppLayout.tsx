import { Outlet } from "react-router-dom";

import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />

        <div className="flex min-h-screen flex-col">
          <Navbar />

          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}