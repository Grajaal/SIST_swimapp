"use server";

import { getSwimmersByNames } from "@/data/swimmer";
import { db } from "@/lib/db";
import { CreateGroupSchema } from "@/schemas";
import { Group } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createGroup(teamId: string, name: string, swimmersNames: string[]) {

  const existingGroups = await db.group.findFirst({
    where: {
      teamId,
      name,
    }
  })

  if (existingGroups) {
    return { error: "Ya existe un grupo con ese nombre."}
  }

  const swimmers = await getSwimmersByNames(swimmersNames);

  await db.group.create({
    data: {
      name, 
      teamId, 
      swimmers: {
        connect: swimmers.map((swimmer) => ({id: swimmer.id}))
      }
    }
  })

  revalidatePath("/dashboard")
}

export async function updateGroup(group: Group, values: z.infer<typeof CreateGroupSchema>) {
  
}