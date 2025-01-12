import { FatigueChart } from "@/components/charts/fatigue-chart";
import { MuscleChart } from "@/components/charts/muscle-chart";
import { QualityChart } from "@/components/charts/quality-chart";
import { SleepChart } from "@/components/charts/sleep-chart";
import { StressChart } from "@/components/charts/stress-chart";
import { SwimmersSelect } from "@/components/swimmers_select";
import { StatisticsProvider } from "@/context/statistics-context";
import { getSwimmersFromTeam } from "@/data/swimmer"
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";

export default async function StatisticsPage() {
  const userSession = await currentUser();
  const team = await getTeamByCoachId(userSession.id);
  const swimmers = await getSwimmersFromTeam(team.id);

  return (
    <StatisticsProvider>
      <div>
        <SwimmersSelect swimmers={swimmers} />
        <div className="grid grid-cols-6 grid-rows-[2fr_1fr] gap-4 p-4 h-screen">
          <SleepChart className="col-span-3" />
          <QualityChart className="col-span-3" />
          <FatigueChart className="col-span-2" />
          <MuscleChart className="col-span-2" />
          <StressChart className="col-span-2" />
        </div>
      </div>
    </StatisticsProvider >
  )
}
