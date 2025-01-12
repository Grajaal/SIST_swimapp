import { Card, CardContent, CardHeader } from "@/components/ui/card";
import TeamMembers from "@/components/coach/team-members";

export default function TeamMembersCard() {
  return (
    <Card className="flex flex-col items-center justify-center w-[600px]">
      <CardHeader>
        <h2 className="font-bold text-xl">👥 Tu equipo</h2>
      </CardHeader>
      <CardContent>
        <TeamMembers />
      </CardContent>
    </Card>
  );
}
