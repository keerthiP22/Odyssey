import { Outlet } from "react-router-dom";

import Sidebar from "@/components/common/Sidebar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}