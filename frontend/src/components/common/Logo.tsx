import { MoonStar } from "lucide-react";

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({
  collapsed = false,
}: LogoProps) {
  return (
    <div
      className={`flex items-center ${
        collapsed ? "justify-center" : "gap-4"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15">
        <MoonStar
          size={22}
          className="text-violet-300"
        />
      </div>

      {!collapsed && (
        <div>
          <h1 className="text-lg font-semibold tracking-wide text-white">
            Odyssey
          </h1>

          <p className="text-xs tracking-[0.25em] uppercase text-slate-500">
            YOUR SECOND HOME
          </p>
        </div>
      )}
    </div>
  );
}