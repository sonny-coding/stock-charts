"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "./ui/button";

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
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

import { aapl } from "@/data";
import { processGrowth } from "@/lib/utils";

type LinearGrowthChartProps = {
  labels: { key: string; color: string }[];
};

const chartConfig = {
  revenueGrowth: {
    label: "Revenue Growth",
    color: "hsl(var(--chart-1))",
  },
  netIncomeGrowth: {
    label: "Income Growth",
    color: "hsl(var(--chart-2))",
  },
  operatingIncomeGrowth: {
    label: "YoY Operating Income Growth",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function LinearGrowthChart({ labels }: LinearGrowthChartProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const initials: {
    [key: string]: boolean | null;
  } = {};

  labels.forEach(({ key }) => {
    initials[key] = false;
  });
  const [series, setSeries] = useState(initials);

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

  let processedData;
  processedData = processGrowth(aapl.annualReports);
  if (!isAnnual) {
    processedData = processGrowth(aapl.quarterlyReports.slice(0, 15));
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
          <CardTitle>{isAnnual ? "YoY Growths" : "QoQ Growths"}</CardTitle>
          {/* <CardDescription>hello</CardDescription> */}
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={processedData}>
              <CartesianGrid vertical={false} />
              <YAxis axisLine={false} tickFormatter={(value) => `${value}%`} />
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
              {/* <ChartLegend content={<ChartLegendContent />} /> */}
              <ChartLegend
                verticalAlign="top"
                onClick={select}
                onMouseOver={handleLegendMouseEnter}
                onMouseOut={handleLegendMouseLeave}
              />
              {/* 
              <Bar
                dataKey="revenueGrowth"
                fill="var(--color-revenueGrowth)"
                radius={4}
              />

              <Bar
                dataKey="netIncomeGrowth"
                fill="var(--color-netIncomeGrowth)"
                radius={4}
              /> */}

              {labels.map((label, index) => (
                <Bar
                  key={index}
                  dataKey={label.key}
                  fill={label.color}
                  radius={4}
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
