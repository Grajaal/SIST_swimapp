import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function currentUser() {
  const session = await auth();
  const userSession = session?.user;

  if (!session ||
      !userSession || 
      !userSession.id || 
      !userSession.name || 
      !userSession.email)
  {
      throw new Error("auth problem")
  }

  return userSession; 
}

export async function currentRole() {
  const session = await auth();

  return session?.user?.role;
}