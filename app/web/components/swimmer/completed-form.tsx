"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CompletedForm() {
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">
          Tu entrenador ya puede revisar tus datos!
        </CardTitle>
        <CardDescription>Datos enviados correctamente.</CardDescription>
      </CardHeader>
    </Card>
  );
}
