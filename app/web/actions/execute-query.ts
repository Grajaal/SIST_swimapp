"use server";

import { db } from "@/lib/db";

export async function executeQuery(query: string) {

  try {
    console.log(query);

    const result: Object[] = await db.$queryRawUnsafe(query);

    return JSON.stringify(result);

  } catch (error) {
    console.error(error);
    throw new Error("Error executing AI generated query");
  }



}