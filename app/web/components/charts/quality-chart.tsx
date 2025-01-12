"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useStatistics } from "@/context/statistics-context"
const chartData = [
  { day: "Lunes", "562": 8, "563": 10 },
  { day: "Martes", "562": 8, "563": 10 },
  { day: "Miércoles", "562": 8, "563": 10 },
  { day: "Jueves", "562": 8, "563": 10 },
  { day: "Sábado", "562": 8, "563": 10 },
  { day: "Domingo", "562": 8, "563": 10 },
]

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

export function QualityChart({
  className,
}: {
  className?: string;
}) {

  const { selectedSwimmers } = useStatistics();
  if (!selectedSwimmers) {
    return <div>Selecciona tus nadadores</div>
  }
  const chartConfig = selectedSwimmers?.reduce((config, swimmer, index) => {
    config[swimmer.id] = {
      label: swimmer.user.name,
      color: colors[index],
    };
    return config;
  }, {} as ChartConfig)

  const chartData = days.map((day, dayIndex) => {
    const dayData: Record<string, string | number> = { day };
    selectedSwimmers.forEach((swimmer) => {
      dayData[swimmer.id] = swimmer.data[dayIndex].sleepQuality || 0;
    })
    return dayData;
  })


  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Calidad de sueño</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {selectedSwimmers.map((swimmer, index) => (
              <Line
                key={swimmer.id}
                dataKey={swimmer.id}
                type="natural"
                fill={colors[index]}
                fillOpacity={0.4}
                stroke={colors[index]}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
