import { ChartConfig } from "./chart";

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
  visibleSeries: Record<string, boolean>;
  chartConfig: ChartConfig;
}

export const CustomizedLegend: React.FC<CustomizedLegendProps> = ({
  payload,
  onClick,
  visibleSeries,
  chartConfig,
}) => {
  if (!payload) return null;
  return (
    <ul className="flex justify-center space-x-4 mt-4">
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          className={`cursor-pointer hover:opacity-75 transition-opacity ${
            !visibleSeries[entry.dataKey] ? "opacity-50" : ""
          }`}
          onClick={() => onClick(entry.dataKey)}
        >
          <span
            className="inline-block w-3 h-3 mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          {chartConfig[entry.dataKey].label || entry.value}
        </li>
      ))}
    </ul>
  );
};
