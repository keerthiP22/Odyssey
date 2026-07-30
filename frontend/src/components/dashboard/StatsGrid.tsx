import {
  Target,
  Flame,
  BookOpen,
  Brain,
} from "lucide-react";

import StatCard from "./StatCard";

export default function StatsGrid() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Goals"
        value={12}
        subtitle="Completed this week"
        icon={Target}
      />

      <StatCard
        title="Current Streak"
        value="28 Days"
        subtitle="Keep it going!"
        icon={Flame}
      />

      <StatCard
        title="Journal Entries"
        value={54}
        subtitle="Total reflections"
        icon={BookOpen}
      />

      <StatCard
        title="AI Score"
        value="92%"
        subtitle="Personal Growth"
        icon={Brain}
      />
    </section>
  );
}