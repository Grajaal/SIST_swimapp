"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { joinTeam } from "@/actions/join-team";

export function JoinTeamForm() {
  const [teamId, setTeamId] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onClick = () => {
    joinTeam(teamId).then((data) => {
      setError(data.error);
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Únete a tu equipo!</CardTitle>
        <CardDescription>
          Pídele el código del equipo a tu entrenador
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="AX54J"
          onChange={(e) => {
            setTeamId(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-sm text-red-500 ml-1">{error}</p>}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onClick}>Unirse</Button>
      </CardFooter>
    </Card>
  );
}
