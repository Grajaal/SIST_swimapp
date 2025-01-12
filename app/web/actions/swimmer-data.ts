"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { SwimmerDataSchema } from "@/schemas";
import { z } from "zod";

export async function createSwimmerData(values: z.infer<typeof SwimmerDataSchema>) {
  const sessionUser = await currentUser();

  const validatedFields = SwimmerDataSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields."}
  }

  const { fatigue, musclePain, sleepHours, sleepQuality, stress} = validatedFields.data;

  if (!sessionUser || !sessionUser.id) return { error: "No hay usuario en la sesión" };

  await db.swimmerData.upsert({
    where: {
      swimmerId_date: {
        swimmerId: sessionUser.id, 
        date: new Date(),
      }
    }, 
    create: {
      swimmerId: sessionUser.id, 
      fatigue, 
      musclePain, 
      sleepHours, 
      sleepQuality, 
      stress, 
    }, 
    update: {
      fatigue, 
      musclePain, 
      sleepHours, 
      sleepQuality, 
      stress, 
    }
  })

  return { success: "Variables enviadas correctamente."}

  
}