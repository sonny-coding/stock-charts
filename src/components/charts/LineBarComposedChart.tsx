"use client";

import { useRef, useState } from "react";
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
import { tsla } from "@/data";
import { processOperatingExpenses, formatValue } from "@/lib/utils";
import { CustomizedLegend } from "./CustomizedLegend";
import ToggleButton from "./ToggleButton";
import DataDialog from "./DataDialog";
import { Camera } from "lucide-react";
import html2canvas from "html2canvas";

export interface LabelConfig {
  [key: string]: {
    label: string;
    color: string;
    type: "bar" | "line";
  };
}

interface LineBarComposedChartProps {
  labels: LabelConfig;
  title: string;
  unit?: string;
  isPercent?: boolean;
  annualData: any[];
  quarterlyData: any[];
}

const LineBarComposedChart = ({
  labels,
  title,
  isPercent,
  annualData,
  quarterlyData,
}: LineBarComposedChartProps) => {
  const targetRef = useRef(null);
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

  const captureScreenshot = async () => {
    if (targetRef.current) {
      try {
        const canvas = await html2canvas(targetRef.current);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = "screenshot.png";
        link.click();
      } catch (error) {
        console.error("Failed to capture screenshot:", error);
        alert("Failed to capture screenshot. Please try again.");
      }
    }
  };
  // processOperatingExpenses
  return (
    <Card ref={targetRef} className="w-full mx-auto">
      <div className="pt-2 flex gap-2 items-center justify-center font-bold [&>*]:duration-300">
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
        <DataDialog
          data={
            isAnnual
              ? annualData.slice().reverse()
              : quarterlyData.slice().reverse()
          }
          title={title}
          labels={labels}
          isPercent={isPercent}
        />
        <button
          onClick={captureScreenshot}
          className="flex items-center bg-secondary text-[10px] leading-none lg:text-xs hover:opacity-60 py-1 px-2 lg:py-2 lg:px-3 text-slate-500 border-b-2"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>
      <CardHeader className="pt-3 pb-1 sm:pt-4 sm:pb-2 lg:pt-6 lg:pb-3">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl text-center">
          {title}
          {/* Operating Expenses */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ComposedChart
            accessibilityLayer
            data={isAnnual ? annualData : quarterlyData}
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
