import { RoleGate } from "@/components/auth/role-gate";
import { Role } from "@prisma/client";

import { currentUser } from "@/lib/auth";
import { JoinTeamForm } from "@/components/swimmer/join-team-form";
import { hasTeam } from "@/data/swimmer";
import { redirect } from "next/navigation";

export default async function JoinTeamPage() {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id) return <p>No estás autenticado</p>;

  const isInTeam = await hasTeam(sessionUser?.id);

  if (isInTeam) {
    redirect("/dashboard");
  }

  return (
    <RoleGate allowedRole={Role.swimmer}>
      <div className="flex justify-center items-center h-full">
        <JoinTeamForm />
      </div>
    </RoleGate>
  );
}
