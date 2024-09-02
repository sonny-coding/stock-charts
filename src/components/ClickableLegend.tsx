import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DataPoint {
  name: string;
  series1: number;
  series2: number;
  series3: number;
}

const data: DataPoint[] = [
  { name: "Jan", series1: 4000, series2: 2400, series3: 1800 },
  { name: "Feb", series1: 3000, series2: 1398, series3: 2800 },
  { name: "Mar", series1: 2000, series2: 9800, series3: 3200 },
  { name: "Apr", series1: 2780, series2: 3908, series3: 2000 },
  { name: "May", series1: 1890, series2: 4800, series3: 2181 },
  { name: "Jun", series1: 2390, series2: 3800, series3: 2500 },
];

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

  return (
    <ul style={{ display: "flex", listStyleType: "none" }}>
      {payload.map((entry) => (
        <li
          key={entry.value}
          onClick={() => onClick(entry.dataKey)}
          style={{
            textDecoration: crossedOut[entry.dataKey as keyof VisibleSeries]
              ? "line-through"
              : "none",
            cursor: "pointer",
            color: crossedOut[entry.dataKey as keyof VisibleSeries]
              ? "gray"
              : entry.color,
            marginLeft: 10,
          }}
        >
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

export const ChartWithCrossableLegend: React.FC = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart with Crossable Legend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend
              content={
                <CustomizedLegend
                  onClick={handleLegendClick}
                  crossedOut={crossedOutSeries}
                />
              }
            />
            {!crossedOutSeries.series1 && (
              <Line type="monotone" dataKey="series1" stroke="#8884d8" />
            )}
            {!crossedOutSeries.series2 && (
              <Line type="monotone" dataKey="series2" stroke="#82ca9d" />
            )}
            {!crossedOutSeries.series3 && (
              <Line type="monotone" dataKey="series3" stroke="#ffc658" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartWithCrossableLegend;
