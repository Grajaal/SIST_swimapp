import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components//ui/card";
import { DailyRegister } from "@/components/coach/daily-register";
import { TrainingsCard } from "@/components/coach/group/trainings-card";
import { WeeklyChart } from "./weekly-chart";

export default async function CoachDasboard() {
  const userSession = await currentUser();
  if (!userSession?.id) redirect("/auth/login");

  return (
    <div className="p-4 grid grid-rows-2 grid-cols-[2fr,1fr] gap-4">
      <TrainingsCard className="flex flex-col row-span-2" />
      <DailyRegister />
      <WeeklyChart />
    </div>
  );
}
