import {
  Home,
  Target,
  BookOpen,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";

import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();
useEffect(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  };

  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("keydown", handleEscape);
  };
}, [closeSidebar]);
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-md backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[320px] flex-col border-r bg-background px-5 py-6 rounded-r-3xl shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="mt-10 flex flex-1 flex-col gap-2">
          <SidebarItem
            to="/dashboard"
            label="Dashboard"
            icon={Home}
          />

          <SidebarItem
            to="/goals"
            label="Goals"
            icon={Target}
          />

          <SidebarItem
            to="/journal"
            label="Journal"
            icon={BookOpen}
          />

          <SidebarItem
            to="/coach"
            label="AI Coach"
            icon={Bot}
          />

          <SidebarItem
            to="/analytics"
            label="Analytics"
            icon={BarChart3}
          />

          <SidebarItem
            to="/settings"
            label="Settings"
            icon={Settings}
          />
        </nav>

        {/* User Profile */}
        <div className="mt-auto rounded-2xl border p-4">
          <h3 className="font-semibold">Keerthi Prada</h3>

          <p className="text-sm text-muted-foreground">
            AI Engineer
          </p>
        </div>
      </aside>
    </>
  );
}