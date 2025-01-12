"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { string } from "zod";

export async function getGroupsFromTeam(teamId: string | undefined) {

  if (!teamId){
    return [];
  }

  const groups = await db.group.findMany({
    where: {
      teamId
    }, 
    include: {
      swimmers: {
        include: {
          user: true,
        }
      }
    }
  })

  return groups;  
}

export async function deleteGroup(id: string) {
  await db.group.delete({
    where: {
      id,
    }
  })

  revalidatePath("/dashboard")
}

export async function getGroupById(id: string) { 
  const group = await db.group.findUnique({
    where: {
      id,
    }, 
    include: {
      swimmers: true,
    }
  })

  return group;
}