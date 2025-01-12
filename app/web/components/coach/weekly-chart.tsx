"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
const chartData = [
  { day: "Lunes", sleep: 8, quality: 5 },
  { day: "Martes", sleep: 7, quality: 4 },
  { day: "Miércoles", sleep: 8, quality: 10 },
  { day: "Jueves", sleep: 9, quality: 8 },
  { day: "Viernes", sleep: 5, quality: 9 },
  { day: "Sábado", sleep: 6, quality: 7 },
  { day: "Domingo", sleep: 8, quality: 6 },
]

const chartConfig = {
  sleep: {
    label: "Horas dormidas",
    color: "hsl(var(--primary))",
  },
  quality: {
    label: "Calidad sueño",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function WeeklyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento semanal</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="sleep" fill="var(--color-sleep)" radius={4} />
            <Bar dataKey="quality" fill="var(--color-quality)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
