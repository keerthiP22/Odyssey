import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PrimaryButton({
  children,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center gap-2",
        "rounded-2xl",
        "bg-violet-500",
        "px-6 py-3",
        "font-medium",
        "text-white",
        "transition-all duration-300",
        "hover:bg-violet-400",
        "hover:shadow-lg",
        "active:scale-95",
        className
      )}
    >
      {children}

      <ArrowRight size={18} />
    </button>
  );
}