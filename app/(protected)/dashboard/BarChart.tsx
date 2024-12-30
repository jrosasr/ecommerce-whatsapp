"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart"
import { PromotionalCodeUsagesHistory } from "@/types/promotional-code"
import { useMemo, useState } from "react"

const chartConfig = {
  views: {
    label: "Códigos canjeados",
  },
  usages: {
    label: "Códigos canjeados",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

type ChartProps = {
  data: PromotionalCodeUsagesHistory[]
}
export function BarChartCustom(props: ChartProps) {
  const { data: chartData } = props
  
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("usages")

  const total = useMemo(
    () => ({
      usages: chartData.reduce((acc, curr) => acc + curr.usages, 0),
    }),
    [chartData]
  )

  const formatDate = (value : string) => {
    const date = new Date(value);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader className="flex sm:flex-row flex-col items-stretch space-y-0 p-0 border-b">
        <div className="flex flex-col flex-1 justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Códigos canjeados</CardTitle>
          <CardDescription>
            Muestra los códigos canjeados en un periodo de tiempo
          </CardDescription>
        </div>
        <div className="flex">
          {["usages"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-col flex-1 justify-center gap-1 data-[active=true]:bg-muted/50 px-6 sm:px-8 py-4 sm:py-6 border-t sm:border-t-0 sm:border-l even:border-l text-left"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="font-bold text-lg sm:text-3xl leading-none">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="w-full h-[250px] aspect-auto"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                date.setDate(date.getDate() + 1);
                return date.toLocaleDateString("es-ES", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-background shadow-lg p-3 border rounded-lg min-w-[200px]">
                      <p className="mb-2 font-medium text-sm">
                        {formatDate(data.date)}
                      </p>
                      <p className="mb-2 text-muted-foreground text-sm">
                        Total: {data.usages} códigos
                      </p>
                      <div className="space-y-1">
                        {data.codeDetails.map((detail: { code: string; count: number }) => (
                          <div key={detail.code} className="flex justify-between text-xs">
                            <span className="font-medium">{detail.code}</span>
                            <span>{detail.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

