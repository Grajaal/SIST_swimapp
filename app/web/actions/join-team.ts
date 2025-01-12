"use server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function joinTeam(teamId: string) {
  const sessionUser = await currentUser();

  const existingTeam = await db.team.findUnique({
    where: {
      id: teamId,
    },
  });

  if (!existingTeam) {
    return { error: "No existe ningun equipo con ese código." };
  }

  await db.swimmer.update({
    where: {
      id: sessionUser?.id,
    },
    data: {
      teamId,
    },
  });

  await db.user.update({
    where: {
      id: sessionUser?.id,
    },
    data: {
      hasTeam: true,
    },
  });

  redirect("/dashboard");
}
