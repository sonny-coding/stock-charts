"use client";

import React from "react";
import Search from "./components/Search";
import Charts from "./components/Charts";
import IncomeChart from "./components/IncomeChart";
import Three from "./components/Three";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import ThreeBar from "./components/ThreeBar";
// import LineChart from "./components/LineChart";
import MarginGraph from "./components/MarginGraph";
import { denmark } from "@/data";
import { Button } from "@/components/ui/button";
import { ShardChart } from "@/components/ShadChart";

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
      <Search placeholder="AMD" />
      <Charts query={query} />
      <Button>Click me</Button>
      <ShardChart />

      {/* <div className="w-[500px] h-[300px] overflow-hidden relative">
        <ParentSize>
          {({ width, height }) => <IncomeChart width={width} height={height} />}
        </ParentSize>
      </div>
      <div className="w-[500px] h-[300px] overflow-hidden relative">
        <ParentSize>
          {({ width, height }) => <Three width={width} height={height} />}
        </ParentSize>
      </div>
      <div className="w-[500px] h-[300px] overflow-hidden relative">
        <ParentSize>
          {({ width, height }) => <ThreeBar width={width} height={height} />}
        </ParentSize>
      </div>
      <div className="w-[500px] h-[300px] overflow-hidden relative">
        <ParentSize>
          {({ width, height }) => (
            <LineChart data={denmark} width={width} height={height} />
          )}
        </ParentSize>
      </div>
      <div className="w-[500px] h-[300px] overflow-hidden relative">
        <ParentSize>
          {({ width, height }) => <MarginGraph width={width} height={height} />}
        </ParentSize>
      </div> */}
    </div>
  );
};

export default page;
