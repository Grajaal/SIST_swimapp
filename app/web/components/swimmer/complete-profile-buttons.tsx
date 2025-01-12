"use client";

import { Role } from "@prisma/client";
import { Button } from "../ui/button";
import { createRoledUser } from "@/actions/create-roled-user";
import { redirect } from "next/navigation";

export function CompleteProfileButtons() {
  const onClick = (role: Role) => {
    createRoledUser(role).then(() => {
      redirect("/dashboard");
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <Button onClick={() => onClick(Role.coach)}>👤 Entrenador</Button>

        <Button onClick={() => onClick(Role.swimmer)}>🏊🏼 Nadador</Button>
      </div>
    </div>
  );
}
