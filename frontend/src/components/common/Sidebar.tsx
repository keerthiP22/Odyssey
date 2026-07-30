import {
  Home,
  Target,
  BookOpen,
  Bot,
  BarChart3,
  Settings,
} from "lucide-react";

import Logo from "./Logo";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-background px-5 py-6">
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
  );
}