"use server";

import { db } from "@/lib/db";

export async function createSwimmer(id: string) {
  try {
    await db.swimmer.create({
      data: {
        id,
      }
    })
  } catch (e) {
    console.error("Database error: (createSwimmer)", e);
    throw Error("Database error in createSwimmer");
  }
}


export async function hasCompletedForm(swimmerId: string, date: Date) {
  try {
    date.setDate(date.getDate() + 1);
    const startOfDay = new Date(date.setHours(0, 0, 0, 0));
    const endOfDay = new Date(date.setHours(23, 59, 59, 999));

    const form = await db.swimmerData.findFirst({
      where: {
        swimmerId,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    })

    if (!form) return false;

    const {
      fatigue,
      musclePain,
      sleepHours,
      sleepQuality,
      stress,
    } = form;

    return !(
      fatigue === null ||
      musclePain === null ||
      sleepHours === null ||
      sleepQuality === null ||
      stress === null
    );

  } catch (e) {
    console.error("Database error:", e);
    throw Error("Error en la base de datos.");
  }
}

export async function hasTeam(swimmerId: string) {
  try {
    const swimmer = await db.swimmer.findUnique({
      where: {
        id: swimmerId,
      },
      include: {
        user: true,
      }
    })

    const hasTeam = swimmer?.user.hasTeam;

    return hasTeam;
  } catch (e) {
    console.error("Database error (hasTeam): ", e);
    throw Error("Database error: hasTeam")
  }
}

export async function getSwimmersFromTeam(teamId: string | undefined) {

  if (!teamId) {
    return [];
  }

  const swimmers = await db.swimmer.findMany({
    where: {
      teamId,
    },
    include: {
      data: true,
      user: true,
    }
  })

  return swimmers;
}

export async function getSwimmersByNames(swimmerNames: string[]) {
  const swimmers = db.swimmer.findMany({
    where: {
      user: {
        name: {
          in: swimmerNames
        }
      }
    }
  })

  return swimmers;
}