"use client";

import BarGraph from "@/components/BarGraph";
import LineBarComposedChart from "@/components/LineBarComposedChart";
import LineGraph from "@/components/LineGraph";
import { aapl, aaplCashFlow } from "@/data";
import {
  barLabelConfig,
  growthLabelConfig,
  marginLabelConfig,
  costRatioLabelConfig,
  composedLabelConfig,
  fcfLabelConfig,
  cfLabelConfig,
} from "@/lib/graphconfig";
import {
  processData,
  processGrowth,
  processMargins,
  processCostsOverRevenue,
  processFCF,
  processCashFlow,
} from "@/lib/utils";

type PageProps = {
  params: {
    ticker: string;
  };
};

export default function Page({ params: { ticker } }: PageProps) {
  return (
    <div className="max-w-5xl mx-auto space-y-2 mt-2">
      <BarGraph
        labels={barLabelConfig}
        title={"Revenue & Earnings"}
        processData={processData}
        apiData={aapl}
      />
      <LineGraph
        labels={growthLabelConfig}
        title={"Growth"}
        processData={processGrowth}
        isPercent={true}
        apiData={aapl}
      />
      <LineGraph
        processData={processMargins}
        labels={marginLabelConfig}
        title="Margins"
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
}
