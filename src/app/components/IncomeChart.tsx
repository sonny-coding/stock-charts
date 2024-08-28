import React, { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import { scaleBand, scaleLinear } from "@visx/scale";
import { aapl } from "@/constants";
import { getAnnualIncome, getQuarterNetIncome } from "@/utils";
import { IncomeYear } from "@/types";

type Props = {
  width: number;
  height: number;
  events?: boolean;
};

// graph data
const data = getAnnualIncome(aapl).reverse();
const VERTICALMARGIN = 120;

// accessors
const getIncome = (d: IncomeYear) => {
  return d.netIncome;
};
const getYear = (d: IncomeYear) => {
  return d.year;
};

export default function IncomeChart({ width, height, events = false }: Props) {
  // bounds
  const xMax = width;
  const yMax = height - VERTICALMARGIN;

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: data.map(getYear),
        padding: 0.4,
      }),
    [xMax]
  );
  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...data.map(getIncome))],
      }),
    [yMax]
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <GradientTealBlue id="teal" />
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={VERTICALMARGIN / 2}>
        {data.map((d: any) => {
          const year = getYear(d);
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(getIncome(d)) ?? 0);
          const barX = xScale(year);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${year}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill="rgba(23, 233, 217, .5)"
              onClick={() => {
                if (events)
                  alert(`clicked: ${JSON.stringify(Object.values(d))}`);
              }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
