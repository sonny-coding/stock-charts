"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartLegend } from "@/components/ui/chart";
import { Button } from "./ui/button";

import { aapl } from "@/data";
import { processData } from "@/lib/utils";

type IncomeBarChartProps = {
  labels: { key: string; color: string }[];
};

const chartConfig = {
  revenue: {
    label: `Revenue`,
    color: "hsl(var(--chart-1))",
  },
  grossProfit: {
    label: `Gross Income`,
    color: "hsl(var(--chart-2))",
  },
  operatingIncome: {
    label: "Operating Income",
    color: "hsl(var(--chart-3))",
  },
  netIncome: {
    label: "Net Income",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function IncomeBarChart({ labels }: IncomeBarChartProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const initials: {
    [key: string]: boolean | null;
  } = {};

  labels.forEach(({ key }) => {
    initials[key] = false;
  });
  const [series, setSeries] = useState(initials);

  let processedData;
  processedData = processData(aapl.annualReports);
  if (!isAnnual) {
    processedData = processData(aapl.quarterlyReports.slice(0, 15));
  }

  const handleLegendMouseEnter = (e) => {
    console.log(e);
    if (!series[e.dataKey]) {
      setSeries({ ...series });
    }
  };

  const handleLegendMouseLeave = () => {
    setSeries({ ...series });
  };
  const select = (e) => {
    setSeries({
      ...series,
      [e.dataKey]: !series[e.dataKey],
    });
  };

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
          <CardTitle>Revenue & Earnings</CardTitle>
          {/* <CardDescription>January - June 2024</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={processedData}>
              <CartesianGrid vertical={false} />
              <YAxis
                axisLine={false}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)
                }
              />
              <XAxis
                dataKey="year"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={
                  isAnnual
                    ? (value) => value.slice(0, 4)
                    : (value) => value.slice(0, 7)
                }
              />
              <ChartTooltip
                labelFormatter={(value) => {
                  return value.slice(0, 4);
                }}
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    formatter={(value, name, item, index) => (
                      <>
                        <div
                          className="h-2.5 w-1.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        <div className="flex min-w-[180px] items-center text-xs text-muted-foreground">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label || name}
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {value}
                          </div>
                        </div>
                      </>
                    )}
                  />
                }
              />
              <ChartLegend
                verticalAlign="top"
                onClick={select}
                onMouseOver={handleLegendMouseEnter}
                onMouseOut={handleLegendMouseLeave}
              />

              {labels.map((label, index) => (
                <Bar
                  radius={4}
                  key={index}
                  dataKey={label.key}
                  fill={label.color}
                  hide={series[label.key] === true}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
