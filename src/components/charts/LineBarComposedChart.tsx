"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { aapl } from "@/data";
import { processOperatingExpenses, formatValue } from "@/lib/utils";
import { CustomizedLegend } from "./CustomizedLegend";
import ToggleButton from "./ToggleButton";

export interface LabelConfig {
  [key: string]: {
    label: string;
    color: string;
    type: "bar" | "line";
  };
}

interface LineBarComposedChartProps {
  // data: DataPoint[];
  labels: LabelConfig;
  // title: string;
  // xAxisKey: string;
}

const LineBarComposedChart = ({ labels }: LineBarComposedChartProps) => {
  const [isAnnual, setIsAnnual] = useState(true);

  // what the hell does record even do
  const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>(
    Object.keys(labels).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  // dynamically create config
  const chartConfig: ChartConfig = Object.entries(labels).reduce(
    (acc, [key, value]) => {
      acc[key] = { label: value.label, color: value.color };
      return acc;
    },
    {} as ChartConfig
  );

  const handleLegendClick = (dataKey: string) => {
    setVisibleSeries((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey as keyof typeof visibleSeries],
    }));
  };

  let processedData = isAnnual
    ? processOperatingExpenses(aapl.annualReports)
    : processOperatingExpenses(aapl.quarterlyReports.slice(0, 15));

  return (
    <Card className="w-full mx-auto">
      <div className="flex items-center justify-center font-bold text-xs [&>*]:duration-300">
        <ToggleButton
          handleClick={() => {
            setIsAnnual((prev) => {
              return !prev;
            });
          }}
          isAnnual={isAnnual}
          label="Annual"
        />
        <ToggleButton
          handleClick={() => {
            setIsAnnual((prev) => {
              return !prev;
            });
          }}
          isAnnual={!isAnnual}
          label="Quarterly"
        />
      </div>
      <CardHeader className="pt-3 pb-1 sm:pt-4 sm:pb-2 lg:pt-6 lg:pb-3">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center">
          Operating Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            accessibilityLayer
            data={processedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={
                isAnnual
                  ? (value) => value.slice(0, 4)
                  : (value) => value.slice(2, 7)
              }
            />
            <YAxis
              tickLine={false}
              width={30}
              className="text-[9px] sm:text-[10px] leading-none lg:text-xs"
              axisLine={false}
              tickFormatter={(value) =>
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                  compactDisplay: "short",
                }).format(value)
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value.slice(0, 4)}
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
                        {chartConfig[name as keyof typeof chartConfig]?.label ||
                          name}
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {typeof value === "number"
                            ? formatValue(value)
                            : value}
                        </div>
                      </div>
                    </>
                  )}
                />
              }
            />

            {Object.entries(labels).map(([key, config]) =>
              config.type === "line" ? (
                <Line
                  key={key}
                  dataKey={key}
                  dot={false}
                  type="linear"
                  stroke={config.color}
                  strokeWidth={2}
                  hide={!visibleSeries[key]}
                />
              ) : (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={config.color}
                  radius={4}
                  hide={!visibleSeries[key]}
                />
              )
            )}
            <ChartLegend
              verticalAlign="top"
              content={
                <CustomizedLegend
                  onClick={handleLegendClick}
                  visibleSeries={visibleSeries}
                  chartConfig={chartConfig}
                />
              }
            />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default LineBarComposedChart;
