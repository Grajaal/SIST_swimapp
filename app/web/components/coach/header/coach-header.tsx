import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Chat } from "@/components/coach/header/chat";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getTeamByCoachId } from "@/data/team";
import { CopyCode } from "@/components/coach/header/copy-code";
import { ModeToggle } from "../../mode-toggle";

export default async function CoachHeader() {
  const userSession = await currentUser();
  if (!userSession?.id) redirect("/auth/login");

  const team = await getTeamByCoachId(userSession.id);

  return (
    <header className="flex h-16 items-center p-4">
      <SidebarTrigger />
      <div className="space-x-4 ml-auto items-center">
        <Chat />
        <CopyCode code={team?.id} />
        <ModeToggle />
      </div>
    </header>
  );
}
