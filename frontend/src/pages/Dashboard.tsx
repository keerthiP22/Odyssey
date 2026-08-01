import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import MissionControl from "@/components/dashboard/MissionControl";
import MiniStats from "@/components/dashboard/MiniStats";
import PlannerPreview from "@/components/dashboard/PlannerPreview";
import HabitPreview from "@/components/dashboard/HabitPreview";
import AiInsights from "@/components/dashboard/AiInsights";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeHeader />

      <MissionControl />

      <MiniStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <PlannerPreview />

        <HabitPreview />
      </div>

      <AiInsights />
    </div>
  );
}