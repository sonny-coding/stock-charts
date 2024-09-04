"use client";

import Search from "@/components/Search";
import BarGraph from "@/components/BarGraph";
import LineBarComposedChart from "@/components/LineBarComposedChart";
import { LabelConfig } from "@/components/LineBarComposedChart";
import { processData, processGrowth, processMargins } from "@/lib/utils";
import LineGraph from "@/components/LineGraph";

const page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";

  const growthLabelConfig: LabelConfig = {
    revenueGrowth: {
      label: "Revenue Growth",
      color: "hsl(var(--chart-1))",
      type: "bar",
    },
    netIncomeGrowth: {
      label: "Income Growth",
      color: "hsl(var(--chart-2))",
      type: "bar",
    },
  };
  const marginLabelConfig: LabelConfig = {
    grossMargin: {
      label: "Gross Margin",
      color: "hsl(var(--chart-1))",
      type: "line",
    },
    operatingMargin: {
      label: "Operating Margin",
      color: "hsl(var(--chart-2))",
      type: "line",
    },
    netMargin: {
      label: "Net Margin",
      color: "hsl(var(--chart-3))",
      type: "line",
    },
  };
  const composedLabelConfig: LabelConfig = {
    operatingExpenses: {
      label: "Operating Expenses",
      color: "hsl(var(--chart-1))",
      type: "line",
    },
    sellingGeneralAndAdministrative: {
      label: "SG&A",
      color: "hsl(var(--chart-2))",
      type: "bar",
    },
    researchAndDevelopment: {
      label: "R&D",
      color: "hsl(var(--chart-3))",
      type: "bar",
    },
  };

  const barLabelConfig: LabelConfig = {
    revenue: {
      label: `Revenue`,
      color: "hsl(var(--chart-1))",
      type: "bar",
    },
    grossProfit: {
      label: `Gross Income`,
      color: "hsl(var(--chart-2))",
      type: "bar",
    },
    operatingIncome: {
      label: "Operating Income",
      color: "hsl(var(--chart-3))",
      type: "bar",
    },
    netIncome: {
      label: "Net Income",
      color: "hsl(var(--chart-4))",
      type: "bar",
    },
  };

  return (
    <div className="">
      <Search placeholder="AMD" />
      {/* <Charts query={query} /> */}
      <BarGraph
        labels={barLabelConfig}
        title={"Revenue & Earnings"}
        processData={processData}
      />
      <BarGraph
        labels={growthLabelConfig}
        title={"Growth"}
        processData={processGrowth}
        isPercent={true}
      />
      <LineGraph
        processData={processMargins}
        labels={marginLabelConfig}
        title="Margin"
        isPercent={true}
      />
      <LineBarComposedChart labels={composedLabelConfig} />
    </div>
  );
};

export default page;
