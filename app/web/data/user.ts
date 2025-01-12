"use server";

import { db } from '@/lib/db'
import { Role } from '@prisma/client';

export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email, 
      }
    }); 

    return user; 
  } catch {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id, 
      }, 
      include: {
        coach: true, 
        swimmer: true,
      }
    }); 

    
    return user; 
  } catch (e){
    console.error("Database error: ", e); 
    throw Error("Database error: getUserById")
  }
}

export async function updateHasTeam(id: string, hasTeam: boolean) {
  try {
    await db.user.update({
      where: {
        id,
      }, 
      data: {
        hasTeam,
      }
    })
  } catch (e) {
    console.error("Database error: ", e);
    throw Error("Database error updateHasTeam");
  }
}

export async function updateRole(id: string, role: Role) {
  await db.user.update({
    where: {
      id,
    }, 
    data: {
      role
    }
  })
}