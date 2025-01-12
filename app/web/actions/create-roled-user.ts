"use server";

import { createCoach } from "@/data/coach";
import { createSwimmer } from "@/data/swimmer";
import { currentUser } from "@/lib/auth";
import { Role } from "@prisma/client";
import { updateRole } from "@/data/user";

export async function createRoledUser(role: Role) {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id) {
    return Error("There is not an user session.");
  }

  await updateRole(sessionUser.id, role);

  if (role === Role.coach) {
    createCoach(sessionUser.id);
    sessionUser.role = Role.coach;
  } else if (role === Role.swimmer) {
    createSwimmer(sessionUser.id);
    sessionUser.role = Role.swimmer;
  }

  console.log(sessionUser);
}
