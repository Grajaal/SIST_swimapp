import { UserButton } from "@/components/auth/user-button";
import { currentUser } from "@/lib/auth";

export async function SwimmerNavbar() {
  const user = await currentUser();

  return (
    <nav className="bg-secondary flex justify-between p-2 items-center rounded-xl mb-4">
      <h2 className="font-bold">Hola {user?.name} 👋🏼</h2>
      <UserButton />
    </nav>
  );
}
