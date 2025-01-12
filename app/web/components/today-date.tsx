import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TodayDate() {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  const formattedDate = Intl.DateTimeFormat("es-ES", options).format(today);

  return (
    <Card className="flex justify-center items-center">
      <CardContent>
        <span className="font-bold text-5xl">{formattedDate}</span>
      </CardContent>
    </Card>
  );
}
