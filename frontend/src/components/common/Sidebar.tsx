import {
  Home,
  Target,
  CalendarDays,
  BookOpen,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import { useSidebar } from "@/contexts/SidebarContext";

export default function Sidebar() {
  const { isSidebarOpen } = useSidebar();

  return (
    <aside
      className={`
        relative
        z-40
        flex
        h-screen
        flex-shrink-0
        flex-col
        overflow-hidden
        border-r border-white/[0.06]
        bg-[#0D1422]
        transition-[width] duration-300 ease-out
        ${isSidebarOpen ? "w-[228px]" : "w-[72px]"}
      `}
    >
      {/* Header */}

      <div
        className={`
          flex h-[96px] shrink-0 items-center
          ${isSidebarOpen ? "px-5" : "justify-center px-3"}
        `}
      >
        <Logo collapsed={!isSidebarOpen} />
      </div>

      <div className="mx-5 h-px bg-white/[0.055]" />

      {/* Navigation */}

      <nav
        className={`
          flex flex-1 flex-col
          ${isSidebarOpen ? "px-3 py-6" : "items-center px-2 py-5"}
        `}
      >
        <div className="flex flex-col gap-1.5">
          <SidebarItem
            to="/home"
            icon={Home}
            label="Home"
          />

          <SidebarItem
            to="/goals"
            icon={Target}
            label="Goals"
          />

          <SidebarItem
            to="/planner"
            icon={CalendarDays}
            label="Planner"
          />

          <SidebarItem
            to="/journal"
            icon={BookOpen}
            label="Journal"
          />

          <SidebarItem
            to="/coach"
            icon={Bot}
            label="JARVIS"
          />

          <SidebarItem
            to="/analytics"
            icon={BarChart3}
            label="Analytics"
          />
        </div>
      </nav>

      {/* Bottom */}

      <div
        className={`
          shrink-0 border-t border-white/[0.055]
          ${isSidebarOpen ? "px-3 pb-4 pt-4" : "px-2 pb-4 pt-4"}
        `}
      >
        <SidebarItem
          to="/settings"
          icon={Settings}
          label="Settings"
        />

        {isSidebarOpen && (
          <div className="mt-3 flex items-center gap-3 rounded-xl px-3 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-medium text-violet-200">
              K
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-200">
                Keerthi
              </p>

              <p className="mt-0.5 truncate text-[11px] text-slate-500">
                Odyssey Explorer
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}