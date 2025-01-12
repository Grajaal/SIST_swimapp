import { getSwimmersFromTeam } from "@/data/swimmer";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSwimmerDataByDate } from "@/lib/my-utils";

export default async function TeamMembers() {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id)
    return <span>Session or user id does not exists</span>;

  const team = await getTeamByCoachId(sessionUser.id);

  if (!team || !team.id) return;

  const swimmers = await getSwimmersFromTeam(team.id);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Horas de sueño</TableHead>
            <TableHead>Calidad del sueño</TableHead>
            <TableHead>Fatiga</TableHead>
            <TableHead>Dolor muscular</TableHead>
            <TableHead>Estrés</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {swimmers.map((swimmer) => {
            const todayEntry = getSwimmerDataByDate(swimmer.data, new Date());
            return (
              <TableRow key={swimmer.id}>
                <TableCell>{swimmer.user.name}</TableCell>
                <TableCell>{todayEntry?.sleepHours}</TableCell>
                <TableCell>{todayEntry?.sleepQuality}</TableCell>
                <TableCell>{todayEntry?.fatigue}</TableCell>
                <TableCell>{todayEntry?.musclePain}</TableCell>
                <TableCell>{todayEntry?.stress}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
