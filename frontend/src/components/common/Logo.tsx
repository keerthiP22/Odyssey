import { Sparkles } from "lucide-react";

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed = false }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <Sparkles className="h-5 w-5" />
      </div>

      {!collapsed && (
        <div>
          <h1 className="text-lg font-bold tracking-tight">
            Odyssey
          </h1>
          <p className="text-sm text-muted-foreground">
            Become Better Daily
          </p>
        </div>
      )}
    </div>
  );
}