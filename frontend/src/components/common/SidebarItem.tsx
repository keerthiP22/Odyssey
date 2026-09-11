import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export default function SidebarItem({
  to,
  icon: Icon,
  label,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `
          group
          relative
          flex
          h-11
          items-center
          gap-3
          rounded-xl
          px-3
          text-sm
          transition-colors
          duration-200

          ${
            isActive
              ? "bg-violet-400/[0.09] text-slate-100"
              : "text-slate-500 hover:bg-white/[0.025] hover:text-slate-300"
          }
        `
      }
    >
      {({ isActive }) => (
        <>
          {/* Subtle active indicator */}
          {isActive && (
            <span
              aria-hidden="true"
              className="
                absolute
                left-0
                top-1/2
                h-5
                w-[2px]
                -translate-y-1/2
                rounded-full
                bg-violet-400/80
              "
            />
          )}

          {/* Icon */}
          <span
            className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              transition-colors
              duration-200

              ${
                isActive
                  ? "bg-violet-400/[0.10] text-violet-300"
                  : "text-slate-500 group-hover:text-slate-300"
              }
            `}
          >
            <Icon
              size={18}
              strokeWidth={isActive ? 1.9 : 1.7}
            />
          </span>

          {/* Label */}
          <span
            className={`
              truncate
              font-medium
              tracking-[-0.01em]
              ${
                isActive
                  ? "text-slate-100"
                  : "text-slate-500 group-hover:text-slate-300"
              }
            `}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
}