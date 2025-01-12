"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getTeamByCoachId } from "@/data/team";

export function Navbar() {
  const pathname = usePathname();
  const user = useCurrentUser();
  const [teamId, setTeamId] = useState<string | undefined>("");

  useEffect(() => {
    const getTeamId = async () => {
      if (!user?.id) {
        setTeamId("");
      } else {
        const team = await getTeamByCoachId(user?.id);
        setTeamId(team?.id);
      }
    };

    getTeamId();
  }, [user]);

  return (
    <nav className="flex bg-secondary justify-between p-3 rounded-xl shadow-sm m-2">
      <div className="flex justify-between w-full">
        <Button
          asChild
          variant={pathname === "/coach/dashboard" ? "default" : "outline"}
        >
          <Link href="/coach/dashboard">Equipo</Link>
        </Button>

        <Button>
          <Copy className="h-4 w-4" />
          <span>{teamId}</span>
        </Button>
      </div>
    </nav>
  );
}
