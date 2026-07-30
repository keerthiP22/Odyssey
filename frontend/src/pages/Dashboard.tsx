import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeHeader />

      <StatsGrid />
    </div>
  );
}