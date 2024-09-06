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
    <ul className="flex justify-center space-x-4 mt-4 text-lg">
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          className={`cursor-pointer hover:opacity-75 transition-opacity text-center flex items-center gap-1 ${
            !visibleSeries[entry.dataKey] ? "opacity-50" : ""
          }`}
          onClick={() => onClick(entry.dataKey)}
        >
          <span
            className="inline-block w-4 h-4 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          {chartConfig[entry.dataKey].label || entry.value}
        </div>
      ))}
    </ul>
  );
};
