import {
  Target,
  Flame,
  Zap,
  CheckCircle2,
} from "lucide-react";

import StatCard from "./StatCard";

const stats = [
  {
    title: "Goals",
    value: "3 Due",
    icon: Target,
    color: "text-blue-500",
  },
  {
    title: "Streak",
    value: "8 Days",
    icon: Flame,
    color: "text-orange-500",
  },
  {
    title: "Focus",
    value: "82%",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    title: "Habits",
    value: "5 / 6",
    icon: CheckCircle2,
    color: "text-green-500",
  },
];

export default function MiniStats() {
  return (
    <section>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
    </section>
  );
}