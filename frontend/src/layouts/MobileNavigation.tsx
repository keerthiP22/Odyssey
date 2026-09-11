import {
  BookOpen,
  CalendarDays,
  Home,
  Bot,
  Target,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const items = [
  {
    to: "/home",
    label: "Home",
    icon: Home,
  },
  {
    to: "/goals",
    label: "Goals",
    icon: Target,
  },
  {
    to: "/planner",
    label: "Planner",
    icon: CalendarDays,
  },
  {
    to: "/journal",
    label: "Journal",
    icon: BookOpen,
  },
  {
    to: "/coach",
    label: "JARVIS",
    icon: Bot,
  },
];

export default function MobileNavigation() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.08] bg-[#0D1322]/95 px-2 pb-[env(safe-area-inset-bottom)] pt-2 backdrop-blur-2xl sm:hidden"
    >
      <div className="mx-auto flex h-14 max-w-md items-stretch justify-around">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-medium transition-colors ${
                  isActive
                    ? "text-violet-300"
                    : "text-[#68738A] hover:text-[#AEB5C6]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-8 w-10 items-center justify-center rounded-xl transition-colors ${
                      isActive
                        ? "bg-violet-400/[0.10]"
                        : "bg-transparent"
                    }`}
                  >
                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2 : 1.7}
                    />
                  </span>

                  <span className="leading-none">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}