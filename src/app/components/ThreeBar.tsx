"use client";

import React from "react";
import { Group } from "@visx/group";
import { BarGroup } from "@visx/shape";
import { AxisBottom } from "@visx/axis";
import { scaleBand, scaleLinear, scaleOrdinal } from "@visx/scale";
import { timeParse, timeFormat } from "@visx/vendor/d3-time-format";
import { getAnnualIncome } from "@/utils";
import { aapl } from "@/constants";
import { IncomeYear } from "@/types";

export type BarGroupProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};

type BarName = "revenue" | "operatingIncome" | "netIncome";

export const blue = "#aeeef8";
export const green = "#e5fd3d";
export const purple = "#9caff6";
export const background = "#612efb";

const data: IncomeYear[] = getAnnualIncome(aapl).slice(0, 8).reverse();
const keys = Object.keys(data[0]).filter((d) => d !== "year") as BarName[];
const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };

const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%b %d");
const formatDate = (date: string) => format(parseDate(date) as Date);

// accessors
const getYear = (d: IncomeYear) => d.year;

// scales
const yearScale = scaleBand<string>({
  domain: data.map(getYear),
  padding: 0.2,
});

// city scale: austin ny, dallas = revenue, ope, net
const earningScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});

const heightScale = scaleLinear<number>({
  domain: [
    0,
    Math.max(
      ...data.map((d) => Math.max(...keys.map((key) => Number(d[key]))))
    ),
  ],
});

const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [blue, green, purple],
});

const ThreeBar = ({
  width,
  height,
  events = false,
  margin = defaultMargin,
}: BarGroupProps) => {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  yearScale.rangeRound([0, xMax]);
  earningScale.rangeRound([0, yearScale.bandwidth()]);
  heightScale.range([yMax, 0]);

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={background}
        rx={14}
      />
      <Group top={margin.top} left={margin.left}>
        <BarGroup
          data={data}
          keys={keys}
          height={yMax}
          x0={getYear}
          x0Scale={yearScale}
          x1Scale={earningScale}
          yScale={heightScale}
          color={colorScale}
        >
          {(barGroups) =>
            barGroups.map((barGroup) => (
              <Group
                key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                left={barGroup.x0}
              >
                {barGroup.bars.map((bar) => (
                  <rect
                    key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    fill={bar.color}
                    rx={4}
                    onClick={() => {
                      if (!events) return;
                      const { key, value } = bar;
                      alert(JSON.stringify({ key, value }));
                    }}
                  />
                ))}
              </Group>
            ))
          }
        </BarGroup>
      </Group>
      {/* <AxisBottom
        top={yMax + margin.top}
        tickFormat={formatDate}
        scale={dateScale}
        stroke={green}
        tickStroke={green}
        hideAxisLine
        tickLabelProps={{
          fill: green,
          fontSize: 11,
          textAnchor: "middle",
        }}
      /> */}
    </svg>
  );
};

export default ThreeBar;
