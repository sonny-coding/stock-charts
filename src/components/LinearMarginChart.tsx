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

type LinearMarginChartProps = {
  labels: { key: string; color: string }[];
};

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

export function LinearMarginChart({ labels }: LinearMarginChartProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const initials: {
    [key: string]: boolean | null;
  } = {};

  labels.forEach(({ key }) => {
    initials[key] = false;
  });
  const [series, setSeries] = useState(initials);

  let processedData;
  processedData = processMargins(aapl.annualReports);
  if (!isAnnual) {
    processedData = processMargins(aapl.quarterlyReports.slice(0, 15));
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
              {labels.map((label, index) => (
                <Line
                  key={index}
                  dataKey={label.key}
                  type="linear"
                  stroke={label.color}
                  strokeWidth={2}
                  dot={false}
                  hide={series[label.key] === true}
                />
              ))}

              <ChartLegend
                verticalAlign="top"
                onClick={select}
                onMouseOver={handleLegendMouseEnter}
                onMouseOut={handleLegendMouseLeave}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
