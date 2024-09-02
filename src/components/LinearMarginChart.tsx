"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Button } from "./ui/button";

import { aapl } from "@/data";
import { processMargins } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  grossMargin: {
    label: `Gross Margin`,
    color: "hsl(var(--chart-1))",
  },
  operatingMargin: {
    label: `Operating Margin`,
    color: "hsl(var(--chart-2))",
  },
  netMargin: {
    label: "Net Margin",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function LinearMarginChart() {
  const [isAnnual, setIsAnnual] = useState(true);
  let processedData;
  processedData = processMargins(aapl.annualReports);
  if (!isAnnual) {
    processedData = processMargins(aapl.quarterlyReports.slice(0, 15));
  }
  return (
    <div>
      <div className="flex items-center justify-center">
        <Button
          disabled={isAnnual}
          onClick={() => {
            setIsAnnual(true);
          }}
          size="lg"
          variant="outline"
        >
          Annual
        </Button>
        <Button
          onClick={() => {
            setIsAnnual(false);
          }}
          disabled={!isAnnual}
          size="lg"
          variant="outline"
        >
          Quarterly
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>
            {isAnnual ? "Annual Margins" : "Quarterly Margins"}
          </CardTitle>
          {/* <CardDescription>hello there</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={processedData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <YAxis axisLine={false} tickFormatter={(value) => `${value}%`} />
              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={
                  isAnnual
                    ? (value) => value.slice(0, 4)
                    : (value) => value.slice(0, 7)
                }
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return value.slice(0, 4);
                    }}
                    formatter={(value, name) => (
                      <>
                        <div
                          className="h-2.5 w-1.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        <div className="flex min-w-[160px] items-center text-xs text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label || name}
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {value}
                            <span className="font-normal text-muted-foreground">
                              %
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <Line
                dataKey="grossMargin"
                type="linear"
                stroke="var(--color-grossMargin)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="operatingMargin"
                type="linear"
                stroke="var(--color-operatingMargin)"
                strokeWidth={2}
                dot={false}
              />

              <Line
                dataKey="netMargin"
                type="linear"
                stroke="var(--color-netMargin)"
                strokeWidth={2}
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
