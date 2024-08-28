import React from "react";
import { Group } from "@visx/group";
import { aapl } from "@/constants";
import { getMargins } from "@/utils";
import { Margins } from "@/types";

type Props = {
  height: number;
  width: number;
};

const VERTICALMARGIN = 120;

// data
const data = getMargins(aapl, "annualReports");
console.log("🚀 ~ data:", data);

// accessors
const getDate = (d: Margins) => {
  return d.fiscalYear;
};
const getGrossProfitMargin = (d: Margins) => {
  return d.grossProfitMargin;
};
const getOperatingProfitMargin = (d: Margins) => {
  return d.operatingProfitMargin;
};
const netProfitMargin = (d: Margins) => {
  return d.netProfitMargin;
};

const MarginGraph = ({ width, height }: Props) => {
  const margin = { top: 60, right: 60, bottom: 50, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  return (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={"#718096"}
        rx={14}
      />
      <Group left={margin.left} top={margin.top}>
        <rect
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          fill={"#A0AEC0"}
        />
      </Group>
    </svg>
  );
  // bounds
};

export default MarginGraph;
