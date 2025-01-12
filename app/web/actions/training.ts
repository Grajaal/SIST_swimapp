"use server";

import { getGroupById } from "@/data/group";
import { db } from "@/lib/db";

export async function createTraining(groupId: string, date: Date, formData: FormData) {
  const group = await getGroupById(groupId);
  console.log(date);

  if (!group) {
    throw Error("Group does not exists");
  }

  const meters = formData.get("meters");
  const minutes = formData.get("minutes");

  const parsedMeters = meters ? parseInt(meters.toString(), 10) : null;
  const parsedMinutes = minutes ? parseInt(minutes.toString(), 10) : null;

  if (!parsedMeters) {
    throw new Error("meters does not exist");
  }

  if (!parsedMinutes) {
    throw new Error("minutes does not exist");
  }

  const promises = group.swimmers.map((swimmer) =>
    db.swimmerData.upsert({
      where: {
        swimmerId_date: {
          swimmerId: swimmer.id,
          date
        }
      },
      create: {
        swimmerId: swimmer.id,
        meters: parsedMeters,
        minutes: parsedMinutes,
        date
      },
      update: {
        meters: parsedMeters,
        minutes: parsedMinutes,
      }
    })
  );

  await Promise.all(promises);
}