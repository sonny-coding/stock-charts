"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { aapl } from "@/data";
import { processOperatingExpenses } from "@/lib/utils";

const chartConfig = {
  operatingExpenses: {
    label: `Operating Expenses`,
    color: "hsl(var(--chart-1))",
  },
  sellingGeneralAndAdministrative: {
    label: `SG&A`,
    color: "hsl(var(--chart-2))",
  },
  researchAndDevelopment: {
    label: `R&D`,
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const OperatingExpensesChart = () => {
  //
  const [crossedOutSeries, setCrossedOutSeries] = useState<VisibleSeries>({
    series1: false,
    series2: false,
    series3: false,
  });

  const handleLegendClick = (dataKey: string) => {
    setCrossedOutSeries((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey as keyof VisibleSeries],
    }));
  };
  //

  const [isAnnual, setIsAnnual] = useState(true);
  const [activeLegendItem, setActiveLegendItem] = useState(null);
  const handleClick = (item: any) => {
    setActiveLegendItem(item.payload.value);
    alert(activeLegendItem);
  };

  let processedData;
  processedData = processOperatingExpenses(aapl.annualReports);
  if (!isAnnual) {
    processedData = processOperatingExpenses(
      aapl.quarterlyReports.slice(0, 15)
    );
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
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Operating Expenses</CardTitle>
          {/* <CardDescription>hello there</CardDescription> */}
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
                    : (value) => value.slice(0, 7)
                }
              />
              <YAxis
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
                        <div className="flex min-w-[200px] items-center text-xs text-muted-foreground">
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
              <Line
                dataKey="operatingExpenses"
                type="linear"
                stroke="var(--color-operatingExpenses)"
                strokeWidth={2}
                dot={false}
              />
              <Bar
                dataKey="sellingGeneralAndAdministrative"
                fill="var(--color-sellingGeneralAndAdministrative)"
                radius={4}
              />
              <Bar
                dataKey="researchAndDevelopment"
                fill="var(--color-researchAndDevelopment)"
                radius={4}
              />
              <ChartLegend
                content={
                  <CustomizedLegend
                    onClick={handleLegendClick}
                    crossedOut={crossedOutSeries}
                  />
                }
              />
            </ComposedChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

interface LegendPayload {
  value: string;
  type: string;
  id: string;
  color: string;
  dataKey: string;
}

interface CustomizedLegendProps {
  payload?: LegendPayload[];
  onClick: (dataKey: string) => void;
  crossedOut: VisibleSeries;
}

const CustomizedLegend: React.FC<CustomizedLegendProps> = ({
  payload,
  onClick,
  crossedOut,
}) => {
  if (!payload) return null;
  console.log(payload);
  return (
    <ul className="flex justify-center space-x-4 mt-4">
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          className={`cursor-pointer hover:opacity-75 transition-opacity ${
            crossedOut[entry.dataKey as keyof VisibleSeries]
              ? "line-through"
              : ""
          }`}
          onClick={() => onClick(entry.dataKey)}
        >
          <span
            className="inline-block w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

interface VisibleSeries {
  series1: boolean;
  series2: boolean;
  series3: boolean;
}

export default OperatingExpensesChart;
