import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-primary",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {value}
          </h3>
        </div>

        <div className="rounded-xl bg-primary/10 p-3">
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );
}