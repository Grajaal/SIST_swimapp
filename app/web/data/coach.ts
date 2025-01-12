"use server";

import { createTeam } from "@/data/team";
import { db } from "@/lib/db";
import { updateHasTeam } from "./user";

export async function createCoach(id: string) {
  try {
    const team = await createTeam();
    if (!team) throw Error("No existe team")
  
    await db.coach.create({
      data: {
        id, 
        teamId: team.id,
      }
    })
    updateHasTeam(id, true);
  } catch (e) {
    console.error("Database error: (createCoach)", e);
    throw Error("Database error in createCoach"); 
  }
}