import { Menu, Bell, Moon, Search, UserCircle2 } from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4 flex-1">
  <button
    onClick={toggleSidebar}
    className="rounded-xl p-2 transition hover:bg-muted"
  >
    <Menu size={20} />
  </button>

  <div className="relative w-full max-w-md">
    <Search
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
    />

    <input
      type="text"
      placeholder="Search..."
      className="w-full rounded-xl border bg-background py-2 pl-10 pr-4 outline-none transition focus:ring-2 focus:ring-primary"
    />
  </div>
</div>

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-xl border bg-background py-2 pl-10 pr-4 outline-none transition focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="rounded-xl p-2 transition hover:bg-muted">
          <Moon size={20} />
        </button>

        <button className="rounded-xl p-2 transition hover:bg-muted">
          <Bell size={20} />
        </button>

        <button className="rounded-full transition hover:opacity-90">
          <UserCircle2 size={36} />
        </button>
      </div>
    </header>
  );
}