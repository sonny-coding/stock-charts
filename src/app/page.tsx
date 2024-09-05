"use client";

import Search from "@/components/Search";
import BarGraph from "@/components/BarGraph";
import LineBarComposedChart from "@/components/LineBarComposedChart";
import { LabelConfig } from "@/components/LineBarComposedChart";
import {
  processData,
  processGrowth,
  processMargins,
  processCostsOverRevenue,
  processFCF,
  processCashFlow,
} from "@/lib/utils";
import LineGraph from "@/components/LineGraph";
import SearchResults from "@/components/SearchResults";
import { aapl, aaplCashFlow } from "@/data";
import {
  barLabelConfig,
  cfLabelConfig,
  composedLabelConfig,
  costRatioLabelConfig,
  fcfLabelConfig,
  growthLabelConfig,
  marginLabelConfig,
} from "@/lib/graphconfig";

const page = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) => {
  const query = searchParams?.query || "";

  return (
    <div className="">
      <Search placeholder="search..." />
      <SearchResults query={query} />
      {/* <Charts query={query} /> */}
      <BarGraph
        labels={barLabelConfig}
        title={"Revenue & Earnings"}
        processData={processData}
        apiData={aapl}
      />
      <BarGraph
        labels={growthLabelConfig}
        title={"Growth"}
        processData={processGrowth}
        isPercent={true}
        apiData={aapl}
      />
      <LineGraph
        processData={processMargins}
        labels={marginLabelConfig}
        title="Margin"
        isPercent={true}
        apiData={aapl}
      />
      <LineGraph
        processData={processCostsOverRevenue}
        labels={costRatioLabelConfig}
        title="Expenses / Revenue"
        isPercent={true}
        apiData={aapl}
      />
      <LineBarComposedChart labels={composedLabelConfig} />
      {/*   CASH FLOWS */}
      <BarGraph
        labels={fcfLabelConfig}
        title={"Free Cash Flow"}
        processData={processFCF}
        apiData={aaplCashFlow}
        // isPercent={true}
      />
      <LineGraph
        labels={cfLabelConfig}
        processData={processCashFlow}
        title="Cash Flow Breakdown"
        apiData={aaplCashFlow}
      />
    </div>
  );
};

export default page;
