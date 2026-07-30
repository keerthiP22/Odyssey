import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">Odyssey</h1>

      <div className="flex items-center gap-5">
        <Search className="cursor-pointer" />
        <Bell className="cursor-pointer" />
        <UserCircle2 size={32} className="cursor-pointer" />
      </div>
    </header>
  );
}