import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LabelConfig } from "./BarGraph";
import { formatValue } from "@/lib/utils";

type DataTableProps = {
  data: any[];
  labels: LabelConfig;
  isPercent?: boolean;
};

export const DataTable = ({ data, labels, isPercent }: DataTableProps) => {
  const keys: string[] = Object.keys(data[0]);
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Period</TableHead>
          {Object.entries(labels).map(([key, config]) => {
            return <TableHead key={key}>{config.label}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((each) => (
          <TableRow key={each.year}>
            {keys.map((key) => {
              return (
                <TableCell key={key}>
                  {formatValue(each[key], isPercent, true)}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
