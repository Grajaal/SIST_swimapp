import { Card, CardContent } from "@/components/ui/card";
import { TrainingsCardHeader } from "@/components/coach/group/header/trainings-card-header";
import { GroupsContainer } from "@/components/coach/group/groups-container";
import { getGroupsFromTeam } from "@/data/group";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";
import { DateProvider } from "@/context/date-context";

export async function TrainingsCard({ className }: { className?: string }) {
  const team = await getTeamByCoachId((await currentUser()).id);
  const groups = await getGroupsFromTeam(team.id);

  return (
    <DateProvider>
      <Card className={className}>
        <TrainingsCardHeader />
        <CardContent className="flex flex-1">
          <GroupsContainer groups={groups} />
        </CardContent>
      </Card>
    </DateProvider>
  );
}
