import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateGroupForm } from "@/components/coach/group/header/create-group-form";
import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";
import { getSwimmersFromTeam } from "@/data/swimmer";
import { SwimmerWithUser } from "@/prisma/custom";

export async function CreateGroupDialog() {
  const team = await getTeamByCoachId((await currentUser()).id);
  const swimmers: SwimmerWithUser[] = await getSwimmersFromTeam(team?.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crear grupo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear nuevo grupo</DialogTitle>
        </DialogHeader>
        <CreateGroupForm teamId={team.id} swimmers={swimmers} />
      </DialogContent>
    </Dialog>
  );
}
