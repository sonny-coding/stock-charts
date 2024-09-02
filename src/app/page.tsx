"use client";

import Search from "@/components/Search";
import Charts from "@/components/Charts";
import { IncomeBarChart } from "@/components/IncomeBarChart";
import { LinearMarginChart } from "@/components/LinearMarginChart";
import { LinearGrowthChart } from "@/components/LinearGrowthChart";
import CombinedChart from "@/components/CombinedChart";
import OperatingExpensesChart from "@/components/OperatingExpensesChart";
import ChartWithCrossableLegend from "@/components/ClickableLegend";
import BarGraph from "@/components/BarGraph";

const page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";
  let inputData = {
    dataKey: "hour",
    oyLabel: "KWh",
    oxLabel: "hours",
    yLimit: [0, 20000],
    values: [
      { hour: 0, prosumer1: 4000, prosumer2: 2400, prosumer3: 2120 },
      { hour: 1, prosumer1: 3000, prosumer2: 1398 },
      { hour: 2, prosumer1: 2000, prosumer2: 9800, prosumer3: 3220 },
      { hour: 3, prosumer1: 2780, prosumer2: 3908 },
      { hour: 4, prosumer1: 1890, prosumer2: 4800, prosumer3: 1220 },
      { hour: 5, prosumer1: 2390, prosumer2: 3800 },
      { hour: 6, prosumer1: 3490, prosumer2: 4300 },
      { hour: 7, prosumer1: 4000, prosumer2: 2400, prosumer3: 2120 },
      { hour: 9, prosumer1: 3000, prosumer2: 1398 },
      { hour: 10, prosumer1: 2000, prosumer2: 9800, prosumer3: 3220 },
      { hour: 11, prosumer1: 2780, prosumer2: 3908 },
      { hour: 12, prosumer1: 1890, prosumer2: 4800, prosumer3: 1220 },
      { hour: 13, prosumer1: 2390, prosumer2: 3800 },
      { hour: 14, prosumer1: 3490, prosumer2: 4300 },
      { hour: 15, prosumer1: 1890, prosumer2: 4800, prosumer3: 1220 },
      { hour: 16, prosumer1: 2390, prosumer2: 3800 },
      { hour: 17, prosumer1: 3490, prosumer2: 4300 },
      { hour: 18, prosumer1: 4000, prosumer2: 2400, prosumer3: 2120 },
      { hour: 19, prosumer1: 3000, prosumer2: 1398 },
      { hour: 20, prosumer1: 2000, prosumer2: 9800, prosumer3: 3220 },
      { hour: 21, prosumer1: 2780, prosumer2: 3908 },
      { hour: 22, prosumer1: 1890, prosumer2: 4800, prosumer3: 1220 },
      { hour: 23, prosumer1: 2390, prosumer2: 3800 },
    ],
  };

  let inputLabels = [
    { key: "prosumer1", color: "#8884d8" },
    { key: "prosumer2", color: "#82ca9d" },
    { key: "prosumer3", color: "#81cc2d" },
  ];
  let labels = [
    { key: "revenue", color: "hsl(var(--chart-1))" },
    { key: "grossProfit", color: "hsl(var(--chart-2))" },
    { key: "operatingIncome", color: "hsl(var(--chart-3))" },
    { key: "netIncome", color: "hsl(var(--chart-4))" },
  ];

  return (
    <div className="">
      <Search placeholder="AMD" />
      {/* <Charts query={query} /> */}
      <IncomeBarChart labels={labels} />
      <LinearMarginChart />
      <LinearGrowthChart />
      <OperatingExpensesChart />
      <ChartWithCrossableLegend />
      {/* <BarGraph
        title="DayAhead Predicted Consumption"
        {...inputData}
        labels={inputLabels}
      /> */}
    </div>
  );
};

export default page;
