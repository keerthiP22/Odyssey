import { type ReactNode } from "react";
import clsx from "clsx";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({
  children,
  className,
}: GlassPanelProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl",
        "border border-white/5",
        "bg-white/[0.04]",
        "backdrop-blur-xl",
        "shadow-[0_12px_40px_rgba(0,0,0,.25)]",
        "transition-all duration-300",
        className
      )}
    >
      {children}
    </section>
  );
}