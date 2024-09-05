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
    <main className="flex-grow container mx-auto px-4 py-8 max-h-screen">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Search for Stock Tickers
        </h2>
        <div className="flex flex-col items-center space-x-2">
          <Search placeholder="Enter stock ticker..." />
          <SearchResults query={query} />
        </div>
      </div>
      {/* <Charts query={query} /> */}
    </main>
  );
};

export default page;
