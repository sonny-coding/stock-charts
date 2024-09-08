"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, XAxis, YAxis, CartesianGrid, Legend, BarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatValue } from "@/lib/utils";
import { CustomizedLegend } from "./CustomizedLegend";
import ToggleButton from "./ToggleButton";
import DualRangeSliderCustomLabel from "./DualRangeSliderCustom";
import { processData } from "@/lib/utils";

export interface LabelConfig {
  [key: string]: {
    label: string;
    color: string;
    type: "bar" | "line";
  };
}

interface BarChartProps {
  labels: LabelConfig;
  title: string;
  unit?: string;
  isPercent?: boolean;
  annualData: any[];
  quarterlyData: any[];
}

const BarGraph = ({
  labels,
  title,
  isPercent,
  annualData,
  quarterlyData,
}: BarChartProps) => {
  const [isAnnual, setIsAnnual] = useState(true);
  // const [values, setValues] = useState([0, 10]);

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

  return (
    <Card className="w-full mx-auto">
      <div className="pt-2 flex items-center justify-center font-bold [&>*]:duration-300">
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
        <CardTitle className="text-center text-lg sm:text-xl lg:text-2xl">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={isAnnual ? annualData : quarterlyData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              className="text-[9px] sm:text-[10px] leading-none lg:text-xs"
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
              tickFormatter={(value) => {
                return formatValue(value, isPercent);
              }}
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
                            ? formatValue(value, isPercent)
                            : value}
                        </div>
                      </div>
                    </>
                  )}
                />
              }
            />

            {Object.entries(labels).map(
              ([key, config]) =>
                config.type === "bar" && (
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
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarGraph;
