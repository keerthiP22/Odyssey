import { Outlet } from "react-router-dom";

import Sidebar from "@/components/common/Sidebar";
import Navbar from "@/components/common/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}