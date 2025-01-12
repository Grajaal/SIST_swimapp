import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSwimmersFromTeam, hasCompletedForm } from "@/data/swimmer";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function DailyRegister({ className }: { className?: string }) {
  const userSession = await currentUser();
  const team = await getTeamByCoachId(userSession.id);
  const swimmers = await getSwimmersFromTeam(team?.id);

  const swimmersWithCompletion = await Promise.all(
    swimmers.map(async (swimmer) => {
      const hasCompleted = await hasCompletedForm(swimmer.id, new Date());
      return { ...swimmer, hasCompleted };
    })
  );

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Registro diario</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {swimmersWithCompletion.map((swimmer) => (
            <div key={swimmer.id} className="flex space-x-4 items-center">
              <Avatar>
                <AvatarImage src={swimmer.user.image || ""} />
                <AvatarFallback className="bg-muted-foreground">
                  <span className="text-lg">
                    {swimmer.user.name?.charAt(0)}
                  </span>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span>{swimmer.user.name}</span>
                <span
                  className={clsx("text-sm", {
                    "text-emerald-500": swimmer.hasCompleted,
                    "text-red-500": !swimmer.hasCompleted,
                  })}
                >
                  {swimmer.hasCompleted ? "Ha respondido" : "No respondido"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
