import { File } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DataTable } from "./DataTable";
import { LabelConfig } from "./BarGraph";
type DataDialog = {
  data: any[];
  labels: LabelConfig;
  title: string;
  isPercent?: boolean;
};

const DataDialog = ({ data, labels, title, isPercent }: DataDialog) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center bg-secondary text-[10px] leading-none lg:text-xs hover:opacity-60 py-1 px-2 lg:py-2 lg:px-3 text-slate-500 border-b-2">
          <File className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent
        className={"lg:max-w-screen-lg overflow-y-scroll w-full max-h-[90%]"}
      >
        <DialogHeader>{title}</DialogHeader>
        <DataTable isPercent={isPercent} data={data} labels={labels} />
      </DialogContent>
    </Dialog>
  );
};

export default DataDialog;
