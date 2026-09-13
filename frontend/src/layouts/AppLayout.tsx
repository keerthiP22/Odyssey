import { Outlet } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import MobileNavigation from "@/layouts/MobileNavigation";

import { SidebarProvider } from "@/contexts/SidebarContext";
import { EnvironmentProvider } from "@/contexts/EnvironmentContext";
import { useTimeOfDay } from "@/hooks/useTimeOfDay";

export default function AppLayout() {
  const timeOfDay = useTimeOfDay();

  useEffect(() => {
    document.documentElement.dataset.timeOfDay = timeOfDay;
  }, [timeOfDay]);

  return (
    <EnvironmentProvider>
      <SidebarProvider>
        <div className="relative flex min-h-screen overflow-hidden text-white">
          {/* 
            Odyssey environmental atmosphere.

            This sits behind the entire application and changes
            according to:
            - weather
            - time of day
          */}
          <div
            className="odyssey-environment"
            aria-hidden="true"
          />

          {/* Actual Odyssey interface */}
          <div className="relative z-10 flex min-h-screen w-full">
            {/* Desktop Sidebar */}
            <div className="hidden sm:flex">
              <Sidebar />
            </div>

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">
              {/* Navbar */}
              <div className="sticky top-0 z-30 px-4 py-3 sm:px-7 sm:py-5">
                <Navbar />
              </div>

              {/* Page */}
              <main className="min-w-0 flex-1 overflow-y-auto px-4 pb-24 sm:px-7 sm:pb-8">
                <div className="mx-auto w-full max-w-6xl">
                  <Outlet />
                </div>
              </main>
            </div>
          </div>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </SidebarProvider>
    </EnvironmentProvider>
  );
}