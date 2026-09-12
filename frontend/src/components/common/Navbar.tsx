import {
  Bell,
  MoonStar,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClock();

    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-12 items-center justify-end sm:h-16">
      {/* Desktop Search */}
      <div className="hidden flex-1 justify-center xl:flex">
        <div className="flex w-[360px] items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
          <Search
            size={18}
            className="text-slate-500"
          />

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-2 sm:hidden">
        <button
          type="button"
          aria-label="Search"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          aria-label="Profile"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 font-semibold text-white"
        >
          K
        </button>
      </div>

      {/* Desktop / Tablet Right */}
      <div className="hidden items-center gap-3 sm:flex">
        <span className="hidden text-sm text-slate-400 lg:block">
          {time}
        </span>

        <button
          type="button"
          aria-label="Toggle appearance"
          className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-violet-300"
        >
          <MoonStar size={18} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <Bell size={18} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 font-semibold text-white">
          K
        </div>
      </div>
    </header>
  );
}