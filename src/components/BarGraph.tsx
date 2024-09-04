"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, XAxis, YAxis, CartesianGrid, Legend, BarChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { aapl } from "@/data";
import { formatValue } from "@/lib/utils";
import { CustomizedLegend } from "./ui/CustomizedLegend";
import { FinancialData } from "@/lib/utils";

export interface LabelConfig {
  [key: string]: {
    label: string;
    color: string;
    type: "bar" | "line";
  };
}

interface BarChartProps {
  // data: DataPoint[];
  labels: LabelConfig;
  title: string;
  processData: (data: FinancialData[]) => any[] | undefined;
  unit?: string;
  isPercent?: boolean;
}

const BarGraph = ({ labels, title, processData, isPercent }: BarChartProps) => {
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

  let processedData = processData(
    isAnnual ? aapl.annualReports : aapl.quarterlyReports.slice(0, 15)
  );

  return (
    <div>
      <div className="flex items-center justify-center">
        <Button
          disabled={isAnnual}
          onClick={() => setIsAnnual(true)}
          size="lg"
          variant="outline"
        >
          Annual
        </Button>
        <Button
          onClick={() => setIsAnnual(false)}
          disabled={!isAnnual}
          size="lg"
          variant="outline"
        >
          Quarterly
        </Button>
      </div>
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
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
                    : (value) => value.slice(0, 7)
                }
              />
              <YAxis
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
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label || name}
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
    </div>
  );
};

export default BarGraph;
