import { getTeamByCoachId } from "@/data/team";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TrainingsPage() {
  const sessionUser = await currentUser();

  if (!sessionUser || !sessionUser.id) {
    redirect("/auth/login");
  }
  const team = await getTeamByCoachId(sessionUser.id);

  return (
    <div>
      <div>Training page!</div>
    </div>
  );
}
